const nodemailer = require('nodemailer')
const config = require('../config')

async function sendEmail(params) {
  if (!config.email.provider.auth.user || !config.email.provider) {
    console.log(`未配置邮箱信息`)
    return
  }
  if (!params || typeof params !== 'object' || !params.to || !params.subject) {
    console.log(`邮箱配置参数错误`)
    return
  }

  const transporter = nodemailer.createTransport(config.email.provider)
  const messageParams = Object.assign({}, params, {
    from: config.email.provider.auth.user,
  })
  await transporter.sendMail(messageParams).catch((err) => {
    console.log(`邮件发送失败: response ${err.response} command: \n${err.response}\n`)
  })
}
module.exports = {
  sendEmail,
}
