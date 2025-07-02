import React, { useEffect, useState } from 'react';

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    fetch('https://backen-webservice-salesforce.onrender.com/accounts')
      .then(res => res.json())
      .then(data => {
        if (data.records) {
          setAccounts(data.records);
        } else {
          console.error("Error en los datos recibidos:", data);
        }
      })
      .catch(error => console.error('Error al obtener cuentas:', error));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Cuentas de Salesforce</h1>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Teléfono</th>
            <th className="p-2 border">Sitio Web</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map(account => (
            <tr key={account.Id} className="hover:bg-gray-50">
              <td className="p-2 border">{account.Name}</td>
              <td className="p-2 border">{account.Phone || '-'}</td>
              <td className="p-2 border">{account.Website || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Accounts;
