require('dotenv').config();
const express = require('express');
const cors = require('cors');
const SibApiV3Sdk = require('sib-api-v3-sdk'); 

const app = express();
app.use(express.json());
app.use(cors());

var defaultClient = SibApiV3Sdk.ApiClient.instance;
var apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;
var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

app.post('/send-email', (req, res) => {
  const { PRENOM, NOM, EMAIL, TEL } = req.body;
  let subject = `Bonjour ${PRENOM}`;
  var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  sendSmtpEmail = {
    to: [{
      email: 'souleydse@gmail.com',
      name: 'YYSA',
    }],
    sender: {
      email: 'souleydse@gmail.com', 
      name: 'souley',
    },
    subject: 'Un nouvel intéressé 🥳',
    htmlContent: 
    `<p>Bonjour YYSA,</p>
    <p>Une nouvelle personne s'intéresse à l'assoc.</p>
    <p>Voici ces coordonnées : </p><br>
    <p><b>Prénom</b> : ${PRENOM}</p>
    <p><b>Nom</b> : ${NOM}</p>
    <p><b>Mail</b> : ${EMAIL}</p>
    <p><b>Téléphone</b> : ${TEL}</p><br><br>
    <p>Bonne journée</p>
    <img src="" alt="YYSA"/>`,
  };

  // Envoi de l'email via l'API Brevo
  apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
    console.log('Email envoyé avec succès:', data);
    res.status(200).json({ message: 'Email envoyé avec succès' });
  }, function(error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'email' });
  });

  sendSmtpEmail = {
    to: [{
      email: EMAIL,
      name: PRENOM,
    }],
    sender: {
      email: 'souleydse@gmail.com', 
      name: 'souley',
    },
    subject: subject,
    htmlContent: 
    `<p>Bonjour ${PRENOM},</p><br>
    <p>YYSA te remercie de l'interêt que tu portes à l'association.</p>
    <p>Un de nos membres prendra contact avec toi prochainement.</p>
    <p>A toute</p><br><br>
    <p>Cordialement,</p>
    <p>L'équipeYYSA</p>`,
  };
  apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
    console.log('Email envoyé avec succès:', data);
  }, function(error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
  });
});

// Lancer le serveur
app.listen(5000, () => {
  console.log('Serveur en écoute sur le port 5000');
});
