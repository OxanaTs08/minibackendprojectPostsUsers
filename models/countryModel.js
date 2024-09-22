import mongoose from "mongoose";
import { countrySchema } from "../schemas/countrySchema.js";

const Country = mongoose.model("Country", countrySchema);

export default Country;
