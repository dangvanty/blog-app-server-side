const router = require('express').Router()
const apiRouter=require('./apiRouter')
const clientRoutes=require('./clientRoute')
const dashboardRoutes=require('./dashboardRoute')

router.use('/',clientRoutes)
router.use('/api',apiRouter)
router.use('/dashboard',dashboardRoutes)

module.exports=router