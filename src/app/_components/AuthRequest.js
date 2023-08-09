import { useState } from 'react'
import { web3wallet } from '../page'
import { getSdkError } from '@walletconnect/utils'

export default function AuthRequest({ event, wallets, closeModal }) {
  const [selectedWallet, setSelectedWallet] = useState(wallets[0])

  async function onApprove() {
    const { id, params } = event
    const iss = `did:pkh:eip155:1:${selectedWallet.address}`
    const message = web3wallet.formatMessage(params.cacaoPayload, iss)

    // Sign message using the Venly API (POST /api/signatures)
    const signature = await EXAMPLE.signMessage(selectedWallet, message)
      
    await web3wallet.respondAuthRequest(
      {
        id,
        signature: {
          s: signature,
          t: 'eip191'
        }
      },
      iss
    )

    closeModal()
  }

  async function onReject() {
    const iss = `did:pkh:eip155:1:${selectedWallet.address}`
    await web3wallet.respondAuthRequest(
      {
        id: event.id,
        error: getSdkError('USER_REJECTED')
      },
      iss
    )
    closeModal()
  }

  function printMessage() {
    const iss = `did:pkh:eip155:1:${selectedWallet.address}`
    const message = web3wallet.formatMessage(event.params.cacaoPayload, iss)
    return message
  }

  return (
    <div className="modal">
      <h3 className="heading">Auth Request</h3>

      <div className="block">
        <h5>Message</h5>
        <p className="pre">{printMessage()}</p>
      </div>
      <div className="block">
        <h5>Select wallet</h5>
        {wallets.map(item => {
          return (
            <div onClick={() => setSelectedWallet(item)} key={item.id}>
              <input type="checkbox" checked={item == selectedWallet} readOnly />
              <span>{item.address}</span>
            </div>
          )
        })}
      </div>

      <div className="footer">
        <button onClick={() => onApprove()}>Approve</button>
        <button onClick={() => onReject()}>Reject</button>
      </div>
    </div>
  )
}
