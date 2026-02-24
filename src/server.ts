import app from "./app";
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.NODE_ENV == 'development' ? Number(process.env.SERVER_PORT) : 3500;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
