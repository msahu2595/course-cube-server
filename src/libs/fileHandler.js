const { existsSync, mkdirSync } = require("node:fs");
const { rename, stat, unlink } = require("node:fs/promises");

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
