import nodemailer from "nodemailer"

const createTransporter = async () => {

  const testAccount = await nodemailer.createTestAccount()

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    }
  })

  return transporter
}

export const sendEmail = async ({ to, subject, html }) => {

  const transporter = await createTransporter()

  const info = await transporter.sendMail({
    from: '"Star Accesorios" <test@ethereal.email>',
    to,
    subject,
    html
  })

  console.log("Email enviado")

  console.log("Preview URL:", nodemailer.getTestMessageUrl(info))
}