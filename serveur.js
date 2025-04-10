require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER, 
    pass: process.env.GMAIL_PASS,
  },
});

app.post('/send-email', async (req, res) => {
  const { PRENOM, NOM, EMAIL, TEL } = req.body;

  try {
    await transporter.sendMail({
      from: `"Souley" <${process.env.GMAIL_USER}>`,
      to: 'souleydse@gmail.com',
      subject: 'Un nouvel intéressé 🥳',
      html: `
        <p>Bonjour YYSA,</p>
        <p>Une nouvelle personne s'intéresse à l'assoc.</p>
        <p><b>Prénom</b> : ${PRENOM}</p>
        <p><b>Nom</b> : ${NOM}</p>
        <p><b>Mail</b> : ${EMAIL}</p>
        <p><b>Téléphone</b> : ${TEL}</p><br>
        <p>Bonne journée</p>
      `,
    });

    await transporter.sendMail({
      from: `"Souley" <${process.env.GMAIL_USER}>`,
      to: EMAIL,
      subject: `Bonjour ${PRENOM}`,
      html: `
        <p>Bonjour ${PRENOM},</p><br>
        <p>YYSA te remercie de l'intérêt que tu portes à l'association.</p>
        <p>Un de nos membres prendra contact avec toi prochainement.</p><br>
        <p>Cordialement,</p>
        <p>L'équipe YYSA</p>
      `,
    });

    res.status(200).json({ message: 'Emails envoyés avec succès' });
  } catch (error) {
    console.error('Erreur lors de l\'envoi des emails:', error);
    res.status(500).json({ message: 'Erreur lors de l\'envoi des emails' });
  }
});

app.listen(5000, () => {
  console.log('Serveur en écoute sur le port 5000');
});
