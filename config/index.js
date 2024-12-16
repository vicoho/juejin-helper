require('dotenv').config()

module.exports = {
  email: {
    provider: {
      auth: {
        user: process.env.EMAIL_USER, // 你的邮箱账号
        pass: process.env.EMAIL_PASS, // 你的邮箱 smpt 授权码
      },
      host: process.env.EMAIL_HOST ? `smtp.${process.env.EMAIL_USER.split('@')[1]}` : 'smtp.qq.com', // 你的邮箱服务器地址 如 smtp.qq.com 可以传入指定服务器。如果没有指定服务器，将根据你的邮箱自动选择服务器
      secure: true,
      port: 465,
      secureConnection: true,
    },
  },
  juejin: {
    login: 'https://juejin.cn/login',
    loginApi: '/passport/web/user/login',
    verifyApi: 'verify.snssdk.com/captcha/verify',
    category_id: process.env.category_id,
    theme_ids: process.env.theme_ids,
    tag_ids: process.env.tag_ids,
    coverImage: process.env.coverImage
  },
  user: {
    mobile: process.env.USER_MOBILE, //你的掘金登录手机号
    password: process.env.USER_PASSWORD, // 你的掘金登录密码
    email: process.env.USER_EMAIL, // 你的接收通知的邮箱
    privacy: process.env.USER_PRIVACY || true, // 是否开启隐私模式,默认开启
    juejinCookie: process.env.USER_COOKIE, //你的掘金登录手机号
  },
  chatgpt: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY, // OpanAI 密钥，你在 openai 账户页面申请的 api key。
    BASE_URL: process.env.BASE_URL ?? 'https://api.openai.com/v1/chat/completions',
  },
}
