import { readdirSync, readFileSync } from "fs";
import { join, extname, basename } from "path";

const iconMap: {
  [key: string]: {
    [key: string]: string;
  };
} = {};
readdirSync(__dirname, {
  withFileTypes: true,
}).forEach((dirent) => {
  try {
    if (dirent.isDirectory()) {
      const fileStrings: { [key: string]: string } = {};

      const dirname = join(__dirname, dirent.name);
      const files = readdirSync(dirname);

      files.forEach((fileName) => {
        try {
          if (extname(fileName) === ".svg") {
            const fileContent = readFileSync(join(dirname, fileName), {
              encoding: "utf8",
            });
            fileStrings[basename(fileName, ".svg")] = fileContent;
          }
        } catch (e) {}
      });
      iconMap[dirent.name] = fileStrings;
    }
  } catch (e) {}
});

export default iconMap;
