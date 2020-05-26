import React, { useState, useMemo, useCallback } from 'react';
import CodeEditor from '../CodeEditor/CodeEditor';
import classNames from '../../utils/classNames';
import styles from './CodeEditorsContainer.module.scss';

const CodeEditorsContainer = props => {
  const { editors, onSelect, activedKey, updateEditor } = props;
  
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
                <CodeEditor {...editor} onChange={value => updateEditor({ ...editor, source: value})} />
              </div>
            )
          })
        }
      </div>
      
    </div>
  )
  
};

// export default React.memo(
//   CodeEditorsContainer, 
//   (pre, next) => pre.activedKey === next.activedKey && pre.editors === next.editors
// );
export default CodeEditorsContainer;