import type { ReactNode } from "react"

import React from "react"
import { useNft } from "use-nft"
import styles from "../styles/Home.module.css"

import NFTDetails from "./NftDetails"

type NftProps = {
  contract: string
  tokenId: string
  rendererUrl: string
  xgr: boolean
}

function Nft({ contract, tokenId, rendererUrl, xgr }: NftProps) {
  const { nft, loading, error, reload } = useNft(contract, tokenId)

  return (
    <Card >
      {(() => {
        if (loading) return <NftLoading />
        if (error) return <NftError error={error} reload={reload} />
        return (

        <NFTDetails nft={nft} xgr={xgr} rendererUrl={rendererUrl} tokenId={tokenId}/>
        
        )

      })()}
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

function NftError({ error, reload }: { error: Error; reload: () => void }) {
  return (
    <div
    >
      <p>
        Loading error.
        <br /> <button onClick={reload}>Retry?</button>
      </p>
    </div>
  )
}


export default Nft