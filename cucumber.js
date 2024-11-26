module.exports = {
  default: [
    '--require-module ts-node/register',
    '--require src/steps/**/*.ts',
    'src/features/**/*.feature'
  ].join(' ')
};
