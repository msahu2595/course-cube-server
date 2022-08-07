const { UserInputError } = require("apollo-server");
const { getVideoDetails, getVideoUrls } = require("../../libs/getVideoData");

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
  },
  Mutation: {
    addVideo: async (_, { videoInput }, { dataSources: { videoAPI } }) => {
      try {
        const output = await getVideoDetails(videoInput?.link);
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
        throw new UserInputError(error.message);
      }
    },
    editVideo: async (
      _,
      { videoId, videoInput },
      { dataSources: { videoAPI } }
    ) => {
      try {
        const output = await getVideoDetails(videoInput?.link);
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
        throw new UserInputError(error.message);
      }
    },
    refreshVideo: async (_, { videoId }, { dataSources: { videoAPI } }) => {
      try {
        const video = await videoAPI.video({ videoId });
        const output = await getVideoUrls(video?.link);
        const [
          title1,
          url1,
          thumbnail1,
          duration1,
          format1,
          title2,
          url2,
          thumbnail2,
          duration2,
          format2,
        ] = output.split("\n");
        const urls = [
          {
            title: title1,
            url: url1,
            thumbnail: thumbnail1,
            duration: duration1,
            format: format1,
          },
          {
            title: title2,
            url: url2,
            thumbnail: thumbnail2,
            duration: duration2,
            format: format2,
          },
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
