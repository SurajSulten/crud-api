/* eslint-disable @typescript-eslint/no-misused-promises */
import http from "http";
import dotenv from "dotenv";
import { getReq } from "./methods/get-request";
// import * as users from './users.json'
import { postReq } from "./methods/post-request";
import { deleteReq } from "./methods/delete-request";
import { putReq } from "./methods/put-request";
// eslint-disable-next-line @typescript-eslint/no-var-requires
// import users from './users.json';

dotenv.config();
const PORT = process.env.PORT ?? 3000;

// create a server object:
const server = http.createServer();

server.on(
    "request",
    async (req: http.IncomingMessage, res: http.ServerResponse) => {
        switch (req.method) {
            case "GET":
                await getReq(req, res);
                return;
            case "POST":
                await postReq(req, res);
                return;
            case "PUT":
                await putReq(req, res);
                return;
            case "DELETE":
                deleteReq(req, res);
                return;

            default:
                res.statusCode = 404;
                res.setHeader("Content-type", "application/json");
                res.write(
                    JSON.stringify({
                        title: "Not found",
                        message: "Route not found",
                    })
                );
                res.end();
        }
    }
);

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
