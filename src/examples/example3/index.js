import React from 'react';
import styles from './index.module.scss';
import { 
  Demo1, 
  Demo2, 
  Demo3, 
  Demo4 
} from './Demos';

const FormValidationExamples = props => {
  return (
    <div>
      <div className={styles.demo}>
        <h1>Demo1</h1>
        <Demo1  />
      </div>
      <div className={styles.demo}>
        <h1>Demo2</h1>
        <Demo2  />
      </div>
      <div className={styles.demo}>
        <h1>Demo3</h1>
        <Demo3  />
      </div>
      <div className={styles.demo}>
        <h1>Demo4</h1>
        <Demo4  />
      </div>
    </div>
  )
};

export default FormValidationExamples;