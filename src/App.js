import { ethers, network } from 'hardhat';
import './App.css';
// import {Contract}  from 'abi';

require('dotenv').config()

const ALCHEMY_KEY = process.env.ALCHEMY_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = "0x43028d82134457Ad49Ca0f3af3cE9f1DB5e6B89A";

console.log("Here");

const Contract = require("./contracts/Auction.sol/Auction.json")

const provider = new ethers.provider.AlchemyProvider(network="ropsten", ALCHEMY_KEY)
const signer = new ethers.Wallet(PRIVATE_KEY, provider)

const auction = new ethers.Contract(CONTRACT_ADDRESS, Contract.abi, signer)

console.log(Contract.abi);
console.log(Contract.contractName);

async function main() {
  const auctionEnd = await auction.auctionEnd();

  console.log(auctionEnd);
}

main();

function App() {
  return (
    <div className="App">
     Auction DApp
    </div>
  );
}

export default App;
