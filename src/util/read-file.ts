import fs from "fs/promises";

export async function readFile(): Promise<any> {
    const dataJson = await fs.readFile("src/data/users.json", {
        encoding: "utf-8",
    });
    return JSON.parse(dataJson);
}
