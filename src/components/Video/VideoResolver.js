const { UserInputError } = require("apollo-server");
const getVideoUrl = require("../../libs/getVideoUrl");

const VideoResolver = {
  Video: {
    access: (video) => {
      if (video.paid) {
        const purchaseCounts = video.courses.reduce(
          (purchaseCount, course) => purchaseCount + course.purchased,
          video.purchased
        );
        if (!purchaseCounts) {
          video.urls = null;
          return false;
        }
      }
      return true;
    },
  },
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
        throw new UserInputError(error.message, error.extensions.code);
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
        throw new UserInputError(error.message, error.extensions.code);
      }
    },
  },
  Mutation: {
    addVideo: async (_, { videoInput }, { dataSources: { videoAPI } }) => {
      try {
        const output = await getVideoUrl(videoInput?.link);
        const [url1, duration1, format1, url2, duration2, format2] =
          output.split("\n");
        const urls = [
          { url: url1, duration: duration1, format: format1 },
          { url: url2, duration: duration2, format: format2 },
        ];
        const payload = await videoAPI.addVideo({ videoInput, urls });
        return {
          code: "200",
          success: true,
          message: "Video added successfully.",
          payload,
        };
      } catch (error) {
        console.log(error);
        throw new UserInputError(error.message, error.extensions.code);
      }
    },
    editVideo: async (
      _,
      { videoId, videoInput },
      { dataSources: { videoAPI } }
    ) => {
      try {
        const output = await getVideoUrl(videoInput?.link);
        const [url1, duration1, format1, url2, duration2, format2] =
          output.split("\n");
        const urls = [
          { url: url1, duration: duration1, format: format1 },
          { url: url2, duration: duration2, format: format2 },
        ];
        const payload = await videoAPI.editVideo({
          videoId,
          videoInput,
          urls,
        });
        return {
          code: "200",
          success: true,
          message: "Video edited successfully.",
          payload,
        };
      } catch (error) {
        throw new UserInputError(error.message, error.extensions.code);
      }
    },
    refreshVideo: async (_, { videoId }, { dataSources: { videoAPI } }) => {
      try {
        const video = await videoAPI.video({ videoId });
        const output = await getVideoUrl(video?.link);
        const [url1, duration1, format1, url2, duration2, format2] =
          output.split("\n");
        const urls = [
          { url: url1, duration: duration1, format: format1 },
          { url: url2, duration: duration2, format: format2 },
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
        throw new UserInputError(error.message, error.extensions.code);
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
        throw new UserInputError(error.message, error.extensions.code);
      }
    },
  },
};

module.exports = VideoResolver;
