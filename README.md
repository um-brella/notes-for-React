# 前言
依托于React与webpack打包的云端记事本项目
# 技术栈
react+redux+react-router+ES6/7+webpack+mongodb
# 项目流程
* 账号系统
    * 注册页
    * 登陆页
* 笔记本系统
    * 笔记展示页
    * 笔记本增加页面
    * 笔记本内容更新页面
# 技术实现
* 账号系统的实现
    * 注册页面表单提交：因为需要上传头像图片，应用到了H5新API--FormData对象+AJAX，将表单数据传输到后端
        * 需要注意一点是通过ref获取DOM节点，并获取节点上的Value值，表单是个非受控组件
        * 同时后端会传给一个cookie给前端，提醒用户成功与错误状态，提升体验
    * 登陆页面表单提交：表单页面提交与注册页类似
        * 需要注意一点是将登陆后的成功状态存储到redux里
        * 将状态存储的好处是，可以通过不同的状态显示不同的Header组件内容

* 笔记本系统的实现
    * 笔记展示页面分为SideBar和Content组件
        * 左侧SideBar组件显示笔记列表
        * 当点击左侧任意笔记时，在右侧Content组件中显示详细内容
    * 笔记本列表的实现：通过componentDidMount生命周期函数，在此生命周期的时候通过AJAX的GET请求获取储存在mongodb日记列表、
    * 笔记本内容的实现：当点击SideBar中的某一笔记时，将该笔记的详细内容通过redux传给Content组件
    * 删除笔记本的实现：当点击删除按钮的时候，通过AJAX的GET方法，注意url加上笔记的ID传给后台，成功后用react-router跳转到／list的路由
    * 增加笔记本的实现：通过ref绑定DOM元素，获取笔记的标题和内容Value值，通过AJAX的post请求把的到的值传给后端，并存储到mongodb日记列表，成功后用react-router跳转到／list的路由
        * 优化点：新添加的笔记通过redux传输到列表页面，提升响应速度，其余内容通过AJAX的GET方法请求的数据渲染到页面中
    * 更新笔记本的实现：点击更新按钮，跳转到／update路由页面，通过componentDidMount生命周期函数，在此生命周期的时候通过AJAX的GET请求获取储存在redux中ID所对应的笔记内容，给表单元素绑定ref，并把获取的笔记内容放到表单中，此受控组件是可以修改的，并把修改的值通过AJAX的POST请求传给后端，更改数据库中的内容，成功后跳转／list路由页面
