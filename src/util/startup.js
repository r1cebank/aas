/**
 * Created by r1cebank on 8/19/15.
 */

/*!
 *  After bootstrap, all the necessary promises, values are defined in AppSingleton
 *  In startup.js we will begin loading the appropriate routes, settings
 */

import AppSingleton     from './appsingleton';
import Promise          from 'bluebird';
import Routes           from '../routes/routes';
import Generators       from '../routes/generator/routes';
import Wrapper          from './workerwrapper';


function startup() {

    //  Log tag
    var TAG = "startup";

    //  This instance is shared across the entire app life-cycle
    var sharedInstance = AppSingleton.getInstance();

    return new Promise((resolve) => {

        //  Setup routes for app

        //  List all buckets
        sharedInstance.app.get('/', function (req, res) {

            /*!
             *  Looks like cannot use as middleware.
             */
            if(sharedInstance.authority.hasRole(req, res, 'yaas:list')) {
                Routes.listbucket(req, res).then().catch().done();
            }
        });
        //  List all files in bucket
        sharedInstance.app.get('/buckets/:bucket', function (req, res) {
            if(sharedInstance.authority.hasRole(req, res, 'bucket:list')) {
                Routes.listfile(req, res).then().catch().done();
            }
        });
        //  Setup upload
        sharedInstance.app.post('/buckets/:bucket/upload', sharedInstance.upload.single('file'), function(req, res) {
            if(sharedInstance.authority.hasRole(req, res, 'bucket:upload')) {
                Routes.upload(req, res).then().catch().done();
            }
        });
        //  Get uploaded file
        sharedInstance.app.get('/buckets/:bucket/:filename', function (req, res) {
            if(sharedInstance.authority.hasRole(req, res, 'file:get')) {
                Routes.getfile(req, res).then().catch().done();
            }

        });
        //  List all versions for file
        sharedInstance.app.get('/buckets/:bucket/:filename/versions', function (req, res) {
            if(sharedInstance.authority.hasRole(req, res, 'version:list')) {
                Routes.listversion(req, res).then().catch().done();
            }
        });
        /*!
         *  Generators, random generated assets
         */
        sharedInstance.app.get('/generator/lorem', function (req, res) {
            if(sharedInstance.authority.hasRole(req, res, 'generator:lorem')) {
                //Generators.lorem(req, res).then().catch().done();
                Wrapper.wrapper('generator:lorem', req, res);
            }
        });
        sharedInstance.app.get('/generator/json', function (req, res) {
            if(sharedInstance.authority.hasRole(req, res, 'generator:json')) {
                Wrapper.wrapper('generator:json', req, res);
            }
        });
        sharedInstance.app.get('/generator/xml', function (req, res) {
            if(sharedInstance.authority.hasRole(req, res, 'generator:xml')) {
                Wrapper.wrapper('generator:xml', req, res);
            }
        });
        resolve({ });
    });

}
export default startup;
