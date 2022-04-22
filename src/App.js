
import { useState } from 'react';
import { ethers } from 'ethers';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import './App.css';
import { Grid } from '@mui/material';
// // import {Contract}  from 'abi';

// require('dotenv').config()
// import dotenv from 'dotenv';

// dotenv.config({ path: path.join(__dirname, '../.env') });

const ALCHEMY_KEY = "EMc9byzgpkom4AA8HhtqS_SI4gP2TEAf" // process.env.ALCHEMY_KEY;
const PRIVATE_KEY = "8e4f5d7e40dccfec06a809103e9611197cf30a8349607b33be3ffc0c77740257" // process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = "0x7801d0d11B03A6ed31Cee4fC5D44c090c2D52d88";

console.log("Here");

const Contract = require("./Auction.sol/Auction.json")

const provider = new ethers.providers.AlchemyProvider("kovan", ALCHEMY_KEY)
const signer = new ethers.Wallet(PRIVATE_KEY, provider)
const auction = new ethers.Contract(CONTRACT_ADDRESS, Contract.abi, signer)

console.log(Contract.abi);
console.log(Contract.contractName);
console.log(Contract.abi[9].name);
console.log(auction);

async function main() {
  const auctionEnd = await auction.beneficiary();

  console.log(auctionEnd);
}

main();

function App() {

  const [address, setAddress] = useState();
  const [connButtonText, setConnButtonText] = useState("Connect Wallet")
  const [owner, setOwner] = useState("Owner")

  const connect = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner();
      const add = await signer.getAddress();
      setAddress(add)
      setConnButtonText("BID")
      console.log(add)
    } catch (error) {
      console.log(error);
    }
  };

  const callOwner = async() => {
    let value = await auction.owner();

    setOwner(value);

  }
  return (
    <>
    <Grid class="App">
      <div class="container">
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Item Name
          </Typography>
          <Typography variant="body2">
            Highest Bid | Auction End 
          </Typography>
        </CardContent>
        <Button size="small" onClick={connect}>{connButtonText}</Button>
      </Card>
      {address}
      </div>
    </Grid>
    <Button size="small" 
    onClick={callOwner}
    >Owner: {owner}</Button>
    </>
  );
}

export default App;
