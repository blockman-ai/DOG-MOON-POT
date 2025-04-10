let walletConnected = false;

async function connectWallet() {
    const provider = window.solana;
    if (provider && provider.isPhantom) {
        try {
            if (!walletConnected) {
                await provider.connect();
                walletConnected = true;
                document.getElementById('connectWalletBtn').innerText = 'Disconnect Phantom Wallet';
                alert('Wallet connected successfully!');
            } else {
                await provider.disconnect();
                walletConnected = false;
                document.getElementById('connectWalletBtn').innerText = 'Connect Phantom Wallet';
                alert('Wallet disconnected.');
            }
        } catch (error) {
            alert('Error during wallet operation: ' + error.message);
        }
    } else {
        alert('Phantom wallet not detected! Install Phantom first.');
    }
}

async function submitEntry() {
    if (!walletConnected) {
        alert('Connect your wallet first!');
        return;
    }

    const transaction = {
        fromPubkey: window.solana.publicKey.toString(),
        toPubkey: 'YOUR_SOLANA_ADDRESS_HERE',
        lamports: 10000000 // Adjust this according to DOG token or SOL value.
    };

    try {
        const { signature } = await window.solana.request({
            method: 'signAndSendTransaction',
            params: transaction
        });
        alert('Entry submitted successfully! TX Signature: ' + signature);
    } catch (err) {
        alert('Transaction failed: ' + err.message);
    }
}

document.getElementById('connectWalletBtn').onclick = connectWallet;
document.getElementById('submitEntryBtn').onclick = submitEntry;
