import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { ReactNode, useEffect, useState } from 'react'
import { Web3Modal } from '@web3modal/react'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

import { bsc, bscTestnet } from '@wagmi/chains'

const { chains, publicClient, webSocketPublicClient } = configureChains([bsc, bscTestnet], [
  publicProvider(),
  w3mProvider({ projectId: 'c384e038db8bd91ace64c669e27bc8d9' }),
])

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new WalletConnectConnector({
      chains,
      options: {
        projectId: 'c384e038db8bd91ace64c669e27bc8d9',
        showQrModal: false,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
})

const ethereumClient = new EthereumClient(wagmiConfig, chains)

export function Web3Provider(props) {
  // const { colorMode } = useColorMode()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
  }, [])

  return (
    <>
      {ready && <WagmiConfig config={wagmiConfig}>{props.children}</WagmiConfig>}

      <Web3Modal
        projectId={'c384e038db8bd91ace64c669e27bc8d9'}
        ethereumClient={ethereumClient}
      // themeMode={colorMode}
      // themeVariables={{
      //   '--w3m-accent-color': THEME_COLOR_SCHEME,
      // }}
      />
    </>
  )
}
