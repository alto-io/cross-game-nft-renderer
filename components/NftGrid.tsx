import React, { useEffect, useState } from "react"
import { useTrail, a } from "react-spring"
import styles from '../styles/Home.module.css'
import NftCard from "./NftCard"

type NftGridProps = {
  nftCollections: Array<[string, string, string, Array<string>]>
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

  let list;

  async function loadRegistry() {
    list = await fetch("registry/index.json").then(
      (response) => {
        response.json();
      }
    );

    console.log(list);
  }

  useEffect(() => {
    setProgress(1);
    loadRegistry();
  }, [])

  return (
    <div className={styles.cardgrid}
    >
      {trail.map(({ progress }, index) => {
        const [contract, collectionName, collectionUrl] = nftCollections[index]
        return (
          <a.div
            key={contract}
            style={{
              opacity: progress as any, // until react-spring 9.0.0-rc.4, see https://github.com/pmndrs/react-spring/issues/1102
              transform: progress.to(
                (v) => `translate3d(0, ${(1 - v) * 10}px, 0)`
              ),
            }}
          >
            <NftCard
              contract={contract}
              collectionName={collectionName}
              collectionUrl={collectionUrl}
            />
          </a.div>
        )
      })}
    </div>
  )
}

export default NftGrid
