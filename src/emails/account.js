const sgMail=require('@sendgrid/mail')


sgMail.setApiKey(process.env.send_GRID_API_KEY);

const sgSendMail=((email,name)=>
sgMail.send({
    to:email,
    from:'singh.gk272@gmail.com',
    subject:'Thanks for SignUp!',
    text:'Welcome to the app, ${name}.I hope this actually get to you'
})
)
const sgSendCancelMail=((email,name)=>
sgMail.send({
    to:email,
    from:'singh.gk272@gmail.com',
    subject:'Sorry to see U going',
    text:'Goodbye, ${name}.I hope to see you back soon'
})
)

module.exports={sgSendMail}