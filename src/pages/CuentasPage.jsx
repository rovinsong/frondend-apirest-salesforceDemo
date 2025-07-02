import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Panel } from "primereact/panel";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";

function AccountsPage() {
  const [accounts, setAccounts] = useState([]);
  const [filtro, setFiltro] = useState("");
  const navigate = useNavigate();
  const toast = useRef(null);

  const API = import.meta.env.VITE_API_URL || "https://backen-webservice-salesforce.onrender.com";

  const obtenerAccounts = async () => {
    try {
      const res = await fetch(`${API}/accounts`);
      const data = await res.json();
      setAccounts(data.records);
    } catch (error) {
      toast.current.show({ severity: "error", summary: "Error al cargar cuentas" });
    }
  };

  useEffect(() => {
    obtenerAccounts();
  }, []);

  const cuentasFiltradas = accounts.filter(account =>
    account.Name.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4">
      <Toast ref={toast} />

      <div className="max-w-4xl mx-auto">
        <Panel header="🏢 Cuentas de Salesforce" className="mb-4 shadow-lg">
          <div className="mb-4">
            <InputText
              placeholder="Buscar por nombre..."
              className="w-full"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            />
          </div>

          <div className="space-y-3">
            {cuentasFiltradas.map((account, index) => (
              <Card key={index} className="shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div><strong>Nombre:</strong> {account.Name || "-"}</div>
                  <div><strong>Teléfono:</strong> {account.Phone || "-"}</div>
                  <div><strong>Sitio Web:</strong> {account.Website || "-"}</div>
                </div>
              </Card>
            ))}
          </div>
        </Panel>

        <Button
          label="Volver al Inicio"
          icon="pi pi-home"
          className="p-button-secondary w-full"
          onClick={() => navigate("/")}
        />
      </div>
    </div>
  );
}

export default AccountsPage;
