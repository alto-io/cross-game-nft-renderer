import type { ReactNode } from "react"

import React from "react"
import { useNft } from "use-nft"
import styles from "../styles/Home.module.css"

import NFTDetails from "./NftDetails"
import NFTFromEthers from "./NftFromEthers"

type NftProps = {
  contract: string
  tokenId: string
  rendererUrl: string
  chainId: string
  xgr: boolean
  randomRefresh: any
}

function Nft({ contract, tokenId, rendererUrl, xgr, chainId, randomRefresh }: NftProps) {
  const { nft, loading, error, reload } = useNft(contract, tokenId)

  return (
    <Card >
      {
        // if mainnet, use useNFT
        chainId === "1" &&
        (() => {
        if (loading) return <NftLoading />
        if (error) return <NftError error={error} reload={reload} randomRefresh={randomRefresh} />
        return (

        <NFTDetails nft={nft} xgr={xgr} rendererUrl={rendererUrl} tokenId={tokenId}/>
        
        )

      })()}

      {
        // otherwise load using ethers
        chainId !== "1" &&
        <NFTFromEthers 
          chainId={chainId}
          contract={contract}
          xgr={xgr}
          rendererUrl={rendererUrl}
          tokenId={tokenId}          
          randomRefresh={randomRefresh}  
          />

      }      
    </Card>
  )
}

function Card({
  children,
}: {
  children: ReactNode
}) {
  return (
      <section className={styles.nftsection}
      >
          {children}
      </section>
  )
}

function NftLoading() {
  return (
    <div
    >
      Loading…
    </div>
  )
}

function NftError({ error, reload, randomRefresh }: { error: Error; reload: () => void; randomRefresh: any }) {

  console.log(error);

  return (
    <div
    >
      <p>
        Unable to load attributes 🙇 
        <br />
        Please keep trying, this is usually just a network hiccup
        <br />
        <br /> <button onClick={randomRefresh}>Retry</button>
      </p>
    </div>
  )
}


export default Nft