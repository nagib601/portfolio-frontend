import React, { useEffect, useState } from 'react';

const ViewersPage = () => {
  const [viewers, setViewers] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchViewers = async () => {
      const res = await fetch(`${API_URL}/admin/viewers/all`);
      const data = await res.json();
      if (data.success) setViewers(data.viewers);
    };
    fetchViewers();
  }, []);

  return (
    <div className="p-6 bg-[#0a0a0a] min-h-screen text-white font-mono">
      <h2 className="text-2xl font-bold mb-6 text-blue-500 underline">VISITOR_LOGS</h2>
      <div className="overflow-x-auto border border-gray-800 rounded-lg">
        <table className="table w-full bg-[#111]">
          <thead>
            <tr className="text-blue-400 border-b border-gray-800">
              <th>TIME</th>
              <th>BROWSER</th>
              <th>OS</th>
              <th>DEVICE</th>
              <th>IP_ADDRESS</th>
            </tr>
          </thead>
          <tbody>
            {viewers.map((v, index) => (
              <tr key={index} className="border-b border-gray-900 hover:bg-gray-900/50">
                <td className="text-xs">{new Date(v.viewedAt).toLocaleString()}</td>
                <td className="text-green-500">{v.browser}</td>
                <td>{v.os}</td>
                <td><span className="badge badge-outline text-[10px]">{v.device}</span></td>
                <td className="text-gray-500 text-xs">{v.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewersPage;