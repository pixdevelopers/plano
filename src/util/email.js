import nodemailer from 'nodemailer';
import sendGridTransport from 'nodemailer-sendgrid-transport';
import config from 'config';

const transporter = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key: config.get('mailApiKey')
    }
  })
);

const sendEmailRegistration = async (to, client) => {
  const from = config.get('mail.service');
  const subject = 'Registration';
  const html = `Hi, <h2>${client.name}</h2>`;
  return await transporter.sendMail({
    to,
    from,
    subject,
    html
  });
};

const sendEmailResetPassowrd = async (to, info) => {
  const from = config.get('mail.service');
  const subject = 'Plano Rest Password';
  const html = `
    Hi, <h2>${info.name}</h2><br>
      <p>
      You are receiving this because you (or someone else) have requested the reset of the password.Please click on the following link,or paste this into your browser to complete the proccess.
      </p>
      <a href='${info.url}'>${info.url}</a>
  `;
  return await transporter.sendMail({
    to,
    from,
    subject,
    html
  });
};

const sendEmailPlanInfo = async (to, client) => {
  const from = config.get('mail.service');
  const subject = 'Registration Bussiness Paln';
  const html = `Hi, <h2>${client.name}</h2>
    <p>Your paln information ...</>`;
  return await transporter.sendMail({
    to,
    from,
    subject,
    html
  });
};
module.exports = { sendEmailRegistration, sendEmailPlanInfo };
