import express from "express";
import dotenv from "dotenv";
import logger from "./utils/logger.js";
dotenv.config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to handle CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

// Middleware to handle URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Middleware to handle static files
app.use(express.static("public"));

// Middleware to log requests
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleDateString()}] ${req.method} ${req.originalUrl} - ${res.statusCode}`);
    logger.info(`${req.method} ${req.originalUrl}`);-
    next();
});

// ✅ Define routes before 404 and error handling
app.get("/api/test", (req, res) => {
    res.json({ message: "API is working!" });
});

// Middleware to handle 404 errors
app.use((_, res) => {
    res.status(404).send("Not Found");
});

// Error logging middleware (only once)
app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).send("Something broke!");
});

// Start the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`${process.env.NODE_ENV} server is running on port ${PORT}`);
});
export default app;