const mongoose = require("mongoose");

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

module.exports = mongoose.models.Station || mongoose.model("Station", stationSchema);
