const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// MongoDB Connection
const MONGO_URI =
    "mongodb+srv://kushwaham709:IdAEYqUvzSZPwSVs@msrtc.u8lij.mongodb.net/?retryWrites=true&w=majority&appName=MSRTC";
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once("open", () => console.log("Connected to MongoDB"));

// Mongoose Schema
const ticketPriceSchema = new mongoose.Schema({
    standard: { type: String, default: null },
    discounted: { type: String, default: null },
});

const recordSchema = new mongoose.Schema({
    source: { type: String },
    destination: { type: String },
    departure_times: { type: [String] },
    bus_stops: { type: [String] },
    ticket_price: { type: ticketPriceSchema },
});

const stationSchema = new mongoose.Schema({
    station: { type: String, required: true },
    number: { type: Number },
    records: { type: [recordSchema], required: true },
});

const Station = mongoose.model("Station", stationSchema);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/stations", async (req, res) => {
    try {
        const stationNames = await Station.distinct("station");
        res.status(200).json({ success: true, data: stationNames });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to fetch station names" });
    }
});

app.get("/station/:name", async (req, res) => {
    const { name } = req.params;
    try {
        const stationData = await Station.findOne({
            station: { $regex: `^${name}$`, $options: "i" },
        }).lean();

        if (!stationData) {
            return res.status(404).json({ success: false, message: "Station not found" });
        }

        res.status(200).json({ success: true, data: stationData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to fetch station data" });
    }
});

export default app;