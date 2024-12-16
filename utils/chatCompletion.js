/*
 * @Author: h7ml <h7ml@qq.com>
 * @Date: 2023-07-12 20:34:13
 * @LastEditors: h7ml <h7ml@qq.com>
 * @LastEditTime: 2023-07-12 22:36:12
 * @FilePath: \utils\chatCompletion.js
 * @Description:
 *
 * Copyright (c) 2023 by h7ml<h7ml@qq.com>, All Rights Reserved.
 */
const axios = require('axios')
const _ = require('lodash')
const configEnv = require('../config')
const fs = require('fs')
const path = require('path')
const chatCompletion = async (content) => {
  const defaultCompletion = '';

  try {
    // 读取系统和助手的文件内容
    const systemContent = await fs.promises.readFile(path.join(__dirname, 'system.md'), 'utf-8');
    const assistantContent = await fs.promises.readFile(path.join(__dirname, 'assistant.md'), 'utf-8');

    const data = JSON.stringify({
      "model": "gpt-3.5-turbo",
      "messages": [
        {
          "role": "system",
          "content": systemContent
        },
        {
          "role": "user",
          "content": "两个相邻的inline-block元素为什么会出现间隔，如何解决？"
        },
        {
          "role": "assistant",
          "content": assistantContent
        },
        {
          "role": "user",
          "content": content
        }
      ],
      "temperature": 0.7
    });

    const config = {
      method: 'post',
      url: configEnv.chatgpt.BASE_URL ?? 'https://nakoruru.h7ml.cn/proxy/api.openai.com/v1/chat/completions',
      headers: {
        Authorization: `Bearer ${configEnv.chatgpt.OPENAI_API_KEY} `,
        'Content-Type': 'application/json',
      },
      data: data,
    };

    const response = await axios(config);
    let completion = response.data.choices[0].message.content;

    // 处理 completion 内容，去除代码块的首尾部分
    let modifiedContent = completion;
    if (modifiedContent.startsWith('```')) {
      const endOfFirstLine = modifiedContent.indexOf('\n');
      modifiedContent = modifiedContent.slice(endOfFirstLine + 1).trim();
    }

    if (modifiedContent.endsWith('```')) {
      const startOfLastLine = modifiedContent.lastIndexOf('\n');
      modifiedContent = modifiedContent.slice(0, startOfLastLine).trim();
    }

    return modifiedContent;

  } catch (error) {
    console.error(error);
    return defaultCompletion;
  }
};
module.exports = {
  chatCompletion
};
