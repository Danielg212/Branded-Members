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

// basically I copied this function from nodemailer.com and pasted the code here,
// I must mention that I do understand the code, and edited the parts needed.
async function sendThankYouMail(form) {
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
}
