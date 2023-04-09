import React, { useEffect, useState, useRef, MutableRefObject } from "react"
import styles from '../styles/Home.module.css'
import xgrstyles from '../styles/xgr.module.css'
import Nft from "./Nft"
import XGRSwitch from "components/xgrswitch"

type NftProps = {
  contract: string
  collectionName: string
  collectionUrl: string
  rendererUrl: string
}

type TokenIdProps = {
    tokenId : string,
    onRefresh: any
}

const MAX_TOKEN_ID = 3700;
const MAX_TOKEN_ID_INPUT=9999;

function TokenIdInput({tokenId, onRefresh } : TokenIdProps) {

    const [isEditting, setIsEditting] = useState(false);
    const inputRef = useRef() as MutableRefObject<HTMLInputElement>;

    const startEditting = () => {
        setIsEditting(true);
        inputRef.current.value = tokenId;
        inputRef.current.focus();
        inputRef.current.select();
    }

    const handleChange = (event) => {
        if (event.target.value > MAX_TOKEN_ID_INPUT) {
            inputRef.current.value = MAX_TOKEN_ID_INPUT.toString();
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            refreshDetails();
        }
        if (event.key === "Escape") {
            stopEditting();
        }
    }

    const stopEditting = () => {
        setIsEditting(false);
    }

    const refreshDetails= () => {
        setIsEditting(false);
        onRefresh(inputRef.current.value);
    }

    return (
        <>
                    <div 
                        className={!isEditting ? styles.cardtokenid : styles.hidden} 
                        onClick={startEditting}>
                        #{tokenId}
                    </div>
                    <input 
                        max={MAX_TOKEN_ID_INPUT}
                        ref={inputRef}
                        className={isEditting ? styles.tokenidinput : styles.hidden}
                        type="number"
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        onBlur={refreshDetails}>  
                        </input>

        </>
    )
}

function NftCard({ contract, collectionName, collectionUrl, rendererUrl }: NftProps) {

    const [tokenId, setTokenId] = useState("1");
    const [xgr, setXgr] = useState(true);    

    useEffect(() => {
        setTokenId(Math.floor(Math.random() *  MAX_TOKEN_ID).toString());
    },[]);

  const refreshToken = (newId) => {
    setTokenId(newId);
  }

  const randomToken = () => {
    var id = Math.floor(Math.random() * MAX_TOKEN_ID);
    setTokenId(id.toString());
  }

  return (
    <section className={styles.cardsection}>
        <div className={styles.cardlabel}>
          <a href={collectionUrl} target="_blank">{collectionName}</a>
        </div>

        <TokenIdInput tokenId={tokenId} onRefresh={refreshToken}></TokenIdInput>
        {
            rendererUrl && (
                <div className={xgrstyles.xgrdiv}>
                    <XGRSwitch xgr={xgr} setXgr={setXgr}/>
                </div>
            )
        }
        <button className={styles.randombutton} onClick={randomToken}>🎲</button>
        <Nft 
            contract={contract}
            tokenId={tokenId}
            rendererUrl={rendererUrl}
            xgr={xgr}
            />
      </section>
  )
}


export default NftCard