import {
  Connection,
  PublicKey,
  Transaction,
} from '@solana/web3.js';

import {
  getAssociatedTokenAddress,
  createTransferInstruction,
} from '@solana/spl-token';

const DOG_MINT = new PublicKey("dog1viwbb2vWDpER5FrJ4YFG6gq6XuyFohUe9TXN65u");
const RECEIVER = new PublicKey("YOUR_RECEIVING_WALLET_HERE");

export async function sendDOG(amount) {
  const provider = window.solana;
  if (!provider?.isPhantom) {
    alert("Phantom wallet not found.");
    return;
  }

  await provider.connect();
  const sender = provider.publicKey;
  const connection = new Connection("https://api.mainnet-beta.solana.com");

  const fromToken = await getAssociatedTokenAddress(DOG_MINT, sender);
  const toToken = await getAssociatedTokenAddress(DOG_MINT, RECEIVER);

  const tx = new Transaction().add(
    createTransferInstruction(
      fromToken,
      toToken,
      sender,
      amount * 1_000_000 // DOG has 6 decimals
    )
  );

  tx.feePayer = sender;
  tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

  const signed = await provider.signTransaction(tx);
  const sig = await connection.sendRawTransaction(signed.serialize());
  await connection.confirmTransaction(sig, 'confirmed');
  alert('DOG sent! TX: ' + sig);
}
