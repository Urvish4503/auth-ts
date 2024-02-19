import express, { Express, Request, Response, NextFunction, json } from 'express';

const app: Express = express();

app.use(json());

app.listen(8000, () => {
	console.log('Server running on port 8000');
});
