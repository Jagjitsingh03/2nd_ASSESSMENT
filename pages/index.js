import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [paused, setPaused] = useState(false);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with your deployed contract address
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      handleAccount(accounts);
    }
  };

  const handleAccount = (accounts) => {
    if (accounts.length > 0) {
      console.log("Account connected: ", accounts[0]);
      setAccount(accounts[0]);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);
    setATM(atmContract);
    updatePausedState(atmContract);
    getBalance(atmContract);
  };

  const getBalance = async (atmContract) => {
    if (atmContract) {
      const balance = await atmContract.getBalance();
      setBalance(ethers.utils.formatEther(balance));
    }
  };

  const updatePausedState = async (atmContract) => {
    const paused = await atmContract.paused();
    setPaused(paused);
  };

  const deposit = async () => {
    if (atm) {
      let tx = await atm.deposit(1, { value: ethers.utils.parseEther("1") });
      await tx.wait();
      getBalance(atm);
    }
  };

  const withdraw = async () => {
    if (atm) {
      let tx = await atm.withdraw(1);
      await tx.wait();
      getBalance(atm);
    }
  };

  const transferOwnership = async () => {
    if (atm) {
      try {
        const newOwnerAddress = "0xAddressOfNewOwner"; // Replace with the actual new owner address
        console.log("Initiating transferOwnership to", newOwnerAddress);
        let tx = await atm.transferOwnership(newOwnerAddress);
        await tx.wait();
        console.log("Ownership transferred successfully");
      } catch (error) {
        console.error("Error transferring ownership:", error);
      }
    }
  };

  const togglePause = async () => {
    if (atm) {
      try {
        if (paused) {
          let tx = await atm.unpause();
          await tx.wait();
          console.log("Contract unpaused");
        } else {
          let tx = await atm.pause();
          await tx.wait();
          console.log("Contract paused");
        }
        updatePausedState(atm);
      } catch (error) {
        console.error("Error toggling pause:", error);
      }
    }
  };

  const initUser = () => {
    if (!ethWallet) {
      return <p style={styles.message}>Please install MetaMask to use this ATM.</p>;
    }

    if (!account) {
      return (
        <button style={styles.connectButton} onClick={connectAccount}>
          Connect MetaMask Wallet
        </button>
      );
    }

    if (balance === undefined) {
      getBalance(atm);
    }

    return (
      <div style={styles.userInfo}>
        <p>Your Account: {account}</p>
        <p>Your Balance: {balance} ETH</p>
        <div style={styles.buttonContainer}>
          <button style={styles.actionButton} onClick={deposit}>
            Deposit 1 ETH
          </button>
          <button style={styles.actionButton} onClick={withdraw}>
            Withdraw 1 ETH
          </button>
          <button style={styles.actionButton} onClick={transferOwnership}>
            Transfer Ownership
          </button>
          <button style={styles.actionButton} onClick={togglePause}>
            {paused ? "Unpause Contract" : "Pause Contract"}
          </button>
        </div>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main style={styles.container}>
      <header style={styles.header}>
        <h1>Welcome to the Metacrafters ATM!</h1>
      </header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center;
          padding: 50px;
          background-color: #f0f4f8;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </main>
  );
}

const styles = {
  container: {
    textAlign: "center",
    backgroundImage: "url('https://www.techopedia.com/wp-content/uploads/2021/02/blockchain_05.png')",
    padding: "50px",
    backgroundColor: "#f9f2e7",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100px",
  },
  userInfo: {
    backgroundColor: "#fc7303",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
  },
  connectButton: {
    padding: "10px 20px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    margin: "20px 0",
  },
  actionButton: {
    padding: "10px 20px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#28a745",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    margin: "5px",
    transition: "background-color 0.3s ease",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "10px",
  },
  message: {
    fontSize: "18px",
    color: "#dc3545",
  },
};