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
  
const compileCode = source => new Promise((resolve, reject) => {
  let compiledCode;

  try {
    compiledCode = babelInstance.transform(source, {
      presets: babelPresets,
      ast: false,
      compact: true,
    }).code;
    resolve({ 
      language: 'javascript',
      compiled: compiledCode
    });
  } catch(e) {
    reject(e);
  }
})

const compileStyle = source => new Promise((resolve, reject) => {
  sassInstance.compile(
    source.replace(/\s/g, ' '), 
    result => {
      const { status, text, formatted } = result;
      console.log(result);
      if (status === 0) {//OK
        resolve({
          language: 'scss',
          compiled: text
        })
      } else {
        reject({ stack: formatted });
      }
    }
  );
});

channel.addEventListener('message', event => {
  const { to, message } = event.data;
  if (to !== 'sw') return;

  const editors = message;

  Promise.all(editors.map((editor) => {
    const { language, source } = editor;
    if (language === 'javascript') {
      return compileCode(source);
    }

    if (language === 'scss') {
      return compileStyle(source);
    }

    return new Error('Only javascript and scss are supported!');
  })).then(results => {
    const getMessageBy = type => results.filter(({ language }) => language === type).map(({ compiled }) => compiled);
    
    const message = {
      compiledCodes: getMessageBy('javascript'),
      compiledStyles: getMessageBy('scss'),
    };

    channel.postMessage({ to: 'browser', message });
  }).catch(error => {
    channel.postMessage({ to: 'browser', message: { error: error.stack, compiledCodes: '', compiledStyles: '' } });
  })
});
