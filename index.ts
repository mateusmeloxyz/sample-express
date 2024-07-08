import { routeHello, routeAPINames, routeWeather } from './routes.js';
import express, { Request, Response } from "express";

import path from "path";

const server = express();
const port = 3000;

server.get('/hello', function (_req: Request, res: Response): void {
	const response = routeHello();
	res.send(response);
});

server.get("/api/names",
	async function (_req: Request, res: Response): Promise<void> {
		let response: string;
		try {
			response = await routeAPINames();
			res.send(response);
		} catch (err) {
			console.log(err);
		}
	}
);

// Should the endpoint bellow be async? https://expressjs.com/en/advanced/best-practice-performance.html#dont-use-synchronous-functions
// Probably in a real world cenario. But since the code bellow has a fixed return value, it may not need to be async
server.get(
	"/api/weather/:zipcode",
	function (req: Request, res: Response): void {
		const response = routeWeather({ zipcode: req.params.zipcode });
		res.send(response);
	}
);

server.get("/components/weather", function(_req: Request, res: Response): void{
	const filePath = path.join(process.cwd(), "public", "weather.html");
	res.setHeader("Content-Type", "text/html");
	res.sendFile(filePath);
})

server.listen(port, function (): void { 
	console.log('Listening on ' + port);
});