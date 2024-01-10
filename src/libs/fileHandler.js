const {
  // stat,
  unlink,
  rename,
  copyFile,
  constants,
} = require("node:fs/promises");
const moment = require("moment");
const crypto = require("crypto");
const fetch = require("node-fetch");
const { existsSync, mkdirSync, createWriteStream } = require("node:fs");

const fileHandler = {
  moveFromTmp: async ({ filePath, folderName }) => {
    try {
      if (!existsSync(`./assets/${folderName}`)) {
        mkdirSync(`./assets/${folderName}`, { recursive: true });
      }
      const newFilePath = filePath.replace(
        "assets/tmp",
        `assets/${folderName}`
      );
      await rename(`./${filePath}`, `./${newFilePath}`);
      // const stats = await stat(`./${newFilePath}`);
      // console.log(`stats: ${JSON.stringify(stats)}`);
      return newFilePath;
    } catch (error) {
      // console.log(error);
      throw new Error(error?.message || "Got error on moving file.");
    }
  },
  copyToTmp: async ({ filePath, userId }) => {
    try {
      if (!existsSync(`./${filePath}`)) {
        throw new Error("File not exists.");
      }
      const newFilePath = `assets/tmp/CC-${moment().unix()}-${
        userId || "UNKNOWN"
      }-${crypto.randomBytes(16).toString("hex")}.${
        filePath.split(".")?.[1] || "tmp"
      }`;
      await copyFile(
        `./${filePath}`,
        `./${newFilePath}`,
        constants.COPYFILE_EXCL
      );
      // const stats = await stat(`./${newFilePath}`);
      // console.log(`stats: ${JSON.stringify(stats)}`);
      return newFilePath;
    } catch (error) {
      // console.log(error);
      throw new Error(error?.message || "Got error on copy file.");
    }
  },
  downloadToTmp: async ({ url, userId }) => {
    try {
      const newFilePath = await new Promise((resolve, reject) => {
        const filePath = `assets/tmp/CC-${moment().unix()}-${
          userId || "UNKNOWN"
        }-${crypto.randomBytes(16).toString("hex")}.${
          url.split(".").pop() || "tmp"
        }`;
        fetch(url)
          .then((res) => {
            res.body
              .pipe(createWriteStream(`./${filePath}`))
              .on("close", () => {
                resolve(filePath);
              })
              .on("error", (error) => {
                reject(error?.message || "Got error on download file.");
              });
          })
          .catch((error) => {
            reject(error?.message || "Got error while fetching url.");
          });
      });
      // const stats = await stat(`./${newFilePath}`);
      // console.log(`stats: ${JSON.stringify(stats)}`);
      return newFilePath;
    } catch (error) {
      // console.log(error);
      throw new Error(error?.message || "Got error on download file.");
    }
  },
  remove: async ({ filePath }) => {
    try {
      await unlink(`./${filePath}`);
      // console.log(`successfully deleted "./${filePath}"`);
    } catch (error) {
      // console.log(error);
      throw new Error(error?.message || "Got error on moving file.");
    }
  },
};

module.exports = fileHandler;
