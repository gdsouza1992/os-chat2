// IMPORT ROUTES
// =============================================================================
const router = require('express').Router();

// Middleware to use for all requests
router.use(function(req, res, next) {
    // next();
    res.render('index', {
            page: 'stack',
            allLoaded: params.allLoaded,
            pageIndex: params.pageIndex,
            pageSize: params.pageSize,
            isFollowing,
            pages
        });
});


module.exports = router;