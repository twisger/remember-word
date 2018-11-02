const Koa = require('koa')
const app = new Koa()
const TransPage = require('./TransPage.js')

const main = async () => {
    const transPage = new TransPage()
    await transPage.init()
    // const data = await transPage.getTranslation('apple')
    app.use(async ctx => {
        if (ctx.request.path === '/') {
            ctx.response.type = 'html';
            ctx.response.body = fs.createReadStream('./public/index.html');
        } else if (ctx.request.path === '/translate') {
            const word = ctx.request.query.word
            if (!word) {
                ctx.body = '请输入单词'
            } else {
                const data = await transPage.getTranslation(word)
                ctx.body = data
            }

        } else {
            ctx.body = "hello"
        }
    })

    app.listen(3000)
}
main()