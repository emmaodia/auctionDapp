
import { useState } from 'react';
import { ethers } from 'ethers';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import detectEthereumProvider from '@metamask/detect-provider';

import './App.css';
import { Grid } from '@mui/material';
// // import {Contract}  from 'abi';

// require('dotenv').config()
// import dotenv from 'dotenv';

// dotenv.config({ path: path.join(__dirname, '../.env') });

const ALCHEMY_KEY = process.env.REACT_APP_ALCHEMY_KEY;
const PRIVATE_KEY = process.env.REACT_APP_PRIVATE_KEY;
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
  const [owner, setOwner] = useState("Owner");
  const [beneficiary, setBeneficiary] = useState("")

  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [provider, setProvider] = useState(null);


  const connectWalletHandler = () => {
		if (window.ethereum && defaultAccount == null) {
			// set ethers provider
			setProvider(new ethers.providers.Web3Provider(window.ethereum));
      const signer = provider.getSigner();
      const add = signer.getAddress();
      setAddress(add)
			// connect to metamask
			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				setConnButtonText('Wallet Connected');
				setDefaultAccount(result[0]);
			})
			.catch(error => {
				setErrorMessage(error.message);
			});

		} else if (!window.ethereum){
			console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
	}


  const contract = async () => {
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

  const callBeneficiary = async() => {
    let value = await auction.beneficiary();

    setBeneficiary(value);

  }

  return (
    <>
    <Grid class="App">
      <div class="container">
      <Button size="small" variant="outlined" onClick={connectWalletHandler}>{connButtonText}</Button>
      <div>{errorMessage}</div>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Item Name
          </Typography>
          <Typography variant="body2">
            Highest Bid | Auction End 
          </Typography>
        </CardContent>
        <Button size="small" onClick={contract}>{connButtonText}</Button>
      </Card>
      {address}
      </div>
    </Grid>
    <Button size="small" 
    onClick={callOwner}
    >Owner: {owner}</Button>

<Button size="small" 
    onClick={callBeneficiary}
    >Beneficiary: {beneficiary}</Button>
    </>
  );
}

export default App;
