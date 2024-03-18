const { MongoDataSource } = require("apollo-datasource-mongodb");

class BundleAPI extends MongoDataSource {
  constructor(options) {
    super(options); // this sends our server's `cache` through
    this.model = options.BundleModel;
    this.context = options.context;
  }

  bundles({
    offset,
    limit,
    search,
    paid,
    type,
    language,
    visible = null,
    enable = true,
  }) {
    const filter = { enable };
    if (this.context?.user?.role === "USER") {
      filter["visible"] = true;
    }
    if (typeof visible == "boolean" && this.context?.user?.role !== "USER") {
      filter["visible"] = visible;
    }
    if (paid) {
      filter["paid"] = paid;
    }
    if (type) {
      filter["type"] = type;
    }
    if (language) {
      filter["language"] = language;
    }
    if (search) {
      filter["$text"] = { $search: search };
    }
    const populateArray = ["likes", "purchases"];
    if (this.context?.user?._id) {
      populateArray.push({
        path: "liked",
        match: { user: this.context?.user?._id },
      });
      populateArray.push({
        path: "purchased",
        match: { user: this.context?.user?._id },
      });
      populateArray.push({
        path: "bookmarked",
        match: { user: this.context?.user?._id },
      });
    }
    return this.model
      .find(filter, "-syllabus")
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .populate(populateArray)
      .exec();
  }

  bundle({ bundleId }) {
    const populateArray = ["likes", "purchases"];
    if (this.context?.user?._id) {
      populateArray.push({
        path: "liked",
        match: { user: this.context?.user?._id },
      });
      populateArray.push({
        path: "purchased",
        match: { user: this.context?.user?._id },
      });
      populateArray.push({
        path: "bookmarked",
        match: { user: this.context?.user?._id },
      });
    }
    return this.model
      .findById(bundleId)
      .select("-syllabus")
      .populate(populateArray)
      .exec();
  }

  bundleSyllabus({ bundleId }) {
    return this.model.findById(bundleId).select("_id syllabus").exec();
  }

  bundleById(id) {
    return this.model.findById(id).exec();
  }

  bundleExists({ bundleId, ...rest }) {
    return this.model.exists({ _id: bundleId, enable: true, ...rest });
  }

  addBundle({ bundleInput }) {
    const bundle = new this.model(bundleInput);
    return bundle.save();
  }

  editBundle({ bundleId, bundleInput }) {
    return this.model
      .findByIdAndUpdate(bundleId, bundleInput, { new: true })
      .select("-syllabus")
      .exec();
  }

  deleteBundle({ bundleId }) {
    return this.model
      .findByIdAndUpdate(bundleId, { enable: false }, { new: true })
      .select("-syllabus")
      .exec();
  }

  getSyllabus(subjectIds, edit) {
    let syllabus = "";
    if (!subjectIds || subjectIds.length < 1) {
      return syllabus;
    }
    subjectIds.forEach((_, index) => {
      if (index < 1) {
        if (edit && index == subjectIds.length - 1) {
          syllabus += ".$";
        } else {
          syllabus += ".$.syllabus";
        }
      } else {
        if (edit && index == subjectIds.length - 1) {
          syllabus += `.$[syllabus${index}]`;
        } else {
          syllabus += `.$[syllabus${index}].syllabus`;
        }
      }
    });
    return syllabus;
  }

  getSyllabusFilter(subjectIds) {
    const syllabusFilter = {};
    if (!subjectIds || subjectIds.length < 1) {
      return syllabusFilter;
    }
    subjectIds.forEach((subjectId, index) => {
      let key = "";
      for (let i = index; i >= 0; i--) {
        if (i === index) {
          key += "syllabus";
        } else {
          key += ".syllabus";
        }
      }
      syllabusFilter[`${key}.subjectId`] = subjectId;
    });
    return syllabusFilter;
  }

  getSyllabusArrayFilter(subjectIds) {
    const arrayFilters = [];
    if (!subjectIds || subjectIds.length < 2) {
      return arrayFilters;
    }
    subjectIds.forEach((subjectId, index) => {
      if (index > 0) {
        arrayFilters.push({ [`syllabus${index}.subjectId`]: subjectId });
      }
    });
    return arrayFilters;
  }

  addBundleSyllabus({ bundleId, syllabusInput }) {
    const subjectIds = syllabusInput?.subjectIds
      ? syllabusInput.subjectIds
      : [];
    const syllabus = this.getSyllabus(subjectIds);
    const syllabusFilter = this.getSyllabusFilter(subjectIds);
    const arrayFilters = this.getSyllabusArrayFilter(subjectIds);
    return this.model.updateOne(
      { _id: bundleId, ...syllabusFilter },
      {
        $push: { [`syllabus${syllabus}`]: { name: syllabusInput.subjectName } },
      },
      { arrayFilters: [...arrayFilters] }
    );
  }

  editBundleSyllabus({ bundleId, syllabusInput }) {
    const subjectIds = syllabusInput?.subjectIds
      ? [...syllabusInput.subjectIds, syllabusInput.subjectId]
      : [syllabusInput.subjectId];
    const syllabus = this.getSyllabus(subjectIds, true);
    const syllabusFilter = this.getSyllabusFilter(subjectIds);
    const arrayFilters = this.getSyllabusArrayFilter(subjectIds);
    return this.model.updateOne(
      { _id: bundleId, ...syllabusFilter },
      { $set: { [`syllabus${syllabus}.name`]: syllabusInput.subjectName } },
      { arrayFilters: [...arrayFilters] }
    );
  }

  deleteBundleSyllabus({ bundleId, syllabusInput }) {
    const subjectIds = syllabusInput?.subjectIds
      ? syllabusInput.subjectIds
      : [];
    const syllabus = this.getSyllabus(subjectIds);
    const syllabusFilter = this.getSyllabusFilter(subjectIds);
    const arrayFilters = this.getSyllabusArrayFilter(subjectIds);
    return this.model.updateOne(
      { _id: bundleId, ...syllabusFilter },
      {
        $pull: {
          [`syllabus${syllabus}`]: { subjectId: syllabusInput.subjectId },
        },
      },
      { arrayFilters: [...arrayFilters] }
    );
  }
}

module.exports = BundleAPI;
