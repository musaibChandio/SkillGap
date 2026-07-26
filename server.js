import dotenv from "dotenv";

import app from "./src/app";


dotenv.config();
app.listen(4000, () => {
    console.log("Server is running on port 4000");
});