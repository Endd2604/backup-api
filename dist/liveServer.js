"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.liveServer = liveServer;
const child_process_1 = require("child_process");
const express_1 = __importDefault(require("express"));
function liveServer(destination, port = 5500) {
    const app = (0, express_1.default)();
    let url;
    app.use(express_1.default.static(destination));
    app.listen(port, () => {
        url = `http://localhost:${port}`;
        console.log("\x1b[34m%s\x1b[0m", `Server is hosted at ${url}!`);
        console.log("\x1b[34m%s\x1b[0m", `Enter CTRL + C to stop.`);
        console.log("\x1b[33m%s\x1b[0m", `Opening browsers...`);
        tryOpenUrl(url);
    });
    function tryOpenUrl(url) {
        const commands = ['xdg-open', 'open', 'start', 'termux-open-url'];
        for (const cmd of commands) {
            (0, child_process_1.exec)(`${cmd} ${url}`, (error, stdout, stderr) => {
                if (error) {
                    // console.error(`Lỗi khi thực thi lệnh ${cmd}: ${error.message}`);
                    return;
                }
                if (stderr) {
                    // console.error(`stderr: ${stderr}`);
                    return;
                }
                // console.log(`URL mở thành công với lệnh ${cmd}: ${stdout}`);
            });
            break;
        }
    }
}
