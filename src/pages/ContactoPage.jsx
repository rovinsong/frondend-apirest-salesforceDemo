import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { useNavigate } from "react-router-dom";

function ContactoPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card title="✉️ Contáctanos" className="w-full max-w-md shadow-lg">
        <form
          action="https://webto.salesforce.com/servlet/servlet.WebToCase?encoding=UTF-8&orgId=00DKZ000004eqNl"
          method="POST"
          className="p-fluid"
        >
          <input type="hidden" name="orgid" value="00DKZ000004eqNl" />
          <input type="hidden" name="retURL" value="http://" />

          <div className="p-field mb-3">
            <label htmlFor="name" className="p-d-block p-mb-2">
              Contact Name
            </label>
            <InputText id="name" name="name" maxLength={80} size={20} />
          </div>

          <div className="p-field mb-3">
            <label htmlFor="email" className="p-d-block p-mb-2">
              Email
            </label>
            <InputText id="email" name="email" maxLength={80} size={20} />
          </div>

          <div className="p-field mb-3">
            <label htmlFor="phone" className="p-d-block p-mb-2">
              Phone
            </label>
            <InputText id="phone" name="phone" maxLength={40} size={20} />
          </div>

          <div className="p-field mb-3">
            <label htmlFor="subject" className="p-d-block p-mb-2">
              Subject
            </label>
            <InputText id="subject" name="subject" maxLength={80} size={20} />
          </div>

          <div className="p-field mb-4">
            <label htmlFor="description" className="p-d-block p-mb-2">
              Description
            </label>
            <InputTextarea id="description" name="description" rows={5} />
          </div>

          <input type="hidden" id="external" name="external" value="1" />

          <Button type="submit" label="Enviar" icon="pi pi-send" className="w-full" />
          <Button
            type="button"
            label="Volver al Inicio"
            icon="pi pi-home"
            className="p-button-secondary w-full mt-3"
            onClick={() => navigate("/")}
          />
        </form>
      </Card>
    </div>
  );
}

export default ContactoPage;
