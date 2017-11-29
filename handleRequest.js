const fs = require('fs')

function jsonResponse(response, file) {
  fs.readFile(file, 'utf8', function (err, data) {
    if (err) throw err
    response.writeHead(200, { "Content-Type": "application/json" })
    response.write(data)
    response.end()
  })
}

function writeJSON(file, data, callback) {
  fs.writeFile(file, JSON.stringify(data, null, '  '), 'utf8', (err) => {
    if (err) console.log(err)
    callback()
  })
}

function okResponse(response, message = 'OK') {
  response.writeHead(200, { "Content-Type": "text/plain" })
  response.write(message)
  response.end()
}

function processPostRequest(request, callback) {
  if (request.method == 'POST') {
    let body = '';

    request.on('data', function (data) {
      body += data;
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
      break

    case '/save_file_system':
      processPostRequest(request, ({ state }) => {
        writeJSON(`./data/fileSystem.json`, state, () => okResponse(response))
      })
      break

    case '/save_notebook':
      processPostRequest(request, ({ id, state }) => {
        writeJSON(`./data/notebooks/_${id}.json`, state, () => okResponse(response))
      })
      break

    default:
      response.writeHead(404, { "Content-Type": "text/plain" })
      response.write("Not Found")
      response.end()
  }
}

module.exports = handleRequest