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

    res.setHeader("Content-type", "application/json");  

    console.log(req.url);
   
}); 

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    
})