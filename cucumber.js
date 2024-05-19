/* c8 ignore start */
module.exports = {
    default: {
        requireModule: ['ts-node/register'],
        paths: ['tests/bdd/features/*.feature'],
        require: ['tests/bdd/step-definitions/**/*.ts']
    }
};