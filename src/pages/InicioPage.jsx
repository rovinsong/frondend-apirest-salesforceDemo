import { useNavigate } from "react-router-dom";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import React from "react";

function InicioPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center px-4">
      <Card className="w-full max-w-sm shadow-xl">
        <h2 className="text-xl font-bold text-center mb-6 text-[#222221]">
          📚 Menú Principal
        </h2>

        <div className="flex flex-col gap-4">
          <Button
            label="📘 Cursos"
            className="bg-[#EEBD2C] text-[#222221] hover:bg-yellow-400"
            onClick={() => navigate("/cursos")}
          />
          <Button
            label="👥 Estudiantes"
            className="bg-[#383C43] text-white hover:bg-[#2f3238]"
            onClick={() => navigate("/estudiantes")}
          />
          <Button
            label="📝 Asistencia"
            className="bg-green-500 hover:bg-green-600"
            onClick={() => navigate("/asistencia")}
          />
          <Button
            label="📊 Historial"
            className="bg-blue-500 hover:bg-blue-600"
            onClick={() => navigate("/historial")}
          />
          <Button
            label="📤 Cargar Estudiantes"
            className="bg-orange-400 text-black hover:bg-orange-500"
            onClick={() => navigate("/cargar-estudiantes")}
          />
        </div>
      </Card>
    </div>
  );
}

export default InicioPage;
