export function getSecretType(secretType) {
  return secretTypesMap[secretType]
}

export function getChain(chain) {
  return chainsMap[chain]
}

export function hexToString(hex) {
  hex = hex.replace(/^0x/i, '')
  var str = ''
  for (var i = 0; i < hex.length; i += 2) {
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16))
  }
  return str
}

if (process.env.NEXT_PUBLIC_ENVIRONMENT == 'development') {
  var secretTypesMap = {
    ARBITRUM: { 
      name: 'Arbitrum Goerli',
      chain: 'eip155:421613' 
    },
    AVAC: { 
      name: 'Avalanche Fuji',
      chain: 'eip155:43113' 
    },
    ETHEREUM: { 
      name: 'Ethereum Goerli',
      chain: 'eip155:5' 
    },
    BSC: {
      name: 'Binance Smart Chain Testnet',
      chain: 'eip155:97'
    },
    GOCHAIN: {
      name: 'GoChain Testnet',
      chain: 'eip155:31337'
    },
    HEDERA: {
      name: 'Hedera Testnet',
      chain: 'eip155:296'
    },
    MATIC: {
      name: 'Polygon Mumbai',
      chain: 'eip155:80001'
    },
    VECHAIN: {
      name: 'VeChain Testnet',
      chain: 'eip155:100010'
    },
  }
}
else {
  var secretTypesMap = {
    ARBITRUM: { 
      name: 'Arbitrum One',
      chain: 'eip155:42161' 
    },
    AVAC: { 
      name: 'Avalanche C-Chain',
      chain: 'eip155:43114' 
    },
    ETHEREUM: {
      name: 'Ethereum',
      chain: 'eip155:1'
    },
    BSC: {
      name: 'Binance Smart Chain',
      chain: 'eip155:56'
    },
    GOCHAIN: {
      name: 'GoChain',
      chain: 'eip155:60'
    },
    HEDERA: {
      name: 'Hedera',
      chain: 'eip155:295'
    },
    MATIC: {
      name: 'Polygon',
      chain: 'eip155:137'
    },
    VECHAIN: {
      name: 'VeChain',
      chain: 'eip155:100009'
    },
  }
}

const chainsMap = {
  'eip155:1': {
    name: 'Ethereum',
    secretType: 'ETHEREUM'
  },
  'eip155:4': {
    name: 'Ethereum Rinkeby',
    secretType: 'ETHEREUM'
  },
  'eip155:5': {
    name: 'Ethereum Goerli',
    secretType: 'ETHEREUM'
  },
  'eip155:43113': {
    name: 'Avalanche Fuji',
    secretType: 'AVAC'
  },
  'eip155:43114': {
    name: 'Avalanche C-Chain',
    secretType: 'AVAC'
  },
  'eip155:137': {
    name: 'Polygon',
    secretType: 'MATIC'
  },
  'eip155:80001': {
    name: 'Polygon Mumbai',
    secretType: 'MATIC'
  },
  'eip155:56': {
    name: 'Binance Smart Chain',
    secretType: 'BSC'
  },
  'eip155:97': {
    name: 'Binance Smart Chain Testnet',
    secretType: 'BSC'
  },
  'eip155:60': {
    name: 'GoChain',
    secretType: 'GOCHAIN'
  },
  'eip155:31337': {
    name: 'GoChain Testnet',
    secretType: 'GOCHAIN'
  },
  'eip155:295': {
    name: 'Hedera',
    secretType: 'HEDERA'
  },
  'eip155:296': {
    name: 'Hedera Testnet',
    secretType: 'HEDERA'
  },
  'eip155:100009': {
    chainId: 100009,
    name: 'VeChain',
    secretType: 'VECHAIN'
  },
  'eip155:100010': {
    name: 'VeChain Testnet',
    secretType: 'VECHAIN'
  },
  'eip155:42161': {
    name: 'Arbitrum One',
    secretType: 'ARBITRUM'
  },
  'eip155:421613': {
    name: 'Arbitrum Goerli',
    secretType: 'ARBITRUM'
  }
}