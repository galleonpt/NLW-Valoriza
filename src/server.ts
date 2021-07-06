import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import "reflect-metadata"
import './database'
import { CustomException } from './errors/CustomException'
import { routes } from './routes'
import 'dotenv/config'
import cors from "cors"
import Rollbar from 'rollbar'

const rollbar= new Rollbar({
  accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
})

const app= express()
app.use(cors())

const PORT= process.env.PORT||3333

app.use(express.json())
app.use(routes)

app.use((err:any, request:Request, response:Response, next:NextFunction)=>{
  //Custom error
  if(err instanceof CustomException){
    rollbar.error(err, {
      method: request.method,
      url:request.url,
      ip:request.ip
    })

    return response.status(err.status).json({
      error: err.message
    })
  }

  //if it's an error thrown by our application
  if(err instanceof Error){
    rollbar.error(err, {
      method: request.method,
      url:request.url,
      ip:request.ip
    })

    return response.status(400).json({
      error:err.message
    })
  }

  rollbar.critical(err) 
  return response.status(500).json({
    message:"Something went wrong"
  })
})

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})