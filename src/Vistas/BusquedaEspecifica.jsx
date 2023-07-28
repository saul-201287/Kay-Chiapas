import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Table from "react-bootstrap/Table";
import { NavDropdown } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import peligro from "../img/advertencia.png";
import warning from "../img/icons8-riesgo-medio-50.png";

const BusquedaEspecifica = () => {
  const [lista, setLista] = useState([]);
  const [option, setOption] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const [cantidadmin, setCantidadmin] = useState(0);
  const [encontrado, setEncontrado] = useState("Sin Resultados");
  const [estado, setEstado] = useState("Seleccionar el Tipo");
  const [estatus, setestatus] = useState(false);
  const [show, setShow] = useState(false);
  const [nombre, setNombre] = useState();
  const [precio, setPrecio] = useState();
  const [proveedor, setProveedor] = useState();
  const [cantidades, setCantidades] = useState();
  const [copia, setCopia] = useState(null);
  const [edad, setEdad] = useState(0);
  const handleDelete = (Id) => {
    console.log(Id);
    Swal.fire({
      title: "<strong>Confirmar</strong>",
      icon: "warning",
      html: "¿Desea eliminar el producto?",
      showDenyButton: true,
      focusConfirm: false,
      confirmButtonText: '<i class="fa fa-thumbs-up"></i>Eliminar',
      denyButtonText: '<i class="fa fa-thumbs-down">Cancelar</i>',
    }).then((res) => {
      if (res.isConfirmed) {
        axios.delete(`http://localhost:3006/producto/${Id}`).then(() => {
          actualizar();
          Swal.fire({
            icon: "success",
            title: "Producto eliminado",
            text: "EL producto se ha eliminado correctamente.",
          });
        });
      }
    });
  };
  const handleClose = (respuesta) => {
    if (respuesta === "guardar") {
      Edit();
    }
    setCopia(null);
    setShow(false);
  };

  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };
  const handlePrecioChange = (e) => {
    setPrecio(e.target.value);
  };
  const handleProveedorChanged = (e) => {
    setProveedor(e.target.value);
    console.log(proveedor);
  };
  const handleCantidadChanged = (e) => {
    setCantidades(e.target.value);
  };
  const handleEdadChanged = (e) => {
    setEdad(e.target.value);
  };
  const handleShow = (i, tip) => {
    setShow(true);
    console.log(tip);
    if (tip === "Tilapias" || tip === "Mojarras") {
      setCopia(lista[i]);
      setNombre(lista[i].Nombre);
      setCantidades(lista[i].Cantidad);
      setPrecio(lista[i].PrecioUnitario);
      setEdad(lista[i].Edad);
    } else {
      setCopia(lista[i]);
      setNombre(lista[i].Nombre);
      setCantidades(lista[i].Cantidad);
      setPrecio(lista[i].PrecioUnitario);
      setProveedor(lista[i].Proveedor);
    }
  };
  const Edit = () => {
    Swal.fire({
      title: "<strong>Confirmar</strong>",
      icon: "question",
      html: "¿Desea guardar los cambios?",
      showDenyButton: true,
      focusConfirm: false,
      confirmButtonText: '<i class="fa fa-thumbs-up"></i>Guardar',
      denyButtonText: '<i class="fa fa-thumbs-down">Cancelar</i>',
    }).then((res) => {
      if (res.isConfirmed) {
        if (copia.Nombre !== nombre) {
          copia.Nombre = nombre;
        }
        if (copia.PrecioUnitario !== precio) {
          copia.PrecioUnitario = precio;
        }

        if (copia.Cantidad !== cantidades) {
          copia.Cantidad = cantidades;
        }
        if (copia.Tipo === "Mojarras" || copia.Tipo === "Tilapias") {
          if (copia.Edad !== edad) {
            copia.Edad = edad;
          }
        } else {
          if (copia.Proveedor !== proveedor) {
            copia.Proveedor = proveedor;
          }
        }
        console.log(copia);
        axios
          .put("http://localhost:3006/alter", {
            folio: copia.ProductoID,
            nombre: copia.Nombre,
            precio: Number(copia.PrecioUnitario),
            cantidad: Number(copia.Cantidad),
            proveedor: copia.Proveedor,
            tipo: copia.Tipo,
            unidadMedida: copia.UnidadMedida,
            edad: copia.Edad,
          })
          .then((resp) => {
            console.log(resp.data);
            actualizar();
          });
      } else {
        console.log("Error");
      }
      setCopia(null);
    });
  };
  const handleCantidadOptionSelect = (event) => {
    setCantidad(event.target.value);
  };
  const handleCantidadminOptionSelect = (event) => {
    setCantidadmin(event.target.value);
  };
  const filtro = () => {
    if (estatus === true) {
      setestatus(false);
      setCantidad(0);
      setCantidadmin(0);
    } else {
      setestatus(true);
    }
  };
  console.log(cantidad);
  const handletOptionProveedor = (opti) => {
    setEstado(opti);
    setOption(opti);
  };
  const busqueda = (e) => {
    e.preventDefault();
    if (option === "") {
      Swal.fire({
        icon: "warning",
        title: "Seleccione un tipo",
        text: "Es necesario seleccionar un tipo",
      });
    } else {
      axios
        .get(
          `http://localhost:3006/busqueda/${option}&${cantidad}&${cantidadmin}`
        )
        .then((result) => {
          setLista(result.data);
          if (lista.length === 0)
            setEncontrado(
              "No se encontro ningun registro con los datos proporcionados"
            );
        });
    }
  };
  const actualizar = () => {
    axios
      .get(
        `http://localhost:3006/busqueda/${option}&${cantidad}&${cantidadmin}`
      )
      .then((result) => {
        setLista(result.data);
        if (lista.length === 0)
          setEncontrado(
            "No se encontro ningun registro con los datos proporcionados"
          );
      });
  };

  console.log(lista);
  const formatFecha = (fecha) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(fecha).toLocaleDateString(undefined, options);
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Modificar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label htmlFor="nombre" className="form-label">
            Nombre del Producto:
          </label>
          <input
            type="text"
            value={nombre}
            onChange={handleNombreChange}
            className="form-control"
            required
          />
          <label htmlFor="precio" className="form-label">
            Precio unitario del Producto:
          </label>
          <input
            type="number"
            value={precio}
            onChange={handlePrecioChange}
            className="form-control"
            min={1}
            required
          />
          {copia !== null ? (
            copia.Tipo !== "Tilapias" && copia.Tipo !== "Mojarras" ? (
              <>
                <label htmlFor="proveedor" className="form-label">
                  Proveedor del Producto:
                </label>
                <input
                  value={proveedor}
                  type="text"
                  onChange={handleProveedorChanged}
                  className="form-control"
                  required
                />
              </>
            ) : (
              <>
                <label htmlFor="edad" className="form-label">
                  Edad:
                </label>
                <input
                  value={edad}
                  type="number"
                  onChange={handleEdadChanged}
                  className="form-control"
                  required
                />
              </>
            )
          ) : (
            <></>
          )}

          <label htmlFor="cantidad" className="form-label">
            Cantidad del Producto:
          </label>
          <input
            type="number"
            value={cantidades}
            onChange={handleCantidadChanged}
            className="form-control"
            min={1}
            required
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => handleClose("eliminar")}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={() => handleClose("guardar")}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
      <form onSubmit={busqueda}>
        <div
          style={{
            display: "flex",
            padding: "40px",
            width: "100%",
            marginRight: "400px",
            justifyContent: "center",
            backgroundColor: "#202930",
            marginTop: "2px",
          }}
        >
          <NavDropdown
            title={estado}
            id="seleccionar-tipo-dropdown"
            min={lista.length}
            required
            style={{
              border: "solid 1px black",
              borderRadius: "5px",
              padding: "8px",
              backgroundColor: "white",
              marginRight: "10px",
              height: "100%",
            }}
          >
            <NavDropdown.Item
              value="Mojarras"
              onClick={(e) => handletOptionProveedor("Mojarras")}
            >
              Mojarras
            </NavDropdown.Item>
            <NavDropdown.Item
              value="Tilapias"
              onClick={(e) => handletOptionProveedor("Tilapias")}
            >
              Tilapias
            </NavDropdown.Item>
            <NavDropdown.Item
              value="Herramientas"
              onClick={(e) => handletOptionProveedor("Herramientas")}
            >
              Herramientas
            </NavDropdown.Item>
            <NavDropdown.Item
              value="Medicamentos"
              onClick={(e) => handletOptionProveedor("Medicamentos")}
            >
              Medicamentos
            </NavDropdown.Item>
            <NavDropdown.Item
              value="Alimentos"
              onClick={(e) => handletOptionProveedor("Alimentos")}
            >
              Alimentos
            </NavDropdown.Item>
          </NavDropdown>

          <Button
            type="submit"
            variant="outline-primary"
            style={{ marginRight: "150px", height: "2.7rem" }}
          >
            Buscar
          </Button>
          <Button
            onClick={filtro}
            variant="outline-primary"
            style={{
              left: "30%",
              top: "35px",
              height: "2.7rem",
              position: "relative",
            }}
          >
            Filtros
          </Button>
          <br />
          <br />
          {estatus !== false ? (
            <div
              className="form-group"
              style={{
                position: "relative",
                top: "80px",
                marginRight: "32px",
                width: "auto",
              }}
            >
              <label
                htmlFor="cantidad"
                className="form-label"
                style={{
                  width: "170px",
                  color: "white",
                  right: "125px",
                  position: "relative",
                  top: "48px",
                }}
              >
                Cantidad minima:
              </label>
              <input
                style={{
                  width: "4.5rem",
                  textAlign: "center",
                  height: "2.7rem",
                  top: "5px",
                  margin: "5px",
                }}
                type="number"
                className="form-control"
                value={cantidad}
                id="cantidad"
                onChange={handleCantidadOptionSelect}
                min={0}
              />
              <label
                htmlFor="cantidadmin"
                className="form-label"
                style={{
                  width: "170px",
                  color: "white",
                  left: "101px",
                  position: "relative",
                  top: "-38px",
                }}
              >
                Cantidad maxima:
              </label>
              <input
                style={{
                  width: "4.5rem",
                  textAlign: "center",
                  height: "2.7rem",
                  margin: "5px",
                  bottom: "81px",
                  position: "relative",
                  left: "135%",
                }}
                type="number"
                className="form-control"
                value={cantidadmin}
                id="cantidadmin"
                onChange={handleCantidadminOptionSelect}
                min={cantidad}
                required
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      </form>
      {lista.length !== 0 ? (
        <>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h1 style={{ margin: "2rem" }}>Tabla de Productos</h1>
            <div
              style={{
                display: "grid",
                justifyContent: "end",
                alignItems: "baseline",
                justifyItems: "start",
                marginRight: "2rem",
              }}
            >
              <div style={{ justifyContent: "center", display: "flex" }}>
                <img src={warning} alt="Warning" width="30" height="30" />
                <p>
                  {" "}
                  El producto corre el rriesgo de agotarse Cantidad menor a 50
                </p>
              </div>
              <div style={{ justifyContent: "center", display: "flex" }}>
                <img src={peligro} alt="Danger" width="30" height="30" />
                <p>
                  La existencia de este producto en muy baja Cantidad menor a 20
                </p>
              </div>
            </div>
          </div>
          <Table
            striped
            bordered
            hover
            variant="dark"
            responsive
            style={{ float: "left", marginLeft: "10px" }}
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Fecha de ingreso</th>
                <th>Tipo</th>
                <th>Precio unitario</th>
                <th>Cantidad</th>
                {lista[0].Tipo !== "Tilapias" &&
                lista[0].Tipo !== "Mojarras" ? (
                  <>
                    <th>Proveedor</th>
                    <th>Unidad de medida</th>
                  </>
                ) : (
                  <th>Edad</th>
                )}

                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {lista.map((cosas, index) => (
                <tr key={index}>
                  <td>{cosas.ProductoID}</td>
                  <td>{cosas.Nombre}</td>
                  <td>{formatFecha(cosas.FechaIngreso)}</td>
                  <td>{cosas.Tipo}</td>
                  <td>${cosas.PrecioUnitario}</td>
                  {cosas.Cantidad <= 50 ? (
                    cosas.Cantidad <= 20 ? (
                      <>
                        <td>
                          {cosas.Cantidad} <br />
                          <img
                            src={peligro}
                            alt=""
                            width="30"
                            height="30"
                            style={{ marginTop: "20px" }}
                          />
                        </td>
                      </>
                    ) : (
                      <>
                        <td>
                          {cosas.Cantidad} <br />
                          <img
                            src={warning}
                            alt=""
                            width="30"
                            height="30"
                            style={{ marginTop: "20px" }}
                          />
                        </td>
                      </>
                    )
                  ) : (
                    <td>{cosas.Cantidad}</td>
                  )}
                  {cosas.Tipo === "Tilapias" || cosas.Tipo === "Mojarras" ? (
                    <td>{cosas.Edad}</td>
                  ) : (
                    <>
                      <td>{cosas.Proveedor}</td>
                      <td>{cosas.UnidadMedida}</td>
                    </>
                  )}
                  <td className="text-center">
                    <button
                      className="btn btn-primary action-button"
                      onClick={() => handleShow(index, cosas.Tipo)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger action-button"
                      onClick={() => handleDelete(cosas.ProductoID)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : (
        <h2 value={encontrado} style={{ textAlign: "center" }}>
          {encontrado}
        </h2>
      )}
    </>
  );
};
export default BusquedaEspecifica;
