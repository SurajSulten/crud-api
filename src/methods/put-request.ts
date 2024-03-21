/* eslint-disable @typescript-eslint/no-unsafe-argument */
import fs  from 'fs';
import requestBodyParser from '../util/body-parser'
import writeToFile from '../util/write-to-file';

export async function putReq(req: any, res:any): Promise<void> {
    const baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
    const id = req.url.split("/")[3];
    // const regexV4 = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i); 
    const regexV4 = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
    if(!regexV4.test(id)) {
        res.writeHead(400, {"Content-type": "application/json"});
        res.end(JSON.stringify({title: "Validation failed", message: 'Not valid uuid'}))
    } else if(baseUrl === "/api/users/" && regexV4.test(id)) {
        try {
            // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
            const body = await requestBodyParser(req);
            const dataJson = fs.readFileSync("src/data/users.json", { encoding: "utf-8" });
            const users = JSON.parse(dataJson);
            const index = users.findIndex((user: { id: any; }) => {
                return user.id === id
            });
            if(index === -1) {
                res.statusCode = 404;
                res.write(JSON.stringify({title: "Not found", message: 'User not found'}));
                res.end();
            } else {
                req.users[index] = {id, ...body};
                writeToFile(req.users)
                res.writeHead(200, {"Content-type": "application/json"})
                res.end(JSON.stringify(req.users[index]))
            }
        } catch (err) {
            res.writeHead(400, {"Content-type": "application/json"});
            res.end(JSON.stringify({title: "Validation failed", message: 'Request body is not valid'}))
        }
    } else {
        res.writeHead(404, {"Content-type": "application/json"});
        res.end(JSON.stringify({title: "Not found", message: 'Route not found'}))
    }
}