/* global process */
import React, { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { Panel } from "primereact/panel";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";  // <-- importamos InputText
import { useNavigate } from "react-router-dom";

function CuentasPage() {
  const [cuentas, setCuentas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");        // 1) Estado para el término de búsqueda
  const navigate = useNavigate();
  const API = process.env.REACT_APP_API_URL;

  const obtenerCuentas = async () => {
    try {
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

  // 3) Filtramos el array según el término de búsqueda
  const filteredCuentas = cuentas.filter((cuenta) =>
    cuenta.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Panel header="📁 Cuentas desde Salesforce" className="mb-6">
        {/* 2) Campo de búsqueda */}
        <div className="mb-4">
          <span className="p-float-label">
            <InputText
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
            <label htmlFor="search">Buscar por nombre...</label>
          </span>
        </div>

        {filteredCuentas.length === 0 ? (
          <p>
            {searchTerm
              ? "No se encontraron cuentas con ese nombre."
              : "No hay cuentas disponibles."}
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {filteredCuentas.map((cuenta) => (
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
