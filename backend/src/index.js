import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import dbConfig from "./configs/dbConfig.js";
import userRoutes from "./routes/UserRoutes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: "http://localhost:3000", // frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/v1/platform/user", userRoutes);


async function startServer(){
    try {
        await dbConfig();
        
        app.listen(PORT, () => {
          console.log(`Server is running on port ${PORT}`);
        });

    } catch (error) {
        console.log("Error starting the server:", error.message);
        process.exit(1);
    }
}

startServer();









