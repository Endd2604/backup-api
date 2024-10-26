import fs from "fs";
import path from "path";

export function rmExtraFile(source: any, destination: any) {
  try {
    const destFiles = fs.readdirSync(destination);

    destFiles.forEach((file) => {
      if (file === ".mtime.json") { return; }

      const desPath = path.join(destination, file);
      const sourcePath = path.join(source, file);

      if (!fs.existsSync(sourcePath)) {
        fs.rmSync(desPath, { recursive: true, force: true });
        console.log(
          `\x1b[31mRemoved:\x1b[0m ${desPath} \x1b[33m(file/folder not in source)\x1b[0m`
        );
      } else if (fs.statSync(desPath).isDirectory()) {
        rmExtraFile(sourcePath, desPath);
      }
    });
  } catch (error) {
    console.error(error);
  }
}