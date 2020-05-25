import React, { useState, useMemo } from 'react';
import CodeEditor from '../CodeEditor/CodeEditor';
import classNames from '../../utils/classNames';
import styles from './CodeEditorsContainer.module.scss';

const CodeEditorsContainer = props => {
  const { editors, onSelect, activedKey, setEditors } = props;

  const getEditorHandler = useMemo(() => key => value => {
    console.log('2222')
    setEditors(editors.map(editor => {
      if (editor.key === key) {
        return {
          ...editor,
          source: value,
        }
      }
      return editor;
    }))
  }, [editors, setEditors]);

  return (
    <div className={styles.container}>
      <div className={styles.panelTabs}>
        {editors.map(({ key }) => 
          <span 
            className={classNames(styles.panelTab, { [styles.actived]: activedKey === key })}
            onClick={() => onSelect(key)}
          >
            {key}
          </span>
        )}
      </div>
      <div className={styles.panelContent}>
        {
          editors.map(editor => {
            return (
              <div className={classNames(styles.item, { [styles.actived]: activedKey === editor.key })}>
                <CodeEditor {...editor} onChange={getEditorHandler(editor.key)}/>
              </div>
            )
          })
        }
      </div>
      
    </div>
  )
  
};

export default React.memo(
  CodeEditorsContainer, 
  (pre, next) => pre.activedKey === next.activedKey && pre.editors === next.editors
);