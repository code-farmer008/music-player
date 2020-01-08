
const Koa = require("koa");
const app = new Koa();
//router
const Router = require('koa-router');

//父路由
const router = new Router();

// app.use(async (ctx, next) => {
//     ctx.set('Access-Control-Allow-Origin', '*');
//     ctx.set('Access-Control-Allow-Methods', 'PUT,DELETE,POST,GET');
//     ctx.set('Access-Control-Allow-Credentials', true);
//     await next();
// });

//bodyparser:该中间件用于post请求的数据
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

// 设置静态文件方法
const static = require('koa-static');
app.use(static(__dirname + '/public'));

//引入数据库操作方法
const UserController = require('./controller/user.js');
const RecordController = require('./controller/record.js');

//checkToken作为中间件存在,当请求必须是登录状态有token时才需要加上这个方法
const checkToken = require('./token/checkToken.js');

//登录
const loginRouter = new Router();
loginRouter.post('/login', UserController.Login);
//注册
const registerRouter = new Router();
registerRouter.post('/register', UserController.Reg);

//获取首页推荐图数据
const RecommendRouter = new Router();
RecommendRouter.get('/getTopBanner',UserController.getrecommend)

//获取首页歌单数据
const getDiscRouter = new Router();
getDiscRouter.get('/getDiscList',UserController.getDiscList)

//获取首页子路由CD数据
const getCdRouter = new Router();
getCdRouter.get('/getCdInfo',UserController.getCdInfo)

//获取歌词数据
const getLyricRouter = new Router();
getLyricRouter.get('/lyric',UserController.getLyric)

//获取搜索列表数据
const getSearchRouter = new Router();
getSearchRouter.get('/search',UserController.getSearchList)

//获取播放地址
const getUrlRouter = new Router();
getUrlRouter.get('/getplaysongvkey',UserController.getPlayUrl)

//查询全部播放记录
const findPlayHistory = new Router();
findPlayHistory.get('/findplay',checkToken,RecordController.findplay)

//添加播放记录
const addPlayHistory = new Router();
addPlayHistory.post('/addplay',checkToken,RecordController.addplay)

//查询全部收藏记录
const findFavorite = new Router();
findFavorite.get('/findfavorite',checkToken,RecordController.findfavorite)

//添加收藏记录
const addFavorite = new Router();
addFavorite.post('/addfavorite',checkToken,RecordController.addfavorite)

//删除收藏记录
const delFavorite = new Router();
delFavorite.post('/delfavorite',checkToken,RecordController.delfavorite)

//添加搜索记录
const addSearchHistory = new Router();
addSearchHistory.post('/addSearch',checkToken,RecordController.addSearch)

//查找搜索记录
const findSearchHistory = new Router();
findSearchHistory.get('/findSearch',checkToken,RecordController.findSearch)

//删除搜索记录
const delSearchHistory = new Router();
delSearchHistory.post('/delSearch',checkToken,RecordController.delSearch)

//清空搜索记录
const clearSearchHistory = new Router();
clearSearchHistory.get('/clearSearch',checkToken,RecordController.clearSearch)
//装载上面子路由
router.use('/api',loginRouter.routes(),loginRouter.allowedMethods());
router.use('/api',registerRouter.routes(),registerRouter.allowedMethods());
router.use('/api',RecommendRouter.routes(),RecommendRouter.allowedMethods());
router.use('/api',getDiscRouter.routes(),getDiscRouter.allowedMethods());
router.use('/api',getCdRouter.routes(),getCdRouter.allowedMethods());
router.use('/api',getLyricRouter.routes(),getLyricRouter.allowedMethods());
router.use('/api',getSearchRouter.routes(),getSearchRouter.allowedMethods());
router.use('/api',getUrlRouter.routes(),getUrlRouter.allowedMethods());
router.use('/api',findPlayHistory.routes(),findPlayHistory.allowedMethods());
router.use('/api',addPlayHistory.routes(),addPlayHistory.allowedMethods());
router.use('/api',findFavorite.routes(),findFavorite.allowedMethods());
router.use('/api',addFavorite.routes(),addFavorite.allowedMethods());
router.use('/api',delFavorite.routes(),delFavorite.allowedMethods());
router.use('/api',addSearchHistory.routes(),addSearchHistory.allowedMethods());
router.use('/api',findSearchHistory.routes(),findSearchHistory.allowedMethods());
router.use('/api',delSearchHistory.routes(),delSearchHistory.allowedMethods());
router.use('/api',clearSearchHistory.routes(),clearSearchHistory.allowedMethods());
//加载路由中间件
app.use(router.routes()).use(router.allowedMethods());

app.listen(8888);