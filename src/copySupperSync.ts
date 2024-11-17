import fs from "fs-extra";
import path from "path";

const green = "\x1b[32m";
const blue = "\x1b[34m";
const yellowOrange = "\x1b[33m";
const reset = "\x1b[0m";

export function copySupperSync(target: string, to: string, except: string[] = []) {

  const mtimePath = path.resolve(to, ".mtime.json");
  let oldMtime = {};
  if (fs.existsSync(mtimePath)) {
    oldMtime = JSON.parse(fs.readFileSync(mtimePath, 'utf8'));
  }
  const newMtime = {};

  function again(target: string, to: string, except: string[], currentMtime: any, oldMtime: any = {}) {
    const folder = fs.readdirSync(target);
    folder.forEach(file => {

      const sourcePath = path.resolve(target, file);
      const destinationPath = path.resolve(to, file);

      const stats = fs.statSync(sourcePath);

      if (except.some(excluded => sourcePath.includes(excluded))) {
        console.log(`${blue}Skipped${reset} ${sourcePath} ${yellowOrange}(excluded)${reset}`);
        return;
      }
  
      if (stats.isDirectory()) {
        fs.ensureDirSync(destinationPath);
        currentMtime[file] = {};
        again(sourcePath, destinationPath, except, currentMtime[file], oldMtime[file] || {});
      }
      else if (stats.isFile()) {

        if (oldMtime[file] === JSON.parse(JSON.stringify(stats.mtime))) {
          console.log(`${blue}Skipped${reset} ${sourcePath} ${yellowOrange}(no changes)${reset}`);
        } else {
          fs.copySync(sourcePath, destinationPath);
          console.log(`${green}Copied${reset} ${sourcePath} ${blue}->${reset} ${destinationPath}`);
        }

        currentMtime[file] = stats.mtime;
      }

    });
  }
  again(target, to, except, newMtime, oldMtime);

  fs.writeFileSync(mtimePath, JSON.stringify(newMtime, null, 2));
}