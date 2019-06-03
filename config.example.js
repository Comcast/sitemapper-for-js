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

 /*
 * ** IMPORTANT ** RENAME THIS FILE TO 'config.js' BEFORE RUNNING THE SCRIPT
 */

module.exports  = {
    base: 'https://www.xfinity.com/mobile/', // base url of the website
    urls: [
        'https://www.xfinity.com/mobile' // URLs to scan (works only if autoCrawl is false)
    ],
    strictPresence: 'https://www.xfinity.com/mobile/', // Crawl links only if this is present
    ignoreStrings: [ // Ignore any link with this string
        'img.xfinity',
        'styles.',
        'm.me'
    ],
    autoCrawl: false, // Automatically crawl through internal links and create a sitemap
    crawlLevel: 1,
    pageLoad: {
        waitUntil: 'networkidle0', // puppeteer config
        timeout: 3000000
    },
    disableHashRoutes: true,
    sortBy: 'asc' // 'asc' | 'dsc' | 'none'
}