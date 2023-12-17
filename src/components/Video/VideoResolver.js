const { GraphQLError } = require("graphql");
const fileHandler = require("../../libs/fileHandler");
const { getVideoDetails, getVideoUrls } = require("../../libs/getVideoData");

const VideoResolver = {
  Query: {
    videos: async (
      _,
      { offset = 0, limit = 10, search, filter },
      { token, dataSources: { videoAPI } }
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
          token,
          limit,
          offset,
          search,
          filter,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    video: async (_, { videoId }, { token, dataSources: { videoAPI } }) => {
      try {
        const payload = await videoAPI.video({
          videoId,
        });
        return {
          code: 200,
          success: true,
          message: "Successfully get video.",
          token,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    fetchURL: async (_, { videoLink: link }, { token }) => {
      try {
        const output = await getVideoDetails(link);
        const [title, thumbnail, time] = output.split("\n");
        return {
          code: 200,
          success: true,
          message: "Successfully get details.",
          token,
          payload: { title, thumbnail, time },
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    fetchDownloadURL: async (
      _,
      { videoId },
      { token, dataSources: { videoAPI } }
    ) => {
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
          message: "Video download URL fetched successfully.",
          token,
          payload: urls,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
  Mutation: {
    addVideo: async (
      _,
      { videoLink: link },
      { token, dataSources: { videoAPI } }
    ) => {
      try {
        const videoExists = await videoAPI.videoLinkExists({ link });
        if (videoExists) throw new GraphQLError("Video already added.");
        const output = await getVideoDetails(link);
        const [title, thumbnail, time] = output.split("\n");
        const payload = await videoAPI.addVideo({
          videoInput: {
            title,
            thumbnail,
            time,
            link,
          },
        });
        return {
          code: "200",
          success: true,
          message: "Video added successfully.",
          token,
          payload,
        };
      } catch (error) {
        console.log(error);
        throw new GraphQLError(error.message);
      }
    },
    editVideo: async (
      _,
      { videoId, videoInput },
      { token, dataSources: { videoAPI } }
    ) => {
      try {
        if (videoInput.thumbnail) {
          const video = await videoAPI.video({ videoId });
          videoInput.thumbnail = await fileHandler.moveFromTmp({
            filePath: videoInput.thumbnail,
            folderName: "video",
          });
          if (/^assets\/video\/.*$/gm.test(video.thumbnail)) {
            fileHandler.remove({ filePath: video.thumbnail });
          }
        }
        const payload = await videoAPI.editVideo({
          videoId,
          videoInput,
        });
        return {
          code: "200",
          success: true,
          message: "Video edited successfully.",
          token,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    deleteVideo: async (
      _,
      { videoId },
      { token, dataSources: { videoAPI, contentAPI, bundleContentAPI } }
    ) => {
      try {
        const contentExists = await contentAPI.mediaContentExists({
          media: videoId,
        });
        const bundleContentExists =
          await bundleContentAPI.mediaBundleContentExists({
            media: videoId,
          });
        if (contentExists || bundleContentExists)
          throw new GraphQLError(
            `${
              contentExists ? "Content" : "Course content"
            } is using this video, Please remove from that before deleting this.`
          );
        const video = await videoAPI.video({ videoId });
        if (/^assets\/video\/.*$/gm.test(video.thumbnail)) {
          fileHandler.remove({ filePath: video.thumbnail });
        }
        const payload = await videoAPI.deleteVideo({ videoId });
        return {
          code: "200",
          success: true,
          message: "Video deleted successfully.",
          token,
          payload,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
};

module.exports = VideoResolver;
