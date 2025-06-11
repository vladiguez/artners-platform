// 3. src/providers/wallet-provider.tsx — Fournisseur global RainbowKit/wagmi

'use client'; // This directive is necessary for client-side components

import React, { useEffect, useState } from 'react'; // Import useEffect and useState
import {
  RainbowKitProvider,
  getDefaultWallets,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import { WagmiConfig, createConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';
import { http } from 'viem';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// 1. Define your chains
const chains = [mainnet, polygon, optimism, arbitrum];

// 2. Get default connectors for RainbowKit
const { connectors } = getDefaultWallets({
  appName: 'Artners',
  projectId: 'artners-demo',
  chains,
});

// 3. Create the wagmi config
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  chains,
  transports: chains.reduce((obj, chain) => {
    obj[chain.id] = http();
    return obj;
  }, {}),
});

// Create a QueryClient instance for @tanstack/react-query
const queryClient = new QueryClient();

// WalletProvider component
export function WalletProvider({ children }: { children: React.ReactNode }) {
  // Use state to track if the component has mounted on the client-side
  const [mounted, setMounted] = useState(false);

  // Set mounted to true after the component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  // If not mounted (meaning still during SSR or initial render on server), return null
  // This prevents any client-side specific code (like indexedDB) from running on the server
  if (!mounted) {
    return null; // You could also return a loading spinner or placeholder here
  }

  // Once mounted on the client, render the providers
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains} theme={darkTheme()}>
          {children}
        </RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  );
}