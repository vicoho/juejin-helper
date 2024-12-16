const axios = require('axios')

// https://developer.hitokoto.cn/sentence/#%E7%AE%80%E4%BB%8B
// 一言  随机句子
async function getHitokotoWords() {
  try {
    const response = await fetch('https://nakoruru.h7ml.cn/proxy/v1.hitokoto.cn/')

    if (!response) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    return data.hitokoto
  } catch (error) {
    console.error('Error:', error)
    return null
  }
}

module.exports = {
  getHitokotoWords,
}
