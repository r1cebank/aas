/**
 * Created by r1cebank on 8/19/15.
 */

/*!
 *  This is the config file, will include everything needed to bootstrap the app
  *  Minor configuration is needed but not required.
 */

var config = {
    HMACSecret: '909957e0fe0b9d8197e44e6daeee9336',
    server: {
        storage: {
            dest: 'storage/',
            processed: 'processed/'
        },
        ui: {
            apiURL: '/api', // IMPORTANT: specify the api url
            baseURL: '/kue', // IMPORTANT: specify the base url
            updateInterval: 2000 // Optional: Fetches new data every 5000 ms
        },
        autoclean: false,
        database:   'db/',
        host:       'http://localhost:3939',
        port:       3939,
        port_ssl:   33939
    },
    generator: {
        max: 1000
    },
    auth: {
        type: 'none',
        keys: {
            c9cba3d805ff526866d27b5504005766: {
                roles: [
                    'yaas:list',
                    'bucket:upload',
                    'bucket:list',
                    'file:get',
                    'version:list'
                ]
            }
        },
        overwrites: {
            'file:get': 'none',
            'version:list': 'none',
            'bucket:list': 'none',
            'yaas:list': 'none',
            'generator:lorem': 'none',
            'generator:json': 'none',
            'generator:xml': 'none'
        }
    }
};

export default config;
