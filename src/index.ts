import http from "http";
import fs from "fs";
import { getUsers } from "./getUsers";

// create a server object:
http.createServer((req, res) => {
    const dataJson = fs.readFileSync("data.json", { encoding: "utf-8" });
    const database = JSON.parse(dataJson);

    res.setHeader("Content-type", "application/json");

    console.log(req.url);
    switch (req.url) {
        case "/api/users":
            switch (req.method) {
                case "GET":
                    getUsers(req, res);
                    break;
                case "POST":
                    req.on("data", (incomingData: Buffer) => {
                        const body = JSON.parse(incomingData.toString());
                        console.log(incomingData.toString());
                        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                        if (!body.username) {
                            res.writeHead(400);
                            res.end("No Username");
                        }

                        if (!body.age) {
                            res.writeHead(400);
                            res.end("No Age");
                        }

                        database.users.map((user) => {
                            if (user.username === body.username) {
                                user.age = body.age;
                            }
                            return user;
                        });

                        database.users.push({ username: body.username });

                        fs.writeFileSync("data.json", JSON.stringify(database));

                        res.end("SUCCESS");
                    });
                    // res.write(JSON.stringify({ users: data.users }));
                    // res.end();
                    break;

                default:
                    res.end("Method not found");
                    break;
            }
            break;

        default:
            res.end("Route not found");
            break;
    }

    // console.log(req.headers);

    // res.statusCode = 404;
    // res.write("Hello World!"); // write a response to the client
    // res.end(); // end the response
}).listen(8080); // the server object listens on port 8080
