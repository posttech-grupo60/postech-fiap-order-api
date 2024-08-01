/* c8 ignore start */
export default {
    default: {
        requireModule: ['ts-node/register'],
        paths: ['tests/bdd/features/*.feature'],
        require: ['tests/bdd/step-definitions/**/*.ts']
    }
};