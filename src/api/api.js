// 公用地址
// let url="http://10.234.107.76:5000/"
let url="http://106.12.151.189:5160/"
// API存放

// 单词插入
let wordinsert=`${url}wordinsert`
//单词检索
let wordhistoryget=`${url}wordselect`
// 每日一练
let dailytest=`${url}dailytestget`
// 最近单词查询
let latestword=`${url}latestselect`
// 报错
let errinsert=`${url}errorinsert`

export {wordinsert,wordhistoryget,dailytest,latestword,errinsert}