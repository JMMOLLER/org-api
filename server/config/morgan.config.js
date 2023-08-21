import morgan from 'morgan';
import conf from './yargs.config.js';

const morganConfig = () => {
    if (conf.mode) {
        return morgan(conf.mode);
    }else{
        return morgan('short');
    }
}

export default morganConfig;