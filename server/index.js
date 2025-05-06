
import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import cors from "cors"
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import commentRoutes from "./routes/comment.route.js";
import ConnectDB from "./lib/connectDB.js";




const PORT = process.env.PORT || 5000;


app.use(cookieParser());


app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



const allowedOrigins = ["http://localhost:3000", "http://localhost:5173","http://localhost:5174", "https://blog-app-client-beryl.vercel.app/"];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); 
      } else {
        callback(new Error("Not allowed by CORS")); 
      }
    },
    credentials: true,
  })
);


app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);


app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message || "Something went wrong.",
    status: error.status,
    stack: error.stack,
  });
});

app.listen(PORT, () => {
  ConnectDB();
  console.log(`Server is running on PORT ${PORT}`);
});

export default app;
