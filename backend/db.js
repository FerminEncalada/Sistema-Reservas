import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost/SistemaReservasDB");
        console.log(">> DB connected");
    } catch (error) {
        console.log(error);
    }
};