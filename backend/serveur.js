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

// ===== NEWSLETTER EMAIL =====
app.post('/send-newsletter-email', async (req, res) => {
  const { PRENOM, NOM, EMAIL } = req.body;

  try {
    // Email au client
    await transporter.sendMail({
      from: `"YYSA - Yeewu Yittel Sunu Askan" <${process.env.GMAIL_USER}>`,
      to: EMAIL,
      subject: '🎉 Bienvenue dans notre newsletter YYSA',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f7f3; }
            .header { background: linear-gradient(135deg, #734D12 0%, #C36940 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: white; padding: 30px; }
            .footer { background: #f5f0eb; padding: 20px; text-align: center; font-size: 12px; color: #999; border-radius: 0 0 10px 10px; }
            .highlight { color: #C36940; font-weight: bold; }
            .social-links { margin-top: 20px; }
            .social-links a { color: #734D12; text-decoration: none; margin: 0 10px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Bienvenue à YYSA ! 👋</h1>
            </div>
            <div class="content">
              <p>Bonjour <span class="highlight">${PRENOM}</span>,</p>
              <p>Merci de vous être inscrit à notre newsletter ! Vous faites désormais partie de notre communauté YYSA (Yeewu Yittel Sunu Askan).</p>
              
              <h2 style="color: #734D12;">Ce que vous attendre :</h2>
              <ul>
                <li>📢 Les dernières actualités de nos actions sociales</li>
                <li>📅 Les événements à ne pas manquer</li>
                <li>🌟 Les témoignages et réussites de notre association</li>
                <li>💪 Les appels à contributions et bénévolats</li>
              </ul>
              
              <p>Nous vous remercions pour votre intérêt envers nos missions : <strong>Éducation, Santé, Environnement et Autonomisation des Femmes</strong>.</p>
              
              <p>Si vous avez des questions, n'hésitez pas à nous contacter directement.</p>
              
              <div class="social-links">
                <p>Suivez-nous sur :</p>
                <a href="https://www.instagram.com/yysa.association">Instagram</a> | 
                <a href="https://www.facebook.com/share/16VNnho2zD/">Facebook</a>
              </div>
            </div>
            <div class="footer">
              <p>© 2024 YYSA - Yeewu Yittel Sunu Askan | Sénégal</p>
              <p>Email: yeewuyittelsunuaskan@gmail.com | WhatsApp: +221 77 777 35 30</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    // Email à l'admin
    await transporter.sendMail({
      from: `"YYSA - Newsletter" <${process.env.GMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: '📧 Nouvelle inscription newsletter',
      html: `
        <h2>Nouvelle inscription à la newsletter</h2>
        <table style="border-collapse: collapse; width: 100%; margin-top: 20px;">
          <tr>
            <td style="border: 1px solid #ddd; padding: 10px; font-weight: bold; background: #f5f5f5;">Prénom :</td>
            <td style="border: 1px solid #ddd; padding: 10px;">${PRENOM}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 10px; font-weight: bold; background: #f5f5f5;">Nom :</td>
            <td style="border: 1px solid #ddd; padding: 10px;">${NOM}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 10px; font-weight: bold; background: #f5f5f5;">Email :</td>
            <td style="border: 1px solid #ddd; padding: 10px;"><a href="mailto:${EMAIL}">${EMAIL}</a></td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 10px; font-weight: bold; background: #f5f5f5;">Date :</td>
            <td style="border: 1px solid #ddd; padding: 10px;">${new Date().toLocaleDateString('fr-FR')}</td>
          </tr>
        </table>
      `,
    });

    res.status(200).json({ message: 'Emails newsletter envoyés avec succès' });
  } catch (error) {
    console.error('Erreur lors de l\'envoi des emails newsletter:', error);
    res.status(500).json({ message: 'Erreur lors de l\'envoi des emails' });
  }
});

// ===== NEW MEMBER EMAIL =====
app.post('/send-new-member-email', async (req, res) => {
  const { PRENOM, NOM, EMAIL, TEL } = req.body;

  try {
    // Email au client
    await transporter.sendMail({
      from: `"YYSA - Yeewu Yittel Sunu Askan" <${process.env.GMAIL_USER}>`,
      to: EMAIL,
      subject: '✅ Merci pour votre adhésion à YYSA !',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f7f3; }
            .header { background: linear-gradient(135deg, #734D12 0%, #C36940 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: white; padding: 30px; }
            .footer { background: #f5f0eb; padding: 20px; text-align: center; font-size: 12px; color: #999; border-radius: 0 0 10px 10px; }
            .highlight { color: #C36940; font-weight: bold; }
            .mission-box { background: #f5f0eb; padding: 15px; border-left: 4px solid #C36940; margin: 15px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Bienvenue chez YYSA ! 🎉</h1>
            </div>
            <div class="content">
              <p>Bonjour <span class="highlight">${PRENOM}</span>,</p>
              <p>Nous sommes ravis de vous accueillir en tant que nouveau membre de <strong>YYSA (Yeewu Yittel Sunu Askan)</strong> !</p>
              
              <h2 style="color: #734D12;">Prochaines étapes :</h2>
              <p>Un de nos membres de l'équipe va très bientôt vous contacter pour :</p>
              <ul>
                <li>Vous présenter les différents domaines d'action</li>
                <li>Discuter de vos compétences et vos intérêts</li>
                <li>Vous intégrer dans les activités qui vous correspondent</li>
                <li>Répondre à toutes vos questions</li>
              </ul>
              
              <h2 style="color: #734D12;">Nos domaines d'action :</h2>
              <div class="mission-box">
                <strong>🎓 Éducation</strong><br>
                Distribution de kits scolaires, cours de renforcement, parrainage d'élèves
              </div>
              <div class="mission-box">
                <strong>💚 Santé</strong><br>
                Campagnes de sensibilisation, dépistages gratuits, accompagnement vers soins
              </div>
              <div class="mission-box">
                <strong>🌍 Environnement</strong><br>
                Journées Set Setal, sensibilisation à l'hygiène et l'écologie
              </div>
              <div class="mission-box">
                <strong>👩 Autonomisation des Femmes</strong><br>
                Espaces d'échange, formation, création d'opportunités
              </div>
              
              <p style="margin-top: 25px; color: #999;">En attendant, vous pouvez nous suivre sur nos réseaux sociaux pour rester informé de nos activités.</p>
            </div>
            <div class="footer">
              <p>© 2024 YYSA - Yeewu Yittel Sunu Askan | Sénégal</p>
              <p>Email: yeewuyittelsunuaskan@gmail.com | WhatsApp: +221 77 777 35 30</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    // Email à l'admin avec toutes les infos
    await transporter.sendMail({
      from: `"YYSA - Adhésions" <${process.env.GMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: '👤 Nouvelle adhésion YYSA',
      html: `
        <h2>Nouvelle adhésion à YYSA</h2>
        <p style="color: #666; margin-bottom: 20px;">Un nouveau membre vient de s'inscrire. Veuillez le contacter rapidement pour l'accueillir.</p>
        
        <table style="border-collapse: collapse; width: 100%; margin-top: 20px; border: 1px solid #ddd;">
          <tr>
            <td style="border: 1px solid #ddd; padding: 12px; font-weight: bold; background: #734D12; color: white;">Prénom :</td>
            <td style="border: 1px solid #ddd; padding: 12px;">${PRENOM}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 12px; font-weight: bold; background: #734D12; color: white;">Nom :</td>
            <td style="border: 1px solid #ddd; padding: 12px;">${NOM}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 12px; font-weight: bold; background: #734D12; color: white;">Email :</td>
            <td style="border: 1px solid #ddd; padding: 12px;"><a href="mailto:${EMAIL}" style="color: #C36940;">${EMAIL}</a></td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 12px; font-weight: bold; background: #734D12; color: white;">Téléphone :</td>
            <td style="border: 1px solid #ddd; padding: 12px;"><a href="tel:${TEL}" style="color: #C36940;">${TEL}</a></td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 12px; font-weight: bold; background: #734D12; color: white;">Date d'inscription :</td>
            <td style="border: 1px solid #ddd; padding: 12px;">${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}</td>
          </tr>
        </table>
        
        <p style="margin-top: 20px; color: #999; font-size: 12px;">Pensez à contacter rapidement ce nouveau membre pour l'intégrer dans les activités de l'association.</p>
      `,
    });

    res.status(200).json({ message: 'Emails d\'adhésion envoyés avec succès' });
  } catch (error) {
    console.error('Erreur lors de l\'envoi des emails d\'adhésion:', error);
    res.status(500).json({ message: 'Erreur lors de l\'envoi des emails' });
  }
});

// ===== NEW MEMBER EMAIL - FULL VERSION (avec toutes les infos) =====
app.post('/send-new-member-email-full', async (req, res) => {
  const { prenom, nom, email, phone, instagram, address, birthdate, skills, agreeToContribution, comments } = req.body;

  try {
    // Email au client
    await transporter.sendMail({
      from: `"YYSA - Yeewu Yittel Sunu Askan" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: '✅ Merci pour votre adhésion à YYSA !',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f7f3; }
            .header { background: linear-gradient(135deg, #734D12 0%, #C36940 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: white; padding: 30px; }
            .footer { background: #f5f0eb; padding: 20px; text-align: center; font-size: 12px; color: #999; border-radius: 0 0 10px 10px; }
            .highlight { color: #C36940; font-weight: bold; }
            .mission-box { background: #f5f0eb; padding: 15px; border-left: 4px solid #C36940; margin: 15px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Bienvenue chez YYSA ! 🎉</h1>
            </div>
            <div class="content">
              <p>Bonjour <span class="highlight">${prenom}</span>,</p>
              <p>Nous sommes ravis de vous accueillir en tant que nouveau membre de <strong>YYSA (Yeewu Yittel Sunu Askan)</strong> !</p>
              
              <h2 style="color: #734D12;">Prochaines étapes :</h2>
              <p>Un de nos membres de l'équipe va très bientôt vous contacter pour :</p>
              <ul>
                <li>Vous présenter les différents domaines d'action</li>
                <li>Discuter de vos compétences et vos intérêts</li>
                <li>Vous intégrer dans les activités qui vous correspondent</li>
                <li>Répondre à toutes vos questions</li>
              </ul>
              
              <h2 style="color: #734D12;">Nos domaines d'action :</h2>
              <div class="mission-box">
                <strong>🎓 Éducation</strong><br>
                Distribution de kits scolaires, cours de renforcement, parrainage d'élèves
              </div>
              <div class="mission-box">
                <strong>💚 Santé</strong><br>
                Campagnes de sensibilisation, dépistages gratuits, accompagnement vers soins
              </div>
              <div class="mission-box">
                <strong>🌍 Environnement</strong><br>
                Journées Set Setal, sensibilisation à l'hygiène et l'écologie
              </div>
              <div class="mission-box">
                <strong>👩 Autonomisation des Femmes</strong><br>
                Espaces d'échange, formation, création d'opportunités
              </div>
              
              <p style="margin-top: 25px; color: #999;">En attendant, vous pouvez nous suivre sur nos réseaux sociaux pour rester informé de nos activités.</p>
            </div>
            <div class="footer">
              <p>© 2024 YYSA - Yeewu Yittel Sunu Askan | Sénégal</p>
              <p>Email: yeewuyittelsunuaskan@gmail.com | WhatsApp: +221 77 777 35 30</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    // Email à l'admin avec TOUTES les infos
    await transporter.sendMail({
      from: `"YYSA - Adhésions" <${process.env.GMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: '👤 Nouvelle adhésion YYSA - Formulaire complet',
      html: `
        <h2>📋 Nouvelle adhésion à YYSA - Informations complètes</h2>
        <p style="color: #666; margin-bottom: 20px; font-weight: bold;">Un nouveau membre vient de s'inscrire. Veuillez le contacter rapidement pour l'accueillir.</p>
        
        <h3 style="color: #734D12; margin-top: 20px; border-bottom: 2px solid #C36940; padding-bottom: 10px;">📝 INFOS PERSONNELLES</h3>
        <table style="border-collapse: collapse; width: 100%; margin-bottom: 20px;">
          <tr>
            <td style="border: 1px solid #ddd; padding: 12px; font-weight: bold; background: #734D12; color: white; width: 30%;">Prénom :</td>
            <td style="border: 1px solid #ddd; padding: 12px;">${prenom}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 12px; font-weight: bold; background: #734D12; color: white;">Nom :</td>
            <td style="border: 1px solid #ddd; padding: 12px;">${nom}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 12px; font-weight: bold; background: #734D12; color: white;">Email :</td>
            <td style="border: 1px solid #ddd; padding: 12px;"><a href="mailto:${email}" style="color: #C36940;">${email}</a></td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 12px; font-weight: bold; background: #734D12; color: white;">Téléphone :</td>
            <td style="border: 1px solid #ddd; padding: 12px;"><a href="tel:${phone}" style="color: #C36940;">${phone}</a></td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 12px; font-weight: bold; background: #734D12; color: white;">Instagram :</td>
            <td style="border: 1px solid #ddd; padding: 12px;">@${instagram}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 12px; font-weight: bold; background: #734D12; color: white;">Adresse :</td>
            <td style="border: 1px solid #ddd; padding: 12px;">${address}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 12px; font-weight: bold; background: #734D12; color: white;">Date de naissance :</td>
            <td style="border: 1px solid #ddd; padding: 12px;">${birthdate}</td>
          </tr>
        </table>

        <h3 style="color: #734D12; margin-top: 20px; border-bottom: 2px solid #C36940; padding-bottom: 10px;">🎯 COMPÉTENCES</h3>
        <p style="padding: 12px; background: #f5f0eb; border-left: 4px solid #C36940;">${skills}</p>

        <h3 style="color: #734D12; margin-top: 20px; border-bottom: 2px solid #C36940; padding-bottom: 10px;">💳 CONTRIBUTION MENSUELLE</h3>
        <p style="padding: 12px; background: ${agreeToContribution === 'Yes' ? '#e8f5e9' : '#ffebee'}; border-left: 4px solid ${agreeToContribution === 'Yes' ? '#4caf50' : '#f44336'};"><strong>Accord :</strong> ${agreeToContribution === 'Yes' ? '✅ OUI' : '❌ NON'}</p>
        <p style="font-size: 12px; color: #999;">1000 CFA / 5 USD / 5 CAD / 5 EUR par mois</p>

        <h3 style="color: #734D12; margin-top: 20px; border-bottom: 2px solid #C36940; padding-bottom: 10px;">💬 COMMENTAIRES</h3>
        <p style="padding: 12px; background: #f5f0eb;">${comments || '<em>Aucun commentaire</em>'}</p>

        <h3 style="color: #734D12; margin-top: 30px;">📅 Date d'inscription</h3>
        <p>${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}</p>

        <hr style="border: none; border-top: 2px solid #C36940; margin: 20px 0;">
        <p style="margin-top: 20px; color: #999; font-size: 12px; text-align: center;">Pensez à contacter rapidement ce nouveau membre pour l'intégrer dans les activités de l'association.</p>
      `,
    });

    res.status(200).json({ message: 'Emails d\'adhésion complets envoyés avec succès' });
  } catch (error) {
    console.error('Erreur lors de l\'envoi des emails d\'adhésion complets:', error);
    res.status(500).json({ message: 'Erreur lors de l\'envoi des emails' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
