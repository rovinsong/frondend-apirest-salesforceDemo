import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Panel } from "primereact/panel";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";

function HistorialPage() {
  const [cursos, setCursos] = useState([]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);
  const [fecha, setFecha] = useState(null);
  const [registros, setRegistros] = useState([]);
  const navigate = useNavigate();

  const API = process.env.REACT_APP_API_URL;

  const cargarCursos = async () => {
    try {
      const res = await fetch(`${API}/cursos`);
      const data = await res.json();
      setCursos(data);
    } catch (error) {
      console.error("Error al cargar cursos:", error);
    }
  };

  const buscarAsistencia = async () => {
    if (!cursoSeleccionado || !fecha) return;

    try {
      const fechaISO = fecha.toISOString().split("T")[0];
      const res = await fetch(
        `${API}/asistencia?curso_id=${cursoSeleccionado}&fecha=${fechaISO}`
      );
      const data = await res.json();
      setRegistros(data);
    } catch (error) {
      console.error("Error al buscar asistencia:", error);
    }
  };

  useEffect(() => {
    cargarCursos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-xl mx-auto">
        <Panel header="📊 Historial de Asistencia">
          <div className="space-y-4">
            <Dropdown
              value={cursoSeleccionado}
              options={cursos.map((c) => ({ label: c.nombre, value: c.id }))}
              onChange={(e) => setCursoSeleccionado(e.value)}
              placeholder="Selecciona un curso"
              className="w-full"
            />
            <Calendar
              value={fecha}
              onChange={(e) => setFecha(e.value)}
              dateFormat="yy-mm-dd"
              showIcon
              className="w-full"
            />
            <Button
              label="Buscar"
              icon="pi pi-search"
              onClick={buscarAsistencia}
              className="w-full"
            />
          </div>

          {registros.length > 0 && (
            <div className="mt-5 space-y-2">
              {registros.map((r) => (
                <div
                  key={r.estudiante_id}
                  className="flex justify-between items-center bg-white p-2 rounded shadow"
                >
                  <span>
                    {r.nombre} {r.apellidos}
                  </span>
                  <Tag
                    severity={r.presente ? "success" : "danger"}
                    value={r.presente ? "Presente" : "Ausente"}
                  />
                </div>
              ))}
            </div>
          )}
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

export default HistorialPage;
