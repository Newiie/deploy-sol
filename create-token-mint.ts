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


async function main(){

    console.log("ASD")
    const tokenMint = await token.createMint(
        connection,
        keypair,
        publickey, // mint auth
        publickey, // freeze atuh
        9 //decimals
    )

    console.log(tokenMint.toBase58());
}

main();