import React, { useState, useMemo } from 'react';
import { Form, FormItem } from '../Form';
import styles from '../index.module.scss';
import {
  Button,
} from './Components';
import Demo1 from './Demo1';

const Demo4 = props => {
  const [forms, setForms] = useState([]);
  const [snapshots, setSnapshots] = useState({});  
  const addHandler = () => setForms([...forms, Demo1]);
  const saveHandler = () => {
    console.log(snapshots);
  }
  return (
    <div className={styles.container}>
      {forms.map((Form, index) => <Form onSnapshotUpdated={(snapshot) => {
          setSnapshots({...snapshots, [index]: snapshot })
      }} />)}
      <Button name={'add +'} onClick={addHandler} />
      <Button name={'save'} onClick={saveHandler} />
    </div>
  );
};

export default Demo4;