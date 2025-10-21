import Cancha from "../models/cancha.model.js";

export const getCanchas = async (req, res) => {
    const canchas = await Cancha.find()
    res.json(canchas);
};

export const createCancha = async (req, res) => {
    const { nombre, tipo, precioHora, estado } = req.body;
    const nuevaCancha = new Cancha ({
        nombre,
        tipo,
        precioHora,
        estado
    });
    const savedCancha = await nuevaCancha.save();
    res.json(savedCancha);
};

export const getCancha = async (req, res) => {
    const Cancha = await Cancha.findById(req.params.id)
    if (!Cancha) return res.status(404).json({ message: "Cancha no encontrada" });
    res.json(Cancha);
};


export const deleteCancha = async (req, res) => {
    const Cancha = await Cancha.findByIdAndDelete(req.params.id)
    if (!Cancha) return res.status(404).json({ message: "Cancha no encontrada" })
    res.json(Cancha);
};

export const updateCancha = async (req, res) => {
    const Cancha = await Cancha.findByIdAndUpdate(req.params.id, req.body, { 
        new: true 
    })
    if (!Cancha) return res.status(404).json({ message: "Cancha no encontrada" })
    res.json(Cancha);
};

