import { useEffect, useState } from "react";

function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://backen-webservice-salesforce.onrender.com/accounts")
      .then((res) => res.json())
      .then((data) => setAccounts(data.records || []));
  }, []);

  const filteredAccounts = accounts.filter((acc) =>
    acc.Name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-6">
        Cuentas de Salesforce
      </h1>

      <input
        type="text"
        placeholder="Buscar por nombre..."
        className="w-full p-2 mb-4 rounded text-black"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-700 text-sm">
          <thead className="bg-gray-800">
            <tr>
              <th className="p-2 border">Nombre</th>
              <th className="p-2 border">Teléfono</th>
              <th className="p-2 border">Sitio Web</th>
            </tr>
          </thead>
          <tbody>
            {filteredAccounts.length > 0 ? (
              filteredAccounts.map((acc) => (
                <tr key={acc.Id} className="hover:bg-gray-700">
                  <td className="p-2 border">{acc.Name}</td>
                  <td className="p-2 border">{acc.Phone || "-"}</td>
                  <td className="p-2 border">{acc.Website || "-"}</td>
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
  );
}

export default Accounts;
