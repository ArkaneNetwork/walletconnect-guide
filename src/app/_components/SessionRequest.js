import { getSdkError } from '@walletconnect/utils'
import { hexToString } from '../utils'
import { web3wallet } from '../page'

export default function SessionRequest({ event, closeModal }) {

  async function onApprove() {
    const { topic, params, id } = event
    const method = params.request.method
    const requestParams = params.request.params
    const response = { id, jsonrpc: '2.0' }

    // The following code will vary depending on your implementation
    // But the steps are generally as follows:
    // 1. Get the specified wallet
    // 2. Execute the requested action
    switch (method) {
      case 'eth_sign':
        // Method: Sign Message
        // Params: [Wallet Address, Message]
        // https://docs.walletconnect.com/2.0/advanced/rpc-reference/ethereum-rpc#eth_sign
        var [walletAddress, message] = requestParams
        var wallet = await EXAMPLE.findWallet(walletAddress)
        var signature = await EXAMPLE.signMessage(wallet, message)
        response.result = signature
        break
      case 'personal_sign':
        // Method: Sign Message
        // Params: [Message, Wallet Address]
        // https://docs.walletconnect.com/2.0/advanced/rpc-reference/ethereum-rpc#personal_sign
        var [message, walletAddress] = requestParams
        var wallet = await EXAMPLE.findWallet(walletAddress)
        var signature = await EXAMPLE.signMessage(wallet, message)
        response.result = signature
        // response.result = '0x17b5115242a60364ecb76577f903a08fc63a3e33d2e052f7aff992fcbedc42df582849299b735e741f99370d7e1b325d96c57dd438b2b7f03bd6e6bd017f4f3c1c'
        break
      case 'eth_signTransaction':
        // Method: Sign Transaction
        // Params: [Transaction]
        // https://docs.walletconnect.com/2.0/advanced/rpc-reference/ethereum-rpc#eth_signtransaction
        var [transaction] = requestParams
        var wallet = await EXAMPLE.findWallet(transaction.from)
        var signedTransaction = await EXAMPLE.signTransaction(wallet, transaction)
        response.result = signedTransaction
        break
      case 'eth_sendTransaction':
        // Method: Execute Transaction
        // Params: [Transaction]
        // https://docs.walletconnect.com/2.0/advanced/rpc-reference/ethereum-rpc#eth_sendtransaction
        var [transaction] = requestParams
        var wallet = await EXAMPLE.findWallet(transaction.from)
        var transactionHash = await EXAMPLE.sendTransaction(wallet, transaction)
        response.result = transactionHash
        break
      case 'eth_signTypedData':
        // Method: Sign Typed Data
        // Params: [Wallet Address, Typed Data]
        // https://docs.walletconnect.com/2.0/advanced/rpc-reference/ethereum-rpc#eth_signtypeddata
        var [walletAddress, typedData] = requestParams
        var wallet = await EXAMPLE.findWallet(walletAddress)
        var signature = await EXAMPLE.signTypedData(wallet, typedData)
        response.result = signature
        break
      default:
        response.error = getSdkError('UNSUPPORTED_METHODS')
    }

    await web3wallet.respondSessionRequest({ topic, response })
    closeModal()
  }

  async function onReject() {
    const { topic, id } = event
    const response = {
      id,
      jsonrpc: '2.0',
      error: getSdkError('USER_REJECTED')
    }
    await web3wallet.respondSessionRequest({ topic, response })
    closeModal()
  }

  console.log(event)
  
  return (
    <div className="modal">
      <h3 className="heading">Session Request</h3>

      <div className="block">
        <h5>Method</h5>
        <p>{event.params.request.method}</p>
      </div>
      <RequestDetails request={event.params.request} />

      <div className="footer">
        <button onClick={() => onApprove()}>Approve</button>
        <button onClick={() => onReject()}>Reject</button>
      </div>
    </div>
  )
}

export function RequestDetails({ request }) {
  const method = request.method
  const requestParams = request.params

  switch (method) {
    case 'eth_sign':
      var [walletAddress, message] = requestParams
      return (
        <>
          <div className="block">
            <h5>Wallet</h5>
            <p>{walletAddress}</p>
          </div>
          <div className="block">
            <h5>Message</h5>
            <p>{hexToString(message)}</p>
          </div>
        </>
      )
    case 'personal_sign':
      var [message, walletAddress] = requestParams
      return (
        <>
          <div className="block">
            <h5>Wallet</h5>
            <p>{walletAddress}</p>
          </div>
          <div className="block">
            <h5>Message</h5>
            <p>{hexToString(message)}</p>
          </div>
        </>
      )
    case 'eth_signTransaction':
      var [transaction] = requestParams
      return (
        <>
          <div className="block">
            <h5>Transaction</h5>
            <p>{JSON.stringify(transaction, null, 4)}</p>
          </div>
        </>
      )
    case 'eth_sendTransaction':
      var [transaction] = requestParams
      return (
        <>
          <div className="block">
            <h5>Transaction</h5>
            <p>{JSON.stringify(transaction, null, 4)}</p>
          </div>
        </>
      )
    case 'eth_signTypedData':
    case 'eth_signTypedData_v3':
    case 'eth_signTypedData_v4':
      var [walletAddress, typedData] = requestParams
      return (
        <>
          <div className="block">
            <h5>Wallet</h5>
            <p>{requestParams[0]}</p>
          </div>
          <div className="block">
            <h5>Data</h5>
            <p>{JSON.stringify(JSON.parse(typedData).message, null, 4)}</p>
          </div>
        </>
      )
  }
}