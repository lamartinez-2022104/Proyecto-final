'use stric'

import { Router } from "express"
import { ceroStock, deleteP, get, getProductsByCategory,  mostBuyings,  save,  search,  update } from "./product.controller.js"
import { isAdmin, validateJwt } from "../middlewares/validate-jwt.js"

const api = Router()

api.post('/save', [validateJwt, isAdmin], save)
api.put('/update/:id', [validateJwt, isAdmin], update)
api.delete('/delete/:id', [validateJwt, isAdmin], deleteP)
api.get('/get', get)
api.get('/soldOut', ceroStock)
api.get('/getByCategory/:id', getProductsByCategory)
api.post('/search', search)
api.get('/most', mostBuyings)

export default api