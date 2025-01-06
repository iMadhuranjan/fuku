const dbConnect = require("../utils/database");
const Station = require("../models/StationSchema");

module.exports = async (req, res) => {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const stationNames = await Station.distinct("station"); // Get all station names
      res.status(200).json({ success: true, data: stationNames });
    } catch (error) {
      console.error("Error fetching station names:", error);
      res.status(500).json({ success: false, message: "Failed to fetch station names" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
};
