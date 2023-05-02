import React from 'react';
import styles from '../../styles/chaintag.module.css';

const ChainTag = ({contract, chainId}) => {

    let chainName = "";
    let contractScan = "";

    switch (chainId) {
        case "1":
            chainName = "mainnet";
            contractScan = "https://etherscan.io/address/" + contract;
            break;
        case "80001":
            chainName = "mumbai";
            contractScan = "https://mumbai.polygonscan.com/address/" + contract;
            break;
    }

    return (
            <div className={`${styles.chaintagdiv} ${styles[`${chainName}`]}`} >
                <a href={contractScan} target="_blank">
                    <div className={`${styles.chaintagtext}`}>{chainName}</div>
                </a>
            </div>
    );
};

export default ChainTag;