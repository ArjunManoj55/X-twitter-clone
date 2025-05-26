import express from "express";
import dotenv from "dotenv"

import authRoutes from "./routes/auth.routes.js";
import connectMongoDB from "./db/connectMongoDB.js";

const app = express();

//envaccess
dotenv.config()
// console.log(process.env.MONGO_URI); DOSENT REQUIRE HERE
const PORT = process.env.PORT

//middleware
app.use(express.json());

//routes
app.use("/api/auth",authRoutes);


app.listen(PORT, ()=> {
    console.log("server on 8000")
    connectMongoDB();
});

//ON-PROGRESS

//signup auth controller
//jwt
//need to be tested with postman