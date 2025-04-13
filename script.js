document.addEventListener('DOMContentLoaded', function () {
  const getProvider = () => {
    if ('solana' in window) {
      const provider = window.solana;
      if (provider.isPhantom) return provider;
    }
    window.open('https://phantom.app/', '_blank');
  };

  async function connectWallet() {
    try {
      const provider = getProvider();
      const resp = await provider.connect();
      console.log('Connected wallet:', resp.publicKey.toString());
    } catch (err) {
      console.error('Wallet connection failed:', err);
    }
  }

  const connectButton = document.getElementById('connectWalletButton');
  if (connectButton) {
    connectButton.addEventListener('click', connectWallet);
  }
});
