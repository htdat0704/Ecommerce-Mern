const siteProduct = require('./product');
const siteAuth = require('./auth');
const siteOrder = require('./order');

const crossOrigin = require('../utils/crossOrigin');

function route(app) {
   app.use('/product', crossOrigin, siteProduct);
   app.use('/auth', crossOrigin, siteAuth);
   app.use('/order', crossOrigin, siteOrder);

   // app.get('/searchs', (req, res) => {
   //     res.render('searchs')
   // });

   // app.post('/searchs', (req, res) => {
   //     console.log(req.body);
   //     res.render('searchs')
   // });
}

module.exports = route;
