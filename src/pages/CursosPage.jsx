import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Panel } from "primereact/panel";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";

function CursosPage() {
  const [cursos, setCursos] = useState([]);
  const [nuevoCurso, setNuevoCurso] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [nombreEditado, setNombreEditado] = useState("");
  const navigate = useNavigate();
  const toast = React.useRef(null);

  const API = process.env.REACT_APP_API_URL;

  const obtenerCursos = async () => {
    const res = await fetch(`${API}/cursos`);
    const data = await res.json();
    setCursos(data);
  };

  const crearCurso = async () => {
    if (!nuevoCurso.trim()) return;

    await fetch(`${API}/cursos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre: nuevoCurso }),
    });

    setNuevoCurso("");
    obtenerCursos();
    toast.current.show({ severity: "success", summary: "Curso creado" });
  };

  const eliminarCurso = (id) => {
    confirmDialog({
      message: "¿Eliminar este curso?",
      header: "Confirmación",
      icon: "pi pi-exclamation-triangle",
      accept: async () => {
        await fetch(`${API}/cursos/${id}`, { method: "DELETE" });
        obtenerCursos();
        toast.current.show({ severity: "warn", summary: "Curso eliminado" });
      },
    });
  };

  const iniciarEdicion = (curso) => {
    setEditandoId(curso.id);
    setNombreEditado(curso.nombre);
  };

  const guardarEdicion = async (id) => {
    await fetch(`${API}/cursos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre: nombreEditado }),
    });

    setEditandoId(null);
    setNombreEditado("");
    obtenerCursos();
    toast.current.show({ severity: "success", summary: "Curso actualizado" });
  };

  useEffect(() => {
    obtenerCursos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4">
      <Toast ref={toast} />
      <ConfirmDialog />

      <div className="max-w-2xl mx-auto">
        <Panel header="📘 Gestión de Cursos" className="mb-4 shadow-lg">
          <div className="flex gap-3 mb-4 items-center">
            <InputText
              placeholder="Nuevo curso"
              className="flex-1"
              value={nuevoCurso}
              onChange={(e) => setNuevoCurso(e.target.value)}
            />
            <Button label="Agregar" icon="pi pi-plus" onClick={crearCurso} />
          </div>

          <div className="space-y-3">
  {cursos.map((curso) => (
    <Card key={curso.id} className="shadow-sm">
      <div className="flex justify-between items-center">
        {editandoId === curso.id ? (
          <InputText
            value={nombreEditado}
            onChange={(e) => setNombreEditado(e.target.value)}
            className="flex-1 mr-3"
          />
        ) : (
          <span className="text-lg font-medium flex-1">{curso.nombre}</span>
        )}
        <div className="flex gap-2">
          {editandoId === curso.id ? (
            <Button
              icon="pi pi-check"
              className="p-button-sm p-button-success"
              onClick={() => guardarEdicion(curso.id)}
              tooltip="Guardar"
            />
          ) : (
            <Button
              icon="pi pi-pencil"
              className="p-button-sm p-button-info"
              onClick={() => iniciarEdicion(curso)}
              tooltip="Editar"
            />
          )}
          <Button
            icon="pi pi-trash"
            className="p-button-sm p-button-danger"
            onClick={() => eliminarCurso(curso.id)}
            tooltip="Eliminar"
          />
        </div>
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

export default CursosPage;
