const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

//Init Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("./uploads", express.static("uploads"));

app.get("/", (req, res) => res.send("API Running"));

//Define Routes
// app.use("/api/users", require("./routes/api/users"));
app.use("/api/login", require("./routes/api/login"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/customer-rep", require("./routes/api/customer-rep"));
app.use("/api/load", require("./routes/api/load"));
app.use("/api/customer", require("./routes/api/customer"));
app.use("/api/operations-team", require("./routes/api/operations-team"));

const PORT = process.env.PORT || 5000;

// Connect database
connectDB().then(() => {
  app.listen(PORT, () => console.log(`server started on port ${PORT}`));
});
