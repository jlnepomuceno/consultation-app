const express = require("express");
const cookieParser = require("cookie-parser")
const cors = require("cors");
const apiRouter = require("./src/appRoutes");

const { CreateUser, GetUser } = require('./src/appModel');

const app = express();
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(cookieParser());
app.use("/api/consult", apiRouter);

const port = 4000;
app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
})