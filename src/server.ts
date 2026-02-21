import app from "./app";
import dotenv from 'dotenv';

dotenv.config();

const PORT = Number(process.env.NODE_ENV) | 3500;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
