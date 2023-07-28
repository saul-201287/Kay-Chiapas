import React from "react";
import { Navigate } from "react-router-dom";
const RutasProtegidas = ({ puesto, children, redirectPath = "/login" }) => {
  if (!puesto) {
    console.log("ERROR", puesto);
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};
export default RutasProtegidas;
