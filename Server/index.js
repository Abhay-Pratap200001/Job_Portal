import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from 'cors'


import { connectDB } from "./utils/dbConnect.js";
import { errorHandler } from "./middleware/error.middleware.js";
import userRoute from './routes/user.route.js'
import companyRoute from './routes/company.route.js'
import jobRoute from './routes/job.route.js'




dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json({ limit: "10mb" })); // allows you to parse the body of the request
app.use(cookieParser());
app.use(cors({
    origin:'http//localhost:5173',
    credentials:true
}))

//  Error handler 
app.use(errorHandler);

app.use("/api/v1/user", userRoute)
app.use("/api/v1/comapny", companyRoute)
app.use("/api/v1/job", jobRoute)




// Connect DB and start server
connectDB().then(() => {
    const server = app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`);
    });

    // Handle runtime errors gracefully
    server.on("error", (error) => {
      console.error("❌ Server Error:", error);
      process.exit(1);
    });
  }).catch((error) => {
    console.error("❌ MongoDB Connection Failed:", error);
    process.exit(1);
  });


