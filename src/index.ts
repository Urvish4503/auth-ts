import express, { Express, json } from "express";
import cookieParser from "cookie-parser";
import router from "./routes/route";

const app: Express = express();

app.use(json());
app.use(cookieParser());

app.use("/user", router);

app.listen(8000, () => {
    console.log("Server running on port 8000");
});
