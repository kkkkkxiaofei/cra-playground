importScripts('/example5/babel.js');

const source = `
const ReactEditor = props => {
  return (
    <div className={styles.container}>
      react editor
    </div>
  );
};
`;

const babelInstance = 
    Babel,
    babelPresets = [
      ["es2017", { modules: false }],
      ["react"],
      ["stage-0", { decoratorsBeforeExport: false }]
    ];

const result = babelInstance.transform(source, {
        presets: babelPresets,
        ast: false,
        compact: true,
    }).code

const channel = new BroadcastChannel('sw-messages');
channel.postMessage({ type: 'sw', message: result });