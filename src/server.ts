import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import "reflect-metadata"
import './database'
import { CustomException } from './errors/CustomException'
import { routes } from './routes'
import 'dotenv/config'
import cors from "cors"

const app= express()
app.use(cors())

const PORT= process.env.PORT||3333

app.use(express.json())
app.use(routes)

app.use((err:any, request:Request, response:Response, next:NextFunction)=>{
  //Custom error
  if(err instanceof CustomException){
    return response.status(err.status).json({
      error: err.message
    })
  }

  //if it's an error thrown by our application
  if(err instanceof Error){
    return response.status(400).json({
      error:err.message
    })
  }

  return response.status(500).json({
    message:"Something went wrong"
  })
})

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})