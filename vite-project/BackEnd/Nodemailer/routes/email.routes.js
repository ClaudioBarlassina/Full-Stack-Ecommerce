import  {Router}  from "express"
import { confirmEmail } from "../controllers/email.controllers.js"

const router = Router()

router.post("/confirm", confirmEmail)

export default router
