let walletConnected = false;

async function connectWallet() {
    const provider = window.solana;
    if (!provider || !provider.isPhantom) {
        alert("Phantom Wallet not found! Please install it.");
        return;
    }

    if (!walletConnected) {
        try {
            const resp = await provider.connect();
            walletConnected = true;
            document.getElementById('connectWalletBtn').innerText = 'Disconnect Phantom Wallet';
            alert('Connected: ' + resp.publicKey.toString());
        } catch (err) {
            alert('Failed to connect wallet: ' + err.message);
        }
    } else {
        try {
            await provider.disconnect();
            walletConnected = false;
            document.getElementById('connectWalletBtn').innerText = 'Connect Phantom Wallet';
            alert('Wallet disconnected.');
        } catch (err) {
            alert('Failed to disconnect wallet: ' + err.message);
        }
    }
}

document.getElementById('connectWalletBtn').onclick = connectWallet;
