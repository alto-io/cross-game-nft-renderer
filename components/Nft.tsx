import type { ReactNode } from "react"
import type { NftMetadata } from "use-nft"

import React from "react"
import { useNft } from "use-nft"
import LoopVideo from "./LoopVideo"

type NftProps = {
  contract: string
  tokenId: string
}

function Nft({ contract, tokenId }: NftProps) {
  const { nft, loading, error, reload } = useNft(contract, tokenId)

  return (
    <Card >
      {(() => {
        if (loading) return <NftLoading />
        if (error) return <NftError error={error} reload={reload} />
        return <NftDetails nft={nft} />
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
      <section
      >
        <div
        >
          {children}
        </div>
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

function NftDetails({ nft }: { nft?: NftMetadata }) {
  if (!nft) {
    return null
  }

  const IPFS_PREFIX = "ipfs://";
  const IPFS_GATEWAY = "https://ipfs.io/ipfs/"

  const { image } = nft
  const name = nft.name || "Untitled"
  const description = nft.description || "−"


  return (
    <>
      <div>
        {
        
        image.includes(".mp4") ? (
          <LoopVideo type="video/mp4" src={image} height="280" />
        ) : 
        
        image.includes(IPFS_PREFIX) ? (
          <img src={IPFS_GATEWAY + image.split(IPFS_PREFIX)[1]} height="280"/>
        )
        :
        (
          image && <img src={image} height="280" alt="" />
        )
        }
      </div>
      <h1>
        <span title={name}>{name}</span>
      </h1>
      <p
        title={description}
      >
        {description}
      </p>
    </>
  )
}

export default Nft