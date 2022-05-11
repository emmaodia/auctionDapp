import React from 'react';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Button from '@mui/material/Button';


function ConnectWallet() {

    const [connButtonText, setConnButtonText] = useState("Connect Wallet")
    const [errorMessage, setErrorMessage] = useState(null);
      const [defaultAccount, setDefaultAccount] = useState(null);
      const [provider, setProvider] = useState(null);

    const wallectConnection = () => {
       
        if (window.ethereum && defaultAccount == null) {
            // set ethers provider
            setProvider(new ethers.providers.Web3Provider(window.ethereum));
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

    const walletAccountChanged = (newAccount) => {
        setDefaultAccount(newAccount)
    }

    window.ethereum.on('accountsChanged', walletAccountChanged);

    useEffect(() => {
        wallectConnection()
    }, [defaultAccount])
    
    return (
        <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-end"}}>
            <div>
                <Button size="small" variant="outlined" onClick={wallectConnection}>{connButtonText}</Button>
            </div>
            <div style={{paddingTop: "1%", paddingBottom: "1%"}}>{errorMessage}{defaultAccount}</div>
         </div>
    )
}

export default ConnectWallet;