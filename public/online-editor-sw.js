importScripts('/example5/babel.js');
importScripts("/example5/libs/libsass.js");
importScripts("/example5/libs/sass.util.js");
importScripts("/example5/libs/sass.options.js");
importScripts("/example5/libs/sass.importer.js");
importScripts("/example5/libs/sass.api.js");
importScripts("/example5/libs/sass.resolve-paths.js");

const channel = new BroadcastChannel('sw-messages');

const babelInstance = Babel,
    babelPresets = [
      ["es2017", { modules: false }],
      ["react"],
      ["stage-0", { decoratorsBeforeExport: false }]
    ];

const sassInstance = Sass;

const compileCode = code => {
  const compiledCode = babelInstance.transform(code, {
    presets: babelPresets,
    ast: false,
    compact: true,
  }).code;
  channel.postMessage({ type: 'code', text: compiledCode });
};

const compileStyle = style => sassInstance.compile(
    style.replace(/\s/g, ' '), 
    result => channel.postMessage({ type: 'style', text: result.text })
);

channel.addEventListener('message', event => {
  const { type, text } = event.data;
  switch (type) {
    case 'code': 
      return compileCode(text);
    case 'style': 
      return compileStyle(text);
  }
});
