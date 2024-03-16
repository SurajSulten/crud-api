import fs from "fs";

export function getUsers(req, res) {
    const dataJson = fs.readFileSync("data.json", { encoding: "utf-8" });
    const database = JSON.parse(dataJson);

    res.write(JSON.stringify({ users: database.users }));
    res.end();
}
