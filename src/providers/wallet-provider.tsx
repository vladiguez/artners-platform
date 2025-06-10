// 3. src/providers/wallet-provider.tsx — Fournisseur global RainbowKit/wagmi

'use client';

import {
  RainbowKitProvider,
  getDefaultWallets,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import { WagmiConfig, createConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';
import { http } from 'viem';

// NEW: Import QueryClient and QueryClientProvider
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// 1. Define your chains
const chains = [mainnet, polygon, optimism, arbitrum];

// 2. Get default connectors for RainbowKit
const { connectors } = getDefaultWallets({
  appName: 'Artners',
  projectId: 'artners-demo', // Replace with your actual WalletConnect ID
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

// NEW: Create a QueryClient instance
const queryClient = new QueryClient();

// WalletProvider component
export function WalletProvider({ children }: { children: React.ReactNode }) {
  return (
    // NEW: Wrap WagmiConfig with QueryClientProvider
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains} theme={darkTheme()}>
          {children}
        </RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  );
}