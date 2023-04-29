const { MongoDataSource } = require("apollo-datasource-mongodb");

class DocumentAPI extends MongoDataSource {
  constructor(options) {
    super(options); // this sends our server's `cache` through
    this.model = options.DocumentModel;
    this.context = options.context;
  }

  documents({ offset, limit, search, enable = true }) {
    const filter = { enable };
    if (search) {
      filter["$text"] = { $search: search };
    }
    return this.model
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .exec();
  }

  document({ documentId }) {
    return this.model.findById(documentId).exec();
  }

  documentExists({ documentId, ...rest }) {
    return this.model.exists({ _id: documentId, enable: true, ...rest });
  }

  documentURLExists({ url }) {
    return this.model.exists({ url, enable: true });
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
