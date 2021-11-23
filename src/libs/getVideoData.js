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

// const util = require("util");
// const exec = util.promisify(require("child_process").exec);

// async function getVideoUrl(link) {
//   const { stdout, stderr } = await exec(
//     `youtube-dl --get-url --get-duration --get-format --format 18,22 ${link}`
//   );
//   const [url1, duration1, format1, url2, duration2, format2] =
//     stdout.split("\n");
//   const urls = [
//     { url: url1, duration: duration1, format: format1 },
//     { url: url2, duration: duration2, format: format2 },
//   ];
//   return { urls, stderr };
// }

// const { exec } = require("child_process");

// exec(
//   "youtube-dl -g -f 18 https://www.youtube.com/watch?v=mV8ZB7w1KQM",
//   (err, stdout, stderr) => {
//     if (err) {
//       // node couldn't execute the command
//       console.log({ err });
//       return;
//     }

//     // the *entire* stdout and stderr (buffered)
//     console.log(`stdout: ${stdout}`);
//     console.log(`stderr: ${stderr}`);
//   }
// );
