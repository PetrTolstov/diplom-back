// Import required modules and libraries
import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import cors from "cors";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerOptions from "./swaggerOptions.json";
import { getInfoFromTahvel } from "./tahvel/auth/getInfoFromTahvel";
import { fetchEvents } from "./tahvel/schedule/get";
import { fetchGroups } from "./tahvel/group/get";
import cookieParser from "cookie-parser";

const app = express();

// Apply security measures with helmet middleware
app.use(helmet());

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Parse request bodies in JSON format
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Parse cookies using cookie-parser middleware
app.use(
    cookieParser(undefined, {
        decode: function (value) {
            return value;
        },
    })
);

// Setup Swagger UI for API documentation
const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send("Internal Server Error");
});

// Endpoint to get information from Tahvel
app.get("/tahvel", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const info = await getInfoFromTahvel(req.headers.authorization!);
        res.send(info);
    } catch (err) {
        next(err);
    }
});

// Endpoint to fetch groups
app.get("/groups", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const groups = await fetchGroups();
        res.send(groups);
    } catch (err) {
        next(err);
    }
});

// Endpoint to fetch events/schedule
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

// Set the server port
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
