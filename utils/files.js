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

const fs = require('fs');
const log = require('./log');

const FilesService = {
    createXml(hrefs) {
        let str = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`;
        hrefs.forEach((href) => {
            str = str + `
<url>
    <loc>${href}</loc>
    <changefreq>weekly</changefreq>
</url>
`;
        });

        str = str + '</urlset>';
        log.log(`Creating sitemap for ${hrefs.length} links`);
        fs.writeFileSync(`sitemap.xml`, str, 'utf-8');
        fs.writeFileSync(`sitemap.json`, JSON.stringify({'hrefs': hrefs}), 'utf-8');
        setTimeout(() => process.exit(), 0);
    }
}

module.exports = FilesService;