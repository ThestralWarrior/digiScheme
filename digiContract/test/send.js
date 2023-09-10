const Web3 = require('web3');
const provider = new Web3.providers.HttpProvider('http://localhost:7545');
const web3 = new Web3(provider);

async function sendEther() {
    const accounts = await web3.eth.getAccounts();
    const fromAddress = accounts[0];

    const amount = "20";
    const toAddress = "0xEcdCf06d1387c59124320D522b4740f408631779";

    const transactionObject = {
        from: fromAddress,
        to: toAddress,
        value: web3.utils.toHex(web3.utils.toWei(amount, 'ether')),
    };

    try {
        const receipt = await web3.eth.sendTransaction(transactionObject);
        console.log('Transaction receipt:', receipt);
    }
    catch(error) {
        console.error('Something went wrong:', error);
    }
}

sendEther();



