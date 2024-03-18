import http from "http";
import dotenv from 'dotenv'
dotenv.config()
// import fs from "fs";
// import { getUsers } from "./methods/getUsers";

const PORT = process.env.PORT ?? 3001

// create a server object:
const server = http.createServer((req, res) => {
    // const dataJson = fs.readFileSync("data.json", { encoding: "utf-8" });
    // const database = JSON.parse(dataJson);
    switch (req.method) {
        case "GET":
            getReq(req, res);
            break;
        case "POST":
            postReq(req, res);
            break;
        case "PUT":
            putReq(req, res);
            break;
        case "DELETE":
            deleteReq(req, res);
            break;
    
        default:
            res.statusCode = 404;
            res.setHeader("Content-type", "application/json");  
            res.write(JSON.stringify({title: "Not found", message: 'Route not found'}));
            res.end();
            break;
    }
    
   
}); 

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    
})