const hre = require("hardhat");

async function main() {
 
 const Contract = await hre.ethers.deployContract("ProxyContract");
 await Contract.waitForDeployment();
 console.log("Contracts deployed successfully",Contract.target);

  
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

