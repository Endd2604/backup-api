import { exec } from 'child_process';
import express from "express";

export function liveServer(destination: string, port: number = 5500) {
  const app = express();

  let url: string;
  app.use(express.static(destination));
  app.listen(port, () => {
    url = `http://localhost:${port}`;
    console.log(`Server hosted on ${url}!`);

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