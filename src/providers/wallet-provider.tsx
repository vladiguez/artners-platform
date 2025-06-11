// src/providers/wallet-provider.tsx

'use client';

import React, { useEffect, useState } from 'react';
import {
  RainbowKitProvider,
  getDefaultWallets, // Gardez celui-ci
  darkTheme,
} from '@rainbow-me/rainbowkit';
import { WagmiConfig, createConfig } from 'wagmi'; // Gardez ceux-ci
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains'; // Gardez ceux-ci
import { http } from 'viem';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// 1. Define your chains
const chains = [mainnet, polygon, optimism, arbitrum];

// 2. Get default connectors for RainbowKit
const { connectors } = getDefaultWallets({
  appName: 'Artners',
  projectId: 'artners-demo',
  // SUPPRIMEZ LA LIGNE 'chains,' ICI
});

// 3. Create the wagmi config
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors, // Ici les connecteurs sont utilisés
  chains,     // Ici les chaînes sont utilisées (c'est correct)
  transports: chains.reduce((obj, chain) => {
    obj[chain.id] = http();
    return obj;
  }, {}),
});

// Create a QueryClient instance for @tanstack/react-query
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
        <RainbowKitProvider chains={chains} theme={darkTheme()}> {/* Ici les chaînes sont utilisées (c'est correct) */}
          {children}
        </RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  );
}