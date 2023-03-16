import express from "express";
import connectDatabase from "./database/db.js";

import userRoute from "./routes/user.router.js";
import authRoute from "./routes/auth.route.js";
import newsRoute from "./routes/news.route.js";
import swaggerRoute from "./routes/swagger.route.js";

import dotenv from "dotenv";

const app = express();
const PORT = process.env.PORT || 8081;

dotenv.config();
connectDatabase();

app.use(express.json()); 
app.use("/users", userRoute);
app.use("/auth", authRoute);
app.use("/news", newsRoute );
app.use("/doc", swaggerRoute);

app.listen(PORT, ()=>{
    console.log("Running")
});
