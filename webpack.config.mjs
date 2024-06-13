import path from 'path';
import { merge } from 'webpack-merge';
import common from './webpack.common.js';
import { fileURLToPath } from 'url';

// custom directory name from the file name 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// code transpile rules
export default merge(common, {
    output: {
        path: path.resolve(__dirname, 'dist/notificationjs'),
        filename: 'Notificationjs.esm.js',
        library: {
            type: 'module'
        },
        module: true
    },
    experiments: {
        outputModule: true
    }
});