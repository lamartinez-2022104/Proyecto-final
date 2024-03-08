import { Router } from "express";
import { isClient, validateJwt} from '../middlewares/validate-jwt.js'
import { addToCart, getCart } from "./cart.controller.js";

const api = Router()

api.get('/getCart',[validateJwt, isClient], getCart)
api.post('/addToCart/:id',[validateJwt, isClient], addToCart)

export default api