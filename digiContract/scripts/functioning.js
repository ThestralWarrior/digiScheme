const ethers = require('ethers');
const MongoClient = require('mongodb').MongoClient;
const provider = new ethers.JsonRpcProvider('https://sepolia.infura.io/v3/78004325985f4236b7a77d79bd77a9ac');
const contractAddresses = ["0x8AaAb10F0E8ceADDE003fC798CA03F59824661C1", "0x8100E39515E06d2269be5B5c535d1511d0190e18", "0xA9A7eFb1A9a5Dd6611Cf5D63052d377c0cadd2F7", "0x2A79fa550408b3F4FfC604942778774D7C10b355", "0x898CE973287Ace1e374902d0590e60C2c8f2Ad97", "0x4BF121f5f43C215b50004160997210b69A3DcDF5"];
const contractAbi = [
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
]
let eligibleAddresses = [];

class Criteria {
    constructor(age, gender, occupation, income, religion, caste) {
        this.age = age;
        this.gender = gender;
        this.occupation = occupation;
        this.income = income;
        this.religion = religion;
        this.caste = caste;
    }
}

async function getCriteria() {
    for(const contractAddress of contractAddresses) {
        const contract = new ethers.Contract(contractAddress, contractAbi, provider);
        const criteria = await contract.criteria();
        console.log(criteria);
    }
}


getCriteria();