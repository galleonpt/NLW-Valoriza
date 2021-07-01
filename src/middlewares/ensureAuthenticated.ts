import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken"

interface IPayload{
  sub: string
}

export function ensureAuthenticated(request:Request, response: Response, next:NextFunction){

  const authToken=request.headers.authorization; 

  if(!authToken)
    return response.status(401).end()

  const [ ,token] = authToken.split(" ")

  try{
    //validate if the token provided is valid and force it to be a string using an interface
    const {sub}=verify(token,process.env.JWT_SECRET) as IPayload

    request.user_id= sub

    return next()
  }
  catch(e){
    return response.status(401).end()
  }
}