//文章数量实现功能
$.ajax({
        type: 'get', //get或post
        url: '/posts/count', //请求的地址
        success: function(result) { //成功的回调函数
            console.log(result);
            $('#post').html('<strong>' + result.postCount + '</strong>篇文章（<strong>' + result.draftCount + '</strong>篇草稿）')
        }
    })
    //分类数量实现功能
$.ajax({
        type: 'get', //get或post
        url: '/categories/count', //请求的地址
        success: function(result) { //成功的回调函数
            console.log(result);
            $('#category').html('<strong>' + result.categoryCount + '</strong>个分类')
        }
    })
    //评论数量实现功能
$.ajax({
    type: 'get', //get或post
    url: '/comments/count', //请求的地址
    success: function(result) { //成功的回调函数
        console.log(result);
        $('#comment').html('<strong>' + result.commentCount + '</strong>条评论（<strong>' + 1 + '</strong>条待审核）')

    }
})