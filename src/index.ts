import http from "http";
import dotenv from 'dotenv'
// import fs from "fs";
import { getReq } from '../src/methods/get-request'
// import * as users from './users.json'
import { postReq } from '../src/methods/post-request'
// import { putReq } from '../src/methods/put-request'
// import { deleteReq } from '../src/methods/delete-request'
// eslint-disable-next-line @typescript-eslint/no-var-requires
// import users from './users.json';


const PORT = process.env.PORT ?? 3000
dotenv.config();

// const dataJson = fs.readFileSync("src/data/users.json", { encoding: "utf-8" });
// const users = JSON.parse(dataJson);

// create a server object:
const server = http.createServer((req: any, res: any) => {
    // req.users = users
    switch (req.method) {
        case "GET":
            getReq(req, res);
            break;
        case "POST":
            postReq(req, res);
            break;
        // case "PUT":
        //     putReq(req, res);
        //     break;
        // case "DELETE":
        //     deleteReq(req, res);
        //     break;
    
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