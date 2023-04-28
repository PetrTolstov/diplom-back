
import express, { Request, Response } from "express";
const cors = require('cors')
const bodyParser = require('body-parser');


const app = express();
app.use(cors)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
  });
  
  app.listen(3000, () => {
    console.log("Server started on port 3000");
  });