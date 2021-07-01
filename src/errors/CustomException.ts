
interface ICostumeException{
  status?:number,
  message: string
}

class CustomException extends Error{
  status: number
  
  constructor({status, message}: ICostumeException){
    super(message)
    
    this.status=status||400
  }
}

export {CustomException}