import fs from 'fs'
import path from 'path'

function writeToFile(data: any): void {
    try {
        fs.writeFileSync(path.join(__dirname, "..", "data", "users.json"), JSON.stringify(data), "utf-8")
    } catch (err) {
        
    }
}

export default writeToFile;