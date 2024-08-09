import express from "express";
import { RateLimiter } from "express-rate-limiter-core";

const app = express();

const rateLimiter = new RateLimiter({
    windowMs: 15 * 60 * 1000, // ventana de 15 minutos
    maxRequests: 100, // 100 solicitudes máximo por ventana por IP
});

app.use(rateLimiter.middleware());

app.get("/", (req, res) => {
    res.send("Hello, world!");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});