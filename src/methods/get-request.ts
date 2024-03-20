import fs  from 'fs';

export function getReq(res: any, req: any): void {
    const dataJson = fs.readFileSync("src/data/users.json", { encoding: "utf-8" });
    const data = JSON.parse(dataJson);
    const baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
    const id = req.url.split("/")[3];
    // const regexV4 = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i); 
    const regexV4 = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    if(req.url === "/api/users") {
        res.statusCode = 200;
        res.setHeader("Content-type", "application/json");
        req.write(JSON.stringify({ users: data.users }));
        res.end();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    } else if(!regexV4.test(id)) {
        res.writeHead(400, {"Content-type": "application/json"});
        res.end(JSON.stringify({title: "Validation failed", message: 'Not valid uuid'}))
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    } else if(baseUrl === "/api/users/" && regexV4.test(id)) {
        res.statusCode = 200;
        res.setHeader("Content-type", "application/json");
        const filteredUser = req.users.filter((user: { id: any; }) => {
            return user.id === id
        })
        if(filteredUser.length > 0) {
            res.statusCode = 200;
            req.write(JSON.stringify(filteredUser));
            res.end();
        } else {
            res.statusCode = 404;
            req.write(JSON.stringify({title: "Not found", message: 'User not found'}));
            res.end();
        }
    } else {
        res.writeHead(404, {"Content-type": "application/json"});
        res.end(JSON.stringify({title: "Not found", message: 'Route not found'}))
    }
}