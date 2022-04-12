
import { useState } from 'react';
import { ethers } from 'ethers';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// import './App.css';
// // import {Contract}  from 'abi';

// require('dotenv').config()
// import dotenv from 'dotenv';

// dotenv.config({ path: path.join(__dirname, '../.env') });




const connect = async () => {

  // const [address, setAddress] = useState();
  
  try {
    
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();
    const add = await signer.getAddress();
    // setAddress(add)
    console.log(add)
  } catch (error) {
    console.log(error);
  }
};


const ALCHEMY_KEY = "EMc9byzgpkom4AA8HhtqS_SI4gP2TEAf" // process.env.ALCHEMY_KEY;
const PRIVATE_KEY = "8e4f5d7e40dccfec06a809103e9611197cf30a8349607b33be3ffc0c77740257" // process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = "0x43028d82134457Ad49Ca0f3af3cE9f1DB5e6B89A";

console.log("Here");

const Contract = require("./Auction.sol/Auction.json")

const provider = new ethers.providers.AlchemyProvider("ropsten", ALCHEMY_KEY)
const signer = new ethers.Wallet(PRIVATE_KEY, provider)
const auction = new ethers.Contract(CONTRACT_ADDRESS, Contract.abi, signer)

console.log(Contract.abi);
console.log(Contract.contractName);
console.log(Contract.abi[9].name);
console.log(auction);





const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

async function main() {
  const auctionEnd = await auction.beneficiary();

  console.log(auctionEnd);
}

main();

function App() {
  return (
    <>
      <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          be{bull}nev{bull}o{bull}lent
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={connect}>Connect</Button>
      </CardActions>
    </Card>
    </>
  );
}

export default App;
