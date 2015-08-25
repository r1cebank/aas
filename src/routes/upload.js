/**
 * Created by r1cebank on 8/20/15.
 */


import AppSingleton     from '../util/appsingleton';
import Promise          from 'bluebird';
import Shortid          from 'shortid';
import NeDB             from 'nedb';
import Path             from 'path';
import UrlJoin          from 'url-join';
import _                from 'lodash';
import Fs               from 'fs';

function upload (req, res) {

    //  Log tag
    let TAG = "route:upload";

    //  Get shared instance from singleton
    var sharedInstance = AppSingleton.getInstance();

    return new Promise((resolve) => {

        //  If no file supplied, error back
        if(!req.file) {
            res.status(404).send({error: "file not supplied"});
            resolve({ });
        } else {
            var bucket = new NeDB({
                filename: Path.join(sharedInstance.config.server.buckets,
                    req.params.bucket), autoload: true
            });
            bucket.find({originalname: req.file.originalname}, function (err, docs) {
                if (docs.length > 0) {
                    //  File exists, uploading a new version.

                    //  We have a new file, generate a new version code
                    var version = Shortid.generate();

                    var file = _.clone(docs[0]);
                    file.versions = _.clone(docs[0].versions);
                    file.versions[version] = req.file.path;
                    file.latestversion = version;
                    bucket.update({originalname: req.file.originalname}, {
                            $set: {
                                versions: file.versions,
                                latestversion: version
                            }
                        },
                        function (error, doc) {
                            res.send(file);
                            sharedInstance.L.info(TAG, `file ${file.originalname} updated, version ${file.latestversion}`);
                        });
                }
                else {

                    var version = Shortid.generate();

                    //  We have a new file, generate a new version code
                    var versions = {};
                    versions[version] = req.file.path;

                    //  Clone the file object
                    var file = _.clone(req.file);
                    file.versions = versions;
                    file.latestversion = version;
                    file.url = file.url = UrlJoin(sharedInstance.config.server.host,
                        req.params.bucket, req.file.originalname);

                    //  Insert the record into bucket
                    bucket.insert(file, function (err, doc) {
                        sharedInstance.L.info(TAG, "file uploaded");
                    });
                    res.send(file);
                }
            });
            resolve({});
        }
    });

}

export default upload;