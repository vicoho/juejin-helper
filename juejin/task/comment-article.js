// 文章评论
const _ = require('lodash')
const { getCookie } = require('../cookie')
const JuejinHttp = require('../api')
const { getArticleList, saveComments } = require('../common')
const { insertTo, dbGet } = require('../../utils/db')
const config = require('../../config')
const { chatCompletion } = require('../../utils/chatCompletion')
const { getRandomInt } = require('./../../utils/index')

async function articleComment(task) {
  const cookie = await getCookie()
  const API = new JuejinHttp(cookie)
  const articles = await getArticleList(200)
  if (articles.length == 0) {
    console.log(`获取文章列表失败[d1]`)
    return
  }
  const times = task.limit - task.done // 需要执行的次数
  console.log(`需要评论${times}篇文章`)
  const defaultComments = [
    '感谢，学习了，受益颇多',
    '竟然还能这样，妙啊！',
    '学到了',
    '听君一席话，如同听君一席话',
    '我虽然看不懂，但我大受震撼',
    '已阅',
    '666',
    '收藏了',
    'mark',
    '怎么做才能像你一样优秀？真让人头疼',
    '让我对编程有了新的认识',
    '太棒了！简单明了，一目了然',
    '受教了，谢谢分享',
    '我从你的文章中发现了一个新的技巧',
    '点赞！你的文章非常清晰',
    '感谢你的文章，我现在更有信心去尝试了',
  ]
  for (let i = 0; i < times; i++) {
    const article = articles[i] || false
    if (!article) break
    const { article_id, article_info } = article
    await saveComments(article_id, 2)
    const { brief_content = '', title = '' } = article_info
    if (brief_content.length > 0 && title.length > 0) {
      const completion = await chatCompletion(title + brief_content)
      const comments = defaultComments.concat([completion] || [])
      const index = getRandomInt(0, comments.length - 1)
      const comment = await API.articleCommentAdd(article_id, comments[index])
      // 删除评论
      if (!config.user.privacy) await API.articleCommentRemove(comment.comment_id)
    }
    console.log(`评论文章 done`)
  }
}
module.exports = articleComment
