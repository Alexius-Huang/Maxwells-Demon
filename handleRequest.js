const fs = require('fs')

function jsonResponse(response, file) {
  fs.readFile(file, 'utf8', function (err, data) {
    if (err) throw err
    response.writeHead(200, { "Content-Type": "application/json" })
    response.write(data)
    response.end()
  })
}


function processPostRequest(request, callback) {
  if (request.method == 'POST') {
    let body = '';

    request.on('data', function (data) {
      body += data;
      // Too much POST data, kill the connection!
      // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
      if (body.length > 1e6) request.connection.destroy()
    });

    request.on('end', function () {
      callback(JSON.parse(body))
    });
  }
}

function handleRequest(request, response) {
  switch(request.url) {
    case '/load_file_system':
      jsonResponse(response, './data/fileSystem.json')
      break

    case '/load_notebook':
      processPostRequest(request, ({ id }) => {
        jsonResponse(response, `./data/notebooks/_${id}.json`)
      })
      break;

    default:
      response.writeHead(404, { "Content-Type": "text/plain" })
      response.write("Not Found")
      response.end()
  }
}

module.exports = handleRequest