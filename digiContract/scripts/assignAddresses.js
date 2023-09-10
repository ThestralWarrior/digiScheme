const MongoClient = require('mongodb').MongoClient;
const ethers = require('ethers');

const provider = new ethers.JsonRpcProvider('https://sepolia.infura.io/v3/78004325985f4236b7a77d79bd77a9ac');
const signer = new ethers.Wallet('4db6c11888a7bfddb323d08dd30fc3d71280b66f691cb024a1c154e28af8c65c', provider);
const url = 'mongodb+srv://Ashirvaad:hashbots@digischeme.rocty0o.mongodb.net/Scheme';
const dbName = 'Country';
const collectionName = 'citizen';

// const contractAddress = '0xd88622B60b0FB9BCA66ec8D09DE8c1Bba444C002';
// const contractAddress = '0xf0Ff403a1c0670c1C46d16a455bDaaF114aeCA45';
const contractAddresses = ['0x0D5C8a1Dcc893371e37Add2d2361Af01de6C95Fe', '0xdA6C54a62eb63Fc347751710f13671aCC6d684b9', '0x6aABa867BaAeB6EC1623dA0EF63f84202a0A8c73', '0xfaCb81b33E577f32a8946C9c62B7b0143dfeB209', '0xe7E06FAdb710F4B9Bd3dA6F85eca28C45e7Bf232', '0x5c8A2633be8486ADe01a45eC4866Dfb6CcF56a98'];

const contractAbi = [
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
                "internalType": "string",
                "name": "location",
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
            },
            {
                "internalType": "string",
                "name": "location",
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
    }
];
// const contract = new ethers.Contract(contractAddress, contractAbi, signer);

async function getCriteria(contract, contractAddress) {
    console.log('Eligible addresses for contract: ', contractAddress);
    const criteria = await contract.criteria();
    const age = await criteria.age;
    const gender = await criteria.gender;
    const occupation = await criteria.occupation;
    const income = await criteria.income;
    const religion = await criteria.religion;
    const caste = await criteria.caste;
    const location = await criteria.location;
    // console.log(age);
    // console.log(gender);
    // console.log(occupation);
    // console.log(income);
    // console.log(religion);
    // console.log(caste);
    // console.log(location);
    let ageCriteria;
    let ageCriteria2;
    // let genderCritera;
    // let occupationCriteria;
    let incomeCriteria;
    let incomeCriteria2;
    // let religionCriteria;
    // let casteCriteria;
    // let locationCriteria;

    if (age.includes('-')) {
        const ageRangeArray = age.split("-");
        const age1 = parseInt(ageRangeArray[0]);
        const age2 = parseInt(ageRangeArray[1]);
        // console.log(age1);
        // console.log(age2);
        ageCriteria = age1;
        ageCriteria2 = age2;
    }
    else if (age.includes('+')) {
        const ageLower = parseInt(age.replace('+', ''));
        // console.log(ageLower);
        ageCriteria = ageLower ;
        ageCriteria2 = 120 ;
    }
    else if (age === "") {
        ageCriteria = null;
        ageCriteria2 = null;
    }
    else {
        const agePoint = parseInt(age);
        ageCriteria = agePoint;
        ageCriteria2 = agePoint;
    }

    if (income.includes('-')) {
        const incomeRangeArray = income.split("-");
        const income1 = parseInt(incomeRangeArray[0]);
        const income2 = parseInt(incomeRangeArray[1]);
        // console.log(income1);
        // console.log(income2);
        incomeCriteria = income1;
        incomeCriteria2 = income2;
    }
    else if (income.includes('+')) {
        const incomeLower = parseInt(income.replace('+', ''));
        // console.log(incomeLower);
        incomeCriteria = incomeLower ;
        incomeCriteria2 = 10000000000 ;
        
    }
    else if (income === "") {
        incomeCriteria = null;
        incomeCriteria2 = null;
    }
    else {
        const incomePoint = parseInt(income);
        incomeCriteria = incomePoint ;
        incomeCriteria2 = incomePoint ;
        
    }

    // if (gender === "") {
    //     genderCriteria = null;
    // }
    // else {
    //     genderCriteria = { gender };
    // }

    // if (occupation === "") {
    //     occupationCriteria = null;
    // }
    // else {
    //     occupationCriteria = { occupation };
    // }

    // if (religion === "") {
    //     religionCriteria = null;
    // }
    // else {
    //     religionCriteria = { religion };
    // }

    // if (caste === "") {
    //     casteCriteria = null;
    // }
    // else {
    //     casteCriteria = { caste };
    // }

    // if (location === "") {
    //     locationCriteria = null;
    // }
    // else {
    //     locationCriteria = { location };
    // }
    const query = {
        $and: [
            (ageCriteria !== 0 && ageCriteria2 !== 0)
                ? { Age: { $gte: ageCriteria, $lte: ageCriteria2 } }
                : {},
            gender !== "" ? { Gender: { $eq: gender } } : {},
            occupation !== "" ? { Occupation: { $eq: occupation } } : {},
            (incomeCriteria !== 0 && incomeCriteria2 !== 0)
                ? { Income_INR:{ $gte: incomeCriteria, $lte: incomeCriteria2 } }
                : {},
            location !== "" ? { Location: { $eq: location } } : {},
            religion !== "" ? { Religion: { $eq: religion } } : {},
            caste !== "" ? { Caste: { $eq: caste } } : {}
        ]
    }
    return query;
}

async function passCriteria(query) {
    const client = new MongoClient(url);

    try {
        // Connect to the MongoDB server
        await client.connect();

        // Select the database and collection
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Find documents matching the criteria
        const matchingDocuments = await collection.find(query).toArray();

        // Extract the addresses from the matching documents
        const addresses = matchingDocuments.map(doc => doc.Wallet_Address);

        return addresses;
    } finally {
        // Close the client connection
        await client.close();
    }
}

// Call the function to get the matching addresses

async function init() {
    for(const contractAddress of contractAddresses) {
        const contract = new ethers.Contract(contractAddress, contractAbi, signer);
        const query = await getCriteria(contract, contractAddress);
        const addresses = await passCriteria(query);
        console.log(addresses);
        try {
            const tx = await contract.setAddresses(addresses);
            await tx.wait();
            console.log("Addresses have been successfully assigned in " + contractAddress);
        }
        catch(error) {
            console.log(error);
        }
    }
    // const query = await getCriteria();
    // const addresses = await passCriteria(query);
    // console.log(addresses);
    // try {
    //     const tx = await contract.setAddresses(addresses);
    //     await tx.wait();
    //     console.log("addresses have been successfully assigned");
    // }
    // catch(error) {
    //     console.log(error);
    // }
}

init();