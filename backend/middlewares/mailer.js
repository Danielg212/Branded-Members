import nodemailer from 'nodemailer';

// This is where I got the mailer
// https://nodemailer.com/about/

// This is where I got a fake mailing account (it catches the mail, doesn't send it forward)
// https://ethereal.email

// Then I got an SMTP service from here
// https://www.sendinblue.com/

export const sendThankYouMail = async (form) => {
  // create reusable transporter object (using the default SMTP transport)
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_SERVER,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Branded" <mail@branded.co.il>', // sender address
    to: form.email, // list of receivers
    subject: 'Welcome to Branded!', // Subject line
    html: `
    <h1>Thanks for joining Branded :)</h1>
    <h4>Dear ${form.firstName} ${form.lastName},</h4>
    <p>
      We want to thank you for registering at branded.co.il<br />
      Best of luck on our journey together!
    </p>
    `, // html body
  });

  console.log('✅ Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
};
