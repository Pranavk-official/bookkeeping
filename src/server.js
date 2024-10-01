import "dotenv/config";
import app from "./app.js";
import connectDB from "./config/database.js";

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
