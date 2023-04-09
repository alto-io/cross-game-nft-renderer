import styles from "../styles/nft.module.css";
import { useSpring, useTransition, a } from "react-spring"
import type { NftMetadata } from "use-nft"
import React, { useState } from "react"
import LoopVideo from "./LoopVideo"
import XGR from "./xgr"

type Attribute = {
    trait_type: string
    value: string
}

type NftDetailsProps = {
    nft: NftMetadata
    tokenId: string
    rendererUrl: string
    xgr: boolean
  }


function NftDetails({ nft, rendererUrl, xgr, tokenId }: NftDetailsProps) {
        
    const IMAGE_HEIGHT = 280;

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
  
    if (!nft) {
        return null
      }
 
    const { image, rawData } = nft
    const name = nft.name || "Untitled"
    const description = nft.description || "−"


    let attributes = rawData?.attributes;

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

              {
              
              image.includes(".mp4") ? (
                <LoopVideo type="video/mp4" src={image} height={IMAGE_HEIGHT} />
              ) : 
              
              image.includes(IPFS_PREFIX) ? (
                <img src={IPFS_GATEWAY + image.split(IPFS_PREFIX)[1]} height={IMAGE_HEIGHT}/>
              )
              :
              (
                image && <img src={image} height={IMAGE_HEIGHT} alt="" />
              )
              }
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
            title={description}
          >
            {description}
          </p>
        </a.div>
      </div>
    )
  }
  
  export default NftDetails