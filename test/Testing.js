
const { expect } = require("chai");
const { ethers } = require("hardhat")


const ABI = require("../artifacts/contracts/ProxyContract.sol/ProxyContract.json");
const walletAbi = require("../artifacts/contracts/SmartWallet.sol/SmartWallet.json");
const Contract_Address ="0x0f2a87627F42462a29AbCAC0C89b8cA91fBccE88";

describe("SmartWallet and ProxyContract", function() {
  let SmartWalletAddress, ProxyContract, smartWallet,  owner, addr1, addr2;

  beforeEach(async function() {
   
   
    [owner, addr1] = await ethers.getSigners();

    ProxyContract = new ethers.Contract(Contract_Address,ABI.abi,owner);


  });


  it("Should return a valid contract address", async function() {
    const txn= await ProxyContract.getWallet();
      txn.wait()
   SmartWalletAddress = await ProxyContract.wallets(owner.address);
      
    //console.log(SmartWalletAddress);
    
   expect(ethers.isAddress(SmartWalletAddress)).to.be.true;
  });
  it("should assign correct owners of the smart wallet", async function() {
    smartWallet = new ethers.Contract(SmartWalletAddress,walletAbi.abi,owner)
   const ownerAddress = await smartWallet.owner();

   expect(ownerAddress).to.equal(owner.address);
    
   
 });


  it("Should add funds to the wallet and update the balance correctly", async function() {
    await owner.sendTransaction({ to: SmartWalletAddress, value: ethers.parseEther("1.0") });
    expect(await ethers.provider.getBalance(SmartWalletAddress)).to.equal(ethers.parseEther("1.0"));
  });


  it("Should transfer funds from the wallet to another address and update the balance correctly", async function() {
     smartWallet = new ethers.Contract(SmartWalletAddress,walletAbi.abi,owner)
    

     await smartWallet.sendFunds(addr1.address, ethers.parseEther("0.5"));
     expect(await ethers.provider.getBalance(SmartWalletAddress)).to.equal(ethers.parseEther("0.5"));
     expect(await ethers.provider.getBalance(addr1.address)).to.equal(ethers.parseEther("0.5"));
  });
 
 


  // Wallet Destruction and Recovery Tests
  it("Should destroy the wallet and allow it to be recreated", async function() {
    // Connect to the contract with the owner's signer
    await ProxyContract.destroyWallet();
  
    // Call the destroyWallet function from the owner
   
  
    // Check that the wallet address has been removed
    expect(await ProxyContract.wallets(owner.address)).to.equal(ethers.ZeroAddress);
  
    // Get the new wallet address
    const txn= await ProxyContract.getWallet();
    txn.wait()
 SmartWalletAddress = await ProxyContract.wallets(owner.address);
  
    // Check that the new wallet address is valid
    expect(ethers.isAddress(SmartWalletAddress)).to.be.true;
  });
  

});

