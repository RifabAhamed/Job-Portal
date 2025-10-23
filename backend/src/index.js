import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import dbConfig from "./configs/dbConfig.js";
import userRoutes from "./routes/UserRoutes.js";
import CompanyRoutes from "./routes/CompanyRoutes.js";
import jobRoutes from "./routes/JobRoutes.js";
import jobApplicationRoutes from "./routes/JobApplicationRoutes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: process.env.BASE_URL, // frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/v1/platform/user", userRoutes);
app.use("/v1/platform/company", CompanyRoutes);
app.use("/v1/platform/job", jobRoutes);
app.use("/v1/platform/jobApplication", jobApplicationRoutes);


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









