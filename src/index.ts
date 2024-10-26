import fs from "fs";
import path from "path";
import { copy } from "./copy";
import { getLastModified } from "./lastModified";
import { rmExtraFile } from "./rmExtra";

export class Backup {
  static async clone(target: string, to?: string) {
    if (!to) {
      to = `${target}_backup`;
    }

    const srcPath = path.resolve(process.cwd(), target);
    const desPath = path.resolve(process.cwd(), to);
    const mtimePath = path.join(desPath, ".mtime.json");

    let oldMtime = {};
    if (fs.existsSync(mtimePath)) {
      oldMtime = JSON.parse(fs.readFileSync(mtimePath, "utf-8"));
    }

    const newMtime = JSON.parse(JSON.stringify(getLastModified(srcPath)));

    copy(srcPath, desPath, oldMtime, newMtime);
    rmExtraFile(srcPath, desPath);
    fs.writeFileSync(mtimePath, `${JSON.stringify(newMtime, null, 2)}`);

    // console.log('Old Mtime:', oldMtime);
    // console.log('New Mtime:', newMtime);
    // console.log(srcPath);
    // console.log(desPath);
  }
}

// Backup.clone("../../backup-api", "../../../.backup-api");

