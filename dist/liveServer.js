"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.liveServer = liveServer;
const express_1 = __importDefault(require("express"));
function liveServer(destination, port = 5500) {
    const app = (0, express_1.default)();
    app.use(express_1.default.static(destination));
    app.listen(port, () => {
        console.log(`Server hosted on http://localhost:${port}!`);
    });
}
