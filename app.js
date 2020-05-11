const express = require("express");
const userRouter = require("./routes/userRouter");
const app = express();

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({
        path: "./config/config.env",
    });
    app.use(require("morgan")(process.env.NODE_ENV));
}
//
require("./dbconnect");

app.use(require("body-parser").json());
app.use(require("body-parser").urlencoded({ extended: true }));
app.use(userRouter);
app.use(require("./routes/themeroutes"));

app.use(require("./routes/uploadRoute"));

if (process.env.NODE_ENV === "production") {
    app.use(express.static("/client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`app is listening on port ${PORT}`);
});
