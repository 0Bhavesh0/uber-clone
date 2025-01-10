import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRouter from "./routes/user.routes.js";
import captainRouter from "./routes/captian.routes.js";

const app = express()
app.use(cors())
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser())



app.get("/", (req, res) => {
    res.send("Hello World")
})

//routes
app.use("/users", userRouter)
app.use("/captains", captainRouter)





export default app