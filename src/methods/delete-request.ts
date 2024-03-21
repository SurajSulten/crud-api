/* eslint-disable @typescript-eslint/no-unsafe-argument */
import writeToFile from "../util/write-to-file";

export function deleteReq(req: any, res: any): void {
    const baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
    const id = req.url.split("/")[3];
    // const regexV4 = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i); 
    const regexV4 = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i

    if(!regexV4.test(id)) {
        res.writeHead(400, {"Content-type": "application/json"});
        res.end(JSON.stringify({title: "Validation failed", message: 'Not valid uuid'}))
    } else if(baseUrl === "/api/users/" && regexV4.test(id)) {
        const index = req.users.findIndex((user: { id: any; }) => {
            return user.id === id
        });
        if(index === -1) {
            res.statusCode = 404;
            req.write(JSON.stringify({title: "Not found", message: 'User not found'}));
            res.end();
        } else {
            req.users.splice(index, 1);
            writeToFile(req.users);
            res.writeHead(204, {"Content-type": "application/json"});
            res.end(JSON.stringify(req.users));
        }
    } else {
        res.writeHead(404, {"Content-type": "application/json"});
        res.end(JSON.stringify({title: "Not found", message: 'Route not found'}))
    }
}

