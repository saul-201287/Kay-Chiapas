import React, { useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import "../styles/Compras.css";

const Compras = () => {
  const [inventoryItems, setInventoryItems] = useState([
    {
      buyId: 123456,
      date: "12-10-2010",
      quantity: 100,
      unit: 100,
      supplier: "Juan",
      id: 1,
    },
    {
      buyId: 234567,
      date: "02-12-2010",
      quantity: 50,
      unit: 100,
      supplier: "Juan",
      id: 2,
    },
    {
      buyId: 345678,
      date: "12-01-2020",
      quantity: 150,
      unit: 100,
      supplier: "Juan",
      id: 3,
    },
    {
      buyId: 456789,
      date: "23-05-2022",
      quantity: 50,
      unit: 100,
      supplier: "Juan",
      id: 4,
    },
    {
      buyId: 567890,
      date: "15-11-2023",
      quantity: 100,
      unit: 100,
      supplier: "Juan",
      id: 5,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [formValues, setFormValues] = useState({
    buyId: "",
    date: "",
    quantity: "",
    unit: "",
    supplier: "",
    id: "",
  });
  const [selectedItemId, setSelectedItemId] = useState(null);

  const handleAddItem = () => {
    setShowModal(true);
    setFormValues({
      buyId: "",
      date: "",
      quantity: "",
      unit: "",
      supplier: "",
      id: "",
    });
    setSelectedItemId(null);
  };

  const handleSaveItem = () => {
    const newItem = {
      buyId: formValues.buyId,
      date: formValues.date,
      quantity: formValues.quantity,
      unit: formValues.unit,
      supplier: formValues.supplier,
      id: formValues.id,
    };
    setInventoryItems([...inventoryItems, newItem]);
    setShowModal(false);
  };

  const handleEditItem = (itemId) => {
    const itemToEdit = inventoryItems.find((item) => item.buyId === itemId);
    setFormValues(itemToEdit);
    setSelectedItemId(itemId);
    setShowModal(true);
  };

  const handleUpdateItem = () => {
    const updatedItems = inventoryItems.map((item) =>
      item.buyId === selectedItemId ? formValues : item
    );
    setInventoryItems(updatedItems);
    setShowModal(false);
  };

  const handleDeleteItem = (itemId) => {
    const itemToDelete = inventoryItems.find((item) => item.buyId === itemId);
    const confirmation = window.confirm(
      `¿Estás seguro de eliminar "${itemToDelete.buyId}"?`
    );
    if (confirmation) {
      const updatedItems = inventoryItems.filter(
        (item) => item.buyId !== itemId
      );
      setInventoryItems(updatedItems);
      setShowModal(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div>
      <Table striped bordered hover responsive className="container">
        <thead>
          <p className="titulo2">Control de Compras</p>
          <tr>
            <th>Compra-ID</th>
            <th>Fecha de Compra</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Proveedor</th>
            <th>Producto-ID</th>
          </tr>
        </thead>
        <tbody>
          {inventoryItems.map((item) => (
            <tr key={item.buyId}>
              <td>{item.buyId}</td>
              <td>{item.date}</td>
              <td>{item.quantity}</td>
              <td>{item.unit}</td>
              <td>{item.supplier}</td>
              <td>{item.id}</td>
                <Button
                  variant="primary"
                  className="contenedor"
                  onClick={handleAddItem}
                >
                  Agregar
                </Button>
                <Button
                  variant="danger"
                  className="contenedor1"
                  onClick={() => handleDeleteItem(item.buyId)}
                >
                  Eliminar
                </Button>{" "}
                <Button
                  variant="warning"
                  className="contenedor2"
                  onClick={() => handleEditItem(item.buyId)}
                >
                  Modificar
                </Button>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedItemId ? "Modificar Compra" : "Agregar Compra"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formId">
              <Form.Label>Compra-ID</Form.Label>
              <Form.Control
                type="text"
                name="buyId"
                value={formValues.buyId}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formDate">
              <Form.Label>Fecha de Compra</Form.Label>
              <Form.Control
                type="text"
                name="date"
                value={formValues.date}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formQuantity">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={formValues.quantity}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formUnit">
              <Form.Label>Precio Unitario</Form.Label>
              <Form.Control
                type="text"
                name="unit"
                value={formValues.unit}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formSupplier">
              <Form.Label>Proveedor</Form.Label>
              <Form.Control
                type="text"
                name="supplier"
                value={formValues.supplier}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="formId">
              <Form.Label>Producto-ID</Form.Label>
              <Form.Control
                type="text"
                name="id"
                value={formValues.id}
                onChange={handleFormChange}
              />
            </Form.Group>
            <br></br>
            <br></br>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {selectedItemId ? (
            <Button
              variant="primary"
              className="contenedor3"
              onClick={handleUpdateItem}
            >
              Aceptar
            </Button>
          ) : (
            <Button
              variant="primary"
              className="contenedor4"
              onClick={handleSaveItem}
            >
              Guardar
            </Button>
          )}
          <Button
            variant="danger"
            className="contenedor5"
            onClick={handleCloseModal}
          >
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default Compras;
