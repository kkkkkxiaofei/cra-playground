const navs = [
  {
    cate: {
      key: 'javascript',
      name: 'JS',
    },
    files: [
      'index.js',
      'scripts.js'
    ]
  },
  {
    cate: {
      key: 'scss',
      name: 'Scss',
    },
    files: [
      'style.scss'
    ]
  },
];

const iframeContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <style>
    /* style */
  </style>
</head>
<body>
  <div id="root"></div>
  <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
  <script>
    /* code */
  </script>
</body>
</html>
`;

const initCode = `

const { useState } = React;

const Example = props => {
  const [todos, setTodos] = useState([
    'Babel',
    'Canvas',
    'TypeScript',
    'NodeJs and Koa',
    'Dig out React code source',
    'Analyse wepack packaging',
    'Mini-program deployment',
    'Spike live code',
    'Web component',
    'Cache',
    'HTTP'
  ]);
  const [text, setText] = useState('');

  const addTodo = content => setTodos([...todos, content]);

  return (
    <div className='container'>
      <div className='wrap'>
        <div>
        {todos.map(todo => (<div className='todo'>{todo}</div>))}
        </div>
        <div>
          <input value={text} onChange={e => setText(e.target.value)} />
          <button onClick={() => addTodo(text)}>add todo</button>
        </div>
      </div>
    </div>
  );
};


ReactDOM.render(
  <Example />,
  document.getElementById('root')
);

`;

const initStyle = `
$color: white;
$fontWeight: 700;
$fontSize: 20px;
$margin: 20px;

.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  .wrap {
    text-align: center;
  }
}

.todo {
  color: $color;
  font-weight: $fontWeight;
  font-size: $fontSize;
  margin: $margin;
}
`;

const editorConfigs = [
  {
    key: 'script.js',
    language: 'javascript',
    source: initCode,
  },
  {
    key: 'style.scss',
    language: 'scss',
    source: initStyle,
  }
];

export {
  iframeContent,
  navs,
  editorConfigs,
};