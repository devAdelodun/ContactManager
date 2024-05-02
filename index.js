import express from "express";
import dotenv from "dotenv";
import contactRouter from "./routers/contactRouter.js"
import userRouter from "./routers/userRouter.js";
import connectDb from "./config/dbConnection.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config()
connectDb();
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/contacts", contactRouter);
app.use("/api/users", userRouter);
app.use(errorHandler);


app.listen(port, () => console.log(`Server listening on port ${port}`))