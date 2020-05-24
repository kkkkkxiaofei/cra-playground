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
  
const compileCode = source => new Promise((resolve) => {
  const compiledCode = babelInstance.transform(source, {
    presets: babelPresets,
    ast: false,
    compact: true,
  }).code;
  resolve({ 
    language: 'javascript',
    compiled: compiledCode
  });
})

const compileStyle = source => new Promise((resolve) => {
  sassInstance.compile(
    source.replace(/\s/g, ' '), 
    result => resolve({
      language: 'scss',
      compiled: result.text
    })
  );
});

channel.addEventListener('message', event => {
  const editors = event.data;
  console.log('=====0', editors);
  Promise.all(editors.map((editor) => {
    const { language } = editor;
    if (language === 'javascript') {
      return compileCode(editor);
    }

    if (language === 'scss') {
      return compileStyle(editor);
    }

    return new Error('Only javascript and scss are supported!');
  })).then(results => {
    const message = {
      compiledCodes: results.filter(({ language }) => language === 'javascript').join('\n'),
      compiledStyles: results.filter(({ language }) => language === 'scss').join('\n')
    };
    console.log('=====1', message);
    channel.postMessage(message);
  })
});
