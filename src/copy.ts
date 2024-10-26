import fs from "fs";
import path from "path";

export function copy(target: any, to: any, oldMtime: any, newMtime: any) {
  try {
    if (!fs.existsSync(target)) {
      throw new Error(`Folder or File not found: ${target}`);
    }

    if (!fs.existsSync(to)) {
      fs.mkdirSync(to, { recursive: true });
    }

    const files = fs.readdirSync(target);

    files.forEach((file) => {
      const filePath = path.join(target, file);
      const desPath = path.join(to, path.relative(target, filePath));
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        copy(filePath, desPath, oldMtime[file] || {}, newMtime[file]);
      } else if (stats.isFile()) {
        const oldFileMtime = oldMtime[file] || {};
        const newFileMtime = newMtime[file];

        if (oldFileMtime && oldFileMtime === newFileMtime) {
          console.log(
            `\x1b[34mSkipped:\x1b[0m ${filePath} \x1b[33m(no changes)\x1b[0m`
          );
          return;
        } else {
          fs.copyFileSync(filePath, desPath);
          console.log(
            `\x1b[32mCopied:\x1b[0m ${filePath} \x1b[34m->\x1b[0m ${desPath}`
          );
        }

      }
    });
  } catch (error) {
    console.error(error);
  }
}