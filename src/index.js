import express from 'express';
import gamesRoutes from "./routes/games.routes.js"
import categoriesRoutes from "./routes/categories.routes.js"
import customersRoutes from "./routes/customers.routes.js"
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());
app.use(gamesRoutes);
app.use(categoriesRoutes);
app.use(customersRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running in port ${port}`));