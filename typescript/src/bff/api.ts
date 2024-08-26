import express from 'express'
import {cfg} from '../config/index.js'
import fileUpload from 'express-fileupload'

export const app = express()

app.get('/uploads/:id',  (req, res) => {
    return res.json({
        uploadUrl: `http://localhost:9001/uploads`
    })
})

const createHandler = (): express.Handler => {

    return (req, res, next) => {
    }

}