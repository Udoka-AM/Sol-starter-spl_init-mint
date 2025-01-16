import { Keypair, PublicKey, Connection, Commitment } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token';
import wallet from "../turbin3-wallet.json"

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

const token_decimals = 1_000_000n;

// Mint address
const mint = new PublicKey("2yevzCNNLhfwbScY3Au16hHhb5CcWtXcxiUT1r7m45PL");

(async () => {
    try {
        // Create an ATA
        // const ata = ???
        // console.log(`Your ata is: ${ata.address.toBase58()}`);

        // Mint to ATA
        // const mintTx = ???
        // console.log(`Your mint txid: ${mintTx}`);

        const ata = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            keypair.publicKey
        );
        console.log(`Success! Your ata is: ${ata.address.toBase58()}`);

        
        // Mint the specified amount of tokens to the created ATA
    // Parameters:
    // - connection: Solana connection object
    // - keypair: The payer (and mint authority in this case)
    // - mint: The mint address of the token
    // - ata.address: The associated token account to mint to
    // - keypair.publicKey: The authority for the minting
    // - token_decimals: Amount of tokens to mint (considering decimal places)

    const mintTx = await mintTo(
        connection,
        keypair,
        mint, 
        ata.address,
        keypair.publicKey,
        token_decimals,
     );
    console.log(`Your mint txid: ${mintTx}`);

    } catch(error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})()
