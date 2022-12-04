const { MongoDataSource } = require("apollo-datasource-mongodb");

class CourseAPI extends MongoDataSource {
  constructor(options) {
    super(options); // this sends our server's `cache` through
    this.model = options.CourseModel;
    this.context = options.context;
  }

  courses({ offset, limit, search, type, visible = true, enable = true }) {
    const filter = { visible, enable };
    if (type) {
      filter["paid"] = type === "PAID" ? true : false;
    }
    if (search) {
      filter["$text"] = { $search: search };
    }
    return this.model
      .find(filter)
      .skip(offset)
      .limit(limit)
      .populate("likes")
      .populate("sales")
      .exec();
  }

  course({ courseId }) {
    return this.model
      .findById(courseId)
      .populate("purchased")
      .populate("likes")
      .populate("sales")
      .exec();
  }

  addCourse({ courseInput }) {
    const course = new this.model(courseInput);
    return course.save();
  }

  editCourse({ courseId, courseInput }) {
    return this.model
      .findOneAndUpdate(
        {
          _id: courseId,
        },
        courseInput,
        { new: true }
      )
      .exec();
  }

  deleteCourse({ courseId }) {
    return this.model
      .findOneAndUpdate(
        {
          _id: courseId,
        },
        { enable: false },
        { new: true }
      )
      .exec();
  }
}

module.exports = CourseAPI;
