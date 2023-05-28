module.exports = (router) => {
    router.get('/test', async (req, res) => {
        res.json({
            test: "successful",
            path: '/api/test',
            createAt: new Date().toUTCString()
        })
    })
}