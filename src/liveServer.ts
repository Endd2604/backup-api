import express from 'express';

export function liveServer(destination: string, port: number = 5500) {
  const app = express();

  app.use(express.static(destination));
  app.listen(port, () => {
    console.log(`Server hosted on http://localhost:${port}!`);
  });
}