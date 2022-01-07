const express = require("express")
const router = express.Router()
const clienteController = require("../controllers/clientesController.controller")

router.post("/obtenerClientes", clienteController.obtenerClientes)
router.get("/obtenerTodo", clienteController.obtenerTodo)

module.exports = router