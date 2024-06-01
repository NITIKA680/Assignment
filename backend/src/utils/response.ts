import { Response } from "express";

const SendResponse = (res : Response, data : any, token : any, status = 400) => {
    token = token ? token : ''
    res.status(status).json({message: token, result : data})
}

export default SendResponse;