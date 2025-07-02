// src/pages/Accounts.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Accounts() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    axios.get(import.meta.env.VITE_API_URL + "/accounts")
         .then(res => setAccounts(res.data));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Accounts</h1>
      <ul className="space-y-2">
        {accounts.map(acc => (
          <li key={acc.Id} className="p-2 border rounded">
            <p><strong>Name:</strong> {acc.Name}</p>
            <p><strong>Phone:</strong> {acc.Phone}</p>
            <p><strong>Website:</strong> {acc.Website}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
