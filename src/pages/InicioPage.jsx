import { useNavigate } from "react-router-dom";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import React from "react";

function InicioPage() {
  const navigate = useNavigate();
  <h1 className="text-3xl font-bold underline text-blue-600">
  ¡Tailwind está funcionando!
</h1>

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center px-4">
      <Card className="w-full max-w-sm shadow-xl">
        <h2 className="text-xl font-bold text-center mb-6 text-[#222221]">
          📚 Menú Principal
        </h2>

        <div className="flex flex-col gap-4">
              <Button
                label="👤 Cuentas"
                className="bg-[#E0E0E0] text-[#222222] hover:bg-blue-300"
                onClick={() => navigate("/cuentas")}
              />

              <Button
                label="✉️ Contáctanos"
                className="bg-[#FFD54F] text-[#222222] hover:bg-yellow-500"
                onClick={() => navigate("/contacto")}
              />
        </div>
      </Card>
    </div>
  );
}

export default InicioPage;
