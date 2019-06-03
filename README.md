# SITEMAP GENERATOR FOR SPA (SINGLE PAGE APPLICATION)

### About

Sitemaps are simple XML documents consisting of links of all pages in a website. This provides additional information about the page to search engine crawlers to categories the type of content and serve it to the users based on their search keywords. 

Most commonly used sitemap generators works well with websites with multiple pages that are built with PHP, ASP.NET or any old-school technologies since the browser reloads everytime the user navigates through different pages. Wherease, websites that rely heavily on Javascript (Like Angular / React / Vuejs ) will not reload during page navigation and only the `view` changes. This makes the existing generators difficult to capture different routes and create a sitemap out of it. 

This Sitemap generator, built with `puppeteer (Google Chrome's Headless Chrome Node API) ` works well with Javascript based websites in creating Sitemaps


### Setup & Configuration

`npm install`

To start generating

`npm start`

**config.js**

```js
module.exports  = {
    base: 'https://www.xfinity.com', // website url
    urls: [ // list of pages you want to crawl
        'https://www.xfinity.com/mobile', 
        'https://www.xfinity.com/mobile/plan',
        'https://www.xfinity.com/mobile/byod',
        'https://www.xfinity.com/mobile/support',
        'https://www.xfinity.com/mobile/shop?category=device',
        'https://www.xfinity.com/mobile/shop?category=accessories'
    ],
    strictPresence: 'www.xfinity.com/mobile/', // url will be added to xml only if this exists
    ignoreStrings: [ // ignore any url that has these texts
        'img.xfinity',
        'styles.',
        'm.me'
    ],
    autoCrawl: false, // Recursive crawling functionality
    crawlLevel: 0, // Recursive calling for pages upto 'x' levels
    pageLoad: { // page load configuration
        waitUntil: 'networkidle0',
        timeout: 3000000
    },
    disableHashRoutes: false, // disable routes with Hash in it
    sortBy: 'asc' // 'asc' | 'dsc' | 'none'
}
```

### Configurations

**base**

`base: 'https://www.xfinity.com'`

Website that you want to create sitemap for

**urls (only for manual Crawling)**

Array of urls that you wanted to crawl. Links present in the mentional html pages will **not** be recursively called in this

**strictPresence**

Add the url to XML only if this string presents

**ignoreStrings**

List of urls/strings you wanted to ignore in the links you are adding to Sitemap

**autoCrawl**

Enable/Disable Auto Crawling feature. Auto-crawling takes more time than manual crawl. Largely depends on the complexity of website


**crawlLevel(only for auto-crawl)**

Mention number of child routes you would like to crawl in case of auto-crawling

E.g.: 
Lets assume the base url `https://abc.com/`, 

`crawlLevel=1` would crawl in pattern  `https://abc.com/<any-path>`
`crawlLevel=2` would crawl in pattern  `https://abc.com/<any-path>/<any-path>`


**pageLoad**

Page load settings inherited from puppeteer configuration

https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagegotourl-options


**disableHashRoutes**

Ignore any routes with `#` in it

E.g.:

Avoids these urls

`https://abc.com/#section2`
`https://abc.com/#/section2`
`https://abc.com/about#section4`


## License

This repo is licensed under [Apache License 2.0](LICENSE).



