import express from "express";
import bodyParser from "body-parser";
import router from "./router/router.js";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use("/static", express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", router);

const PORT = 9300;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
