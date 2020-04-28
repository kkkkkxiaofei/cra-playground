import React, { useState } from 'react';
import Form from '../Form/Form';
import FormItem from '../FormItem/FormItem';
import styles from '../index.module.scss';
import {
  Button,
  Input
} from './Components';
import Demo1 from './Demo1';

const Demo3 = props => {
  const [forms, setForms] = useState([]);
  const [snapshots, setSnapshots] = useState([]);
  const addHandler = () => setForms([
    ...forms, 
    <Demo1 onSubmit={snapshot => setSnapshots([...snapshots, snapshot])}/>
  ]);
  const saveHandler = () => {
    console.log(snapshots);
  }
  return (
    <div className={styles.container}>
      {forms.map(Form => Form)}
      <Button name={'add +'} onClick={addHandler} />
      <Button name={'save'} onClick={saveHandler} />
    </div>
  );
};

export default Demo3;