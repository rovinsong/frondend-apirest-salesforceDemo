/* global process */
import React, { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { Panel } from "primereact/panel";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

function CuentasPage() {
  const [cuentas, setCuentas] = useState([]);
  const navigate = useNavigate();
  const API = process.env.REACT_APP_API_URL; // <— CORREGIDO

  const obtenerCuentas = async () => {
    try {
      console.log("API URL:", API);
      const res = await fetch(`${API}/accounts`);
      const json = await res.json();
      setCuentas(json.records || []);
    } catch (error) {
      console.error("Error al obtener cuentas:", error);
    }
  };

  useEffect(() => {
    obtenerCuentas();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Panel header="📁 Cuentas desde Salesforce" className="mb-6">
        {cuentas.length === 0 ? (
          <p>No hay cuentas disponibles.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {cuentas.map((cuenta) => (
              <Card key={cuenta.Id} className="shadow-md">
                <h3 className="font-bold text-lg">{cuenta.Name}</h3>
                <p>📞 {cuenta.Phone || "N/A"}</p>
                <p>🌐 {cuenta.Website || "N/A"}</p>
              </Card>
            ))}
          </div>
        )}
      </Panel>
      <Button
        label="Volver al Inicio"
        icon="pi pi-home"
        className="p-button-secondary"
        onClick={() => navigate("/")}
      />
    </div>
  );
}

export default CuentasPage;
