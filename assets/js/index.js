$(function () {
    getUserInfo()
    var layer = layui.layer

    // 点击按钮，实现退出功能
    $('#btnLogout').on('click', function () {
        // 提示用户是否确认退出
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 1. 清空本地存储中的 token
            localStorage.removeItem('token')
            // 2. 重新跳转到登录页面
            location.href = '/login.html'

            // 关闭 confirm 询问框
            layer.close(index)
        })
    })


})
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        headers: {
            Authorization: localStorage.getItem('token')
        },
        success(res) {
            console.log(res);
            if (res.status !== 0) {
                layui.layui.msg(res.message)
                return
            }
            renderAvatar(res.data)
        },
       
       
    })
}
function renderAvatar(user) {
    console.log(user);
    const name = user.nickname || user.username
    console.log(name);
    $('#welcome').html(`欢迎${name}`)
    if (user.user_pic) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avater').hide()
    } else {
        const first = name[0].toUpperCase();
        $('.text-avater').html(first).show()
        $('.layui-nav-img').hide()
    }
}