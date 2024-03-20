import requestBodyParser from '../util/body-parser'
import writeToFile from '../util/write-to-file';
import crypto from 'crypto'
export async function postReq (res, req): void{
    if(req.url === "/api/users") {
        try {
            const body = await requestBodyParser(req);
            body.id = crypto.randomUUID();
            req.users.push(body);
            writeToFile(req.users);
            res.writeHead(201, {"Content-type": "application/json"});
            res.end(); 
        } catch (err) {
            res.writeHead(404, {"Content-type": "application/json"});
            res.end(JSON.stringify({title: "Validation failed", message: 'Request body is not valid'}))
        }
    }
}