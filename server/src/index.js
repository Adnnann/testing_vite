
import mongoose from "mongoose";

import app from "./app";

const PORT = process.env.PORT || 5000;

mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/testing_vite", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.log(error);
});