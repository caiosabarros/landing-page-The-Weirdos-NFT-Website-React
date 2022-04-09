type ChainIdInfo = {
  DECIMAL: number,
  HEX: string
}
export type BlockchainInfo = {
  CHAIN_ID: ChainIdInfo,
  INFURA_URL: string
  RPC_URL: string
  EXPLORER: string
  SYMBOL: string
  BLOCKCHAIN: 'ethereum' | 'polygon'
}
type Networks = {
  MAINNET: BlockchainInfo[]
  TESTNET: BlockchainInfo[]
}

export const NETWORKS: Networks = {
  MAINNET: [
    {
      BLOCKCHAIN: 'ethereum',
      CHAIN_ID: {
        DECIMAL: 1,
        HEX: '0x1'
      },
      EXPLORER: 'https://etherscan.io',
      SYMBOL: 'ETH',
      INFURA_URL: 'https://mainnet.infura.io/v3/0140c9b9de0345869bfaa2e5f010eb12',
      RPC_URL: 'https://mainnet.infura.io/v3/'
    },
    {
      BLOCKCHAIN: 'polygon',
      CHAIN_ID: {
        DECIMAL: 137,
        HEX: '0x89'
      },
      EXPLORER: 'https://polygonscan.com',
      SYMBOL: 'MATIC',
      INFURA_URL: 'https://polygon-mainnet.infura.io/v3/0140c9b9de0345869bfaa2e5f010eb12',
      RPC_URL: 'https://polygon-rpc.com/'
    }
  ],
  TESTNET: [
    {
      BLOCKCHAIN: 'ethereum',
      CHAIN_ID: {
        DECIMAL: 4,
        HEX: '0x4'
      },
      EXPLORER: 'https://rinkeby.etherscan.io',
      SYMBOL: 'ETH',
      INFURA_URL: 'https://rinkeby.infura.io/v3/0140c9b9de0345869bfaa2e5f010eb12',
      RPC_URL: 'https://rinkeby.infura.io/v3/'
    },
    {
      BLOCKCHAIN: 'polygon',
      CHAIN_ID: {
        DECIMAL: 80001,
        HEX: '0x13881'
      },
      EXPLORER: 'https://etherscan.io',
      SYMBOL: 'MATIC',
      INFURA_URL: 'https://polygon-mumbai.infura.io/v3/0140c9b9de0345869bfaa2e5f010eb12',
      RPC_URL: 'https://rpc-mumbai.maticvigil.com/'
    }
  ]
} 

export const ERRORS = {
  WALLETS: {
    WRONG_NETWORK: {
      CODE: 1001,
      MESSAGE: 'A sua carteira não está conectada à rede correta',
      TYPE: 'wallets.wrongNetwork'
    }
  },
  METAMASK: {
    INSTALLATION: {
      CODE: 1000,
      MESSAGE: 'Não foi encontrada a instalação do metamask',
      TYPE: 'metamask.installation'
    },
    CONNECTION: {
      CODE: 1003,
      MESSAGE: 'Metamask não está conectado a esta loja',
      TYPE: 'metamask.connection'
    }
  },
  WALLET_CONNECT: {
    MODAL_CLOSE: {
      CODE: 1004,
      TYPE: 'walletConnect.modalClosed'
    }
  },
  TORUS: {
    MODAL_CLOSE: {
      CODE: 1005,
      TYPE: 'torus.modalClosed'
    }
  }
}

export const PAYMENT_STEPS = {
  IN_PROGRESS: 'payment.inProgress',
  SUCCESS: 'payment.success'
}

export const EMAIL_STATUS = {
  SUCCESS: 'email.send.success'
}

export const WALLET_PROVIDERS = {
  METAMASK: 'metamask',
  WALLET_CONNECT: 'wallet-connect',
  TORUS: 'torus'
}