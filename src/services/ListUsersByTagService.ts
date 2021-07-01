import { getCustomRepository } from "typeorm"
import { CustomException } from "../errors/CustomException"
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories"


class ListUsersByTagService{
  async execute(tag_id:string) {
    const complimentsRepositories= getCustomRepository(ComplimentsRepositories)

    if(!tag_id)
      throw new CustomException({
        status:422,
        message:"Invalid tag!"
      })

    const compliments = await complimentsRepositories.find({
      where:{
        tag_id:tag_id
      },
      relations:['userReceiver']
    })

    const usersReceivers= compliments.map(compliment=>{
      return {
        tagID:tag_id,
        message:compliment.message,
        userReceiverId: compliment.userReceiver.id,
        userReceiverName: compliment.userReceiver.name
      }
    })

    return usersReceivers
  }
}

export {ListUsersByTagService}