import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Panel } from "primereact/panel";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";

function CargarEstudiantesPage() {
  const [cursos, setCursos] = useState([]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);
  const toast = useRef(null);
  const navigate = useNavigate();

  const API = process.env.REACT_APP_API_URL;

  const cargarCursos = async () => {
    const res = await fetch(`${API}/cursos`);
    const data = await res.json();
    setCursos(data);
  };

  const onUpload = async ({ files }) => {
    const file = files[0];

    if (!cursoSeleccionado) {
      toast.current.show({
        severity: "warn",
        summary: "Curso requerido",
        detail: "Debes seleccionar un curso antes de subir el archivo",
      });
      return;
    }

    const formData = new FormData();
    formData.append("curso_id", cursoSeleccionado);
    formData.append("file", file);

    const response = await fetch(`${API}/estudiantes/cargar_csv`, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      toast.current.show({
        severity: "success",
        summary: "Estudiantes cargados",
        detail: "Los estudiantes fueron registrados y asignados correctamente",
      });
    } else {
      toast.current.show({
        severity: "error",
        summary: "Error al cargar",
        detail: "No se pudo cargar el archivo",
      });
    }
  };

  useEffect(() => {
    cargarCursos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Toast ref={toast} />
      <div className="max-w-xl mx-auto">
        <Panel header="📤 Cargar Estudiantes desde CSV">
          <div className="space-y-4">
            <Dropdown
              value={cursoSeleccionado}
              options={cursos.map((c) => ({ label: c.nombre, value: c.id }))}
              onChange={(e) => setCursoSeleccionado(e.value)}
              placeholder="Selecciona un curso"
              className="w-full"
            />
            <FileUpload
              name="file"
              mode="basic"
              accept=".csv"
              customUpload
              uploadHandler={onUpload}
              chooseLabel="Seleccionar CSV"
              className="w-full"
            />
          </div>
        </Panel>

        <Button
          label="Volver al Inicio"
          icon="pi pi-home"
          className="p-button-secondary w-full mt-4"
          onClick={() => navigate("/")}
        />
      </div>
    </div>
  );
}

export default CargarEstudiantesPage;
