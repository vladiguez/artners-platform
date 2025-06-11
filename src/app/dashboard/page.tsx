'use client';

import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const DashboardPage = () => {
  const { isConnected, address } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (!isConnected) {
      router.push('/');
    }
  }, [isConnected, router]);

  if (!isConnected) return null;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>Bienvenue sur ton espace sécurisé.</p>
      <p className="mt-2 text-sm text-gray-500">Wallet : {address}</p>
    </div>
  );
};

export default DashboardPage;
