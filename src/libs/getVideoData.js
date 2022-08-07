const youtubedl = require("youtube-dl-exec");

async function getVideoData(link) {
  return await youtubedl(link, {
    getTitle: true,
    getUrl: true,
    getThumbnail: true,
    getDuration: true,
    format: "18,22",
    getFormat: true,
    noWarnings: true,
    noCallHome: true,
    skipDownload: true,
    preferFreeFormats: true,
    noCheckCertificate: true,
    youtubeSkipDashManifest: true,
    referer: link,
  });
}

async function getVideoDetails(link) {
  return await youtubedl(link, {
    getTitle: true,
    getThumbnail: true,
    getDuration: true,
    noWarnings: true,
    noCallHome: true,
    skipDownload: true,
    preferFreeFormats: true,
    noCheckCertificate: true,
    youtubeSkipDashManifest: true,
    referer: link,
  });
}

async function getVideoUrls(link) {
  return await youtubedl(link, {
    getUrl: true,
    format: "18,22",
    getFormat: true,
    noWarnings: true,
    noCallHome: true,
    skipDownload: true,
    preferFreeFormats: true,
    noCheckCertificate: true,
    youtubeSkipDashManifest: true,
    referer: link,
  });
}

module.exports = { getVideoData, getVideoDetails, getVideoUrls };
