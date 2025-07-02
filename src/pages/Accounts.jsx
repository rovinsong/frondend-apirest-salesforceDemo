import React, { useEffect, useState } from 'react';

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredAccounts, setFilteredAccounts] = useState([]);

  // Obtener datos desde el backend
  useEffect(() => {
    fetch('https://backen-webservice-salesforce.onrender.com/accounts')
      .then(res => res.json())
      .then(data => {
        if (data.records) {
          setAccounts(data.records);
          setFilteredAccounts(data.records);
        } else {
          console.error("Error en los datos:", data);
        }
      })
      .catch(error => console.error('Error al obtener cuentas:', error));
  }, []);

  // Filtrar por nombre
  useEffect(() => {
    const filtered = accounts.filter(account =>
      account.Name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredAccounts(filtered);
  }, [search, accounts]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Cuentas de Salesforce</h1>

      <input
        type="text"
        placeholder="Buscar por nombre..."
        className="w-full mb-4 p-2 border rounded shadow"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Nombre</th>
              <th className="p-2 border">Teléfono</th>
              <th className="p-2 border">Sitio Web</th>
            </tr>
          </thead>
          <tbody>
            {filteredAccounts.length > 0 ? (
              filteredAccounts.map(account => (
                <tr key={account.Id} className="hover:bg-gray-50">
                  <td className="p-2 border">{account.Name}</td>
                  <td className="p-2 border">{account.Phone || '-'}</td>
                  <td className="p-2 border">{account.Website || '-'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-4 text-center text-gray-500">
                  No se encontraron cuentas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Accounts;
