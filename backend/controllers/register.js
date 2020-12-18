import User from '../models/UsersSchema.js';
import nodemailer from 'nodemailer';

export const register = async (req, res) => {
  // this is where the data is received from the user,
  // and then constructed with a mongoose schema
  // and then saved to the database
  const form = req.body;
  const newUser = new User({
    firstName: form.firstName,
    lastName: form.lastName,
    birthDate: form.birthDate,
    email: form.email,
    password: form.password,
  });

  try {
    await newUser.save();
    console.log(`✅ -CREATE- :`, newUser);
    res.status(201).json(newUser); // created
    sendThankYouMail(newUser).catch((err) => console.log(`❌ ${err}`));
  } catch (error) {
    console.log(`❌ ${error}`);
    res.status(409).json(error); // conflict
  }
};

// async..await is not allowed in global scope, must use a wrapper
async function sendThankYouMail(form) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_SERVER,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER, // generated ethereal user
      pass: process.env.SMTP_PASS, // generated ethereal password
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

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
