import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Swal from "sweetalert2";
import peligro from "../img/advertencia.png";
import warning from "../img/icons8-riesgo-medio-50.png";

const MostrarAll = () => {
  const [listAnimales, setListAnimales] = useState([]);
  const [listCosas, setListCosas] = useState([]);
  const [show, setShow] = useState(false);
  const [nombre, setNombre] = useState();
  const [precio, setPrecio] = useState();
  const [proveedor, setProveedor] = useState();
  const [cantidad, setCantidad] = useState();
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
    setCantidad(e.target.value);
  };
  const handleEdadChanged = (e) => {
    setEdad(e.target.value);
  };
  const handleShow = (i, tip) => {
    setShow(true);
    console.log(tip);
    if (tip === "Tilapias" || tip === "Mojarras") {
      setCopia(listAnimales[i]);
      setNombre(listAnimales[i].Nombre);
      setCantidad(listAnimales[i].Cantidad);
      setPrecio(listAnimales[i].PrecioUnitario);
      setEdad(listAnimales[i].Edad);
    } else {
      setCopia(listCosas[i]);
      setNombre(listCosas[i].Nombre);
      setCantidad(listCosas[i].Cantidad);
      setPrecio(listCosas[i].PrecioUnitario);
      setProveedor(listCosas[i].Proveedor);
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

        if (copia.Cantidad !== cantidad) {
          copia.Cantidad = cantidad;
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
          .then((resp) => console.log(resp.data));
      } else {
        console.log("Error");
      }
      setCopia(null);
    });
  };
  useEffect(() => {
    const view = async () => {
      const cosas = await axios.get("http://localhost:3006/inventario-cosas");
      const animales = await axios.get(
        "http://localhost:3006/inventario-animales"
      );
      setListCosas(cosas.data);
      setListAnimales(animales.data);
    };
    view();
  }, [listAnimales, listCosas]);
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
            value={cantidad}
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
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 style={{ margin: "2rem" }}>Tabla de Materiales</h1>
        <div
          style={{
            display: "grid",
            justifyContent: "end",
            alignItems: "baseline",
            justifyItems: "start",
            marginRight: '2rem'
          }}
        >
          <div style={{ justifyContent: "center", display: "flex" }}>
            <img src={warning} alt="" width="30" height="30" />
            <p> El producto corre el rriesgo de agotarse</p>
          </div>
          <div style={{ justifyContent: "center", display: "flex" }}>
            <img src={peligro} alt="" width="30" height="30" />
            <p>La existencia de este producto en muy baja</p>
          </div>
        </div>
      </div>
      <Table
        striped
        bordered
        variant="dark"
        hover
        responsive
        style={{
          float: "left",
          marginLeft: "10px",
        }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Fecha de ingreso</th>
            <th>Tipo</th>
            <th>Precio unitario</th>
            <th>Proveedor</th>
            <th>Cantidad</th>
            <th>Unidad de medida</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {listCosas.map((cosas, index) => (
            <tr key={index}>
              <td>{cosas.ProductoID}</td>
              <td>{cosas.Nombre}</td>
              <td>{formatFecha(cosas.FechaIngreso)}</td>
              <td>{cosas.Tipo}</td>
              <td>${cosas.PrecioUnitario}</td>
              <td>{cosas.Proveedor}</td>
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
              <td>{cosas.UnidadMedida}</td>
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
      <br />
      <br />
      <h1 style={{ marginLeft: "2rem" }}>Tabla de Peces</h1>
      <Table
        striped
        bordered
        hover
        responsive
        variant="dark"
        style={{
          float: "left",
          marginLeft: "10px",
        }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Fecha de ingreso</th>
            <th>Tipo</th>
            <th>Precio unitario</th>
            <th>Cantidad</th>
            <th>Edad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {listAnimales.map((animales, index) => (
            <tr key={index}>
              <td>{animales.ProductoID}</td>
              <td>{animales.Nombre}</td>
              <td>{formatFecha(animales.FechaIngreso)}</td>
              <td>{animales.Tipo}</td>
              <td>${animales.PrecioUnitario}</td>
              {animales.Cantidad <= 50 ? (
                animales.Cantidad <= 20 ? (
                  <>
                    <td>
                      {animales.Cantidad} <br />
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
                      {animales.Cantidad} <br />
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
                <td>{animales.Cantidad}</td>
              )}
              <td>{animales.Edad}</td>
              <td className="text-center">
                <button
                  className="btn btn-primary action-button"
                  onClick={() => handleShow(index, animales.Tipo)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger action-button"
                  onClick={() => handleDelete(animales.ProductoID)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
export default MostrarAll;
