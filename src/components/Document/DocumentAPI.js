const { MongoDataSource } = require("apollo-datasource-mongodb");

class DocumentAPI extends MongoDataSource {
  documents({ offset, limit, search, enable = true }) {
    const filter = { enable };
    if (search) {
      filter["$text"] = { $search: search };
    }
    return this.model.find(filter).skip(offset).limit(limit).exec();
  }

  document({ documentId }) {
    return this.model.findById(documentId).exec();
  }

  addDocument({ documentInput }) {
    const document = new this.model(documentInput);
    return document.save();
  }

  editDocument({ documentId, documentInput }) {
    return this.model
      .findByIdAndUpdate(documentId, documentInput, { new: true })
      .exec();
  }

  deleteDocument({ documentId }) {
    return this.model
      .findByIdAndUpdate(documentId, { enable: false }, { new: true })
      .exec();
  }
}

module.exports = DocumentAPI;
