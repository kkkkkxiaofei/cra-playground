import React, { useState, useMemo, cloneElement } from 'react';
import styles from './FormItem.module.scss';

const FormItem = props => {
  const { children } = props;
  const [valueRecord, setValueRecord] = useState({ pre: "", current: "" });
  const handleOnChange = e => setValueRecord({ pre: valueRecord.current, current: e.target.value });
  const error = useMemo(() => valueRecord.pre && !valueRecord.current, [valueRecord]);
  return (
    <div className={styles.container}>
      {cloneElement(children, {...children.props, onChange: handleOnChange, value: valueRecord.current })}
      {error && <p className={`${error ? styles.error : ''} `}>field is required..</p>}
    </div>
  );
};

export default FormItem;