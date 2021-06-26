import { AES, enc } from "crypto-js"

class EmailProvider{
  constructor(){}

  encrypt(email:string){
    return AES.encrypt(email, process.env.ENCRYPT_TOKEN).toString()
  }
  
  decrypt(encryptedEmail:string){
    return AES.decrypt(encryptedEmail, process.env.ENCRYPT_TOKEN).toString(enc.Utf8)

  }
}

export { EmailProvider }