import base58 from "bs58"
import * as Web3 from "@solana/web3.js"
import * as token from "@solana/spl-token"

const connection = new Web3.Connection(Web3.clusterApiUrl("devnet"))

export function loadWalletKey(keypairFile:string): Web3.Keypair {
    const fs = require("fs");
    const loaded = Web3.Keypair.fromSecretKey(
      new Uint8Array(JSON.parse(fs.readFileSync(keypairFile).toString())),
    );
    return loaded;
}

const keypair = loadWalletKey("/root/.config/solana/id.json");
const publickey = new Web3.PublicKey(keypair.publicKey.toBase58())


// CHANGE THIS FROM THE MINT TOKEN ADDRESS
const tokenMint = "FQmR9hr18odF5uXMhUEMcxEC3u3LKKk13ZrKvxHgycHz"

async function main(){
    const tokenAccount  = await token.createAccount(
        connection, // connection
        keypair, // signer
        new Web3.PublicKey(tokenMint), // mint public key
        publickey, // owner of the token-account
    );
    console.log(tokenAccount.toBase58());
}

main();