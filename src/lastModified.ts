import fs from "fs";
import path from "path";

export function getLastModified(target: any) {
  try {
    if (!fs.existsSync(target)) {
      throw new Error(`Folder or File not found: ${target}`);
    }

    const result: any = {};

    function readDirectory(target: any, currentResult: any) {
      const files = fs.readdirSync(target);
  
      files.forEach((file) => {
        const filePath = path.join(target, file);
        const stats = fs.statSync(filePath);
  
        if (stats.isDirectory()) {
          currentResult[file] = {};
          readDirectory(filePath, currentResult[file]);
  
        } else if (stats.isFile()) {
          currentResult[file] = stats.mtime

        }
      });
    }

    readDirectory(target, result);
    return result;

  } catch (error) {
    console.error(error);
  }
}