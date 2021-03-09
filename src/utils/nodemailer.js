// server.js
// const http = require('http');
// const express = require('express');
const nodemailer = require('nodemailer')
// const app = express.Router();

// app.post('/email', async (req, res) => {
//  try{
//   const response = await send(req);
//   console.log(response);
//   res.status(200).json({
//    message: 'sucess',
//    data: response
//   })
//  } catch (error) {
//   console.log(error);
//   res.status(400).json({
//    message: error.message
//   })
//  }
// })

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'e3c6eb0ee6fcfb',
    pass: '8ed7f024e8c02a',
  },
})

/*
Use in your req.body
 const options = {
   userEmail: <mailtrapEmail>,
   subject: 'Welcome to Auffr',
   message: 'We are excited to have you in the family'
 }
*/
/**
 * Sends mail through aws-ses client
 * @param options Contains emails recipient, subject and text
 */
const send = async options => {
  const message = {
    from: `${options.fromName} <${options.fromEmail}>`,
    to: `${options.userEmail}`,
    subject: `${options.subject}`,
    text: `${options.message}`,
  }

  const info = await transport.sendMail(message)
  console.log(info.messageId)
  return info
}

// const server = http.createServer((req, res) => {
//  res.statusCode = 200;
//    res.setHeader('Content-Type', 'text/plain');
//    res.end('This is the Main App!\n');
// });

// server.listen(port, () => {
//    console.log(`Server running at http://localhost:${port}/`);
// });

module.exports = { send, transport }
