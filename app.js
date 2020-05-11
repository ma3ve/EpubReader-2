const express = require("express");
const userRouter = require("./routes/userRouter");
const app = express();
const path = require("path");

if (process.env.NODE_ENV) {
    require("dotenv").config({
        path: "./config/config.env",
    });
}

require("./dbconnect");

app.use(require("body-parser").json());
app.use(require("body-parser").urlencoded({ extended: true }));
app.use(require("morgan")(process.env.NODE_ENV));
app.use(userRouter);
app.use(require("./routes/themeroutes"));

app.use(require("./routes/uploadRoute"));

if (production.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`app is listening on port ${PORT}`);
});
