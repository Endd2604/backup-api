"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.copySupperSync = copySupperSync;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const green = "\x1b[32m";
const blue = "\x1b[34m";
const yellowOrange = "\x1b[33m";
const reset = "\x1b[0m";
function copySupperSync(target, to, except = []) {
    const mtimePath = path_1.default.resolve(to, ".mtime.json");
    let oldMtime = {};
    if (fs_extra_1.default.existsSync(mtimePath)) {
        oldMtime = JSON.parse(fs_extra_1.default.readFileSync(mtimePath, 'utf8'));
    }
    const newMtime = {};
    function again(target, to, except, currentMtime, oldMtime = {}) {
        const folder = fs_extra_1.default.readdirSync(target);
        folder.forEach(file => {
            const sourcePath = path_1.default.resolve(target, file);
            const destinationPath = path_1.default.resolve(to, file);
            const stats = fs_extra_1.default.statSync(sourcePath);
            if (except.some(excluded => sourcePath.includes(excluded))) {
                console.log(`${blue}Skipped${reset} ${sourcePath} ${yellowOrange}(excluded)${reset}`);
                return;
            }
            if (stats.isDirectory()) {
                fs_extra_1.default.ensureDirSync(destinationPath);
                currentMtime[file] = {};
                again(sourcePath, destinationPath, except, currentMtime[file], oldMtime[file] || {});
            }
            else if (stats.isFile()) {
                if (oldMtime[file] === JSON.parse(JSON.stringify(stats.mtime))) {
                    console.log(`${blue}Skipped${reset} ${sourcePath} ${yellowOrange}(no changes)${reset}`);
                }
                else {
                    fs_extra_1.default.copySync(sourcePath, destinationPath);
                    console.log(`${green}Copied${reset} ${sourcePath} ${blue}->${reset} ${destinationPath}`);
                }
                currentMtime[file] = stats.mtime;
            }
        });
    }
    again(target, to, except, newMtime, oldMtime);
    fs_extra_1.default.writeFileSync(mtimePath, JSON.stringify(newMtime, null, 2));
}
