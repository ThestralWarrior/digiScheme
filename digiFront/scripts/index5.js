import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.7.0/ethers.min.js";

const provider = new ethers.BrowserProvider(window.ethereum);
var signer;
var address = localStorage.getItem('address'); 
const abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "age",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "gender",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "occupation",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "income",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "religion",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "caste",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "eligibleSum",
				"type": "uint256"
			}
		],
		"stateMutability": "payable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "balance",
				"type": "uint256"
			}
		],
		"name": "FundsAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "wallet",
				"type": "address"
			}
		],
		"name": "FundsTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "balance",
				"type": "uint256"
			}
		],
		"name": "FundsWithdrawn",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "addFunds",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "changeOwner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "criteria",
		"outputs": [
			{
				"internalType": "string",
				"name": "age",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "gender",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "occupation",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "income",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "religion",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "caste",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "eligibleAddresses",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "eligibleAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address[]",
				"name": "_addresses",
				"type": "address[]"
			}
		],
		"name": "setAddresses",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "transfer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "withdrawFunds",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	}
];
var contract;
const transactionButton = document.querySelector('#button');
transactionButton.addEventListener('click', transaction);
const transactionInfo = document.querySelector('#transactionInfo');

async function init() {
    signer = await provider.getSigner();
    console.log(address);
    console.log(signer);
    contract = new ethers.Contract(localStorage.getItem('address'), abi, signer);
	console.log(contract);
}
async function displayTransactionId(tx) {
	const hash = tx.hash;
	const txInfo = `<p><b>Tx:</b> <a href="https://sepolia.etherscan.io/tx/${hash}" target="_blank">${hash}</a></p>`;
	transactionInfo.innerHTML = txInfo;
}
async function transaction() {
    try {
		transactionButton.disabled = true;
        const tx = await contract.transfer();
		displayTransactionId(tx);
        await tx.wait();
		const eligibleAmount = ethers.formatEther(await contract.eligibleAmount());
        console.log(`${eligibleAmount} has been sent ${address}`);
		transactionButton.innerHTML = `<a style="text-decoration:none ;color: black;">${eligibleAmount} ETH transferred</a>`;
    }
    catch(error) {
        console.error('Oops something went wrong: ', error);
		transactionButton.disabled = false;
    }
}
document.addEventListener('DOMContentLoaded', () => {
    init();
});