$('#userForm').on('submit', function() {
        // console.log(formDate);
        $.ajax({
                type: 'post', //get或post
                url: '/users', //请求的地址
                data: $('#userForm').serialize(), //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
                success: function() { //成功的回调函数
                    // console.log(result);

                    location.reload(); //刷新当前页面
                },
                error: function(err) {
                    console.log('创建用户失败');

                }
            })
            //阻止默认行为
        return false;
    })
    //头像上传
    //当用户选择文件的时候
    //一定要委托给一直存在的元素
$('#formBox').on('change', '#avatar', function() {
    //用户选择到的文件
    // console.log(this.files[0]);
    var formData = new FormData();
    formData.append('avatar', this.files[0])
    $.ajax({
            type: 'post', //get或post
            url: '/upload', //请求的地址
            data: formData, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
            //告诉$.ajax方法不太解析请求参数
            processData: false,
            //告诉ajax不要设置请求参数的类型
            contentType: false,
            success: function(response) { //成功的回调函数
                console.log(response)
                    //实现头像预览功能
                $('#preview').attr('src', response[0].avatar)
                $('#hiddenAvater').val(response[0].avatar)

            }
        })
        // $('#avatar').on('change', function() {

    //         })


})

//显示用户列表
$.ajax({
        type: 'get', //get或post
        url: '/users', //请求的地址
        data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        dataType: 'json',
        success: function(result) { //成功的回调函数
            // console.log(result)
            var html = template('userTpl', { data: result });
            $('#userBox').html(html)
        }
    })
    //事件委托
    //修改分为2步，
$('#userBox').on('click', '.edit', function() {
        //点击获取当前这个编辑按钮的id
        var id = $(this).attr('data-id')
            // alert(id)
        $.ajax({
            type: 'get', //get或post
            url: '/users/' + id, //请求的地址
            data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
            dataType: 'json',
            success: function(result) { //成功的回调函数
                console.log(result)
                var html = template('modifyFormTpl', result)
                $('#formBox').html(html)
            }
        })



    })
    //修改表单提交
$('#formBox').on('submit', '#userForm', function() {
        console.log($(this).serialize());
        //获取表单的id
        var id = $(this).attr('data-id')
            // alert(id)
        $.ajax({
            type: 'put', //get或post
            url: '/users/' + id, //请求的地址
            data: $(this).serialize(), //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
            dataType: 'json',
            success: function(result) { //成功的回调函数
                // console.log(result)
                location.reload(); //刷新当前页面
            }
        })

        //阻止默认提交
        return false;

    })
    //删除事件用事件委托写
$('#userBox').on('click', '.delete', function() {
        var id = $(this).attr('data-id')
            // alert(id)
        $.ajax({
            type: 'put', //get或post
            url: '/users/' + id, //请求的地址
            success: function(result) { //成功的回调函数
                // console.log(result)
                location.reload();
            }
        })

    })
    //当切换全选input的时候，下面所有的input跟着改变状态
$('#selectAll').on('change', function() {
        console.log($(this).prop('checked'));
        var bool = $(this).prop('checked');
        $('#userBox').find('.status').prop('checked', bool)
        if (bool == true) {
            $('#deleteMany').show()
        } else {
            $('#deleteMany').hide()
        }
    })
    //当tbody中的input全部选中的时候，我们就让全选也是选中的状态
$('#userBox').on('change', '.status', function() {
    if ($('#userBox').find('.status').length == $('#userBox').find('.status').filter(':checked').length) {
        $('#selectAll').prop('checked', true)
    } else {
        $('#selectAll').prop('checked', false)
    }
    if ($('#userBox').find('.status').filter(':checked').length >= 2) {
        $('#deleteMany').show()
    } else {
        $('#deleteMany').hide()
    }
})
$('#deleteMany').on('click', function() {
    //找到所有选中的input
    if (confirm('确定要删？')) {
        var selectAll = $('#userBox').find('.status').filter(':checked')
        selectAll.each(function(index, element) {
            var arr = [];
            console.log($(element).attr('data-id'));
            arr.push($(element).attr('data-id'));
            // console.log(arr);
            // console.log(arr.join('-'));

            $.ajax({
                type: 'delete', //get或post
                url: '/users/' + arr.join('-'), //请求的地址
                data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
                dataType: 'json',
                success: function(result) { //成功的回调函数
                    // console.log(result)
                    location.reload()
                }
            })

        })
    }
})