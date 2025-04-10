document.getElementById('connectWalletBtn').onclick = async function() {
    const provider = window.solana;
    if (!provider?.isPhantom) {
        alert('Phantom wallet not found. Install Phantom.');
        return;
    }

    if (provider.isConnected) {
        await provider.disconnect();
        alert('Disconnected wallet');
        this.textContent = 'Connect Phantom Wallet';
    } else {
        try {
            await provider.connect();
            alert('Connected: ' + provider.publicKey.toString());
            this.textContent = 'Disconnect Phantom Wallet';
        } catch (e) {
            alert('Wallet connection failed: ' + e.message);
        }
    }
};
