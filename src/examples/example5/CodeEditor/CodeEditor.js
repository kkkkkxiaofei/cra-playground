import React, { useEffect, useRef } from 'react';
import styles from './CodeEditor.module.scss';
import * as Monaco from 'monaco-editor';

const ReactEditor = props => {
  const { onChange, value, language } = props;
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
        value,
        language,
      },
    );

    const keyUpHandler = e => {
      const currentValue = Object.values(e.target.parentElement.querySelectorAll('.view-line'))
        .sort((e1, e2) => {
          return e1.style.top.replace('px', '') - e2.style.top.replace('px', '');
        })
        .map(e => {
          const lineValue = 
            Object.values(e.querySelectorAll('span[class^=m]'))
              .map(subElement => subElement.innerText).join('');
          return lineValue;
        })
        .join('');
      if (currentValue !== editorRef.current.value) {
        editorRef.current.value = currentValue;
        onChange(currentValue);
      }
    };

    editorRef.current.addEventListener('keyup', keyUpHandler);

    return () => editorRef.current.removeEventListener('keyup', keyUpHandler);

  }, []);
  return (
    <div ref={editorRef} className={styles.editorContainer}></div>
  );
};

export default ReactEditor;