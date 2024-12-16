const axios = require('axios')
const _ = require('lodash')

const accessToken = 'Z2hwX2VtNHEwZXZJUGlVOHllMWF1bHBMU1BsektVV0c4RzE2ZmxJQ2p1ZWppbg=='

async function fetchLabels() {
  try {
    const response = await fetch('https://api.github.com/repos/haizlin/fe-interview/labels', {
      headers: {
        Authorization: `token ${atob(accessToken).replace('juejin', '')}`,
      },
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data = await response.json()
    const labelNames = data.map((label) => label.name)
    return labelNames
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error)
    throw error // 可以选择继续抛出错误
  }
}

async function fetchIssues(label) {
  try {
    const response = await fetch(
      `https://api.github.com/repos/haizlin/fe-interview/issues?labels=${label}`,
      {
        headers: {
          Authorization: `token ${atob(accessToken).replace('juejin', '')}`,
        },
      },
    )

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error)
    throw error // 可以选择继续抛出错误
  }
}

async function getInterviewHot() {
  const types = await fetchLabels()
  const label = types[Math.floor(Math.random() * (types.length + 1))]
  const issues = await fetchIssues(label)
  return issues
}

module.exports = {
  getInterviewHot,
}
