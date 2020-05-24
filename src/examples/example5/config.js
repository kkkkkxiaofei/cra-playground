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
const ReactEditor = props => {
  const [visible, setVisible] = React.useState(false);
  return (
    <div className="bg">
      <button onClick={() => setVisible(!visible)}>click me</button>
      {visible && <div>react editor</div>}
    </div>
  );
};

ReactDOM.render(
  <ReactEditor />,
  document.getElementById('root')
);
`;

const initStyle = `
$color: red;

.bg {
  background-color: $color;
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