async function bodyParser(request: any): Promise<any>  {
    await new Promise<void>( (resolve, reject) => {
        try {
            let body = "";
             request.on("data", (chunk: string) => {
                body += chunk;
            });
            request.on("end", () => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            resolve(JSON.parse(body));
            });
        } catch (err) {
            console.log(err);
            reject(err)
        }
    });
}

export default bodyParser;