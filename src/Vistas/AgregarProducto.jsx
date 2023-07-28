import { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import "../styles/Tabla.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
function capitalize(word) {
  return word[0].toUpperCase() + word.slice(1);
}
const AgregarProducto = () => {
  const v4options = uuidv4();
  const fecha = new Date();
  const date =fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate();
  var folio = v4options.split("-", 1);
  const [cantidad, setCantidad] = useState("");
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("Tilapias");
  const [unidadMedida, setunidadMedida] = useState("Piezas");
  const [ver, setVer] = useState(true);
  const [edad, setEdad] = useState(0);
  const [precio, setPrecio] = useState("");
  const [proveedor, setProveedor] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [salesList, setSalesList] = useState([]);
  const [selectedSale, setSelectedSale] = useState(null);

  const handleCantidadChange = (event) => {
    setCantidad(event.target.value);
  };

  const handleEdadChange = (event) => {
    setEdad(event.target.value);
  };
  const handleunidadMedidaChange = (event) => {
    setunidadMedida(event.target.value);
  };
  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };
  const handleTipoChange = (event) => {
    setTipo(event.target.value);
    if (event.target.value === "Mojarras" || event.target.value === "Tilapias") {
      setVer(true);
    } else {
   if(event.target.value === "Alimentos" ){
    setunidadMedida("Kilogramos");
  } 
  setVer(false);
    }
  };
  const handlePrecioChange = (event) => {
    setPrecio(event.target.value);
  };

  const handleProveedorChange = (event) => {
    setProveedor(event.target.value);
  };

  const handleCancel = () => {
    setCantidad("");
    setNombre("");
    setTipo("Tilapias");
    setunidadMedida("Piezas");
    setEdad(0);
    setPrecio("");
    setProveedor("");
  };

  const handleEdit = (index) => {
    const saleToEdit = salesList[index];
    setSelectedSale(saleToEdit);
    setCantidad(saleToEdit.cantidad);
    setNombre(saleToEdit.nombre);
    setEdad(saleToEdit.edad);
    setTipo(saleToEdit.tipo);
    setunidadMedida(saleToEdit.unidadMedida);
    setPrecio(saleToEdit.precio);
    setProveedor(saleToEdit.proveedor);
    console.log(salesList[index]);
    setIsEditing(true);
  };

  const loadData = () => {
    console.log(
      folio,
      nombre,
      precio,
      cantidad,
      tipo,
      proveedor,
      unidadMedida,
      edad
    );
    axios
      .post("http://localhost:3006/producto-nuevo", {
        folio: folio,
        nombre: capitalize(nombre),
        precio: Number(precio),
        cantidad: Number(cantidad),
        proveedor: proveedor,
        tipo: tipo,
        unidadMedida: unidadMedida,
        edad: edad,
        fecha: date,
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Datos guardados",
          text: "Los datos se han guardado correctamente.",
        });
      });
   
  };

  const handleDelete = (index) => {
    // Crear una copia de la lista de ventas actual
    const updatedSalesList = [...salesList];
    var Id = updatedSalesList[index].folio.toString();
    // Eliminar el objeto de venta en el índice proporcionado
    updatedSalesList.splice(index, 1);

    // Actualizar la lista de ventas
    setSalesList(updatedSalesList);

    // Mostrar la alerta de éxito
    axios.delete(`http://localhost:3006/producto/${Id}`).then(() => {
      Swal.fire({
        icon: "success",
        title: "Producto eliminado",
        text: "EL producto se ha eliminado correctamente.",
      });
    });

    // Restablecer los campos del formulario
    setCantidad("");
    setNombre("");
    setTipo("Tilapias");
    setunidadMedida("Piezas");
    setPrecio("");
    setEdad(0);
    setProveedor("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (selectedSale) {
      // Crear una copia del objeto seleccionado para editar
      const editedSale = { ...selectedSale };

      // Verificar qué campos han cambiado y aplicar las modificaciones
      let hasChanges = false;

      if (cantidad !== selectedSale.cantidad) {
        editedSale.cantidad = cantidad;
        hasChanges = true;
      }
      if (edad !== selectedSale.edad) {
        editedSale.edad = edad;
        hasChanges = true;
      }
      if (nombre !== selectedSale.nombre) {
        editedSale.nombre = nombre;
        hasChanges = true;
      }
      if (tipo !== selectedSale.tipo) {
        editedSale.tipo = tipo;
        hasChanges = true;
      }
      if (unidadMedida !== selectedSale.unidadMedida) {
        editedSale.unidadMedida = unidadMedida;
        hasChanges = true;
      }
      if (precio !== selectedSale.precio) {
        editedSale.precio = precio;
        hasChanges = true;
      }
      if (proveedor !== selectedSale.proveedor) {
        editedSale.proveedor = proveedor;
        hasChanges = true;
      }
      axios.put("http://localhost:3006/modificar-producto", {
        folio: editedSale.folio,
        nombre: editedSale.nombre,
        precio: Number(editedSale.precio),
        cantidad: Number(editedSale.cantidad),
        proveedor: editedSale.proveedor,
        tipo: editedSale.tipo,
        unidadMedida: editedSale.unidadMedida,
        edad: editedSale.edad,
      
      });
        console.log(editedSale);
      // Repite este proceso para cada campo editable que desees permitir

      if (hasChanges) {
        // Actualizar la lista de ventas con el objeto modificado
        const updatedSalesList = salesList.map((sale) =>
          sale === selectedSale ? editedSale : sale
        );
        setSalesList(updatedSalesList);

        // Restablecer el objeto seleccionado
        setSelectedSale(null);

        // Mostrar la alerta de éxito
        Swal.fire({
          icon: "success",
          title: "Datos editados",
          text: "Los datos se han editado correctamente.",
        });
        // Restablecer los campos del formulario
        setCantidad("");
        setNombre("");
        setTipo("Tilapias");
        setunidadMedida("Piezas");
        setPrecio("");
        setProveedor("");
        setEdad(0);
      } else {
        // Mostrar una alerta si no se detectaron cambios
        Swal.fire({
          icon: "info",
          title: "Sin cambios",
          text: "No se han realizado cambios en los datos.",
        });
      }
    } else {
        axios
          .get(`http://localhost:3006/count/${nombre}&${tipo}`)
          .then((result) => {
            console.log(result.data, nombre, tipo);
            if (result.data[0].c !== 0) {
              Swal.fire({
                icon: "warning",
                title: "Elemento repetido",
                text: "El producto ya se encuentra registrado",
              });
              salesList.splice(salesList.length - 1, 1);
              return;
            } else {
              const newSale = {
                folio: folio,
                cantidad: cantidad,
                nombre: nombre,
                tipo: tipo,
                unidadMedida: unidadMedida,
                precio: precio,
                proveedor: proveedor,
                edad: edad,
                fecha: date,
              };
              setSalesList([...salesList, newSale]);
              loadData();
            }
          });
     
      
      // Aquí puedes enviar los datos a la base de datos
      console.log("Folio: ", folio);
      console.log("Cantidad:", cantidad);
      console.log("Nombre:", nombre);
      console.log("tipo:", tipo);
      console.log("edad:", edad);
      console.log("unidadMedida:", unidadMedida);
      console.log("Vendedor:", precio);
      console.log("Proveedor:", proveedor);
      
      // Restablecer los campos del formulario
      setCantidad("");
      setNombre("");
      setTipo("Tilapias");
      setunidadMedida("Piezas");
      setEdad(0);
      setPrecio("");
      setProveedor("");
      // Cambiar el modo entre edición y guardado
      setIsEditing(!isEditing);
      // Restablecer el objeto seleccionado
      setSelectedSale(null);
    }
  };

  return (
    <div className="container">
      <nav
        className="navbar navbar-expand-lg custom-navbar"
        style={{
          justifyContent: "center",
          color: "white",
          backgroundColor: "#202930",
          marginBottom: "20px",
        }}
      >
        <p style={{ fontSize: "20pt", margin: "auto" }}>
          Registro de inventario
        </p>
      </nav>

      <div className="row">
        <div className="col-md-3">
          <form onSubmit={handleSubmit} className="sales-form">
            <div className="form-group">
              <label htmlFor="nombre" className="form-label">
                Tipo:
              </label>
              <Form.Select
                aria-label="Default select example"
                value={tipo}
                onChange={(e) => handleTipoChange(e)}
              >
                <option value="Tilapias">Tilapias</option>
                <option value="Mojarras">Mojarras</option>
                <option value="Herramientas">Herramientas</option>
                <option value="Medicamentos">Medicamentos</option>
                <option value="Alimentos">Alimentos</option>
              </Form.Select>
            </div>
            <div className="form-group">
              <label htmlFor="nombre" className="form-label">
                Nombre del Producto:
              </label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                value={nombre}
                onChange={handleNombreChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="precioU" className="form-label">
                Precio unitario:
              </label>
              <input
                type="number"
                className="form-control"
                id="precioU"
                value={precio}
                onChange={handlePrecioChange}
                required
                min={1}
              />
            </div>
            <div className="form-group">
              <label htmlFor="cantidad" className="form-label">
                Cantidad:
              </label>
              <input
                type="number"
                className="form-control"
                id="cantidad"
                value={cantidad}
                onChange={handleCantidadChange}
                min={1}
                required
              />
            </div>

            {!ver ? (
              <>
                <div className="form-group">
                  <label htmlFor="proveedor" className="form-label">
                    Proveedor:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="proveedor"
                    value={proveedor}
                    onChange={handleProveedorChange}
                    min={1}
                    required
                  />
                </div>
                {tipo === "Herramientas" ? (
                  <div className="form-group">
                    <label htmlFor="unidadMedida" className="form-label">
                      Unidad de medida:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="unidadMedida"
                      value={unidadMedida}
                      onChange={handleunidadMedidaChange}
                      required
                    />
                  </div>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <div className="form-group">
                
                <label htmlFor="edad" className="form-label">
                  Edad:
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="edad"
                  value={edad}
                  onChange={handleEdadChange}
                  required
                  min={1}
                />
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              disabled={nombre === true}
            >
              Guardar
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancel}
            >
              Cancelar
            </button>
          </form>
        </div>

        <div className="col-md-9">
          <table className="table-responsive">
            <thead
              className="table table-striped table-borderedcolor table-leftcolumn"
              style={{ border: "black 1px solid" }}
            >
              <tr>
                <th className="p-3">Codigo</th>
                <th className="p-3">Nombre</th>
                <th className="p-3">Precio Unitario</th>
                <th className="p-3">Cantidad</th>
                <th className="p-3">Tipo</th>
                <th className="p-3">Proveedor</th>
                <th className="p-3">Unidad de medida</th>
                <th className="p-3">Edad</th>
                <th className="p-3">Fecha</th>
                <th className="p-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {salesList.map((sale, index) => (
                <tr key={index}>
                  <td>{sale.folio}</td>
                  <td>{sale.nombre}</td>
                  <td>{sale.precio}</td>
                  <td>{sale.cantidad}</td>
                  <td>{sale.tipo}</td>
                  <td>{sale.proveedor === "" ? "NA" : sale.proveedor}</td>
                  <td>{sale.unidadMedida === "" ? "NA" : sale.unidadMedida}</td>
                  <td>{sale.edad === 0 ? "NA" : sale.edad}</td>
                  <td>{sale.fecha}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-primary action-button"
                      onClick={() => handleEdit(index)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger action-button"
                      onClick={() => handleDelete(index)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AgregarProducto;
