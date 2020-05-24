import React, { useState } from 'react';
import CodeEditor from '../CodeEditor/CodeEditor';
import classNames from '../../utils/classNames';
import styles from './CodeEditorsContainer.module.scss';

const CodeEditorsContainer = props => {
  const { editorConfigs, onSelect } = props;
  const [activedKey, setActivedKey] = useState('script.js')
  return (
    <div className={styles.container}>
      <div className={styles.panelTabs}>
        {editorConfigs.map(({ key }) => 
          <span 
            className={classNames(styles.panelTab, { [styles.actived]: activedKey === key })}
            onClick={() => setActivedKey(key)}
          >
            {key}
          </span>
        )}
      </div>
      <div className={styles.panelContent}>
        {
          editorConfigs.map(editorConfig => {
            return (
              <div className={classNames(styles.item, { [styles.actived]: activedKey === editorConfig.key })}>
                <CodeEditor {...editorConfig} />
              </div>
            )
          })
        }
      </div>
      
    </div>
  )
  
};

export default CodeEditorsContainer;