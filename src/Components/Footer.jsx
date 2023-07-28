import React from 'react'
import facebook from "../img/facebook.ico";
import gamail from "../img/gmail.ico";
import whatsapp from "../img/whatsapp.ico";

export function Footer() {
  return (
    <footer
        className="col-sm-6n text-center"
        id="cont4"
        style={{ width: "100%", height: "130px",}}
      >
        <p style={{fontFamily:'arial black'}}>Para mas información contactanos a nuestras redes sociales:</p>
        <a href="https://www.facebook.com/KAYgranjaAcuicolayPescaderia">
          <img
            src={facebook}
            alt=""
            style={{ width: "60px", height: "60px", marginLeft: "40px", }}
          ></img>
        </a>
        <a href="https://www.facebook.com/KAYgranjaAcuicolayPescaderia">
          <img
            src={gamail}
            alt=""
            style={{ width: "60px", height: "60px", marginLeft: "40px" }}
          ></img>
        </a>
        <a href="https://www.facebook.com/KAYgranjaAcuicolayPescaderia">
          <img
            src={whatsapp}
            alt=""
            style={{ width: "60px", height: "60px", marginLeft: "40px" }}
          ></img>
        </a>
      </footer>
  );
}
