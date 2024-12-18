const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    fs.readFile(path.join(__dirname, 'public', 'index.html'), 'utf-8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error loading index.html');
        return;
      }

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  }
  else {
    const filePath = path.join(__dirname, 'public', req.url);
    const extname = path.extname(filePath);
    let contentType = 'text/plain';

    if (extname === '.html') contentType = 'text/html';
    else if (extname === '.css') contentType = 'text/css';
    else if (extname === '.js') contentType = 'application/javascript';
    else if (extname === '.jpg' || extname === '.jpeg') contentType = 'image/jpeg';
    else if (extname === '.png') contentType = 'image/png';
    else if (extname === '.gif') contentType = 'image/gif';
    else if (extname === '.svg') contentType = 'image/svg+xml';

    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('File not found');
        return;
      }

      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    });
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
