/**
 * Created by r1cebank on 8/22/15.
 */

/*!
 *  This is the list bucket route, does only one thing, list all buckets in index file
 */

import AppSingleton     from '../util/appsingleton';
import Promise          from 'bluebird';
import UrlJoin          from 'url-join';
import Fs               from 'fs';
import Junk             from 'junk';

function listbucket (req) {

    //  Log tag
    let TAG = "route:listbucket";

    //  Get shared instance from singleton
    var sharedInstance = AppSingleton.getInstance();

    return new Promise((resolve) => {
        console.log(sharedInstance.config);
        Fs.readdir(sharedInstance.config.server.storage.database, function(err, files) {
            files = files.filter(Junk.not);
            var buckets = files.map(function (filename) {
                return UrlJoin(sharedInstance.config.server.host, 'buckets', filename);
            });
            resolve({
                type: 'object',
                data: buckets
            });
        });
    });
}

export default listbucket;