import * as Web3 from '@solana/web3.js'
import * as token from '@solana/spl-token'

import base58 from 'bs58';

export function loadWalletKey(keypairFile:string): Web3.Keypair {
    const fs = require("fs");
    const loaded = Web3.Keypair.fromSecretKey(
      new Uint8Array(JSON.parse(fs.readFileSync(keypairFile).toString())),
    );
    return loaded;
}

async function main(){

    const connection = new Web3.Connection(Web3.clusterApiUrl('devnet'))

    const keypair = loadWalletKey("/root/.config/solana/id.json");

    console.log("PUB KEY ", keypair.publicKey.toBase58())
  

    const mintToken = await token.mintTo(
        connection,
        keypair,
        new Web3.PublicKey('FQmR9hr18odF5uXMhUEMcxEC3u3LKKk13ZrKvxHgycHz'), //mint token address
        new Web3.PublicKey('3Smed3v7PcE3vLRaqSQ28bWfAyszpUNnj3VcFHBArR1V'), //token account address
        new Web3.PublicKey(keypair.publicKey.toBase58()), //authority
        1000000000000, //amount
    )
    console.log('mint Token ', mintToken)

}
main()