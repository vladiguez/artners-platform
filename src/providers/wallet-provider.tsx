// src/providers/wallet-provider.tsx

'use client';

import React, { useEffect, useState } from 'react';
import {
  RainbowKitProvider,
  getDefaultWallets,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import { WagmiConfig, createConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';
import { http, type Transport } from 'viem'; // <-- Import 'type Transport' from viem
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const chains = [mainnet, polygon, optimism, arbitrum] as const;

const { connectors } = getDefaultWallets({
  appName: 'Artners',
  projectId: 'artners_demo', // Assurez-vous que c'est le bon ID
});

const wagmiConfig = createConfig({
  connectors,
  chains,
  transports: chains.reduce(
    (obj, chain) => {
      obj[chain.id] = http();
      return obj;
    },
    {} as Record<number, Transport> // <-- MODIFICATION MAJEURE ICI : Type assertion
  ),
});

const queryClient = new QueryClient();

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider config={wagmiConfig} theme={darkTheme()}>
          {children}
        </RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  );
}