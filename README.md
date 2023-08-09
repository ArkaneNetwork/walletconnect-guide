# WalletConnect Guide

This guide is intended for wallet app developers looking to implement WalletConnect.

## Getting Started

First, run the development server:

```bash
npm install

npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Next Steps

- Configure environment variables
  
  - Set `env.NEXT_PUBLIC_ENVIRONMENT` to either `development` (for testnets) or `production`
  
  - Set `env.NEXT_PUBLIC_PROJECT_ID` to your WalletConnect Project ID 

- Replace the `EXAMPLE` functions with your own implementation.

- Test your integration by using it alongside the [WalletConnect demo dapp](https://react-app.walletconnect.com)
