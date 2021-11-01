const { MongoDataSource } = require("apollo-datasource-mongodb");

class DocumentAPI extends MongoDataSource {
  documents({ offset, limit, search, type, visible = true, enable = true }) {
    const filter = { visible, enable };
    if (type) {
      filter["paid"] = type === "PAID" ? true : false;
    }
    if (search) {
      filter["$text"] = { $search: search };
    }
    return (
      this.model
        .find(filter)
        .skip(offset)
        .limit(limit)
        .populate("likes")
        // .populate("reads")
        .exec()
    );
  }

  document({ documentId }) {
    return (
      this.model
        .findById(documentId)
        .populate("likes")
        // .populate("reads")
        .exec()
    );
  }

  addDocument({ documentInput }) {
    const document = new this.model(documentInput);
    return document.save();
  }

  editDocument({ documentId, documentInput }) {
    return this.model
      .findOneAndUpdate(
        {
          _id: documentId,
        },
        documentInput,
        { new: true }
      )
      .exec();
  }

  deleteDocument({ documentId }) {
    return this.model
      .findOneAndUpdate(
        {
          _id: documentId,
        },
        { enable: false },
        { new: true }
      )
      .exec();
  }
}

module.exports = DocumentAPI;
