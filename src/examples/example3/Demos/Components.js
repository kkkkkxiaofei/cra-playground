import React from 'react';
import styles from './Components.module.scss';

export const Input = props => {
  const { label, value, onChange, fieldRef, errorMessage, disabled = true } = props;
  return (
    <div className={styles.input + `${errorMessage ? ` ${styles.error}` : ''}`}>
      <div className={styles.group}>
        <div className={styles.item}>
          <label>{label}</label>
        </div>
        <div className={`${styles.item} ${disabled ? styles.disabled : ''}`}>
          <input ref={fieldRef} type="text" value={value} onChange={onChange} disabled={disabled}/>
          <span>{errorMessage}</span>
        </div>
      </div>
    </div>
  )
}

export const Button = props => {
  const { onClick, name, disabled } = props; 
  return (<div className={styles.btn + ` ${styles.ok} ${disabled ? styles.disabled : ''}`}>
    <button disabled={disabled} onClick={onClick}>{name}</button>
  </div>)
}

export const Ok = props => {
  const { onClick, name, disabled } = props; 
  return (<div className={styles.btn + ` ${styles.ok} ${disabled ? styles.disabled : ''}`}>
    <button disabled={disabled} onClick={onClick}>{name}</button>
  </div>)
}

export const Cancel = props => {
  const { onClick, name, disabled } = props; 
  return (<div className={styles.btn + ` ${styles.cancel} ${disabled ? styles.disabled : ''}`}>
    <button disabled={disabled} onClick={onClick}>{name}</button>
  </div>)
}

