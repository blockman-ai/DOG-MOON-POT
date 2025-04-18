const backendURL = "https://your-backend-url.com"; // Replace with actual backend URL

let walletAddress = null;

window.addEventListener('DOMContentLoaded', () => {
    const connectBtn = document.getElementById("connectWallet");
        const enterBtn = document.getElementById("enterPot");
            const potDisplay = document.getElementById("currentPot");
                const entryCountDisplay = document.getElementById("entryCount");
                    const connectedAddress = document.getElementById("connectedAddress");

                        async function fetchPotStatus() {
                                try {
                                            const response = await fetch(backendURL + "/status");
                                                        const data = await response.json();
                                                                    if (data.success) {
                                                                                    potDisplay.innerText = data.totalPotAmount + " DOG";
                                                                                                    entryCountDisplay.innerText = data.entriesCount;
                                                                                                                }
                                                                                                                        } catch (err) {
                                                                                                                                    console.error("Backend unavailable");
                                                                                                                                            }
                                                                                                                                                }

                                                                                                                                                    connectBtn.onclick = async () => {
                                                                                                                                                            if (window.solana && window.solana.isPhantom) {
                                                                                                                                                                        try {
                                                                                                                                                                                        const resp = await window.solana.connect();
                                                                                                                                                                                                        walletAddress = resp.publicKey.toString();
                                                                                                                                                                                                                        connectedAddress.innerText = "Connected: " + walletAddress;
                                                                                                                                                                                                                                        enterBtn.style.display = "inline-block";
                                                                                                                                                                                                                                                    } catch (e) {
                                                                                                                                                                                                                                                                    console.error("User rejected wallet connection");
                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                        } else {
                                                                                                                                                                                                                                                                                                    alert("Phantom wallet not detected!");
                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                                };

                                                                                                                                                                                                                                                                                                                    enterBtn.onclick = async () => {
                                                                                                                                                                                                                                                                                                                            if (!walletAddress) {
                                                                                                                                                                                                                                                                                                                                        alert("Please connect your wallet first.");
                                                                                                                                                                                                                                                                                                                                                    return;
                                                                                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                                                                                                    try {
                                                                                                                                                                                                                                                                                                                                                                                const res = await fetch(backendURL + "/enter", {
                                                                                                                                                                                                                                                                                                                                                                                                method: "POST",
                                                                                                                                                                                                                                                                                                                                                                                                                headers: { "Content-Type": "application/json" },
                                                                                                                                                                                                                                                                                                                                                                                                                                body: JSON.stringify({
                                                                                                                                                                                                                                                                                                                                                                                                                                                    wallet: walletAddress,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                        amount: 10  // fixed for now
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        })
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    });

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                const result = await res.json();
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            if (result.success) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            alert("Entry successful!");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            potDisplay.innerText = result.totalPotAmount + " DOG";
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            entryCountDisplay.innerText = result.entriesCount;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        } else {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        alert(result.message);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            } catch (err) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        alert("Failed to enter POT.");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    console.error(err);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                };

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    fetchPotStatus();
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    