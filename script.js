document.addEventListener('DOMContentLoaded', function () {
  
    // Clearly detect Phantom wallet
      const getProvider = () => {
          if ('solana' in window) {
                const provider = window.solana;
                      if (provider.isPhantom) return provider;
                          }
                              window.open('https://phantom.app/', '_blank');
                                };

                                  // Connect Phantom wallet explicitly
                                    async function connectWallet() {
                                        try {
                                              const provider = getProvider();
                                                    const resp = await provider.connect();
                                                          console.log('Connected wallet:', resp.publicKey.toString());
                                                                alert('Wallet connected: ' + resp.publicKey.toString());
                                                                    } catch (err) {
                                                                          console.error('Wallet connection failed:', err);
                                                                                alert('Connection failed: ' + err.message);
                                                                                    }
                                                                                      }

                                                                                        // Explicitly attach event listener to Connect Wallet button
                                                                                          const connectButton = document.getElementById('connectWalletButton');
                                                                                            if (connectButton) {
                                                                                                connectButton.addEventListener('click', connectWallet);
                                                                                                  } else {
                                                                                                      console.error('Connect Wallet button not found.');
                                                                                                        }
                                                                                                        });
