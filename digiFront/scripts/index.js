import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.7.0/ethers.min.js";
const signUpLink = document.querySelector("#metamaskSignUp");
let currentAccount = localStorage.getItem('currentAccount');
const sepoliaId = BigInt('11155111') ; // Sepolia network ID
console.log(sepoliaId);
const provider = new ethers.BrowserProvider(window.ethereum);

async function initialize() {
    if(currentAccount && currentAccount !== 'undefined') {
        signUpLink.textContent = "Check eligible schemes";
    }
    else {
        signUpLink.addEventListener('click', connectWallet);
    }
    
    window.ethereum.on('accountsChanged', function(accounts) {
        console.log("Account before: ", currentAccount);
        if(accounts.length === 0) {
            handleDisconnect();
        }
        if(accounts[0] !== currentAccount) {
            currentAccount = accounts[0];
            localStorage.setItem('currentAccount', currentAccount);
        }
        console.log("Account after: ", currentAccount);
    });
}


async function connectWallet(event) {
    event.preventDefault();
        if (window.ethereum !== null) {
            try {
                const network = await provider.getNetwork();
                console.log(network);
                if(network.chainId !== sepoliaId) {
                    // User is not on the desired network
                    alert('Please switch to Sepolia network.');
                    return;
                }
                const accounts = await provider.send('eth_requestAccounts', []);
                console.log('Should have been connected by now')
                currentAccount = accounts[0];
                localStorage.setItem('currentAccount', currentAccount);
                console.log("Connected to Ethereum account:", accounts[0]);

                signUpLink.textContent="Check eligible schemes";
                signUpLink.removeEventListener('click', connectWallet);
                // Changed the purpose from connecting wallet to checking eligible schemes
            } catch (error) {
                console.error("Could not connect to MetaMask:", error);
            }
        } else {
            console.error("MetaMask not installed.");
        }
}

function handleDisconnect() {
    currentAccount = null;
    localStorage.removeItem('currentAccount');
    signUpLink.textContent = "Connect you wallet here ";
    signUpLink.addEventListener('click', connectWallet);
    console.log('Disconnected from Metamask');
}

document.addEventListener('DOMContentLoaded', () => {
    initialize();
    console.log("DOM loaded");
});