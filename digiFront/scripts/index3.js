import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.7.0/ethers.min.js";
var currentAccount = localStorage.getItem('currentAccount');
// const contractAddresses = ["0x8AaAb10F0E8ceADDE003fC798CA03F59824661C1", "0x8100E39515E06d2269be5B5c535d1511d0190e18", "0xA9A7eFb1A9a5Dd6611Cf5D63052d377c0cadd2F7", "0x2A79fa550408b3F4FfC604942778774D7C10b355", "0x898CE973287Ace1e374902d0590e60C2c8f2Ad97", "0x4BF121f5f43C215b50004160997210b69A3DcDF5"];
const contractAddresses = ["0x0D5C8a1Dcc893371e37Add2d2361Af01de6C95Fe", "0xdA6C54a62eb63Fc347751710f13671aCC6d684b9", "0x6aABa867BaAeB6EC1623dA0EF63f84202a0A8c73", "0xfaCb81b33E577f32a8946C9c62B7b0143dfeB209", "0xe7E06FAdb710F4B9Bd3dA6F85eca28C45e7Bf232", "0x5c8A2633be8486ADe01a45eC4866Dfb6CcF56a98"];
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

const provider = new ethers.JsonRpcProvider('https://sepolia.infura.io/v3/78004325985f4236b7a77d79bd77a9ac');
class Scheme {
  constructor(name, description, age, gender, occupation, income, caste, religion, location, address) {
    this.name = name;
    this.description = description;
    this.age = age;
    this.gender = gender;
    this.occupation = occupation;
    this.income = income;
    this.caste = caste;
    this.religion = religion;
    this.location = location;
    this.address = address;
  }
}

function createSchemes(contractAddresses) {
  const scheme1 = new Scheme(
 	"Youth Empowerment Scholarship Program",
    "The Youth Empowerment Scholarship Program is an initiative by the Government of India to empower young individuals by providing financial assistance for higher education. This scholarship is available to students between the ages of 18 to 25, regardless of their gender, religion, or caste. The program aims to support students in pursuing their dreams and aspirations through various educational opportunities, including undergraduate and postgraduate courses. The scholarship covers tuition fees, books, and other educational expenses, enabling students to focus on their studies without financial constraints.",
    "18 - 25",
    "",
    "Student",
    "",
    "",
    "",
    "",
    "0x0D5C8a1Dcc893371e37Add2d2361Af01de6C95Fe"
  );
  const scheme2 = new Scheme(
    "Sikh Educational Empowerment Program (SEEP)",
    "The Sikh Educational Empowerment Program (SEEP) is a government-sponsored initiative aimed at empowering Sikh youth in India through education. This program is exclusively designed for students aged 16 to 30 who belong to the Sikh community. It offers comprehensive support to help them pursue higher education, vocational training, or skill development programs. SEEP covers tuition fees, course materials, and living expenses, ensuring that Sikh students have equal opportunities to access quality education and contribute to their community's socio-economic growth.",
    "16 - 28",
    "",
    "Student",
    "",
    "",
    "Sikh",
    "Punjab",
    "0xdA6C54a62eb63Fc347751710f13671aCC6d684b9"
  );
  const scheme3 = new Scheme(
    "Shiksha Shakti Yojana (Girl Power Scheme)",
    "The Shiksha Shakti Yojana, also known as the Girl Power Scheme, is a government initiative dedicated to advancing girls' education and empowerment. This scheme aims to break down barriers that hinder girls' access to quality education and create an inclusive learning environment.",
    "16-23",
    "Female",
    "Student",
    "",
    "",
    "",
    "",
    "0x6aABa867BaAeB6EC1623dA0EF63f84202a0A8c73"
  );
  const scheme4 = new Scheme(
    "Government Employee Welfare Fund (GEWF)",
    "The Government Employee Welfare Fund (GEWF) is a dedicated initiative to enhance the well-being and overall quality of life for government employees. It provides financial assistance and support to government workers and their families during various life events and emergencies.",
    "21+",
    "",
    "Govt Employees",
    "",
    "",
    "",
    "",
    "0xfaCb81b33E577f32a8946C9c62B7b0143dfeB209"
  );
  const scheme5 = new Scheme(
    "Kisan Samriddhi Yojana (Farmers' Prosperity Scheme)",
    "The Kisan Samriddhi Yojana (Farmers' Prosperity Scheme) is a comprehensive initiative aimed at promoting agricultural growth, improving the livelihoods of farmers, and ensuring food security in the nation. It provides a range of support mechanisms to empower farmers and enhance their agricultural practices.",
    "",
    "",
    "Farmer",
    "",
    "",
    "",
    "",
    "0xe7E06FAdb710F4B9Bd3dA6F85eca28C45e7Bf232"
  );
  const scheme6 = new Scheme(
    "Samriddhi Samarthan Yojana (Prosperity Support Scheme)",
    "The Samriddhi Samarthan Yojana, or the Prosperity Support Scheme, is a government initiative aimed at promoting the socio-economic development of individuals belonging to OBC, SC, and ST communities. This scheme seeks to uplift these communities by providing financial assistance and access to resources for their holistic growth.",
    "18-60",
    "",
    "",
    "",
    "OBC",
    "",
    "Odisha",
    "0x5c8A2633be8486ADe01a45eC4866Dfb6CcF56a98"
  );

	// var schemes = [];
	// for(const contractAddress of contractAddresses) {
	 // 	name;
	// 	age;
	// 	gender;
	// 	occupation;
	// 	income;
	// 	caste;
	// 	religion;
	// 	location;
	// 	description;
	// 	const Scheme1 = new Scheme(name, description, age, gender, occupation, income, caste, religion, location, address);
	// 	schemes.push(Scheme1);
	// }	
  	const schemes = [scheme1, scheme2, scheme3, scheme4, scheme5, scheme6];
	let eligibleSchemes = []
    for(const contractAddress of contractAddresses) {
		for(let i = 0; i < schemes.length; i++) {
			if(schemes[i].address === contractAddress) {
				eligibleSchemes.push(schemes[i]);
				break;
			}
		}
	}
  	return eligibleSchemes;
}

function generateSchemeHTML(scheme) {
	var page = 5;
	for(var i = 0; i < contractAddresses.length; i++) {
		if(scheme.address === contractAddresses[i]) {
			page = page + i;
			continue;
		}
	}
  var schemeHTML = `
    <div class="box2" id="${scheme.name}"> <a href="index${page}.html" style="text-decoration:none;color:black;"> 
      <h2 style="padding: 24px;">${scheme.name}</h2>
      <div class="btn">
  `;
    
  if(scheme.age) {
    schemeHTML += `
    <div class="sa">
      ${scheme.age}
    </div>
    `;
  }

  if(scheme.gender) {
    schemeHTML += `
    <div class="sa">
      ${scheme.gender}
    </div>
    `;
  }

  if(scheme.occupation) {
    schemeHTML += `
    <div class="sa">
      ${scheme.occupation}
    </div>
    `;
  }

  if(scheme.income) {
    schemeHTML += `
    <div class="sa">
      ${scheme.income}
    </div>
    `;
  }

  if(scheme.caste) {
    schemeHTML += `
    <div class="sa">
      ${scheme.caste}
    </div>
    `;
  }

  if(scheme.religion) {
    schemeHTML += `
    <div class="sa">
      ${scheme.religion}
    </div>
    `;
  }

  if(scheme.location) {
    schemeHTML += `
    <div class="sa">
      ${scheme.location}
    </div>
    `;
  }
        
  schemeHTML += `
      </div>
        <p>${scheme.description}</p>
	</a>
    </div>
  `;

  return schemeHTML;
}

const schemesContainer = document.querySelector('#schemes-container');
const heading = document.querySelector('#heading');


async function initialize() {
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
 	let list = [];
  	if(currentAccount && currentAccount !== 'undefined') {
		for(const contractAddress of contractAddresses) {
			const contract = new ethers.Contract(contractAddress, contractAbi, provider);
			const isEligible = await contract.eligibleAddresses(currentAccount);
			// const balance = await contract.getBalance();
			// const amount = await contract.eligibleAmount();
			console.log(isEligible);
			if(isEligible) {
				list.push(contractAddress);
			}
	  	}
	  	console.log(list);
		if(list.length === 0) {
			heading.textContent = "You are not eligible for any schemes";
		}
		else {
			heading.textContent = "Your schemes ";
		}
    }
    else {
		list = contractAddresses;
    } 
	const schemes = createSchemes(list);
	const schemeHTMLArray = schemes.map(scheme => generateSchemeHTML(scheme));
	schemesContainer.innerHTML = schemeHTMLArray.join('');
	
	for(const scheme of schemes) {
		const name = scheme.name;
		console.log(name);
		const element = document.getElementById(`${name}`);
		console.log(element);
		element.addEventListener('click', () => {
			const setItem = localStorage.setItem('name', scheme.name);
			console.log(setItem);
			localStorage.setItem('description', scheme.description);
			localStorage.setItem('age', scheme.age);
			localStorage.setItem('gender', scheme.gender);
			localStorage.setItem('occupation', scheme.occupation);
			localStorage.setItem('income', scheme.income);
			localStorage.setItem('caste', scheme.caste);
			localStorage.setItem('religion', scheme.religion);
			localStorage.setItem('location', scheme.location);
			localStorage.setItem('address', scheme.address);
		});
	}
}

document.addEventListener('DOMContentLoaded', () => initialize());