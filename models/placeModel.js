import mongoose from "mongoose";
import { placeSchema } from "../schemas/placeSchema.js";

const Place = mongoose.model("Place", placeSchema);

export default Place;
