import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema({
    id: { type: String, required: true },
    teamName: { type: String, required: true },
    colors: {
        type: Object,
        required: true,
        properties: {
            primary: { type: String, required: true },
            background: { type: String, required: true },
        },
    },
});

export default mongoose.model("teams", TeamSchema);
