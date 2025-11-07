import mongoose from "mongoose";

const canchaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    tipo: {
        type: String,
        required: true,
    },
    precioHora: {
        type: Number,
        required: true,
    },
     acronimo: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    estado: {
        type: String,
        enum: ['disponible', 'ocupada', 'mantenimiento'],
        default: 'disponible'
    },
    ubicacion: {
        type: {
            direccion: { type: String, required: true },
            lat: { type: Number, required: true },
            lng: { type: Number, required: true }
        },
        required: true
    },
    fotos: {
        type: [String],
        default: []
    },
    horarioApertura: {
        type: String,
        required: true,
    },
    horarioCierre: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

export default mongoose.model('Cancha', canchaSchema);
