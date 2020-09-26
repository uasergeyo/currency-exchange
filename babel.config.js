// babel.config.js
module.exports = {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            node: 'current',
          },
        },
      ],
    ],
    "plugins": ["@babel/plugin-transform-react-jsx"],
    // "plugins": [
    //   [
    //     "@babel/plugin-transform-react-jsx",
    //     {
    //       "throwIfNamespace": false, // defaults to true
    //       "runtime": "automatic", // defaults to classic
    //       "importSource": "custom-jsx-library" // defaults to react
    //     }
    //   ]
    // ],
  };