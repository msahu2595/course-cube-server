const youtubedl = require("youtube-dl-exec");

async function getVideoUrl(link) {
  return await youtubedl(link, {
    getUrl: true,
    getDuration: true,
    getFormat: true,
    format: "18,22",
    noWarnings: true,
    noCallHome: true,
    noCheckCertificate: true,
    preferFreeFormats: true,
    youtubeSkipDashManifest: true,
    referer: link,
  });
}

module.exports = getVideoUrl;

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
