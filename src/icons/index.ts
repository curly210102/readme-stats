import { readdirSync, readFileSync } from "fs";
import { join, extname, basename } from "path";

const fileStrings: { [key: string]: string } = {};
const files = readdirSync(__dirname);

files.forEach((fileName) => {
  try {
    if (extname(fileName) === ".svg") {
      const fileContent = readFileSync(join(__dirname, fileName), {
        encoding: "utf8",
      });
      fileStrings[basename(fileName, ".svg")] = fileContent;
    }
  } catch (e) {}
});

export default fileStrings;
