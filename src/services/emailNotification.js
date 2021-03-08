const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'satputenilesh0298@gmail.com', // generated ethereal user
    pass: 'MyPass@98765', // generated ethereal password
  },
})

const sendEmailNotification = async data => {
  try {
    const info = await transporter.sendMail({
      from: `"Fred Foo 👻" <${data.from}>`,
      to: `${data.to}`,
      subject: 'Hello ✔',
      text: data.text,
      html: '<b>Hello world?</b>',
    })

    console.log('Message sent: %s', info.messageId)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
  } catch (err) {
    console.log(err)
  }
}

module.exports = sendEmailNotification
