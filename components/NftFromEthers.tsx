import styles from "../styles/nft.module.css";
import { useSpring, useTransition, a } from "react-spring"
import React, { useState, useEffect } from "react"
import XGR from "./xgr"
import { ethers } from "ethers";

type Attribute = {
    trait_type: string
    value: string
}

type NftDetailsProps = {
    chainId: string
    contract: string
    xgr: boolean
    rendererUrl: string
    tokenId: string
    randomRefresh: any
  }

function NFTFromEthers({ chainId, contract, xgr, rendererUrl, tokenId, randomRefresh}: NftDetailsProps) {
        
    const IMAGE_HEIGHT = 280;
    const MAX_DESCRIPTION_LENGTH = 200;

    const [flipped, set] = useState(false);
    const { transform, opacity } = useSpring({
      opacity: flipped ? 1 : 0,
      transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
      config: { mass: 5, tension: 500, friction: 80 }
    });

    const xgrToggleAnimation = useTransition(xgr, {
        from: { transform: 'scaleX(0)' },
        enter: { transform: 'scaleX(1)' },
        leave: { transform: 'scaleX(0)' },
        config: {
          duration: 500,
        },      
    })
      
    const IPFS_PREFIX = "ipfs://";
    const IPFS_GATEWAY = "https://ipfs.io/ipfs/"
  
    const name = "Untitled"
    const description = "−"
    const attributes = []

    const INFURA_KEY = process.env.NEXT_PUBLIC_INFURA_KEY

    useEffect(() => {
      retrieveTokenMetadata();
  },[]);

  // ERC721 ABI
  const erc721Abi = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function tokenURI(uint256 tokenId) view returns (string)",
    "function totalSupply() view returns (uint256)"
  ];

  const retrieveTokenMetadata = async () => {

    let infuraUrlPrefix = "https://mainnet.infura.io/v3/";

    switch (chainId) {
      case "1":
        infuraUrlPrefix = "https://mainnet.infura.io/v3/";
        break;
      case "80001":
        infuraUrlPrefix = "https://polygon-mumbai.infura.io/v3/";
        break;
      default:
        infuraUrlPrefix = "https://mainnet.infura.io/v3/";
        break;
    }

    console.log(infuraUrlPrefix + INFURA_KEY);
    console.log(tokenId);

    // Set up your Ethereum provider
    const provider = new ethers.providers.JsonRpcProvider(
      infuraUrlPrefix + INFURA_KEY
    );

    const contractInstance = new ethers.Contract(contract, erc721Abi, provider);

    const name = await contractInstance.name();
    const symbol = await contractInstance.symbol();
    const totalSupply = await contractInstance.totalSupply();
    console.log(totalSupply);
    const tokenURI = await contractInstance.tokenURI(tokenId);
    const metadata = await fetch(tokenURI);
    const metadataJson = await metadata.json();
    console.log(metadataJson);  
  }

    return (
      <div>
  
        <div className={styles.container} onClick={() => set((state) => !state)}>
            <a.div
              className={`${styles.c} ${styles.back}`}
              style={{ opacity: opacity.to((o) => 1 - o), transform }}
            >
              {
                rendererUrl && 
                (
                    xgrToggleAnimation((xgrstyles, item) => 
                        item ? 
                        (
                        <a.div className={styles.xgrcontainer} style={xgrstyles}>
                            <XGR rendererUrl={rendererUrl} tokenId={tokenId}/>
                        </a.div>
        
                        ) : null
                    )
                )}
            </a.div>
            <a.div
              className={`${styles.c} ${styles.front}`}
              style={{
                opacity,
                transform,
                rotateY: "180deg"
              }}
              >
              {
                  (attributes as any) ?  
                  (attributes as Array<Attribute>).map((attrib) => {
                      return (
                          <p key={attrib.trait_type}>{attrib.trait_type} : {attrib.value}</p>
                          
                      )
                  })
                 :
                 <div>
                  <p>No Attributes from use-nft</p>
                 </div>
              }
            </a.div>            
          </div>    
        <a.div className={styles.nftdetails}>
          <h1>
            <span title={name}>{name}</span>
          </h1>
          <p
            style={{
                height:"80px"
            }}
          >
            {description.substring(0, MAX_DESCRIPTION_LENGTH)}
          </p>
        </a.div>
      </div>
    )
  }
  
  export default NFTFromEthers