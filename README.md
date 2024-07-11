# Assessment Smart Contract
This project involves creating and deploying a smart contract called Assessment that allows for depositing and withdrawing funds, transferring ownership, and pausing/unpausing the contract.

# Description
The Assessment smart contract is written in Solidity and includes the following functionalities:

Depositing funds
Withdrawing funds
Transferring ownership
Pausing and unpausing the contract
This contract is deployed and interacted with using a React front-end application.

# Getting Started

## Prerequisites
To get this project running on your computer, ensure you have the following installed:

Node.js
npm
MetaMask browser extension
Hardhat

## Installation
1. Clone the GitHub repository to your local machine

git clone https://github.com/your-repo-link

2.Navigate to the project directory and install the dependencies

cd module3ASSESSMENT
npm install

# Running the Project

1. Open three terminals in your project directory.

2.In the first terminal, start the local blockchain:

npx hardhat node

3.In the second terminal, deploy the smart contract to the local blockchain:

npx hardhat run --network localhost scripts/deploy.js

4.In the third terminal, start the front-end application

npm run dev

After this, the project will be running on your localhost, typically at http://localhost:3000/.

# OR

# Starter Next/Hardhat Project

After cloning the GitHub repository, follow these steps to get the code running on your computer:

1. Inside the project directory, in the terminal type: npm i
2. Open two additional terminals in your VS code
3. In the second terminal type: npx hardhat node
4. In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js
5. Back in the first terminal, type npm run dev to launch the front-end.

After this, the project will be running on your localhost, typically at http://localhost:3000/

# Interacting with the Smart Contract
Once the project is running, you can interact with the smart contract through the front-end interface. Make sure you have MetaMask installed and connected to the local blockchain network.

# Authors
Jagjit Singh

# License
This project is licensed under the MIT License - see the LICENSE.md file for details.



