import React from 'react';
import styles from './index.module.scss';
import { Demo1, Demo2 } from './Demos';

const FormValidationExamples = props => {
  return (
    <div>
      <div className={styles.demo}>
        <h1>Demo1</h1>
        <Demo1  />
      </div>
      {/* <div className={styles.demo}>
        <h1>Demo2</h1>
        <Demo2  />
      </div> */}
    </div>
  )
};

export default FormValidationExamples;