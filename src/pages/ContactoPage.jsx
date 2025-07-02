import React from "react";
import { Card } from "primereact/card";

function ContactoPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center">
      <Card title="Contáctanos" className="w-full max-w-lg">
        <p className="text-gray-700">
          Si tienes dudas o quieres más información, escríbenos a:  
          <strong> contacto@empresa.com</strong>
        </p>
      </Card>
    </div>
  );
}

export default ContactoPage;
