import { useEffect, useState } from "react";
import { FiActivity, FiAlertCircle, FiRefreshCw } from 'react-icons/fi';

const ViewersPage = () => {
  const [stats, setStats] = useState(null);
  const [visitors, setVisitors] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const API_BASE_URL = "http://localhost:5000/admin/viewers";

  const fetchData = async () => {
    setIsRefreshing(true);
    try {
      const [statsRes, visitorsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/stats`),
        fetch(API_BASE_URL),
      ]);
      
      const statsData = await statsRes.json();
      const visitorsData = await visitorsRes.json();

      // ডাটাবেস থেকে কী আসছে তা কনসোলে দেখার জন্য
      console.log("Current Visitors from DB:", visitorsData.visitors);
      console.log("Current Stats from DB:", statsData);

      if (statsData.success) setStats(statsData);
      if (visitorsData.success) setVisitors(visitorsData.visitors || []);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-screen bg-[#050505]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="p-4 md:p-8 space-y-8 bg-[#050505] min-h-screen text-gray-300 font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-900 pb-6">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2 uppercase">
            <FiActivity className="text-blue-500 animate-pulse" /> Traffic_Log
          </h1>
          <p className="text-red-500 text-[10px] font-mono mt-1 flex items-center gap-1 uppercase tracking-tighter">
            <FiAlertCircle /> Records auto-destruct after 24h
          </p>
        </div>
        <div className="flex items-center gap-3">
            <button onClick={fetchData} className={`p-2 rounded-lg border border-gray-800 hover:bg-gray-900 transition-all ${isRefreshing ? 'animate-spin' : ''}`}>
              <FiRefreshCw size={18} />
            </button>
            <div className="bg-[#111] px-4 py-2 rounded-lg border border-gray-800">
                <p className="text-[10px] uppercase text-gray-500">Today</p>
                <p className="text-xl font-bold text-emerald-400">{stats?.today ?? 0}</p>
            </div>
            <div className="bg-[#111] px-4 py-2 rounded-lg border border-gray-800 text-right">
                <p className="text-[10px] uppercase text-gray-500">Total</p>
                <p className="text-xl font-bold text-blue-400">{stats?.total ?? 0}</p>
            </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-[#0f0f0f] border border-gray-900 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#161616] text-gray-400 text-[10px] uppercase tracking-[0.2em] border-b border-gray-800">
                <th className="p-5 font-bold">Idx</th>
                <th className="p-5 font-bold">Network_Address</th>
                <th className="p-5 font-bold">Resource_Path</th>
                <th className="p-5 font-bold">System_Agent</th>
                <th className="p-5 font-bold">Access_Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-900">
              {visitors.length > 0 ? (
                visitors.map((v, i) => (
                  <tr key={v._id || i} className="hover:bg-blue-500/5 transition-colors">
                    <td className="p-5 text-gray-600 text-xs">{i + 1}</td>
                    <td className="p-5 font-mono text-xs text-blue-400/80">{v.ip}</td>
                    <td className="p-5 text-xs font-mono">
                       <span className="text-emerald-500 opacity-70">PATHS: </span>
                       <span className="text-gray-300">
                         {v.pages && v.pages.length > 0 ? v.pages.join(', ') : (v.page || '/')}
                       </span>
                    </td>
                    <td className="p-5">
                      <div className="max-w-[180px] truncate text-[10px] text-gray-500 font-mono" title={v.userAgent}>
                        {v.userAgent}
                      </div>
                    </td>
                    <td className="p-5 text-[10px] text-gray-400 font-mono">
                      {v.visitedAt ? new Date(v.visitedAt).toLocaleTimeString("en-GB") : "--:--"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-20 text-center text-gray-700 font-mono text-xs tracking-widest">
                    NO_LOGS_FOUND_IN_BUFFER
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

export default ViewersPage;