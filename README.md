# OpenApiVideos

------

## 项目简介

​	本项目是我独立开发的一个简单vue2版本的uniapp微信小程序项目，用户可以登陆注册、可以滑动刷小视频、可以发送图文动态以及可以和AI对话等，项目灵感是我学习前端的时候无意中了解到了OpenApi这个后端开源项目，并查看了这个开源项目提供的SwaggerUI，并逐个测试了一下，发现该项目提供的Api质量还不错，正好自己就从业于前端，因此就想调用OpenApi提供的接口自己开发一个前端项目实现接口提供的功能，巩固并提升自己独立开发的能力，由于最近AI非常流行，市场上也有好多AI类型的产品，于是后来我也为大家安排了这个功能。为了进一步提升一下项目内代码的可读性，我后期专门细化了一下对代码的注释，欢迎大家clone此项目哦！

------

## 技术栈

UNI-App、Vue2、VueX、scss、ES6、Promise、Git。

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

  - ![image-20230913164917430](https://gitee.com/WuHaHa-svg/open-api-videos/raw/MarkDownImgs/img/image-20230913164917430.png)
  
  - #### 列表
  
  - 可滑动列表并点击视频播放，列表滑动到底部自动加载下页数据
  
  - <img src="https://gitee.com/WuHaHa-svg/open-api-videos/raw/MarkDownImgs/img/image-20230912141149283.png" alt="image-20230912141149283" style="zoom:80%;" />
  
  - ![image-20230912141209096](https://gitee.com/WuHaHa-svg/open-api-videos/raw/MarkDownImgs/img/image-20230912141209096.png)
  
- ### 动态
  - #### 全部动态

  - 可以浏览所有用户发送的图文动态，滑动到底加载下一页数据

  - ![](https://gitee.com/WuHaHa-svg/open-api-videos/raw/MarkDownImgs/img/image-20230913164724874.png)
  
  - #### 发个动态
  
  - 可以发送图文动态，发送之后可以在“全部动态”和“我的”页面里面查看，图片最多支持5张（API限制），发送之前选择的图片可以长按删除
  
  - ![image-20230912141307847](https://gitee.com/WuHaHa-svg/open-api-videos/raw/MarkDownImgs/img/image-20230912141307847.png)
  
  - ![image-20230912141326278](https://gitee.com/WuHaHa-svg/open-api-videos/raw/MarkDownImgs/img/image-20230912141326278.png)
  
- ### 壁纸

- 可以浏览不同分类的高清壁纸。（此模块完善中...）

- ![image-20230912141410180](https://gitee.com/WuHaHa-svg/open-api-videos/raw/MarkDownImgs/img/image-20230912141410180.png)

- ![image-20230912141426738](https://gitee.com/WuHaHa-svg/open-api-videos/raw/MarkDownImgs/img/image-20230912141426738.png)

- ### AI-Chat

- 可以在此页面和AI对话。

- ![image-20230929150132488](https://gitee.com/WuHaHa-svg/open-api-videos/raw/MarkDownImgs/img/image-20230929150132488.png)

- ### 我的
  - #### 已登录界面

    - ##### “我的”页面

    - 可以查看用户主要信息，以及用户的图文动态

    - ![image-20230912141452355](https://gitee.com/WuHaHa-svg/open-api-videos/raw/MarkDownImgs/img/image-20230912141452355.png)

    - ##### 账户资料页面

    - 可以编辑用户信息

    - ![image-20230912141507750](https://gitee.com/WuHaHa-svg/open-api-videos/raw/MarkDownImgs/img/image-20230912141507750.png)

  - #### 未登录界面

  - 如果未登录的状态，则显示一个跳转登录、注册页面的组件

  - ![image-20230912141551030](https://gitee.com/WuHaHa-svg/open-api-videos/raw/MarkDownImgs/img/image-20230912141551030.png)

    - ##### 登录页面

    - ![image-20230912141609458](https://gitee.com/WuHaHa-svg/open-api-videos/raw/MarkDownImgs/img/image-20230912141609458.png)
    
    - ##### 注册页面
    
    - ![image-20230912141621479](https://gitee.com/WuHaHa-svg/open-api-videos/raw/MarkDownImgs/img/image-20230912141621479.png)

------

## 项目预览与部署

- ### 扫描下方体验版小程序二维码

  目前小程序是体验版，因为审核大大太严格，审核根本过不了，我会接到体验申请资格后及时同意的

  ![image-20230929150617020](https://gitee.com/WuHaHa-svg/open-api-videos/raw/MarkDownImgs/img/image-20230929150617020.png)

- ### 下载本项目并部署到自己的微信小程序（可以从git导入，也可以下载到本地再导入）

![image-20230912141822620](https://gitee.com/WuHaHa-svg/open-api-videos/raw/MarkDownImgs/img/image-20230912141822620.png)

![image-20230912141931840](https://gitee.com/WuHaHa-svg/open-api-videos/raw/MarkDownImgs/img/image-20230912141931840.png)

接下来运行到微信开发者工具即可，有不明白的可以参考[uni-app官网 (dcloud.net.cn)](https://uniapp.dcloud.net.cn/tutorial/run-and-debug.html)，在此我便不再赘述。

接下来就是去微信公众平台为小程序配置服务器域名和IP白名单，如果不配置的话，请求数据在开发者工具里面是正常的，一旦发布为体验版或者线上版，请求就会被微信拦截掉，配置服务器域名和IP白名单后即可正常，因为我们的项目调用的接口服务时OpenApi，因此我们要把OpenApi的域名和主机IP设置为我们微信小程序的服务器域名和IP白名单，如下所示：

扫码登录[微信公众平台 (qq.com)](https://mp.weixin.qq.com/) => 点击左边导航栏“开发管理” => 点击“开发设置” => 设置IP白名单和服务器域名

![image-20230913100340812](https://gitee.com/WuHaHa-svg/open-api-videos/raw/MarkDownImgs/img/image-20230913100340812.png)

- ### 如果有任何疑惑，欢迎添加微信：WuHaHa-Unavailable咨询。备注：OpenApiVideos。

- ### 或者发送邮箱到：1813995050@qq.com
