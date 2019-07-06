//向服务器发送请求 获取文章列表数据
$.ajax({
        type: 'get', //get或post
        url: '/posts', //请求的地址
        success: function(result) { //成功的回调函数
            console.log(result);
            var html = template('postsTpl', { data: result })
            $('#postsBox').html(html);
            var page = template('pageTpl', result);
            // console.log(page);

            $('#page').html(page)
        }
    })
    //处理日期时间格式
function formateDate(date) {
    //将日期时间时间字符串转化为日期对象
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

}
//用户分页
function changePage(page) {
    // alert(page);
    $.ajax({
        type: 'get', //get或post
        url: '/posts', //请求的地址
        data: {
            page: page
        },
        success: function(result) { //成功的回调函数
            console.log(result);
            var html = template('postsTpl', { data: result })
            $('#postsBox').html(html);
            var page = template('pageTpl', result);
            // console.log(page);
            $('#page').html(page)
        }
    })

}
//向服务器发送请求，索要分类数据
$.ajax({
        type: 'get', //get或post
        url: '/categories', //请求的地址
        success: function(result) { //成功的回调函数
            console.log(result)
            var html = template('categoryTpl', { data: result })
                // console.log(html);
            $('#categoryBox').html(html)


        }
    })
    //当用户进行文章列表筛选的时候
$('#filterForm').on('submit', function() {
        // alert(1)
        console.log($(this).serialize());
        //索要文章列表数据
        $.ajax({
            type: 'get', //get或post
            url: '/posts', //请求的地址
            data: $(this).serialize(),
            success: function(result) { //成功的回调函数
                console.log(result);
                var html = template('postsTpl', { data: result })
                $('#postsBox').html(html);
                var page = template('pageTpl', result);
                // console.log(page);

                $('#page').html(page)
            }
        })
        return false;

    })
    //文章删除功能
$('#postsBox').on('click', '.delete', function name() {
    if (confirm('确定要删除吗？')) {
        var id = $(this).attr('data-id')
        $.ajax({
            type: 'delete', //get或post
            url: '/posts/' + id, //请求的地址
            data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
            dataType: 'json',
            success: function(result) { //成功的回调函数
                console.log(result)
                location.reload()
            }
        })

    }
})