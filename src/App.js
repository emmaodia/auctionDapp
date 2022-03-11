import './App.css';
// import {Contract}  from 'abi';

console.log("Here");

const Contract = require("./contracts/Auction.sol/Auction.json")


console.log(Contract);
console.log(Contract.contractName);

function App() {
  return (
    <div className="App">
     Auction DApp
    </div>
  );
}

export default App;
