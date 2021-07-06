import sgMail from "@sendgrid/mail"

class SendEmail{
  execute(emailReceiver:string){
    sgMail.setApiKey(process.env.SEND_GRID_API_KEY)
    
    const msg = {
      to: emailReceiver,
      from: process.env.EMAIL,
      subject: 'New compliment',
      html: 'Someone give you a compliment. Check it out :)',
    }

    sgMail
      .send(msg)
      .then(() => {
        return 1
      })
      .catch((error) => {
        return error
      })

  }
}

export {SendEmail}