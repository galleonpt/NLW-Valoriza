import { Request, Response } from "express";
import { ListUsersByTagService } from "../services/ListUsersByTagService";


class ListUsersByTagController{
  async handle(request:Request, response:Response){
    const { tag_id }= request.body

    const listUsersByTagService= new ListUsersByTagService()

    const users= await listUsersByTagService.execute(tag_id)

    return response.status(200).json(users)
  }
}

export {ListUsersByTagController}