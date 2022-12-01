const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

// --------------------------------- import routers files ---------------------------------
const adminRouter = require('./routes/index');

// --------------------------------- initialize app ---------------------------------
const app = express();

// --------------------------------- Logging Middleware ---------------------------------
app.use(morgan("dev"));

// --------------------------------- body parser setup ---------------------------------
app.use(express.json());

// --------------------------------- CORS config---------------------------------
app.use(cors());

//  --------------------------------- main route setup ---------------------------------
app.use("/api/v1/admin/", adminRouter);
app.use(errorHandler);

// --------------------------------- Express App setup ---------------------------------
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, async () => {
    await connectDB();
    console.log(
        `Server is running on PORT: ${PORT}`
    );
});

// --------------------------------- Handle unhandled Promise rejections ---------------------------------
process.on("unhandledRejection", (err) => {
    console.log(chalk.bold.redBright(`Error: ${err.message}`));
    console.log(err);
    server.close(() => {
        console.log(
            "Server closed due to unhandled promise rejection"
        );
        process.exit(1);
    });
});
