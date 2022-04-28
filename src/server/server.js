const nodemailer = require('nodemailer')

async function main() {
    //let testEmailAccount = await nodemailer.createTestAccount()

    let transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
        user: 'guchvlado324@mail.ru',
        pass: 'Unva5shtt674HhWszmmg',
    },
    })

    let result = await transporter.sendMail({
    from: '"Node js" <guchvlado324@mail.ru>',
    to: 'mrfreeman324@gmail.com',
    subject: 'Message from Node js',
    text: 'This message was sent from Node js server.',
    html:
        'This <i>message</i> was sent from <strong>Node js</strong> server.',
    })

    console.log(result)

    console.log("Message sent: %s", result.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}

main().catch(console.error);