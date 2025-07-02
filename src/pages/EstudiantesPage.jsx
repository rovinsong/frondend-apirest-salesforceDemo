import { useNavigate } from "react-router-dom";
import { Panel } from "primereact/panel";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import React, { useEffect, useState } from "react";

function EstudiantesPage() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [formulario, setFormulario] = useState({
    nombre: "",
    apellidos: "",
    direccion: "",
    telefono: "",
  });
  const [asignaciones, setAsignaciones] = useState({});
  const navigate = useNavigate();

  const API = process.env.REACT_APP_API_URL;

  const cargarEstudiantes = async () => {
    try {
      const res = await fetch(`${API}/estudiantes`);
      const data = await res.json();
      setEstudiantes(data);
    } catch (error) {
      console.error("Error al cargar estudiantes:", error);
    }
  };

  const cargarCursos = async () => {
    try {
      const res = await fetch(`${API}/cursos`);
      const data = await res.json();
      setCursos(data);
    } catch (error) {
      console.error("Error al cargar cursos:", error);
    }
  };

  const crearEstudiante = async () => {
    const { nombre, apellidos } = formulario;
    if (!nombre.trim() || !apellidos.trim()) return;

    try {
      await fetch(`${API}/estudiantes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formulario),
      });

      setFormulario({ nombre: "", apellidos: "", direccion: "", telefono: "" });
      cargarEstudiantes();
    } catch (error) {
      console.error("Error al crear estudiante:", error);
    }
  };

  const asignarCursos = async (estudianteId) => {
    const cursosSeleccionados = Object.entries(asignaciones[estudianteId] || {})
      .filter(([_, seleccionado]) => seleccionado)
      .map(([cursoId]) => Number(cursoId));

    try {
      await fetch(`${API}/estudiantes/${estudianteId}/cursos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cursos: cursosSeleccionados }),
      });

      alert("Cursos asignados correctamente.");
    } catch (error) {
      console.error("Error al asignar cursos:", error);
    }
  };

  const toggleCurso = (estudianteId, cursoId) => {
    setAsignaciones((prev) => ({
      ...prev,
      [estudianteId]: {
        ...(prev[estudianteId] || {}),
        [cursoId]: !((prev[estudianteId] || {})[cursoId]),
      },
    }));
  };

  useEffect(() => {
    cargarEstudiantes();
    cargarCursos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-xl mx-auto">
        <Panel header="Gestión de Estudiantes" className="mb-4">
          <div className="space-y-3 mb-4">
            <input
              type="text"
              placeholder="Nombre"
              className="p-inputtext p-component w-full"
              value={formulario.nombre}
              onChange={(e) => setFormulario({ ...formulario, nombre: e.target.value })}
            />
            <input
              type="text"
              placeholder="Apellidos"
              className="p-inputtext p-component w-full"
              value={formulario.apellidos}
              onChange={(e) => setFormulario({ ...formulario, apellidos: e.target.value })}
            />
            <input
              type="text"
              placeholder="Dirección"
              className="p-inputtext p-component w-full"
              value={formulario.direccion}
              onChange={(e) => setFormulario({ ...formulario, direccion: e.target.value })}
            />
            <input
              type="text"
              placeholder="Teléfono"
              className="p-inputtext p-component w-full"
              value={formulario.telefono}
              onChange={(e) => setFormulario({ ...formulario, telefono: e.target.value })}
            />
            <Button
              label="Agregar Estudiante"
              icon="pi pi-user-plus"
              onClick={crearEstudiante}
              className="w-full"
            />
          </div>

          <ul className="space-y-4">
            {estudiantes.map((est) => (
              <li key={est.id} className="bg-white p-3 rounded shadow">
                <h2 className="text-lg font-semibold mb-1">{est.nombre} {est.apellidos}</h2>
                <p className="text-sm text-gray-600 mb-1">📍 {est.direccion}</p>
                <p className="text-sm text-gray-600 mb-2">📞 {est.telefono}</p>

                <p className="text-sm text-gray-600 mb-2">Asignar a cursos:</p>
                <div className="flex flex-wrap gap-3">
                  {cursos.map((curso) => (
                    <div key={curso.id} className="flex items-center gap-2 text-sm">
                      <Checkbox
                        inputId={`curso-${est.id}-${curso.id}`}
                        checked={asignaciones[est.id]?.[curso.id] || false}
                        onChange={() => toggleCurso(est.id, curso.id)}
                      />
                      <label htmlFor={`curso-${est.id}-${curso.id}`}>{curso.nombre}</label>
                    </div>
                  ))}
                </div>
                <Button
                  label="Guardar asignación"
                  icon="pi pi-save"
                  className="mt-3 p-button-sm"
                  onClick={() => asignarCursos(est.id)}
                />
              </li>
            ))}
          </ul>
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

export default EstudiantesPage;
