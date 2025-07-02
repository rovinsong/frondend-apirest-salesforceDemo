import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Panel } from "primereact/panel";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";

function AsistenciaPage() {
  const [cursos, setCursos] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);
  const [fecha, setFecha] = useState(new Date());
  const [asistencia, setAsistencia] = useState({});
  const navigate = useNavigate();

  const API = process.env.REACT_APP_API_URL;

  const cargarCursos = async () => {
    const res = await fetch(`${API}/cursos`);
    const data = await res.json();
    setCursos(data);
  };

  const cargarEstudiantes = async () => {
    if (!cursoSeleccionado) return;

    const res = await fetch(`${API}/estudiantes`);
    const data = await res.json();
    setEstudiantes(data);
    setAsistencia({});
  };

  const guardarAsistencia = async () => {
    if (!cursoSeleccionado || !fecha) return;

    const registros = estudiantes.map((est) => ({
      estudiante_id: est.id,
      presente: asistencia[est.id] || false,
    }));

    await fetch(`${API}/asistencia`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        curso_id: cursoSeleccionado,
        fecha: fecha.toISOString().split("T")[0],
        registros,
      }),
    });

    alert("Asistencia guardada correctamente.");
  };

  const toggleAsistencia = (estId) => {
    setAsistencia((prev) => ({
      ...prev,
      [estId]: !prev[estId],
    }));
  };

  useEffect(() => {
    cargarCursos();
  }, []);

  useEffect(() => {
    cargarEstudiantes();
  }, [cursoSeleccionado]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-xl mx-auto">
        <Panel header="Registro de Asistencia" className="mb-4">
          <div className="mb-4 space-y-3">
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
          </div>

          {cursoSeleccionado && (
            <div className="space-y-3">
              {estudiantes.map((est) => (
                <div
                  key={est.id}
                  className="flex justify-between items-center bg-white p-2 rounded shadow"
                >
                  <span>{est.nombre} {est.apellidos}</span>
                  <Checkbox
                    inputId={`asistencia-${est.id}`}
                    checked={asistencia[est.id] || false}
                    onChange={() => toggleAsistencia(est.id)}
                  />
                </div>
              ))}
              <Button
                label="Guardar Asistencia"
                icon="pi pi-save"
                className="w-full mt-4"
                onClick={guardarAsistencia}
              />
            </div>
          )}
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

export default AsistenciaPage;
