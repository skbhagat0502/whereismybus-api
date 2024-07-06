import mongoose from "mongoose";

import { Schema } from "mongoose";

const IntermediateStopSchema = new Schema({
  stationName: String,
  arrivalTime: String,
  departureTime: String,
});

const RouteSchema = new Schema({
  startingStation: { type: String, required: true },
  endingStation: { type: String, required: true },
  intermediateStops: [IntermediateStopSchema],
});

const ScheduleSchema = new Schema({
  day: String,
  departureTime: String,
  arrivalTime: String,
});

const FareTypesSchema = new Schema({
  type: String,
  amount: Number,
});

const FareSchema = new Schema({
  startingToEnding: { type: Number, required: true },
  intermediateFares: Map,
  fareTypes: { type: [FareTypesSchema], required: true },
});

const AdditionalInfoSchema = new Schema({
  operatorName: String,
  contact: { type: String, required: true },
  amenities: [String],
});

const BusSchema = new Schema(
  {
    busName: { type: String, required: true },
    busNumber: { type: String, required: true },
    busType: { type: String, required: true },
    route: { type: RouteSchema, required: true },
    schedule: { type: [ScheduleSchema], required: true },
    fare: { type: FareSchema, required: true },
    additionalInfo: AdditionalInfoSchema,
  },
  { timestamps: true }
);

const Bus = mongoose.model("Bus", BusSchema);

export default Bus;
