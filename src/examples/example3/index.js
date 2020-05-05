import React from 'react';
import styles from './index.module.scss';
import { 
  Demo1, 
  Demo2, 
  Demo3, 
  Demo4,
  Demo5,
  Demo6,
} from './Demos';

const FormValidationExamples = props => {
  return (
    <div className={styles.demoList}>
      <div className={styles.demoWrapper}>
        <h2>Demo1</h2>
        <div className={styles.demo}><Demo1  /></div>
      </div>
      <div className={styles.demoWrapper}>
        <h2>Demo2</h2>
        <div className={styles.demo}><Demo2  /></div>
      </div>
      <div className={styles.demoWrapper}>
        <h2>Demo3</h2>
        <div className={styles.demo}><Demo3  /></div>
      </div>
      <div className={styles.demoWrapper}>
        <h2>Demo4</h2>
        <div className={styles.demo}><Demo4  /></div>
      </div>
      <div className={styles.demoWrapper}>
        <h2>Demo5</h2>
        <div className={styles.demo}><Demo5  /></div>
      </div>
      <div className={styles.demoWrapper}>
        <h2>Demo6</h2>
        <div className={styles.demo}v><Demo6 /></div>
      </div>
    </div>
  )
};

export default FormValidationExamples;