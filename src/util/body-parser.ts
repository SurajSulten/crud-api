function bodyParser(request) {
    return new Promise<void>( (resolve, reject) => {
        try {
            let body = "";
            request.on("data", (chunk) => {
                body += chunk;
            });
            request.on("end", () => {
                resolve(JSON.parse(body));
            });
        } catch (err) {
            console.log(err);
            reject(err)
        }
    })
}

export default bodyParser;