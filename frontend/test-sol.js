document.getElementById("send-sol-btn").onclick = async function () {
  const recipient = "YOUR_RECEIVER_SOLANA_ADDRESS_HERE"; // <-- Replace with your own wallet address
  const connection = new solanaWeb3.Connection("https://api.mainnet-beta.solana.com");
  const provider = window.solana;
  if (!provider?.isPhantom) {
    alert("Phantom Wallet not found.");
    return;
  }

  await provider.connect();

  const transaction = new solanaWeb3.Transaction().add(
    solanaWeb3.SystemProgram.transfer({
      fromPubkey: provider.publicKey,
      toPubkey: new solanaWeb3.PublicKey(recipient),
      lamports: 10000000, // 0.01 SOL
    })
  );

  transaction.feePayer = provider.publicKey;
  transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

  const signed = await provider.signTransaction(transaction);
  const signature = await connection.sendRawTransaction(signed.serialize());
  await connection.confirmTransaction(signature);
  alert("Sent 0.01 SOL! TX: " + signature);
};
