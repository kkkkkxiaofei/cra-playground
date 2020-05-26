import React, { useEffect, useRef } from 'react';
import styles from './CodeEditor.module.scss';
import * as Monaco from 'monaco-editor';
import { debounce } from '../../utils';
import './polyfill.scss';

const CodeEditor = props => {
  const { onChange, source, language } = props;
  
  const editorRef = useRef();
  useEffect(() => {
    window.MonacoEnvironment = {
      getWorkerUrl: function (moduleId, label) {
        if (label === 'json') {
          return '/json.worker.bundle.js';
        }
        if (label === 'scss') {
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

    const editorInstance = Monaco.editor.create(
      editorRef.current, 
      {
        value: source,
        language,
        theme: 'vs-dark',
      },
    );

    editorInstance.onDidChangeModelContent(
      debounce(() => onChange(editorInstance.getValue()), 1000)
    );
    
    return () => editorInstance.dispose();

  }, []);
  return (
    <div ref={editorRef} className={styles.editorContainer}></div>
  );
};

export default CodeEditor;