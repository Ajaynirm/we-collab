import app from "./src/server.js";
import dotenv from "dotenv";

dotenv.config()

const port=process.env.PORT || 6000;
console.log(port)
app.listen(port, () => console.log(`Server running..on port ${port}`));
