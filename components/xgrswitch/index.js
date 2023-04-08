import React, { useState } from 'react';
import styles from '../../styles/xgr.module.css';

const XGRSwitch = ({xgr, setXgr}) => {

  const toggleXGR = () => {
    setXgr(!xgr);
  };

  const switchClassName = xgr ? styles.xgron : styles.xgroff;

  return (
    <div className={`${styles.xgrswitch} ${switchClassName}`} onClick={toggleXGR}>
      <div className={styles.xgrtext}>XGR</div>
      <div className={styles.xgrstatus}>{xgr ? 'ON' : 'OFF'}</div>
    </div>
  );
};

export default XGRSwitch;