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
  <div className="min-h-screen bg-gray-900 text-white flex justify-center items-start px-4 py-10">
    <div className="w-full max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Cuentas de Salesforce</h1>

      <input
        type="text"
        placeholder="Buscar por nombre..."
        className="w-full mb-4 p-2 text-black rounded"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-700 text-sm text-left">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-2 border">Nombre</th>
              <th className="p-2 border">Teléfono</th>
              <th className="p-2 border">Sitio Web</th>
            </tr>
          </thead>
          <tbody>
            {filteredAccounts.length > 0 ? (
              filteredAccounts.map(account => (
                <tr key={account.Id} className="hover:bg-gray-700">
                  <td className="p-2 border">{account.Name}</td>
                  <td className="p-2 border">{account.Phone || '-'}</td>
                  <td className="p-2 border">{account.Website || '-'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-4 text-center text-gray-400">
                  No se encontraron cuentas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
};

export default Accounts;
