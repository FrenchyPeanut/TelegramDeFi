const QRCode = require('qrcode');
const Web3 = require('web3');

import {
    createWallet,
    getWalletAddress
} from './contract';

/** 
 * @dev Check if the user have already a wallet.
 * @param idNumber Id of the user.
 * @return boolean The confirmation of the existence of the wallet.
 */
const checkNewWallet = async (idNumber) => {
    const address = await getWalletAddress(idNumber);
    if (address == '0x0000000000000000000000000000000000000000') {
        return true;
    }
    return false;
}

/**
 * @dev Give the string version of a int
 * @param value int to transform
 * @return string tne string version of the int
 */
const IntToSting = (value) => {
    return value.toString();
}

/**
 * @dev Give the url of the transaction.
 * @param tx Id of the transaction
 * @return string The url of the transaction.
 */
export const getEtherscanUrl = (tx) => {
    const msg = 'you can find the details of your transaction at this url: https:///ropsten.etherscan.io/tx/'+ tx;
    return msg;
}

/**
 * @dev Generate new smart-wallet.
 * @param idNumber Id of the user.
 * @return string The address of the new wallet.
 */
export const getNewWallet = async (idNumber) => {
    const id = IntToSting(idNumber);
    if (!checkNewWallet(id)) {
        await createWallet(id);
        return 'Your smart-wallet has been successfully created at the following address: ' + await getWalletAddress(id);
    } else return 'You already have a smart-wallet which is : ' + await getWalletAddress(id);
}

/**
 * @dev Get the address of the user's wallet.
 * @param idNumber Id of the user.
 * @return string The address of the user's wallet.
 */
export const getWallet = async (idNumber) => {
    const id = IntToSting(idNumber);
    if (checkNewWallet(id)) {
        return `You don't have a smart-wallet.`;
    }
    const address = await getWalletAddress(id);
    return 'Your smart-wallet address is : ' + address;
}

/**
 * @dev Get the address of the user's wallet in qrcode format.
 * @param idNumber Id of the user.
 * @return string The url of the qrcode.
 */
export const getQRcode = async (idNumber) => {
    const id = IntToSting(idNumber);
    if (checkNewWallet(id)) {
        return `you don't have a wallet yet, if you want to, type the following command: `;
    }
    const address = await getWalletAddress(id);
    QRCode.toDataURL(address, (url, err) => {
        if (err) {
            return err;
        }
        return url;
    });
}

/**
 * @dev Get the balance's user.
 * @param idNumber Id of the user.
 * @return int The value of the wallet's user.
 */
export const getBalance = async (idNumber) => {
    const id = IntToSting(idNumber);
    if (checkNewWallet(id)) {
        return `you don't have a wallet yet, if you want to, type the following command: `;
    }
    const address = await getWalletAddress(id);
    return await Web3.eth.getBalance(address)
}