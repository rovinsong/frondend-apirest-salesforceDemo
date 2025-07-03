import React from "react";
import logoEntel from "../assets/logoEntel.png";
import logoSalesforce from "../assets/logoSalesforce.png";

function InicioPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {/* Y la usas así */}
      <img
        src={logoEntel}
        alt="Descripción de la imagen"
        className="mb-6 w-48 h-auto"
      />
      <img
        src={logoSalesforce}
        alt="Descripción de la imagen"
        className="mb-6 w-48 h-auto"
      />


      <h1 className="text-5xl font-bold mb-4">Bienvenido a Salesforce Demo</h1>
      <p className="text-gray-700 text-lg">
        Usa el menú superior para navegar entre Inicio, Cuentas y Contáctanos.
      </p>
    </div>
  );
}

export default InicioPage;
