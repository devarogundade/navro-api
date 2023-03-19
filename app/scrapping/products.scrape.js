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

    const category = await page.evaluate(element => element.textContent, categoryElement)
    const brand = await page.evaluate(element => element.textContent, brandElement)
    const name = await page.evaluate(element => element.textContent, nameElement)
    const price = await page.evaluate(element => element.textContent, priceElement)
    const size = await page.evaluate(element => element.textContent, sizeElement)
    const summary = await page.evaluate(element => element.textContent, summaryElement)

    browser.close()

    const colors = [
        '8B Porcelain Beige',
        '8S Porcelain Sand',
        '12B Fair Beige',
        '12N Fair Neutral',
        '12S Fair Sand',
        '14H Fair Honey',
        '15S Fair-Light Sand',
        '16N Fair-Light Neutral',
        '18B Fair-Light Beige',
        '18H Fair-Light Honey',
        '20B Light Beige',
        '20S Light Sand',
        '22N Light Neutral',
        '22H Light Honey',
        '22B Light Beige',
        '27H Light-Medium Honey',
        '27S Light-Medium Sand',
        '27B Light-Medium Beige',
        '29N Light-Medium Neutral',
        '34S Medium Sand',
        '35B Medium Beige',
        '35H Medium Honey',
        '35N Medium Neutral',
        '35G Medium Golden',
        '36S Medium-Tan Sand',
        '37N Medium-Tan Neutral',
        '37G Medium-Tan Golden',
        '38N Medium-Tan Neutral',
        '42G Tan Golden',
        '42S Tan Sand',
        '44H Tan Honey',
        '44N Tan Neutral',
        '45H Tan Honey',
        '47H Tan-Deep Honey',
        '47S Tan-Deep Sand',
        '47N Tan-Deep Neutral',
        '49G Tan-Deep Golden',
        '51N Deep Neutral',
        '53N Deep Neutral',
        '53S Deep Sand',
        '53H Deep Honey',
        '53G Deep Golden',
        '57N Rich Neutral',
        '57S Rich Sand',
        '57G Rich Golden',
        '58H Rich Honey',
        '59S Rich Sand',
        '60N Mahogany',
        '60G Mahogany Golden',
        '61H Espresso'
    ]

    const images = [
        '',
        '',
        '',
        '',
        '',
        ''
    ]

    const skintypes = [
        'dry skin',
        'oily skin',
        'mixed skin',
        'normal skin'
    ]

    const how_to_use = [
        '',
        ''
    ]

    const product = {
        name: name,
        brand: brand,
        categories: [category.toLowerCase()],
        price: price.replace('$', ''),
        size: size,
        colors: colors,
        types: skintypes,
        description: summary,
        how_to_use: how_to_use,
        url: PRODUCT_URL
    }

    console.log(product);

    return product;
}

scrape('https://www.ulta.com/p/original-foundation-broad-spectrum-spf-15-VP11362?sku=5081178')