import React, { Component } from 'react';
import '../App.css';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
const urlServer = `http://localhost:4000`;

class Cliente extends Component {
    state = {
        form: {
            nombre1: '',
            nombre2: '',
            apellido1: '',
            apellido2: '',
            apellido_casada: '',
            direccion: '',
            telefono1: 0,
            telefono2: 0,
            identificacion: '',
            fecha: '',
            codigo: ''
        },
        buscar_codigo: '',
        buscar_identificacion: '',
        buscar_nombre: '',
        buscar_apellido: '',
        activo: false,
        tipoModal: '',
        visibleModal: false,
        clientes: []
    }
    cambio =(cambiar)=>{
        this.setState({ activo: cambiar})
    }
    modalVisible = () => {
        this.setState({ visibleModal: !this.state.visibleModal })
    }
    handleChangeForm = async e => {
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });

        console.log(this.state.form);
    }
    handleChange = async e => {
        await this.setState({
                ...this.state,
                [e.target.name]: e.target.value
        });

        console.log(this.state);
    }
    cargatTodosClientes = async () => {
        await axios.get(urlServer + `/obtener/obtenerTodo`)
            .then(response => {
                this.setState({ clientes: response.data });
            })
            .catch(error => {
                alert(error);
            })
    }
    buscarCliente = async()=>{
        if(this.state.buscar_codigo!=='' || this.state.buscar_identificacion!=='' || this.state.buscar_nombre!=='' || this.state.buscar_apellido!==''){
            if(this.state.buscar_codigo==='' && this.state.buscar_identificacion===''){
                await axios.post(urlServer + `/obtener/obtenerClientes`,{
                    nombre: this.state.buscar_nombre,
                    apellido: this.state.buscar_apellido,
                }).then(response=>{
                    this.setState({ clientes: response.data });
                }).catch(error=>{
                    alert(error);
                })
            }else {
                if(this.state.buscar_codigo==='')this.state.buscar_codigo=0;
                if(this.state.buscar_identificacion==='')this.state.buscar_identificacion='0';
                await axios.get(urlServer + `/clientes/obtenerCliente/${this.state.buscar_codigo}/${this.state.buscar_identificacion}`)
                .then(response => {
                    this.setState({ clientes: response.data });
                })
                .catch(error => {
                    alert(error);
                })
            }
        }else{
            this.cargatTodosClientes();
        }
        this.setState({buscar_codigo: '',
        buscar_identificacion: '',
        buscar_nombre: '',
        buscar_apellido: ''});
    }
    insertarCliente = async()=>{
        await axios.post(urlServer + `/clientes/insertarCliente`,{
            nombre1: this.state.form.nombre1,
            nombre2: this.state.form.nombre2,
            apellido1: this.state.form.apellido1,
            apellido2: this.state.form.apellido2,
            apellido_casada: this.state.form.apellido_casada,
            direccion: this.state.form.direccion,
            telefono1: this.state.form.telefono1,
            telefono2: this.state.form.telefono2,
            identificacion: this.state.form.identificacion,
            fecha: this.state.form.fecha,
        }).then(response=>{
            this.modalVisible();
            this.cargatTodosClientes();
            alert(JSON.stringify(response.data));
        }).catch(error=>{
            alert(error);
        })
        this.setState({from:{
            nombre1: '',
            nombre2: '',
            apellido1: '',
            apellido2: '',
            apellido_casada: '',
            direccion: '',
            telefono1: 0,
            telefono2: 0,
            identificacion: '',
            fecha: '',
            codigo: ''
        }, tipoModal:''});
    }
    modificarCliente = async()=>{
        await axios.put(urlServer + `/clientes/modificarCliente`,{
            telefono1: this.state.form.telefono1,
            direccion: this.state.form.direccion,
            codigo: this.state.form.codigo,
        }).then(response=>{
            this.modalVisible();
            this.cargatTodosClientes();
            alert(JSON.stringify(response.data));
        }).catch(error=>{
            alert(error);
        })
        this.setState({from:{
            nombre1: '',
            nombre2: '',
            apellido1: '',
            apellido2: '',
            apellido_casada: '',
            direccion: '',
            telefono1: 0,
            telefono2: 0,
            identificacion: '',
            fecha: '',
            codigo: ''
        }, tipoModal:''});
    }
    seleccionarCliente = (cliente) => {
        this.setState({
            tipoModal: 'actualizar',
            form: {
                direccion: cliente.cli_direccion,
                telefono1: cliente.cli_telefono1,
                codigo: cliente.cli_codigo_cliente,
            }
        })
    }
    eliminarCliente = async (codigo) =>{
        await axios.delete(urlServer + `/clientes/eliminarCliente/${codigo}`)
        .then(response => {
            this.cargatTodosClientes();
            alert(JSON.stringify(response.data))
        })
        .catch(error => {
            alert(error);
        })
    }
    componentDidMount = async () => {
        this.load();
    }
    load = async () => {
        this.cargatTodosClientes();
    }
    render() {
        const { form } = this.state;
        return (
            <div className="App-header-clientes">
                <Card style={{ width: '18rem' }}>
                <Form.Group>
                    <Form.Control size="sm" type="text" placeholder="Codigo" name="buscar_codigo" onChange={this.handleChange}/>
                    <Form.Control size="sm" type="text" placeholder="Identificacion" name="buscar_identificacion" onChange={this.handleChange}/>
                    <Form.Control size="sm" type="text" placeholder="Nombre" name="buscar_nombre" onChange={this.handleChange} />
                    <Form.Control size="sm" type="text" placeholder="Apellido" name="buscar_apellido" onChange={this.handleChange}/>
                </Form.Group>
                <Button variant="info" onClick={() => this.buscarCliente()}>Buscar</Button>
                </Card>
                <br></br>
                <br></br>
                <Button variant="success" id="btnInsertarCliente"  onClick={() => { this.setState({ tipoModal: 'insertar' });this.cambio(false); this.modalVisible() }}>Insertar Cliente</Button>
                <br></br>
                <br></br>
                <div id="tablaClientes">
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Codigo</th>
                                <th>Nombre Completo</th>
                                <th>Direccion</th>
                                <th>Telefono 1</th>
                                <th>Telefono 2</th>
                                <th>Identificacion</th>
                                <th>Fecha de Nacimiento</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.clientes.map(cliente => {
                                return (
                                    <tr>
                                        <td>{cliente.cli_codigo_cliente}</td>
                                        <td>{cliente.Nombre_completo}</td>
                                        <td>{cliente.cli_direccion}</td>
                                        <td>{cliente.cli_telefono1}</td>
                                        <td>{cliente.cli_telefono2}</td>
                                        <td>{cliente.cli_identificacion}</td>
                                        <td>{cliente.fecha}</td>
                                        <td>
                                            <Button variant="primary" onClick={() => { this.seleccionarCliente(cliente); this.modalVisible();this.cambio(true) }}>Modificar</Button>
                                            <Button variant="danger" onClick={() => this.eliminarCliente(cliente.cli_codigo_cliente)}>Eliminar</Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </div>
                <Modal show={this.state.visibleModal}>
                    <Modal.Header >
                         {this.state.tipoModal == 'insertar' ? <Modal.Title> Insertar Cliente</Modal.Title>: <Modal.Title> Modificar Cliente</Modal.Title>} 
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            {this.state.tipoModal == 'insertar' ? 
                            <Form.Control size="sm" type="text" placeholder="Primer Nombre" name="nombre1" onChange={this.handleChangeForm} value={form ? form.nombre1 : ''}/>: <h4>
                            <Badge bg="secondary">Codigo: {this.state.form.codigo}</Badge>
                            </h4>}
                            {this.state.tipoModal == 'insertar' ? 
                            <Form.Control size="sm" type="text" placeholder="Segundo Nombre" name="nombre2" onChange={this.handleChangeForm} value={form ? form.nombre2 : ''}/>: <p/>}
                            {this.state.tipoModal == 'insertar' ? 
                            <Form.Control size="sm" type="text" placeholder="Primer Apellido" name="apellido1" onChange={this.handleChangeForm} value={form ? form.apellido1 : ''}/>: <p/>}
                            {this.state.tipoModal == 'insertar' ? 
                            <Form.Control size="sm" type="text" placeholder="Segundo Apellido" name="apellido2" onChange={this.handleChangeForm} value={form ? form.apellido2 : ''}/>: <p/>}
                            {this.state.tipoModal == 'insertar' ? 
                            <Form.Control size="sm" type="text" placeholder="Apellido de Casada" name="apellido_casada" onChange={this.handleChangeForm} value={form ? form.apellido_casada : ''}/>: <p/>}
                            <Form.Control size="sm" type="text" placeholder="Direccion" name="direccion" onChange={this.handleChangeForm} value={form ? form.direccion : ''}/>
                            <Form.Control size="sm" type="text" placeholder="Telefono 1" name="telefono1" onChange={this.handleChangeForm} value={form ? form.telefono1 : ''}/>
                            {this.state.tipoModal == 'insertar' ? 
                            <Form.Control size="sm" type="text" placeholder="Telefono 2" name="telefono2" onChange={this.handleChangeForm} value={form ? form.telefono2 : ''}/>: <p/>}
                            {this.state.tipoModal == 'insertar' ? 
                            <Form.Control size="sm" type="text" placeholder="Identificadion" name="identificacion" onChange={this.handleChangeForm} value={form ? form.identificacion : ''}/>: <p/>}
                            {this.state.tipoModal == 'insertar' ? 
                            <Form.Control size="sm" type="text" placeholder="Fecha de Nacimiento" name="fecha" onChange={this.handleChangeForm} value={form ? form.fecha : ''}/>: <p/>}
                        </Form.Group>
                        <Modal.Footer>
                        <Button variant="danger" onClick={() => this.modalVisible()}>
                            Cancelar
                        </Button>
                        {this.state.tipoModal == 'insertar' ? <Button variant="success" onClick={() => this.insertarCliente()}>
                            Insertar
                        </Button> : <Button variant="success" onClick={() => this.modificarCliente()}>
                                Actualizar
                        </Button>}

                    </Modal.Footer>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default Cliente;