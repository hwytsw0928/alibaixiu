//添加分类
$('#addCategory').on('submit', function() {
        console.log($(this).serialize());
        $.ajax({
            type: 'post', //get或post
            url: '/categories', //请求的地址
            data: $(this).serialize(), //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
            dataType: 'json',
            success: function(result) { //成功的回调函数
                console.log(result);
                location.reload()

            }
        })
        return false;
    })
    //展示分类列表数据
$.ajax({
        type: 'get', //get或post
        url: '/categories', //请求的地址
        success: function(response) { //成功的回调函数
            var html = template('categoryListTpl', { data: response })
            console.log(response);

            $('#categoryBox').html(html)
        }
    })
    //当点击编辑按钮的时候，让当前这一行内容展示在左侧的表单上面
$('#categoryBox').on('click', '.edit', function() {
        var id = $(this).attr('data-id');
        console.log(id);
        $.ajax({
            type: 'get', //get或post
            url: '/categories/' + id, //请求的地址
            data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
            dataType: 'json',
            success: function(result) { //成功的回调函数
                console.log(result)
                var html = template('modifyFormTpl', result)
                $('#formBox').html(html)

            }
        })

    })
    //修改提交
$('#formBox').on('submit', '#modifyCategory', function() {
        console.log($(this).serialize());
        //获取表单的id
        var id = $(this).attr('data-id')
            // alert(id)
        $.ajax({
            type: 'put', //get或post
            url: '/categories/' + id, //请求的地址
            data: $(this).serialize(), //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
            success: function(result) { //成功的回调函数
                console.log(result)
                location.reload()
            }
        })
        return false;


    })
    //删除功能
$('#categoryBox').on('click', '.delete', function() {
    var id = $(this).attr('data-id')
    $.ajax({
        type: 'delete', //get或post
        url: '/categories/' + id, //请求的地址
        data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        success: function(result) { //成功的回调函数
            console.log(result)
            location.reload()
        }
    })

})