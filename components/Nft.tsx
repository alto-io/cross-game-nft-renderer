import type { ReactNode } from "react"

import React from "react"
import { useNft } from "use-nft"

import NFTDetails from "./NftDetails"

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
        return (

        <NFTDetails nft={nft} />
        
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


export default Nft