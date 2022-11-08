// Import ethers from Hardhat package
const { ethers } = require("hardhat");

async function main() {
  // We get the contract to deploy
  const NFT = await ethers.getContractFactory("Farms");

  const nft = await NFT.deploy(
    "https://ipfs.io/ipfs/QmeZHCMmbShTKi1ShcWEWgj1nBZWujbSbt8o8MjABvyUDb/"
  );

  // here we deploy the contract
  await nft.deployed();
  // print the address of the deployed contract
  console.log("NFT deployed to:", nft.address);

  console.log("Sleeping.....");
  // Wait for etherscan to notice that the contract has been deployed
  await sleep(30000);

  // Verify the contract after deploying
  await hre.run("verify:verify", {
    address: nft.address,
    constructorArguments: [
      "https://ipfs.io/ipfs/QmeZHCMmbShTKi1ShcWEWgj1nBZWujbSbt8o8MjABvyUDb/",
    ],
    contract: "contracts/NFT.sol:Farms",
  });

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
