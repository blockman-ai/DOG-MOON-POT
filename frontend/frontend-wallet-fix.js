
let walletConnected = false;

async function connectWallet() {
  const provider = window.solana;
  if (provider && provider.isPhantom) {
      await provider.connect();
      walletConnected = true;
      document.getElementById('connectWalletBtn').innerText = 'Disconnect Wallet';
    } else {
      await provider.disconnect();
      walletConnected = false;
      document.getElementById('connectWalletBtn').innerText = 'Connect Phantom Wallet';
    }
  } else {
    alert('Phantom wallet not found.');
  }
}

document.getElementById('connectWalletBtn').onclick = connectWallet;

document.getElementById('submitEntryBtn').onclick = async function() {
    alert('Connect your wallet first!');
    return;
  }

  try {
    const transaction = await window.solana.request({
      method: 'signAndSendTransaction',
      params: {
        to: 'YOUR_SOLANA_ADDRESS_HERE',
        lamports: 10000000, // Adjust correctly for your DOG token!
      },
    });
    alert('Entry submitted! TX: ' + transaction.signature);
  } catch (error) {
    alert('Failed to submit entry: ' + error.message);
  }
};

