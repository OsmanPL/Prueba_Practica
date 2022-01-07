const express = require("express")
const router = express.Router()
const clienteController = require("../controllers/clientesController.controller")

router.post("/insertarCliente", clienteController.insertarCliente)
router.put("/modificarCliente", clienteController.modificarCliente)
router.delete("/eliminarCliente/:codigo", clienteController.eliminarCliente)
router.get("/obtenerCliente/:codigo/:identificacion", clienteController.obtenerCliente)

module.exports = router
