import React from 'react';

import styles from './Input.module.scss'

const Input = ( {...props}) => {
    return (
        <input className={styles.input} {...props}/>
    );
};

export default Input;