import React, { useState, useMemo } from 'react';
import styles from '../index.module.scss';
import {
  Ok,
} from './Components';
import Demo1 from './Demo1';

const Demo4 = props => {
  const [forms, setForms] = useState([]);
  const [formsData, setFormsData] = useState({});  
  const addHandler = () => setForms([...forms, Demo1]);
  const saveHandler = () => {
    console.log(formsData);
  }

  const hasErrors = Object.values(formsData).some(({ hasErrors }) => hasErrors);
  return (
    <div className={styles.container}>
      {forms.map((Form, index) => {
        const onSnapshotUpdated = formData => setFormsData({...formsData, [index]: formData });
        const removeHandler = () => {
          forms.splice(index, 1);
          setForms([...forms]);
        }
        return (
          <div className={styles.formBox}>
            <span className={styles.remove} onClick={removeHandler}>Remove</span>
            <Form initValidate={false} onSnapshotUpdated={onSnapshotUpdated} />
          </div>
        )
      })}
      <div className={styles.btnGroup}>
        <Ok name={'Add +'} onClick={addHandler} />
        <Ok name={'Submit'} onClick={saveHandler} disabled={hasErrors} />
      </div>
    </div>
  );
};

export default Demo4;