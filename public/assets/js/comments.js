$.ajax({
        type: 'get', //get或post
        url: '/comments', //请求的地址
        data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        dataType: 'json',
        success: function(result) { //成功的回调函数
            console.log(result)
            var html = template('commentsTpl', result)
            $('#commentsBox').html(html)
            var page = template('pageTpl', result)
            $('#page').html(page)
        }
    })
    //实现评论批准与驳回的功能
$('#commentsBox').on('click', '.status', function() {
        var id = $(this).attr('data-id')
        var status = $(this).attr('data-status')
        $.ajax({
            type: 'put', //get或post
            url: '/comments/' + id, //请求的地址
            data: {
                state: status == 1 ? 0 : 1
            }, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
            dataType: 'json',
            success: function(result) { //成功的回调函数
                console.log(result)
                location.reload()
            }
        })
        return false;
    })
    //评论删除功能实现
$('#commentsBox').on('click', '.delete', function() {
        if (confirm('确定要删除吗？')) {
            var id = $(this).attr('data-id')
            $.ajax({
                type: 'delete', //get或post
                url: '/comments/' + id, //请求的地址
                success: function(result) { //成功的回调函数
                    // console.log(result)
                    location.reload()
                }
            })
        }
    })
    //评论分页功能实现
function changePage(page) {
    // alert(page)
    $.ajax({
        type: 'get', //get或post
        url: '/comments', //请求的地址
        data: {
            page: page
        }, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        dataType: 'json',
        success: function(result) { //成功的回调函数
            console.log(result)
            var html = template('commentsTpl', result)
            $('#commentsBox').html(html)
            var page = template('pageTpl', result)
            $('#page').html(page)
        }
    })
}