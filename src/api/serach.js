// 用户相关请求模块
/**
    * 文章接口模块
    */

import request from '@/utils/request'

// 获取搜索建议
export const getSearchSuggestions = q => {
  return request({
    method: 'GET',
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}
// 获取搜索结果
export const getSearchResult = params => {
  return request({
    method: 'GET',
    url: '/v1_0/search',
    params
  })
}
// 获取搜索历史
export const getSearchHistorys = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search/histories'
  })
}
