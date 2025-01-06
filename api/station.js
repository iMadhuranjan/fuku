const dbConnect = require("../utils/database");
const Station = require("../models/StationSchema");

module.exports = async (req, res) => {
  await dbConnect();

  const { name } = req.query; // Extract station name from query string

  if (req.method === "GET") {
    try {
      const stationData = await Station.findOne({
        station: { $regex: `^${name}$`, $options: "i" },
      }).lean();

      if (!stationData) {
        return res.status(404).json({ success: false, message: "Station not found" });
      }

      res.status(200).json({ success: true, data: stationData });
    } catch (error) {
      console.error("Error fetching station data:", error);
      res.status(500).json({ success: false, message: "Failed to fetch station data" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
};
