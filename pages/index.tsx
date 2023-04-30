import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '../styles/Home.module.css'
import NftGrid from 'components/NftGrid'
import { useState, useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const REGISTRY_URL = "registry/index.json";


  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(REGISTRY_URL);

        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const jsonData = await response.json();
        setCollections(jsonData);
      } catch (err) {
        setError((err as any).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  },[])

  return (
    <>
      <Head>
        <title>XGR: Cross-Game Renderer</title>
        <meta name="description" content="An open and flexible standard that allows your NFT to be displayed (and animated!) in any game" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {/*
        <div className={styles.newsbanner}>
          <a href="https://github.com/alto-io/xgr-arcadians/tree/main/public/assets" target="_blank">WELCOME, GAMEDEV.JS PARTICIPANTS! 👉 CLICK HERE 👈 FOR LINKS TO ARCADIANS ASSETS AND RENDERER SOURCE CODE</a>
        </div>
        */}
        <div className={styles.description}>
          <p>
            Cross-Game Renderer (XGR): Display and animate NFTs in any game
          </p>
          <div>
            <a
              href="https://www.opgames.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{' '}
              <Image
                src="/opg.png"
                alt="OP Games Logo"
                width={90}
                height={100}
                priority
              />
            </a>
          </div>
        </div>

        <div className={styles.center}>
        <NftGrid nftCollections={collections} />
          
        </div>

        <div className={styles.grid}>
          <a
            href="https://github.com/alto-io/cross-game-nft-renderer"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Github <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Find source code and more in-depth information about the cross-game renderer
            </p>
          </a>


          <a
            href="https://github.com/alto-io/xgr-arcadians"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              XGR-Arcadians<span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Example rendering implementation for the Arcadians collection. Uses ORA files for image layers and GLTF for animation
            </p>
          </a>


          <a
            href="https://github.com/alto-io/arcadians-avatar-builder"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              arcadians-avatar-builder <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Supporting avatar customization project using the Arcadians collection
            </p>
          </a>

          <a
            href="https://use-nft.spectre.xyz/"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              use-nft <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              This project uses Spectre&apos;s use-nft to retrieve NFT attributes and as a fallback renderer
            </p>
          </a>


        </div>
      </main>
    </>
  )
}
