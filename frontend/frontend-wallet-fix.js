let walletConnected = false;

async function connectWallet() {
    const provider = window.solana;
    if (!provider || !provider.isPhantom) {
        alert("Phantom Wallet not found! Please install it.");
        return;
    }

    if (!walletConnected) {
        try {
            await provider.connect();
            walletConnected = true;
            document.getElementById('connectWalletBtn').innerText = 'Disconnect Phantom Wallet';
            alert('Connected: ' + provider.publicKey.toString());
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

async function submitEntry() {
    if (!walletConnected || !window.solana.publicKey) {
        alert('Please connect your wallet first!');
        return;
    }

    try {
        const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('mainnet-beta'), 'confirmed');
        const fromPubkey = window.solana.publicKey;
        const toPubkey = new solanaWeb3.PublicKey('YOUR_SOLANA_ADDRESS_HERE'); // REPLACE CLEARLY!
        const lamports = 10000000; // 0.01 SOL adjust for DOG if required

        let transaction = new solanaWeb3.Transaction().add(
            solanaWeb3.SystemProgram.transfer({ fromPubkey, toPubkey, lamports })
        );

        transaction.feePayer = fromPubkey;
        let { blockhash } = await connection.getRecentBlockhash();
        transaction.recentBlockhash = blockhash;

        let signed = await window.solana.signTransaction(transaction);
        let signature = await connection.sendRawTransaction(signed.serialize());
        
        await connection.confirmTransaction(signature, 'confirmed');
        alert('Transaction successful! TXID: ' + signature);
    } catch (error) {
        alert('Transaction failed: ' + error.message);
    }
}

document.getElementById('connectWalletBtn').onclick = connectWallet;
document.getElementById('submitEntryBtn').onclick = submitEntry;
