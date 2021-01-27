const {chromium} = require('playwright')

exports.screenshot = async (req, res) => {
  const url = req.query.url
  if (!url) {
    return res.send('Please provide URL as GET parameter, for example: ?url=https://example.com')
  }
  // https://github.com/puppeteer/puppeteer/issues/1825
  const browser = await chromium.launch({args: ['--single-process', '--no-zygote']})
  try{
    const context = await browser.newContext()
    const page = await context.newPage()
		
    await page.goto(url)
		
    const imageBuffer = await page.screenshot({fullPage: true})

    res.set('Content-Type', 'image/png')
    res.send(imageBuffer)

    await page.close()
  }
  catch(err){
    res.send(`<pre style="font-size: 1.3em;">${err.toString()}</pre>`)
    console.error(err)
  }
  finally{
    await browser.close()
    console.log('closed browser for ', req.query.url)
  }
}
