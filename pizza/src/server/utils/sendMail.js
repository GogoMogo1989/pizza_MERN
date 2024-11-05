const nodemailer = require('nodemailer');

const nodemailerKey = process.env.NODEMAILER_SECRET_KEY
const emailUser = process.env.EMAIL_USER

// Nodemailer transporter beállítása
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: emailUser,
      pass: nodemailerKey
    }
  });
  
  //Nodemailer sendMail function
  const sendMail = (mailToWho) => {
   transporter.sendMail(mailToWho, (error, info) => {
      if (error) {
        console.log('Hiba az e-mail küldésekor:', error);
      } else {
        console.log('E-mail sikeresen elküldve:', info.response);
      }
    }); 
  }

  module.exports = sendMail;