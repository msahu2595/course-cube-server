const { UserInputError } = require("apollo-server");
const {
  getVideoData,
  getVideoDetails,
  getVideoUrls,
} = require("../../libs/getVideoData");

const VideoResolver = {
  Query: {
    videos: async (
      _,
      { offset = 0, limit = 10, search, filter },
      { dataSources: { videoAPI } }
    ) => {
      try {
        const payload = await videoAPI.videos({
          offset,
          limit,
          search,
          ...filter,
        });
        return {
          code: 200,
          success: true,
          message: "Successfully get videos.",
          limit,
          offset,
          search,
          filter,
          payload,
        };
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
    video: async (_, { videoId }, { dataSources: { videoAPI } }) => {
      try {
        const payload = await videoAPI.video({
          videoId,
        });
        return {
          code: 200,
          success: true,
          message: "Successfully get video.",
          payload,
        };
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
    fetchURL: async (_, { url }) => {
      try {
        const output = await getVideoDetails(url);
        const [title, thumbnail, time] = output.split("\n");
        return {
          code: 200,
          success: true,
          message: "Successfully get details.",
          payload: { title, thumbnail, time },
        };
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
    fetchDownloadURL: async (_, { videoId }, { dataSources: { videoAPI } }) => {
      try {
        const video = await videoAPI.video({ videoId });
        const output = await getVideoUrls(video?.link);
        const [url1, format1, url2, format2] = output.split("\n");
        const urls = [
          { url: url1, format: format1 },
          { url: url2, format: format2 },
        ];
        return {
          code: "200",
          success: true,
          message: "Video URL fetched successfully.",
          payload: urls,
        };
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
  },
  Mutation: {
    addVideo: async (_, { videoLink: link }, { dataSources: { videoAPI } }) => {
      try {
        const output = await getVideoData(link);
        const [
          title,
          url1,
          thumbnail,
          time,
          format1,
          // eslint-disable-next-line no-unused-vars
          title2,
          url2,
          // eslint-disable-next-line no-unused-vars
          thumbnail2,
          // eslint-disable-next-line no-unused-vars
          time2,
          format2,
        ] = output.split("\n");
        const payload = await videoAPI.addVideo({
          videoInput: {
            link,
            title,
            thumbnail,
            time,
            urls: [
              { url: url1, format: format1 },
              { url: url2, format: format2 },
            ],
          },
        });
        return {
          code: "200",
          success: true,
          message: "Video added successfully.",
          payload,
        };
      } catch (error) {
        console.log(error);
        throw new UserInputError(error.message);
      }
    },
    editVideo: async (
      _,
      { videoId, videoLink: link },
      { dataSources: { videoAPI } }
    ) => {
      try {
        const output = await getVideoData(link);
        const [
          title,
          url1,
          thumbnail,
          time,
          format1,
          // eslint-disable-next-line no-unused-vars
          title2,
          url2,
          // eslint-disable-next-line no-unused-vars
          thumbnail2,
          // eslint-disable-next-line no-unused-vars
          time2,
          format2,
        ] = output.split("\n");
        const payload = await videoAPI.editVideo({
          videoId,
          videoInput: {
            link,
            title,
            thumbnail,
            time,
            urls: [
              { url: url1, format: format1 },
              { url: url2, format: format2 },
            ],
          },
        });
        return {
          code: "200",
          success: true,
          message: "Video edited successfully.",
          payload,
        };
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
    refreshVideo: async (_, { videoId }, { dataSources: { videoAPI } }) => {
      try {
        const video = await videoAPI.video({ videoId });
        const output = await getVideoUrls(video?.link);
        const [url1, format1, url2, format2] = output.split("\n");
        const urls = [
          { url: url1, format: format1 },
          { url: url2, format: format2 },
        ];
        const payload = await videoAPI.refreshVideo({
          videoId,
          urls,
        });
        return {
          code: "200",
          success: true,
          message: "Video refreshed successfully.",
          payload,
        };
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
    deleteVideo: async (_, { videoId }, { dataSources: { videoAPI } }) => {
      try {
        const payload = await videoAPI.deleteVideo({ videoId });
        return {
          code: "200",
          success: true,
          message: "Video deleted successfully.",
          payload,
        };
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
  },
};

module.exports = VideoResolver;
