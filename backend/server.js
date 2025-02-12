require('dotenv').config();
const express = require("express");
const authRoutes = require("./routes/authRoute");
const detailsRoutes = require("./routes/detailsRoute");
const adminRoutes = require("./routes/adminRoute")
const userRoutes = require("./routes/userRoute")
const doctorRoutes= require("./routes/doctorRoute")
const healthOrgRoutes = require("./routes/healthOrgRoute")
const tempRoutes=require("./routes/temproute")
const contactRoutes = require('./routes/ContactRoute.js');
const cookieParser = require("cookie-parser");
const cors = require("cors")


const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: ["http://localhost:5173", "https://curenest.vercel.app"],  
  credentials: true,
}));


app.use("/admin",adminRoutes)
app.use("/healthorg",healthOrgRoutes)
app.use("/user",userRoutes)
app.use("/auth", authRoutes);
app.use("/details", detailsRoutes);
app.use("/doctor",doctorRoutes);
app.use("/temp",tempRoutes);
app.use("/api",contactRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
