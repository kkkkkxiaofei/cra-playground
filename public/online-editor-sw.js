importScripts('/example5/babel.js');

const source = `
const ReactEditor = props => {
  return (
    <div>
      react editor
    </div>
  );
};
ReactDOM.render(
  <ReactEditor />,
  document.getElementById('root')
)
`;

const babelInstance = 
    Babel,
    babelPresets = [
      ["es2017", { modules: false }],
      ["react"],
      ["stage-0", { decoratorsBeforeExport: false }]
    ];


const channel = new BroadcastChannel('sw-messages');
channel.addEventListener('message', event => {
  const result = babelInstance.transform(event.data.message || source, {
    presets: babelPresets,
    ast: false,
    compact: true,
  }).code
  channel.postMessage({ type: 'sw', message: result });
}, false);
