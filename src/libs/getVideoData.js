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

function extractVideoId(link) {
  // Pattern to match YouTube video IDs
  const pattern =
    /(?:youtu\.be\/|youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=))([^&\n?#]+)/;

  // Find video ID using regex
  const match = link.match(pattern);

  // Extract video ID from the match
  if (match) {
    return match[1];
  } else {
    return null;
  }
}

module.exports = {
  getVideoData,
  getVideoDetails,
  getVideoUrls,
  extractVideoId,
};
