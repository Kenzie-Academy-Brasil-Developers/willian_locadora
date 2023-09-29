import "dotenv/config"
import express, { Application } from "express";
import { startDatabase } from "./database";
import logics from "./logics";
import middlewares from "./middlewares";

const app: Application = express();
app.use(express.json())

app.post("/movies",middlewares.nameExists, logics.create)
app.get("/movies",logics.read)
app.use("/movies/:id", middlewares.idExists, middlewares.nameExists)
app.get("/movies/:id", logics.retrieve)
app.patch("/movies/:id", logics.partialUpdate)
app.delete("/movies/:id", logics.destroy)

const PORT: number = 3000
app.listen(PORT, async(): Promise<void> => {
    await startDatabase();
    console.log(`App is running on port ${PORT}`)
})