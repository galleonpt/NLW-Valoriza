import { getCustomRepository } from "typeorm"
import { CustomException } from "../exceptions/CustomException"
import { TagsRepositories } from "../repositories/TagsRepositories"

class CreateTagService{
  private capitalize(name:string){
    return name.charAt(0).toUpperCase() + name.slice(1)
  }

  async execute(name:string){
    const tagsRepositories= getCustomRepository(TagsRepositories)

    if(!name)
      throw new CustomException({status:422, message:"Invalid name!"})
    
    const capitalName= this.capitalize(name);

    const tagAlreadyExists= await tagsRepositories.findOne({
      name:capitalName
    })

    if(tagAlreadyExists) 
      throw new CustomException({status:409, message:"Tag already exists!"})
    

      const tag = await tagsRepositories.create({name:capitalName})

      await tagsRepositories.save(tag)

      return tag
  }
}

export {CreateTagService}