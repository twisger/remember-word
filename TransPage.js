const puppeteer = require('puppeteer')
class TransPage {
    async init() {
        const browser = this.browser = await (puppeteer.launch({
            // 若是手动下载的chromium需要指定chromium地址, 默认引用地址为 /项目目录/node_modules/puppeteer/.local-chromium/
            executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
            //设置超时时间
            timeout: 15000,
            //如果是访问https页面 此属性会忽略https错误
            ignoreHTTPSErrors: true,
            // 打开开发者工具, 当此值为true时, headless总为false
            devtools: false,
            // 关闭headless模式, 不会打开浏览器
            headless: true
        }))
        this.page = await browser.newPage()
        this.page.on('response', (response) => this.responseListener(response))
    }
    async responseListener(response) {
        if (response.url().indexOf('fanyi.baidu.com/v2transapi') > -1) {
            const data = await response.json()
            if (!data.error) {
                this.dataListener(data)
            }
        }
    }
    getTranslation(word) {
        const p = new Promise((resolve, reject) => {
            this.dataListener = resolve
        }).catch(e => console.log(e))
        this.page.goto('https://fanyi.baidu.com/#en/zh/' + word)
        return p
    }
    close() {
        this.browser.close()
    }
}

module.exports = TransPage