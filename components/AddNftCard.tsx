import React from "react"
import styles from '../styles/Home.module.css'

function AddNftCard() {

  const ADD_COLLECTION_URL="https://github.com/alto-io/cross-game-renderer#adding-collections"

  return (

    <a href={ADD_COLLECTION_URL} target="_blank">
        <section className={styles.addcollection}>

        <div className={styles.addcardlabel}>
            Add an NFT Collection
            </div>

        <p className={styles.addbutton}>+</p>
        </section>    
    </a>
  )
}


export default AddNftCard