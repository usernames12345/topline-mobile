import request from '@/utils/request'
export const getUserChannels = () => {
  // 其他逻辑
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}
export const getAllChannels = () => {
return request({
  method: 'GET',
  url:'/app/v1_0/channels'
})
}
export const deleteUserChannel = channelId => {
  return request({
    method:'DELETE',
    url: `/app/v1_0/user/channels/${channelId}`
  })
}

export const updateUserChannel = channels => {
  return request({
    method:'PATCH',
    url: '/app/v1_0/user/channels',
    data: {
      channels
    }    
  })
}

