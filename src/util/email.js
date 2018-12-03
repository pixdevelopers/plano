import nodemailer from 'nodemailer';
import sendGridTransport from 'nodemailer-sendgrid-transport';
import config from 'config';

const transporter = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key:
        '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'
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
const sendEmailPlanInfo = async (to, client) => {
    const from = config.get('mail.service');
    const subject = 'Registration Bussiness Paln';
    const html = `Hi, <h2>${client.name}</h2>
    <p>Your paln information ...</>`
    return await transporter.sendMail({
        to, from, subject, html
    });
}
module.exports = { sendEmailRegistration, sendEmailPlanInfo };