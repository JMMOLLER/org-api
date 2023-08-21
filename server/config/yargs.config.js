import yargs from 'yargs';

const conf = yargs(process.argv.slice(2)).alias({
    m: 'mode',
}).default({
    m: 'dev',
}).argv;

export default conf;
