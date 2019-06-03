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

const puppeteer = require('puppeteer');
const config = require('../config');

process.on('unhandledrejection', () => {
    console.log('unhandled error occured');
});

const WebService = {

    async getWeb(url) {
        try {
            const browser = await puppeteer.launch({ headless: true });
            const page = await browser.newPage();
            await page.setViewport({ width: 1920, height: 926 });
            await page.goto(url, config.pageLoad);
            const links = await page.$$eval('a', as => as.map(a => a.href));
            return links;
        } catch (e) {
            return [];
        }
    }

}

module.exports = WebService;