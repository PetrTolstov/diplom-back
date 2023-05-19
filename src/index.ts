import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import cors from "cors";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerOptions from "./swaggerOptions.json";
import { getInfoFromTahvel } from "./tahvel/auth/authInit";
import { fetchEvents } from "./tahvel/schedule/get";
import { fetchGroups } from "./tahvel/group/get";
import cookieParser from "cookie-parser";

const app = express();
app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
    cookieParser(undefined, {
        decode: function (value) {
            // Ваша логика расшифровки httpOnly куки, если она требуется
            return value;
        },
    })
);

// Swagger UI setup
const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send("Internal Server Error");
});

app.post("/", (req, res) => {
    res.json({ message: "Куки успешно обработаны" });
});

app.get("/tahvel", async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.headers.authorization)
        const info = await getInfoFromTahvel(req.headers.authorization!);
        res.send(info);
    } catch (err) {
        next(err);
    }
});

app.get("/groups", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const groups = await fetchGroups();
        res.send(groups);
    } catch (err) {
        next(err);
    }
});

app.get(
    "/schedule",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const groups = await fetchEvents(
                req.body.groupId,
                req.body.fromDate,
                req.body.toDate
            );
            res.send(groups);
        } catch (err) {
            next(err);
        }
    }
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
