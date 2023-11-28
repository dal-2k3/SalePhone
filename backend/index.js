const express = require('express')
const { sequelize } = require('./src/models/index')
const dotenv = require("dotenv");
const cors = require('cors')
const rootRouter = require("./src/routers/index")

dotenv.config();
const app = express()
app.use(express.json());

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

app.use("/api/v1", rootRouter);
app.use('/uploads', express.static('uploads'));
try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}
const PORT = process.env.PORT || 8000;
app.listen(PORT, (req, res) => {
    console.log(`App is running on port:${PORT}`);
})