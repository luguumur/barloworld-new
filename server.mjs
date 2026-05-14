import { createServer } from "https";
import { readFileSync } from "fs";
import { parse } from "url";
import next from "next";

const app = next({ dev: false });
const handle = app.getRequestHandler();

const httpsOptions = {
	key: readFileSync("./certificates/localhost-key.pem"),
	cert: readFileSync("./certificates/localhost.pem"),
};

app.prepare().then(() => {
	createServer(httpsOptions, (req, res) => {
		const parsedUrl = parse(req.url, true);
		handle(req, res, parsedUrl);
	}).listen(3000, () => {
		console.log("> Ready on https://localhost:3000");
	});
});
