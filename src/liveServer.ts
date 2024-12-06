import { exec } from 'child_process';
import express from "express";

export function liveServer(destination: string, port: number = 5500) {
  const app = express();

  let url: string;
  app.use(express.static(destination));
  app.listen(port, () => {
    url = `http://localhost:${port}`;
    console.log("\x1b[34m%s\x1b[0m", `Server is hosted at ${url}!`);
    console.log("\x1b[34m%s\x1b[0m", `Enter CTRL + C to stop.`);
    console.log("\x1b[33m%s\x1b[0m", `Opening browsers...`);

    tryOpenUrl(url);
  });

  function tryOpenUrl(url: string) {
    const commands = [ 'xdg-open', 'open', 'start', 'termux-open-url'];

    for (const cmd of commands) {
      exec(`${cmd} ${url}`, (error, stdout, stderr) => {
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