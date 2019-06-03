/*
 * *
 *  Copyright 2014 Comcast Cable Communications Management, LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 * /
 */

const rulesService = require('./utils/rules');
const filesService = require('./utils/files');
const webService = require('./utils/web');
const log = require('./utils/log');
const _ = require('underscore');
const config = require('./config');
const parallel = require('paralleljs');

const crawler = {

    counter: 0,

    allUrls: [],

    processes: [],

    processesCompleted: [],

    dataFetched: 0,

    baseUrlHashes: config.base.split('/').length,

    getXml(xmUrl, limit) {
        log.log(`Queuing ${xmUrl}`);
        webService.getWeb(xmUrl).then((data) => {
            log.log(`Data received for ${xmUrl}`);
            this.counter = this.counter + 1;
            this.allUrls = _.union(this.allUrls, rulesService.checkRules(data));
            if (this.counter === limit) {
                filesService.createXml(rulesService.sortLinks(this.allUrls));
            }
        });
    },

    /*
    * 1. Feed the base Url and fetch HTML
    * 2. Remove url from 'process' array
    * 3. Push the url to 'processCompleted' 
    * 4. Filter the fetched urls for the following
    *   A) Urls already processed stored in 'processCompleted'
    *   B) Urls that are already present in queue stored in 'processes'
    *   C) Ignoring urls based on levels
    * 5. Push all the remaining urls to 'processes'
    * 6. autoFetch again
    * 7. If processes are empty, create sitemap
    */
    autoFetch() {
        while (this.processes.length > 0) {

            // Remove url from 'process' array
            const xmUrl = this.processes.pop();
            log.log(`Queuing ${xmUrl}`);
            
            this.counter = this.counter + 1;

            // Push the url to 'processCompleted'
            this.processesCompleted.push(xmUrl);

            // Feed the base Url and fetch HTML
            webService.getWeb(xmUrl).then((data) => {

                log.log(`Data received for ${xmUrl}`);
                const newUrls = rulesService.checkRules(data);
                this.allUrls = _.union(this.allUrls, newUrls);

                log.log(`Data Queued ${this.counter} - Completed - ${this.dataFetched}`);
                this.dataFetched = this.dataFetched + 1;
                                
                if ((this.counter === this.dataFetched) && this.counter !== 1) {
                    filesService.createXml(rulesService.sortLinks(this.allUrls));
                } else {
                    this.queueUrls(newUrls);
                }
            });
        }
    },

    queueUrls(urls) {        
        // Filter Urls already processed stored in 'processCompleted'
        const removingCompleted = _.uniq(_.without(urls, ...this.processesCompleted));
        const removingQueued = _.without(removingCompleted, ...this.processes);

        const removingIngoreLevels = _.filter(removingQueued, (url) => url.split('/').length <= (this.baseUrlHashes + config.crawlLevel));
        const urlsIgnored = _.difference(urls, removingIngoreLevels);
        this.processesCompleted.push(...urlsIgnored);
        this.processes = _.uniq([...this.processes, ...removingIngoreLevels]);

        // Below line is temporary, only for testing purpose. _.repeat() is deprecated
        try {
            new parallel([this.autoFetch()]);
        }
        catch(e) {
            console.log('Error occuring during parallel process');
            console.log(e);
        }
    }
}

module.exports = crawler;