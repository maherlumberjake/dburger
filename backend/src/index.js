import express from "express";
const app = express();
import dotenv from "dotenv";
import bodyParser from 'body-parser'
dotenv.config();
import mongoose from "mongoose";
import userrouter from "./routes/usersRoute.mjs";
import burgerrouter from "./routes/burgerRoute.mjs";

import cookieParser from 'cookie-parser'
import cors from 'cors'
app.use(bodyParser.json({ limit: "2mb" }))
app.use(cors({ credentials: true, origin: true }));

app.use(express.json());
app.use(cookieParser(process.env.SERCRET_STR))

app.use("/api/v1/", userrouter);
app.use("/api/v1/menu", burgerrouter);
const PORT = process.env.PORT || 4200;
mongoose
	.connect(process.env.CON_STR)
	.then(() => {
		console.log("db connected");
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	})
	.catch((err) => {
		console.log(err);
	});
