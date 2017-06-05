// load environment properties from a .env file for local development
require('dotenv').load({silent: true});


const app = require('./app.js');
// 需要修改config中的express文件删除bluemix内容
// Deployment tracking
require('cf-deployment-tracker-client').track();

var port = process.env.PORT || process.env.VCAP_APP_PORT || 3000;
app.listen(port);
console.log('listening at:', port);
