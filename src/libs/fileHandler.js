const {
  stat,
  unlink,
  rename,
  copyFile,
  constants,
} = require("node:fs/promises");
const moment = require("moment");
const crypto = require("crypto");
const { existsSync, mkdirSync } = require("node:fs");

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
      await stat(`./${newFilePath}`);
      // console.log(`stats: ${JSON.stringify(stats)}`);
      return newFilePath;
    } catch (error) {
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
      const stats = await stat(`./${newFilePath}`);
      console.log(`stats: ${JSON.stringify(stats)}`);
      return newFilePath;
    } catch (error) {
      throw new Error(error?.message || "Got error on copy file.");
    }
  },
  remove: async ({ filePath }) => {
    try {
      await unlink(`./${filePath}`);
      // console.log(`successfully deleted "./${filePath}"`);
    } catch (error) {
      throw new Error(error?.message || "Got error on moving file.");
    }
  },
};

module.exports = fileHandler;
