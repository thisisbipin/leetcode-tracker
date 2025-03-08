import express from "express";
import cors from "cors";
import getDataOfUser from "./getDataOfUser.js";

const app = express();
app.use(cors());
const port = 3000;

app.use(express.static("../frontend/dist/"));
app.use("/v1", express.static("public/"));

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/track/:profile", async function (req, res) {
    let response_from_getdata = await getDataOfUser(req.params.profile);
    if (response_from_getdata.name != "404 NOT FOUND")
        console.log("=> Gave data for profile: ", req.params.profile);
    else
        console.log(
            "=> Data for given profile not found: ",
            req.params.profile
        );

    res.send(response_from_getdata);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
