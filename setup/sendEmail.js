const nodemailer = require('nodemailer');
const path = require('path');
const input = require('../testDataFiles/Credentials.json');

const user = 'xavier@vjhsoftware.in';
const pass = input.token.expire;

// Email config
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',  // e.g., smtp.office365.com or smtp.gmail.com
  port: 587,                        // or 465 for SSL
  secure: false,                    // true for port 465, false for 587
  auth: {
    user: user,
    pass: pass  // Use App Password if using Gmail
  }
});

// Email options
const mailOptions = {
  from: user,
  to: 'xavierandrew16@gmail.com',
  subject: 'Playwright Test Report',
  text: 'Execution is complete. Please find the attached report.',
  attachments: [
    {
      filename: 'test_report.pdf',
      path: path.join(__dirname, 'report.pdf')
    }
  ]
};

// Send email
transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.error('Error sending email:', error);
  } else {
    console.log('Email sent successfully:', info.response);
  }
});
