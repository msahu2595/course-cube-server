const { MongoDataSource } = require("apollo-datasource-mongodb");

class DocumentAPI extends MongoDataSource {
  constructor(options) {
    super(options); // this sends our server's `cache` through
    this.model = options.DocumentModel;
    this.context = options.context;
  }

  documents({ offset, limit, search, enable = true }) {
    const compound = {
      filter: [
        {
          equals: {
            path: "enable",
            value: enable,
          },
        },
      ],
    };
    if (search) {
      compound.must = [
        {
          text: {
            query: `${search}`,
            path: {
              wildcard: "*",
            },
          },
        },
      ];
    }
    const agg = [
      {
        $search: {
          index: "search",
          compound,
        },
      },
      { $sort: { createdAt: -1 } },
      { $skip: offset },
      {
        $limit: limit,
      },
    ];
    return this.model.aggregate(agg).exec();
  }

  document({ documentId }) {
    return this.model.findById(documentId).exec();
  }

  documentExists({ documentId }) {
    return this.model.exists({ _id: documentId });
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
