import hardhat from "hardhat";

async function main() {
  const { ethers } = hardhat;
  const initBalance = 1;
  const { getContractFactory } = ethers;
  const Assessment = await getContractFactory("Assessment");
  const assessment = await Assessment.deploy(initBalance);
  await assessment.deployed();

  console.log(`A contract with balance of ${initBalance} eth deployed to ${assessment.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
