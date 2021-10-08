const util = require("util");
const exec = util.promisify(require("child_process").exec);

async function getVideoUrl({ url, format = "18,22" }) {
  const { stdout, stderr } = await exec(`youtube-dl -f ${format} -g ${url}`);
  return { stdout, stderr };
}

module.exports = getVideoUrl;

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
