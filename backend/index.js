import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser";

import User from "./routes/User.js"
import Listing from "./routes/Listing.js"
import Catagory from "./routes/Catagory.js";
dotenv.config({
    path:'./config/.env'
})
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log("MongoDB connection error: ", error));

app.get("/",(req,res) =>{
    res.send("server is running");
});

app.use("/user",User);
app.use("/listing",Listing)
app.use("/catagory",Catagory)

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`sever running on port ${PORT}`);
})
