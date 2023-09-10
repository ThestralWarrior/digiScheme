const ethers = require('ethers');;
const provider = new ethers.JsonRpcProvider('https://sepolia.infura.io/v3/78004325985f4236b7a77d79bd77a9ac');
const signer = new ethers.Wallet('4db6c11888a7bfddb323d08dd30fc3d71280b66f691cb024a1c154e28af8c65c', provider);
// const wallet1 = new ethers.Wallet('b8cc2c0513a0edfde8ca9b9c7da42965597605dd46f96a806dc3f781120d89f0', provider);
// const wallet2 = new ethers.Wallet('49ab6c63bc761f6a9b7a095a340a2cfeeb1a9760e3f81d645398517bab0b38ea', provider);

const address = '0x8100E39515E06d2269be5B5c535d1511d0190e18';
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
const contract = new ethers.Contract(address, abi, signer);
// const walletcontract1 = new ethers.Contract(address, abi, wallet1);
// const walletcontract2 = new ethers.Contract(address, abi, wallet2);

let addresses = [
    '0x29E8BC31c99A11c2c590a5717f0B00B003e78748', 
    '0xDdF5892709BF4f673Fd6472C4ef120334251deC8', 
    '0x0874D2f8cAc915Cc449A1395d1dD010e178f079e', 
    '0x2CF96007CDF0B74E9cbace641A90e321B33D3B91'
];

async function addFunds() {
    var amount = ethers.parseEther('1');

    console.log(`Adding ${amount} to ${address}`);
    const tx = await contract.addFunds({value: amount});
    await tx.wait();

    console.log(`Adding ${amount} to ${address}`);
    const newtx = await contract.addFunds({value: ethers.parseEther('1')});
    await newtx.wait();
}

// async function printBalance() {
//     console.log(await provider.getBalance(address));
// }

// async function getCriteria() {
//     try {
//         const criteria = await contract.criteria();
//         const age = await criteria.age;
//         const gender = await criteria.gender;
//         const occupation = await criteria.occupation;
//         const income = await criteria.income;
//         const religion = await criteria.religion;
//         const caste = await criteria.caste;

//         console.log('Criteria: ', criteria);
//         console.log("Age range: " + age);
//         console.log("Gender: " + gender);
//         console.log("Occupation: " + occupation);
//         console.log("Income: " + income);
//         console.log("Religion: " + religion);
//         console.log("Caste: " + caste);
//     } catch (error) {
//         console.error('Oops something went wrong while accessing criteria');
//     }
// }
async function addAddresses() {
    try {
        const tx = await contract.setAddresses(addresses);
        await tx.wait();
        console.log("Addresses have been set");
    } catch(error) {
        console.log("Oops something went wrong while assigning addresses");
    }
}
async function checkEligibleAddress() {
    for(const addr of addresses) {
        try {
            console.log(addr);
            const isEligible = await contract.eligibleAddresses(addr);
            console.log(`Address ${addr} eligibility: ${isEligible}`);
        } catch(error) {
            console.log("oops");
        }
    }
}
async function checkBalance() {
	const balance  = await contract.getBalance();
	console.log(balance);
}
// async function callTransfer() {
//     try {
//         const tx1 = await walletcontract1.transfer();
//         await tx1.wait();
//         console.log(`tx1 has sent ${await contract.eligibleAmount()}`);

//         const tx2 = await walletcontract2.transfer();
//         await tx2.wait();
//         console.log(`tx2 has sent ${await contract.eligibleAmount()}`);
//     } catch(error) {
//         console.log("Something went wrong while trying to get the funds transferred");
//     }
// }
// async function printNewBalances() {
//     try {
//         const balance1 = await provider.getBalance(addresses[0]);
//         const balance2 = await provider.getBalance(addresses[1]);
//         const balance3 = await provider.getBalance(address);
//         console.log(balance1);
//         console.log(balance2);
//         console.log(balance3);
//     } catch(error) {
//         console.log("Oops");
//     }
// }

// printBalance();
// getCriteria();
// // addAddresses();
// // callTransfer();
// printNewBalances();
// addAddresses();
// checkEligibleAddress();
// addFunds();

async function init() {
	// await addAddresses();
	// await addFunds();
	await checkBalance();
	await checkEligibleAddress();
}
init();