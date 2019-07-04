//向服务器发送请求 获取文章列表数据
$.ajax({
    type: 'get', //get或post
    url: '/posts', //请求的地址
    success: function(result) { //成功的回调函数
        // console.log(result);
        var html = template('postsTpl', result)
    }
})