const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * @param {string} to Recipient email
 * @param {string} subject Email subject
 * @param {string} text Plain text body
 * @param {string} html HTML body
 */
const sendEmail = async ({ to, subject, text, html }) => {
  const msg = {
    to,
    from: process.env.SENDGRID_FROM_EMAIL,
    subject,
    text,
    html
  };

  await sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent', msg)
  })
  .catch((error) => {
    console.error(error)
  })
};

module.exports = sendEmail;
