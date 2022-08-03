const router = require('express').Router()
const apiRouter=require('./apiRouter')
const clientRoutes=require('./clientRoute')
const dashboardRoutes=require('./dashboardRoute')
const adminRoutes = require('./adminRoute')

router.use('/',clientRoutes)
router.use('/api',apiRouter)
router.use('/dashboard',dashboardRoutes)
router.use('/admin',adminRoutes)

module.exports=router