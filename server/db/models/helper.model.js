import mongoose from 'mongoose';

const helperSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    position: { type: String, required: true },
    photo: { type: String, required: true },
    teamRef: { type: mongoose.Types.ObjectId, required: true, ref: 'teams' },
    createdAt: { type: Date, default: Date.now, required: false },
});

export default mongoose.model('helpers', helperSchema);