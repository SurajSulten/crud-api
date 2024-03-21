import requestBodyParser from "../util/body-parser";
import { readFile } from "../util/read-file";
import writeToFile from "../util/write-to-file";
import crypto from "crypto";
export async function postReq(req: any, res: any): Promise<void> {
    if (req.url === "/api/users") {
        try {
            const users = await readFile();
            console.log(users);

            // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
            const body = await requestBodyParser(req);
            const id = crypto.randomUUID();
            users.push({ ...body, id });
            writeToFile(users);
            res.writeHead(201, { "Content-type": "application/json" });
            res.end();
        } catch (err) {
            res.writeHead(404, { "Content-type": "application/json" });
            res.end(
                JSON.stringify({
                    title: "Validation failed",
                    message: "Request body is not valid",
                })
            );
        }
    }
}
