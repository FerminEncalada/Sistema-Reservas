import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendMail = async (req, res) => {
  const { email, nombre, cancha, fecha, hora } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false, // Esto evita el error de certificado
      },
    });

    const mailOptions = {
      from: `"Reserva Deportiva" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Confirmación de reserva",
      html: `
        <h2>Hola ${nombre}!</h2>
        <p>Tu reserva se ha confirmado correctamente:</p>
        <ul>
          <li><strong>Cancha:</strong> ${cancha}</li>
          <li><strong>Fecha:</strong> ${fecha}</li>
          <li><strong>Hora:</strong> ${hora}</li>
        </ul>
        <p>¡Gracias por usar nuestro sistema de reservas!</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "✅ Correo enviado correctamente" });
  } catch (error) {
    console.error("❌ Error al enviar correo:", error);
    res.status(500).json({ error: "Error al enviar el correo" });
  }
};
