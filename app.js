const http = require("http");
const url = require("url");
const fs = require("fs");

function square(number) {
  return new Promise((resolve, reject) => {
    var result = number ** 2;
    resolve(result);
  });
}

http
  .createServer(function (req, res) {
    var link = url.parse(req.url, true);
    if (link.pathname == "/") {
      fs.readFile("./index.html", function (err, data) {
        if (err) {
          res.write("Error");
        } else {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.write(data);
          res.end();
        }
      });
    } else {
      res.setHeader("Content-Type", "application/json");
      var number = parseInt(link.query.number);
      var result = square(number).then(function (data) {
        return data;
      });
      result.then(function (data) {
        res.end(JSON.stringify({ square: data }));
      });
    }
  })
  .listen(8080);
