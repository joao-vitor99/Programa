import express from "express"
import { createClient } from "../controllers/Client.controller"

const router = express.Router()

router.route("/clients").post (async (req, res) => {
    const clientData = req.body

    try {
        const client = await createClient(clientData)
        return res.status(200).send(client)
    } catch (error) {
        return res.status(500).send(error)
    }      
})

export {router as default}