import React, { useEffect, useRef } from 'react';
import styles from './ReactEditor.module.scss';
import * as Monaco from 'monaco-editor';

const ReactEditor = props => {
  const { onChange } = props;
  const editorRef = useRef();
  useEffect(() => {
    window.MonacoEnvironment = {
      getWorkerUrl: function (moduleId, label) {
        if (label === 'json') {
          return '/json.worker.bundle.js';
        }
        if (label === 'css') {
          return '/css.worker.bundle.js';
        }
        if (label === 'html') {
          return '/html.worker.bundle.js';
        }
        if (label === 'typescript' || label === 'javascript') {
          return '/ts.worker.bundle.js';
        }
        return '/editor.worker.bundle.js';
      }
    }

    Monaco.editor.create(
      editorRef.current, 
      {
        value: 'function() {}',
        language: 'javascript',
      },
    );

    const keyUpHandler = e => {
      const currentValue = Object.values(e.target.parentElement.querySelectorAll('.view-line span[class^=m]'))
        .map(element => element.innerText)
        .join('');
      onChange(currentValue);
    };

    editorRef.current.addEventListener('keyup', keyUpHandler);

    return () => editorRef.current.removeEventListener('keyup', keyUpHandler);

  }, []);
  return (
    <div ref={editorRef} className={styles.editorContainer}>
      react editor
    </div>
  );
};

export default ReactEditor;