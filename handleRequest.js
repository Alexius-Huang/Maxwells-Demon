const fs = require('fs')

function jsonResponse(response, file) {
  fs.readFile(file, 'utf8', function (err, data) {
    if (err) throw err
    response.writeHead(200, { "Content-Type": "application/json" })
    response.write(data)
    response.end()
  })
}

function handleRequest(request, response) {
  switch(request.url) {
    case '/load_file_system':
      jsonResponse(response, './data/fileSystem.json')
      break

    default:
      response.writeHead(404, { "Content-Type": "text/plain" })
      response.write("Not Found")
      response.end()
  }
}

module.exports = handleRequest