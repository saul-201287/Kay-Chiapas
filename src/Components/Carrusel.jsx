import Carousel from "react-bootstrap/Carousel";
import imag1 from "../img/img1.jpg";
import imag2 from "../img/img4.jpg";
import imag3 from "../img/img5.jpg";
import imag4 from "../img/img6.jpg";
import imag5 from "../img/img7.jpg";
function Carrusel() {
  return (
    <Carousel
      fade
      variant="dark"
      className="text-center"
      style={{
        width: "650px",
        height: "390px",
        position: "relative",
        left: "28%",
        top: "100px",
        textAlign: "justify",
        padding: "3px",
      }}
    >
      <Carousel.Item
        interval={2500}
        style={{ width: "520px", height: "370px" }}
      >
        <img
          className="tamanio mx-auto"
          src={imag1}
          alt="First slide"
          interval={3000}
          style={{ width: "520px", height: "370px" }}
        />
      </Carousel.Item>

      <Carousel.Item
        interval={2500}
        style={{ width: "520px", height: "370px" }}
      >
        <img
          className="tamanio mx-auto"
          src={imag2}
          alt="First slide"
          interval={2500}
          style={{ width: "520px", height: "370px" }}
        />
      </Carousel.Item>
      <Carousel.Item
        interval={2500}
        style={{ width: "520px", height: "370px" }}
      >
        <img
          className="tamanio mx-auto"
          src={imag3}
          alt="First slide"
          interval={2500}
          style={{ width: "520px", height: "370px" }}
        />
      </Carousel.Item>
      <Carousel.Item
        interval={2500}
        style={{ width: "520px", height: "370px" }}
      >
        <img
          className="tamanio mx-auto"
          src={imag4}
          alt="First slide"
          interval={2500}
          style={{ width: "520px", height: "370px" }}
        />
      </Carousel.Item>
      <Carousel.Item
        interval={2500}
        style={{ width: "520px", height: "370px" }}
      >
        <img
          className="tamanio mx-auto"
          src={imag5}
          alt="First slide"
          interval={2500}
          style={{ width: "520px", height: "370px" }}
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default Carrusel;
