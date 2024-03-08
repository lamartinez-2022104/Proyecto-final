'use strict'

import { Router } from 'express'
import { deleteC, save, get, update, getCategoryById } from './category.controller.js'
import { isAdmin, validateJwt } from '../middlewares/validate-jwt.js'

const api = Router()

api.post('/save', [validateJwt, isAdmin], save)
api.put('/update/:id', [validateJwt, isAdmin], update)
api.delete('/delete/:id', [validateJwt, isAdmin], deleteC)
api.get('/getById/:id', getCategoryById)
api.get('/get', get)
export default api