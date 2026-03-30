import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("API funcionando");
});

app.listen(port, () => {
    console.log("Server running on http://localhost:3000");
});