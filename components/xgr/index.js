import React, { useEffect, useState } from 'react';
import styles from '../../styles/xgr.module.css';

const XGR = ({rendererUrl, tokenId}) => {
    const [rendererJson, setRendererJson] = useState(null);
    const [iframeLoaded, setIframeLoaded] = useState(false);
    const [url, setUrl] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(rendererUrl);

        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const jsonData = await response.json();
        setRendererJson(jsonData);
      } catch (err) {
        setError((err).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  },[])

  useEffect( () => {
    if (rendererJson) {
        if (rendererJson.animation_url) {
            setUrl(rendererJson.animation_url + "/" + tokenId);
        }
    }
  }, [rendererJson])

  useEffect( () => {

    console.log(url);
  }, [url]);

  return (
    <iframe 
        src={url}
        scrolling='no'
        style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '280px',
            height: '280px',
            overflow: 'hidden'
          }}        
    />
  );
};

export default XGR;