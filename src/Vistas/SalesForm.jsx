eslint-disable no-alert */ alert('foo');
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import "../styles/FormularioStyle.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { NavDropdown } from "react-bootstrap";
import Form from "react-bootstrap/Form";
const SalesForm = () => {
  const fecha = new Date();
  const v4options = uuidv4();
  const [quantity, setQuantity] = useState("");
  const [concept, setConcept] = useState("");
  const date =
    fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate();
  var folio = v4options.split("-", 1);
  const [seller, setSeller] = useState("");
  const [tipo, setTipo] = useState("Tilapias");
  const [unitQuant, setUnitQuant] = useState("");
  const [totalQuant, setTotalQuant] = useState(Number(quantity * unitQuant));
  const [salesList, setSalesList] = useState([]);
  const [estado, setEstado] = useState("Seleccionar el producto");
  const [ID, setID] = useState([]);
  const [producto, setProducto] = useState([]);
  const [copia, setCopia] = useState();
  const [prevenir,setPrevenir] = useState();
  const handleCantidadChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleConceptoChange = (opti, pre) => {
     setEstado(opti);
    setConcept(opti);
    setCopia(pre);
    setUnitQuant(pre.PrecioUnitario)
    setPrevenir(pre.Cantidad);
    
  };

  const handleTipoChange = (event) => {
    setTipo(event.target.value);
    setEstado("Seleccionar el producto");
  };
  const handleSellerChange = (event) => {
    setSeller(event.target.value);
  };

  const handleCancel = () => {
    setQuantity("");
    setConcept("");
    setTotalQuant("");
    setSeller("");
    setUnitQuant("");
    setEstado("Seleccionar el producto")
  };
  useEffect(() => {
    const respuesta = async () => {
      const res = await axios.get(`http://localhost:3006/selector/${tipo}`);
      setProducto(res.data);
    };
    respuesta();
  }, [producto, tipo]);

  const loadData = () => {
    axios.get("http://localhost:3006/ID").then((result) => {
      setID(result.data);
      for (let i = 0; i < ID.length; i++) {
        if (folio === ID[i].ID_Venta) {
          folio = uuidv4().split("-", 1);
          i = 0;
        }
      }
    });
    console.log(folio, date, quantity, concept, unitQuant, seller);
    axios
      .post("http://localhost:3006/ventas", {
        folio: folio,
        cantidad: Number(quantity),
        concepto: concept,
        fecha: date,
        total: Number(quantity * unitQuant),
        vendedor: seller,
        precioUni: Number(unitQuant),
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
     Swal.fire({
       title: "<strong>Confirmar</strong>",
       icon: "question",
       html: "¿Desea eliminar este registro?",
       showDenyButton: true,
       focusConfirm: false,
       confirmButtonText: '<i class="fa fa-thumbs-up"></i>Eliminar',
       denyButtonText: '<i class="fa fa-thumbs-down">Cancelar</i>',
     }).then((res) => {
       if (res.isConfirmed) {
         // Crear una copia de la lista de ventas actual
         const updatedSalesList = [...salesList];
          console.log(updatedSalesList)
         var Id = updatedSalesList[index].folio.toString();
         axios.post("http://localhost:3006/respaldo", {
           folio: updatedSalesList.folio,
           cantidad: Number(updatedSalesList.quantity),
           concepto: updatedSalesList.concept,
           fechaV: date,
           fechaE: updatedSalesList.date,
           total: Number(
             updatedSalesList.quantity * updatedSalesList.unitQuant
           ),
           vendedor: updatedSalesList.seller,
           precioUni: Number(updatedSalesList.unitQuant),
         });
         
         // Eliminar el objeto de venta en el índice proporcionado
         //updatedSalesList.splice(index, 1);
         console.log(updatedSalesList)
         // Actualizar la lista de ventas
         setSalesList(updatedSalesList);

         // Mostrar la alerta de éxito
        /* axios.delete(`http://localhost:3006/eliminarVenta/${Id}`).then(() => {
           Swal.fire({
             icon: "success",
             title: "Venta eliminada",
             text: "La venta se ha eliminado correctamente.",
           });
         });*/

         // Restablecer los campos del formulario
         setQuantity("");
         setConcept("");
         setTotalQuant("");
         setSeller("");
         setUnitQuant("");
         setEstado("Seleccionar el producto");
       }
     });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //Prevenir que el folio no este repetido de lo contrarior generar otro folio
    axios.get("http://localhost:3006/ID").then((result) => {
      setID(result.data);
      for (let i = 0; i < ID.length; i++) {
        if (folio === ID[i].ID_Venta) {
          folio = uuidv4().split("-", 1);
          i = 0;
        }
      }
    });
    if (estado === "Seleccionar el producto"){
      Swal.fire({
        icon: "warning",
        title: "Seleccione un producto",
        text: "Es necesario seleccionar un tipo",
      });
    }else{
        console.log(prevenir, quantity);
      if(quantity>prevenir){
        Swal.fire({
          icon: "warning",
          title: "Lo sentimos",
          text: "La cantidad de este producto es insuficiente para su venta\n\tCantidad en almacen:"+
          prevenir,
        });
        setQuantity("");
      }else{
        const newSale = {
          folio: folio,
          quantity: quantity,
          concept: concept,
          date: date,
          seller: seller,
          unitQuant: unitQuant,
          totalQuant: Number(quantity * unitQuant),
        };
        console.log(newSale.totalQuant);
        setSalesList([...salesList, newSale]);
        // Aquí puedes enviar los datos a la base de datos
        console.log("Folio: ", folio);
        console.log("Cantidad:", quantity);
        console.log("Concepto:", concept);
        console.log("Fecha:", date);
        console.log("Precio Total:", newSale.totalQuant);
        console.log("Vendedor:", seller);
        console.log("Precio Unitario:", unitQuant);
        loadData();
        // Restablecer los campos del formulario
        setQuantity("");
        setConcept("");
        setSeller("");
        setUnitQuant("");
    }
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <form onSubmit={handleSubmit} className="sales-form">
            <div className="form-group" style={{marginBottom:'15px'}}>
              <label htmlFor="tipo" className="form-label">Tipo</label>
              <Form.Select
              id="tipo"
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
              <NavDropdown
                title={estado}
                id="seleccionar-tipo-dropdown"
                required
                style={{
                  border: "solid 1px black",
                  borderRadius: "5px",
                  padding: "8px",
                  backgroundColor: "white",
                  marginRight: "10px",
                  height: "100%",
                  width: "100%",
                }}
              >
                {producto.map((pro, i) => (
                  <NavDropdown.Item
                    key={i}
                    value={pro.Nombre}
                    onClick={(e) => handleConceptoChange(pro.Nombre, pro)}
                  >
                    {pro.Nombre}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
              <label htmlFor="seller" className="form-label">
                Vendedor:
              </label>
              <input
                type="text"
                className="form-control"
                id="seller"
                value={seller}
                onChange={handleSellerChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="quantity" className="form-label">
                Cantidad Vendida:
              </label>
              <input
                type="number"
                className="form-control"
                id="quantity"
                value={quantity}
                onChange={handleCantidadChange}
                min={1}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
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
            <thead className="table table-striped table-borderedcolo">
              <tr>
                <th className="p-3">Folio</th>
                <th className="p-3">Concepto</th>
                <th className="p-3">Fecha</th>
                <th className="p-3">Cantidad</th>
                <th className="p-3">Precio total</th>
                <th className="p-3">Precio Unitario</th>
                <th className="p-3">Vendedor</th>
                <th className="p-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {salesList.map((sale, index) => (
                <tr key={index}>
                  <td>{sale.folio}</td>
                  <td>{sale.concept}</td>
                  <td>{sale.date}</td>
                  <td>{sale.quantity}</td>
                  <td>{sale.totalQuant}</td>
                  <td>{sale.unitQuant}</td>
                  <td>{sale.seller}</td>
                  <td className="text-center">
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

export default SalesForm;
