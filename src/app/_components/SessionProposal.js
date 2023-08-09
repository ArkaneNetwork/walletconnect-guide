import { useState } from 'react'
import { buildApprovedNamespaces, getSdkError } from '@walletconnect/utils'
import { web3wallet } from '../page'
import { getChain, getSecretType } from '../utils'

export default function SessionProposal({ event, wallets, closeModal }) {
  const [selectedWallets, setSelectedWallets] = useState([])

  async function onApprove() {
    const { id, params } = event
  
    const selectedAccounts = []
    const chains = new Set()
    for (let item of selectedWallets) {
      const chain = getSecretType(item.secretType).chain
      chains.add(chain)
      selectedAccounts.push(`${chain}:${item.address}`)
    }
    const supportedNamespaces = {
      eip155: {
        accounts: selectedAccounts,
        chains: Array.from(chains),
        events: ['chainChanged', 'accountsChanged'],
        methods: ['eth_sendTransaction', 'personal_sign', 'eth_sign', 'eth_signTransaction', 'eth_signTypedData']
      }
    }
    const approvedNamespaces = buildApprovedNamespaces({
      proposal: params,
      supportedNamespaces,
    })

    await web3wallet.approveSession({
        id,
        namespaces: approvedNamespaces,
    })
    closeModal()
  }

  async function onReject() {
    await web3wallet.rejectSession({
      id: event.id,
      reason: getSdkError('USER_REJECTED_METHODS')
    })
    closeModal()
  }

  function onSelectAccount(account, selectedIndex) {
    const newWallets = [...selectedWallets]
    if (selectedIndex != -1)
      newWallets.splice(selectedIndex, 1)
    else
      newWallets.push(account)

    setSelectedWallets(newWallets)
  }

  function printChains(namespaces) {
    const allChains = []
    for (let key in namespaces) {
      const chains = namespaces[key].chains.map(item => {
        return getChain(item)?.name || `${item} (unsupported)`
      })
      allChains.push(...chains)
    }
    return allChains.join(', ')
  }

  console.log(event)
  const metadata = event.params.proposer.metadata
  const requiredNamespaces = event.params.requiredNamespaces

  return (
    <div className="modal">
      <h3 className="heading">Session Proposal</h3>

      <div className="block">
        <h5>Connect to site</h5>
        <p>{metadata.name} ({metadata.url})</p>
      </div>
      <div className="block">
        <h5>Permissions</h5>
        <p>See address, account balance, activity and suggest transactions to approve</p>
      </div>
      <div className="block">
        <h5>Chains</h5>
        <p>{printChains(requiredNamespaces)}</p>
      </div>
      <div className="block">
        <h5>Select wallets</h5>
        {wallets.map(item => {
          const selectedIndex = selectedWallets.findIndex(x => x.id == item.id)
          return (
            <div className="wallet-card" key={item.id} onClick={() => onSelectAccount(item, selectedIndex)} >
              <input type="checkbox" checked={selectedIndex != -1} readOnly />
              <div>
                <p>{item.address}</p>
                <p>{getSecretType(item.secretType).name}</p>
              </div>
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
