import React, { useEffect, useState } from "react"
import { useTrail, a } from "react-spring"
import styles from '../styles/Home.module.css'
import NftCard from "./NftCard"
import AddNftCard from "./AddNftCard"

type NftGridProps = {
  nftCollections: any;
}

function NftGrid({ nftCollections }: NftGridProps) {
  const [progress, setProgress] = useState(0)

  const trail = useTrail(nftCollections.length, {
    progress,
    config: {
      mass: 0.5,
      tension: 400,
      friction: 30,
    },
  })

  useEffect(() => {
    setProgress(1);
  }, [])

  return (
    <div className={styles.cardgrid}
    >
      {trail.map(({ progress }, index) => {
        const collection = nftCollections[index];
        return (
          <a.div
            key={collection.address}
            style={{
              opacity: progress as any, // until react-spring 9.0.0-rc.4, see https://github.com/pmndrs/react-spring/issues/1102
              transform: progress.to(
                (v) => `translate3d(0, ${(1 - v) * 10}px, 0)`
              ),
            }}
          >
            <NftCard
              contract={collection.address}
              collectionName={collection.name}
              collectionUrl={collection.homepage}
              rendererUrl={collection.renderer_url}
              chainId={collection.chainid}
            />
          </a.div>
        )
      })}

      <AddNftCard/>
    </div>
  )
}

export default NftGrid
