'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push('/admin/dashboard');
    } else {
      const data = await res.json();
      setError(data.error || 'Login gagal');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="bg-[#130a24]/80 backdrop-blur-xl rounded-3xl p-8 border border-[#a855f7]/30"
          style={{ boxShadow: '0 0 40px rgba(168, 85, 247, 0.15)' }}>

          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-[#a855f7] to-[#ec4899] rounded-2xl mx-auto mb-4 flex items-center justify-center text-3xl"
              style={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)' }}>
              🔐
            </div>
            <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
            <p className="text-gray-400 text-sm mt-1">jee's portofolio</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password..."
                required
                className="w-full px-4 py-3 rounded-xl bg-[#1a0e2e] border border-[#a855f7]/30 focus:border-[#a855f7] focus:ring-2 focus:ring-[#a855f7]/20 outline-none text-white placeholder-gray-500 transition-all"
              />
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-sm text-center"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-[#a855f7] to-[#ec4899] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Masuk...
                </span>
              ) : 'Masuk'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
