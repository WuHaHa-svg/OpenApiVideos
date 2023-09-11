# OpenApiVideos

------

## 项目简介

​	本项目是我独立开发的一个简单vue2版本的uniapp微信小程序项目，用户可以登陆注册、可以滑动刷小视频、可以发送图文动态等功能，项目灵感是我学习前端的时候无意中了解到了OpenApi这个后端开源项目，并查看了这个开源项目提供的SwaggerUI，并逐个测试了一下，发现该项目提供的Api质量还不错，正好自己就从业于前端，因此就想调用OpenApi提供的接口自己开发一个前端项目实现接口提供的功能，巩固并提升自己独立开发的能力，为了进一步提升一下项目内代码的可读性，我后期专门细化了一下对代码的注释，欢迎大家clone此项目哦！

------

## 项目致谢

1. 用到的Decloud插件：[uv-code-input 验证码输入 全面兼容vue3+2、app、h5、小程序等多端 - DCloud 插件市场](https://ext.dcloud.net.cn/plugin?id=12306)

2. 用到的DecloudSDK：[JS常用工具函数 - DCloud 插件市场](https://ext.dcloud.net.cn/plugin?id=1994)

3. 后端接口OpenApi接口文档地址：[Swagger UI (apiopen.top)](https://api.apiopen.top/swagger/index.html#/)

4. 项目中用到了阿里的字体图标库：[iconfont-阿里巴巴矢量图标库](https://www.iconfont.cn/)

   感谢Decloud插件市场作者： [uv_UI ](https://ext.dcloud.net.cn/publisher?id=89985)提供的uv-code-input验证码输入框组件

   感谢Decloud插件市场作者：[mine_king](https://ext.dcloud.net.cn/publisher?id=317001)提供的JS常用工具函数

   感谢OpenApi项目团队提供的开源项目。

   感谢阿里矢量图标库。

------

## 项目树

OpenApiVideos
│
│  App.vue
│  index.html
│  main.js
│  manifest.json
│  pages.json
│  ProjectTree.txt
│  README.md
│  uni.promisify.adaptor.js
│  uni.scss
│  
├─components		//项目中的组件
│      BackTop.vue				//返回顶部的按钮
│      Confirm.vue				//确认框
│      DynamicList.vue			//动态的滚动列表
│      EmptyShow.vue			//空白内容
│      IndexNav.vue				//顶部导航栏
│      InformationBox.vue		//视频播放过时的视频信息盒子
│      PauseIcon.vue				//暂停图标
│      SystemHeight.vue			//系统导航栏填充区
│      TabBar.vue						//底部导航栏
│      UserCard.vue					//未登录用户组件
│      VideoList.vue					//视频滚动列表
│      VideoPlayer.vue				//视频播放组件
│      WallPaperNav.vue			//壁纸模块的顶部分类栏
│      
├─js_sdk		//此目录存放Decloud插件市场下载的SDK
│
├─pages			//主页面
│  ├─index
│  │      index.vue		//首页
│  │      
│  ├─mine
│  │      mine.vue		//我的
│  │      
│  ├─wallpaper
│  │      wallpaper.vue		//壁纸
│  │      
│  └─zone
│          zone.vue			//动态
│          
├─static			//静态资源
│  │  addPic.png		//添加图片的icon
│  │  avatar.png		//用户默认头像
│  │  pause.png		//暂停icon
│  │  
│  └─iconfont			//此目录存放阿里矢量图标库的iconfont资源
│          
├─store		//VueX
│      BaseConfig.js		//主配置状态（当前激活标签的tag名、图片上传模式等）
│      index.js
│      UserData.js			//用户数据状态（登录状态、token等）
│      
├─subpackages			//分包（用于存放TabBar对应的主页面以外的页面）
│  ├─editUserData		//用户资料页面
│  │      editUserData.vue
│  │      
│  ├─login					//登录页面
│  │      login.vue
│  │      
│  ├─register				//注册页面
│  │      register.vue
│  │      
│  ├─uploadZone		//上传动态页面
│  │      uploadZone.vue
│  │      
│  └─videoList			//列表模式浏览视频页面
│          videoList.vue
│          
├─uni_modules		//此目录存放下载的Decloud插件
│                                  
└─utils		//自定义封装的工具函数
    │  DateArry.js	//日期与数组之间的转换（编辑资料选择生日功能会用到）
    │  GetData.js	//对本地存储读取的统一整理
    │  SetData.js	//对本地存储设置的统一整理
    │  
    └─server			//对Api封装的统一管理
            Api.js			//页面调用的Api
            Http.js			//封装uni.request，返回Promise对象
            UploadImg.js	//图片上传

------

## 项目界面

- ### 首页
  - #### 推介

  - 随机看视频，可以上下滑动切换视频，点击屏幕播放或暂停视频

  - ![image-20230911154437329](C:\Users\18139\AppData\Roaming\Typora\typora-user-images\image-20230911154437329.png)
  
  - #### 列表
  
  - 可滑动列表并点击视频播放，列表滑动到底部自动加载下页数据
  
  - ![image-20230911154631066](C:\Users\18139\AppData\Roaming\Typora\typora-user-images\image-20230911154631066.png)
  
  - ![image-20230911154709926](C:\Users\18139\AppData\Roaming\Typora\typora-user-images\image-20230911154709926.png)
  
- ### 动态
  - #### 全部动态

  - 可以浏览所有用户发送的图文动态，滑动到底加载下一页数据

  - ![image-20230911154916427](C:\Users\18139\AppData\Roaming\Typora\typora-user-images\image-20230911154916427.png)
  
  - #### 发个动态
  
  - 可以发送图文动态，发送之后可以在“全部动态”和“我的”页面里面查看，图片最多支持5张（API限制），发送之前选择的图片可以长按删除
  
  - ![image-20230911155142985](C:\Users\18139\AppData\Roaming\Typora\typora-user-images\image-20230911155142985.png)
  
  - ![image-20230911155218072](C:\Users\18139\AppData\Roaming\Typora\typora-user-images\image-20230911155218072.png)
  
  - | 法国巨化股份 | 古典风格 |
    | ------------ | -------- |
    |              |          |
  
    
  
- ### 壁纸

- ### 我的
  - #### 已登录界面

    - ##### 账户资料页面

  - #### 未登录界面

    - ##### 登录页面

    - ##### 注册页面
