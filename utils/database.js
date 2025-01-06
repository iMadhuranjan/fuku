const mongoose = require("mongoose");

const MONGO_URI =
  "mongodb+srv://kushwaham709:IdAEYqUvzSZPwSVs@msrtc.u8lij.mongodb.net/?retryWrites=true&w=majority&appName=MSRTC";

const dbConnect = async () => {
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
  }
};

module.exports = dbConnect;
