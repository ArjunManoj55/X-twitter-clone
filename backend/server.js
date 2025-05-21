import express from "express";

const app = express();

app.get("/",(req,res) => {
    res.send("ready");
});

app.listen(8000, ()=> {
    console.log("server on 8000")
});