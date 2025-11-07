import mongoose from "mongoose";

const reservaSchema = new mongoose.Schema({
    fecha: {
        type: Date,
        default: Date.now,
    },
    horaInicio: {
        type: String,
        required: true
    },
    horaFin: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    estado: {
        type: String,
        enum: ['pendiente', 'confirmada', 'cancelada'],
        default: 'confirmada'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cancha: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cancha',
        required: true
    }
},
{
    timestamps: true
});

export default mongoose.model('Reserva', reservaSchema);
