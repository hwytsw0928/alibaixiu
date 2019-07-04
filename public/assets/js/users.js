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
$('#avatar').on('change', function() {
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


})