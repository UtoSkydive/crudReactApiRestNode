import {Router} from 'express'
import path from 'path'

import {getPersonas,createNewPersona,getPersonaById,updatePersona,deletePersona} from '../controllers/personas.controller'
const router = Router()

router.get('/personas',getPersonas)
router.post('/personas',createNewPersona)
router.get('/personas/:id',getPersonaById)
router.put('/personas/:id',updatePersona)
router.delete('/personas/:id',deletePersona)

export default router;