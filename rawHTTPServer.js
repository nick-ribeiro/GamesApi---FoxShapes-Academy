function serverCode(request, response) {
    var headers = request.headers;
    var method = request.method;
    var url = request.url;
    var body = [];
    request
      .on("error", function (err) {
        console.error(err);
      })
      .on("data", function (chunk) {
        body.push(chunk);
      })
      .on("end", function () {
        body = Buffer.concat(body).toString();
        // At this point, w'e have the headers, method, url and body, and can now
        // do whatever we need to in order to respond to this request.
        //iniciando o tratamento da requisição:
        //mostrando o conteúdo da request:
        console.log("headers: " + JSON.stringify(headers));
        console.log("method: " + method);
        console.log("url: " + url);
        console.log("body: " + body);
        response.on("error", function (err) {
          console.log("Response error: " + err);
        });
        switch(url){
            case "/":
                response.write("<html>");
                response.write("<body>");
                response.write("<h1>Home</h1>");
                response.write("</body>");
                response.write("</html>");
                break;
            case "/users":
                response.write("<html>");
                response.write("<body>");
                response.write("<h1>Users</h1>");
                response.write("</body>");
                response.write("</html>");
                break;
            case "/levels":
                response.write("<html>");
                response.write("<body>");
                response.write("<h1>Levels</h1>");
                response.write("</body>");
                response.write("</html>");
                break;
            case "/achivements":
                response.write("<html>");
                response.write("<body>");
                response.write("<h1>Achivements</h1>");
                response.write("</body>");
                response.write("</html>");
                break;
            case "/progress":
                response.write("<html>");
                response.write("<body>");
                response.write("<h1>Progress</h1>");
                response.write("</body>");
                response.write("</html>");
                break;
            case "/configurations":
                response.write("<html>");
                response.write("<body>");
                response.write("<h1>Configurations</h1>");
                response.write("</body>");
                response.write("</html>");
                break;
            case "/feedback":
                response.write("<html>");
                response.write("<body>");
                response.write("<h1>Feedback</h1>");
                response.write("</body>");
                response.write("</html>");
                break;
            default:
                response.write("<html>");
                response.write("<body>");
                response.write("<h1>Not Found</h1>");
                response.write("</body>");
                response.write("</html>");
                break;
        }
        response.statuscode = 200; //OK
        response.write("<html>");
        response.write("<body>");
        response.write("<h1>Hello, World!</h1>");
        response.write("</body>");
        response.write("</html>");
        response.end();
      });
  }

http
  .createServer(serverCode)
  .listen(8080); // Activates this server, listening on port 8080.
