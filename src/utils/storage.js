
// 封装获取本地用户信息方法
export const getItem = (name) => {
  const data = localStorage.getItem(name)
  try {
    return JSON.parse(data)
  } catch (error) {
    return data
  }
}

// 封装本地存储用户信息的方法
export const setItem = (name, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  localStorage.setItem(name, value)
}

// 封装移除本地存储用户信息的方法
export const removeItem = name => {
  localStorage.removeItem(name)
}
