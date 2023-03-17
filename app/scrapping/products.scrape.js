const puppeteer = require('puppeteer')

async function scrape(PRODUCT_URL) {
    console.log('scrapping')

    const browser = await puppeteer.launch({})
    const page = await browser.newPage()

    await page.goto(PRODUCT_URL)

    const categoryElement = await page.waitForSelector(".Breadcrumbs__List--item:last-child a")
    const brandElement = await page.waitForSelector(".ProductInformation h1.Text-ds span")
    const nameElement = await page.waitForSelector(".ProductInformation h1.Text-ds span:nth-child(2)")
    const priceElement = await page.waitForSelector(".ProductPricing .Text-ds--title-6")
    const sizeElement = await page.waitForSelector(".ProductVariant__info--dimension .ProductDimension .Text-ds:last-child")
    const summaryElement = await page.waitForSelector(".ProductSummary .Text-ds--subtitle-1")
    const howtouseElement = await page.waitForSelector(".Markdown p")

    const category = await page.evaluate(element => element.textContent, categoryElement)
    const brand = await page.evaluate(element => element.textContent, brandElement)
    const name = await page.evaluate(element => element.textContent, nameElement)
    const price = await page.evaluate(element => element.textContent, priceElement)
    const size = await page.evaluate(element => element.textContent, sizeElement)
    const summary = await page.evaluate(element => element.textContent, summaryElement)
    // const how_to_use = await page.evaluate(element => element.textContent, howtouseElement)

    browser.close()

    const product = {
        name: name,
        brand: brand,
        categories: [category.toLowerCase()],
        price: price.replace('$', ''),
        size: size,
        description: summary,
        // how_to_use: how_to_use,
        url: PRODUCT_URL
    }

    console.log(product);

    return product;
}

scrape('https://www.ulta.com/p/original-foundation-broad-spectrum-spf-15-VP11362?sku=5081178')