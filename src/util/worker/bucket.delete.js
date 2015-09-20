/**
 * bucket.delete.js
 *
 * @author  Siyuan Gao <siyuangao@gmail.com>
 * @license MIT
 */

import Routes        from '../../routes/routes';

/**
 * kue worker method for deleting a bucket and its files
 *
 * @method worker
 * @param {Object} job kue job
 * @param {Function} done the kue done callback
 * @return {object} Returns current singleton instance
 */
function worker (job, done) {

    //  Call generator and send the data back


    //  job.data.params is param passed from express
    Routes.deletebucket(job.data.request, job.data.header).then(function (data) {
        done(null, data);
    }).catch(function (e) {done(e);}).done();
}

export default worker;