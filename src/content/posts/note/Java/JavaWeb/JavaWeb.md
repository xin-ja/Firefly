\---

title: JavaWeb

published: 2026-08-08

description:  JavaWeb

tags: [ JavaWeb]

category:  JavaWeb

draft: false

\---

# JavaWeb

## 流程总览

前后端分离开发

<img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260627152623342.png" alt="image-20260627152623342" style="zoom:50%;" /> 

用户访问网站，前端服务器解析前端代码，并从前端代码中提取出后端服务器的url，向其发送请求，后端收到请求与数据库进行交互并发送回数据，发送回数据后再由前端服务器填充在网站上

## 前端

### 概述

- 网页组成：文字、图片、音频、超链接

- 前端代码通过**浏览器的内核的解析和渲染**变为用户看到的网页

- Web标准

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260627153333418.png" alt="image-20260627153333418" style="zoom:50%;" />

---



### HTML、CSS

##### HTML

- 简介

  ![image-20260627153627906](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260627153627906.png)

- 基本结构

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260627154022520.png" alt="image-20260627154022520" style="zoom: 50%;" /> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260627154058391.png" alt="image-20260627154058391" style="zoom:50%;" />

- 基本标签&样式

  1. 图片标签<img>

     - src指定图像url
     - width：图像宽度
     - height：图像高度

  2. 标题标签<h1>  -  <h6>

  3. 水平线标签<hr>

  4. 超链接标签 <a>   —  <a herf="url" target=""> target用于选择打开超链接的方式  —  重新开启一个界面 or  在当前页面打开

  5. 视频标签<video>

     - src:视频url
     - controls:显示播放控件
     - width：播放器宽度
     - height：播放器高度

  6. 音频标签<audio>

     - src:音频url
     - controls：显示播放控件

  7. 段落标签<p>

  8. 文本加粗标签:<b>/<strong>

  9. 表格标签

     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260627171034648.png" alt="image-20260627171034648" style="zoom:50%;" />

  10. 表单标签<form>  主要负责**数据采集**的功能

      <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260627172244271.png" alt="image-20260627172244271" style="zoom:50%;" /> 

      

      <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260627172919723.png" alt="image-20260627172919723" style="zoom:50%;" /> ![image-20260627172940080](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260627172940080.png)
      
       
      
      - 表单项标签
      
        1. <input>，可通过type属性控制输入形式
      
           ![image-20260627173231447](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260627173231447.png)
      
        2. < select>,下拉表单
      
           ![image-20260627173910476](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260627173910476.png) 
      
        3. < textarea>,自由文本域
        
           ![image-20260627175328670](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260627175328670.png) 
      
      

##### CSS 

<img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260627153806932.png" alt="image-20260627153806932" style="zoom:50%;" /> 

- CSS引入方式

  - 行内样式：写在标签的style中 （不推荐）
  - 内嵌样式：写在style标签中（可以写在页面任意位置，但通常约定写在head标签中）
  - 外联样式：写在一个单独的.css文件中  通过**link标签**引入html

- CSS的颜色表示

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260627160328643.png" alt="image-20260627160328643" style="zoom:50%;" /> 

  **color：**xxxxx

- CSS选择器：用来选取需要设置样式的元素（标签）

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260627160708123.png" alt="image-20260627160708123" style="zoom:50%;" />

- text-decoration：文本装饰样式，可以加下划线、去下划线等等

- text-align：文本对齐方式

- 盒子模型

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260627162900708.png" alt="image-20260627162900708" style="zoom: 40%;" /> 

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260627162952851.png" alt="image-20260627162952851" style="zoom:50%;" /> 

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260627163217413.png" alt="image-20260627163217413" style="zoom:50%;" /> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260627163238929.png" alt="image-20260627163238929" style="zoom:50%;" />

---



### JavaScript

#### 简介及基本语法

- 简介

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260627175430659.png" alt="image-20260627175430659" style="zoom:50%;" /> 

- 引入方式

  1. 内部脚本：将js代码定义在html页面中

     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260627175713383.png" alt="image-20260627175713383" style="zoom:50%;" /> 

  2. 外部脚本：将js代码定义在外部js文件中，通过<script src="url">标签引入

     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260627175804288.png" alt="image-20260627175804288" style="zoom:50%;" /> 

- 基本语法

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260627180104973.png" alt="image-20260627180104973" style="zoom: 43%;" />  

  - 输出语句

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260627180140653.png" alt="image-20260627180140653" style="zoom:43%;" /> 

  - 变量

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260627180239045.png" alt="image-20260627180239045" style="zoom:50%;" /> 

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260627180424135.png" alt="image-20260627180424135" style="zoom:50%;" /> 

    var是全局变量，且允许重复声明

  - == 和 ===

    == 会进行类型转换， ===为严格相等

  - 类型转换 如：parseInt等

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260627180844418.png" alt="image-20260627180844418" style="zoom:50%;" /> 

- 函数

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260627181026189.png" alt="image-20260627181026189" style="zoom:50%;" /> 

#### JS中的对象

- JS对象

  1. Array

     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260627181429440.png" alt="image-20260627181429440" style="zoom:50%;" /> 

     JS数组的长度是可变的，存储元素的类型也可以不一样

     - 属性和方法

       <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260627181609772.png" alt="image-20260627181609772" style="zoom:50%;" /> 

       同Java，forEach()同样可以使用Lambda表达式，只不过中间的->变成了**=>**

  2. String

     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260627182002154.png" alt="image-20260627182002154" style="zoom:50%;" /> 

     - 属性和方法

       <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260627182024592.png" alt="image-20260627182024592" style="zoom: 50%;" /> 

       indexof用于查找子串

  3. JSON

     - JS中的自定义对象

       <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260627182326282.png" alt="image-20260627182326282" style="zoom:50%;" /> 

     - JSON：通过JS对象标记法书写的文本

       <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260627182551513.png" alt="image-20260627182551513" style="zoom:50%;" /> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260627182811661.png" alt="image-20260627182811661" style="zoom:50%;" />

       一种**配置文件**，同properties，**存储**的是一对对的**键值对**

       可作为前后端**传输数据的载体**

     - JSON字符串和JS对象的相互转换

       <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260627182934363.png" alt="image-20260627182934363" style="zoom:50%;" /> 

  4. BOM

     浏览器对象模型，允许JS与浏览器对象，将浏览器的各个组成部分封装为了对象

     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260627183225410.png" alt="image-20260627183225410" style="zoom:50%;" /> 

     - window

       <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260627183257398.png" alt="image-20260627183257398" style="zoom:50%;" />

     - Location地址栏对象

       <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260627183537401.png" alt="image-20260627183537401" style="zoom:50%;" /> 

       

  5. DOM

     文档对象模型，将html文档的各个组成部分进行封装

     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260627183746279.png" alt="image-20260627183746279" style="zoom:50%;" />

     Element为标签，Attribute为标签内的一些属性            

     通过DOM与JS的事件监听机制，就可以来控制html页面 

     - 分类

       1. Core DOM
       2. XML DOM
       3. HTML DOM

     - DOM中获取HTML对象

       <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260627184314294.png" alt="image-20260627184314294" style="zoom:50%;" />



#### 事件监听

- 事件绑定

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260627185316636.png" alt="image-20260627185316636" style="zoom:50%;" /> 

- 常见事件

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260627185431918.png" alt="image-20260627185431918" style="zoom:50%;" /> 

---

### Vue

- 概念

  一套前端框架，免除原生JS中的DOM操作，简化书写 — 基于MVVM（Model-View-ViewModel）思想，实现数据双向绑定

- 快速入门

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260627190421999.png" alt="image-20260627190421999" style="zoom:50%;" />   ![image-20260627190911141](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260627190911141.png)

  创建出来的vue对象通过el:“#app”绑定了id=“app”的div板块，使得div中展示的数据和vue中的是同一份，从而实现了数据的双向绑定

  **其中vue对象是数据模型，变量、函数等都放在里面**

- 常用指令

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260627191407218.png" alt="image-20260627191407218" style="zoom:50%;" /> 

  详解：[视频1](https://www.bilibili.com/video/BV1m84y1w7Tb?spm_id_from=333.788.player.switch&vd_source=d6f1919e59f384773719ad5aa3d3a0a9&p=30)      [视频2](https://www.bilibili.com/video/BV1m84y1w7Tb?spm_id_from=333.788.player.switch&vd_source=d6f1919e59f384773719ad5aa3d3a0a9&p=31)

- Vue的生命周期

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260627192434894.png" alt="image-20260627192434894" style="zoom:50%;" /> 

  了解一下mounted ， 在浏览器渲染完界面后即挂在完成，此时需要向后端服务器发送请求

---

### Ajax

- 简介

  Asynchronous JavaScript And XML   异步的JavaScript和XML。用于数据的交换和异步交互

  ![image-20260627193041731](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260627193041731.png)

  - 同步和异步

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260627193302398.png" alt="image-20260627193302398" style="zoom:50%;" />

- 原生Ajax

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260627193421578.png" alt="image-20260627193421578" style="zoom:50%;" /> 

#### Axios

- 对原生Ajax进行了封装，简化了Ajax的书写

- 操作步骤

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260627194030823.png" alt="image-20260627194030823" style="zoom:50%;" />  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260627194743449.png" alt="image-20260627194743449" style="zoom:50%;" />

  GET 一般用于：查询、获取后端数据

  POST 一般用于：新增、删除、修改、提交表单数据

  图一中第一段代码用于向后端发送查询数据的请求

  第二段代码用于向后端发送删除id=1的数据，删除成功后打印返回结果

---

### 前后端分离开发

- 简介

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260627195957472.png" alt="image-20260627195957472" style="zoom:50%;" />

  前后端根据接口进行数据的交互，如Axios中的两段代码，第一段进入的是list接口，用于查询数据。第二段进入的是deleteById接口，用于根据id删除数据

  - 流程

    ![image-20260627200333166](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260627200333166.png)

- YAPI：高效、易用、功能强大的api管理平台 — 可以生成一个假的接口供前端测试

  教程：[视频](https://www.bilibili.com/video/BV1m84y1w7Tb?spm_id_from=333.788.player.switch&vd_source=d6f1919e59f384773719ad5aa3d3a0a9&p=36)  14-20min



- 前端工程化开发

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260627202115471.png" alt="image-20260627202115471" style="zoom:50%;" />

  - vue-cli

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260627202158287.png" alt="image-20260627202158287" style="zoom:50%;" /> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260627202857788.png" alt="image-20260627202857788" style="zoom:50%;" />

    主要用于创建项目目录，类似于IDEA创建项目后的初始配置

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260627203214690.png" alt="image-20260627203214690" style="zoom:50%;" /> 

    创建出来后就可以直接运行了，运行后会默认跑在8080端口（可在vue.config.js文件中修改配置），打开浏览器就会有相应初始化界面，后续进行源代码的编写对框架进行修饰

  - vue组件

    ![image-20260627204337664](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260627204337664.png)

---

### Vue组件库Element

- 简介

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260627204525788.png" alt="image-20260627204525788" style="zoom:50%;" />

  element的组件比较精美，可以拼凑出好看的界面

 

- 快速入门

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260627204737053.png" alt="image-20260627204737053" style="zoom:50%;" />

- 常见组件

  [视频1–Table表格](https://www.bilibili.com/video/BV1m84y1w7Tb?spm_id_from=333.788.player.switch&vd_source=d6f1919e59f384773719ad5aa3d3a0a9&p=41)     [视频2–Pagination分页](https://www.bilibili.com/video/BV1m84y1w7Tb?spm_id_from=333.788.player.switch&vd_source=d6f1919e59f384773719ad5aa3d3a0a9&p=42)    [视频3–Dialog对话框](https://www.bilibili.com/video/BV1m84y1w7Tb?spm_id_from=333.788.videopod.episodes&vd_source=d6f1919e59f384773719ad5aa3d3a0a9&p=43)   [视频4–Form表单](https://www.bilibili.com/video/BV1m84y1w7Tb?spm_id_from=333.788.videopod.episodes&vd_source=d6f1919e59f384773719ad5aa3d3a0a9&p=44)

---

### Vue路由

- 简介

  url中的hash与组件之间的对应关系

  - 工具

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260627211037139.png" alt="image-20260627211037139" style="zoom:50%;" />

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260627211258739.png" alt="image-20260627211258739" style="zoom:50%;" />

- 应用

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260627211344166.png" alt="image-20260627211344166" style="zoom:50%;" />

  根据path是路由地址，component是需要显示的组件部分

---

## 后端

### Maven

#### 准备

- 简介

  apache旗下的开源项目，用于管理和构建Java项目的工具

  - 作用

    - 依赖管理：快捷管理项目依赖（jar包），避免版本冲突

      只需在maven的配置信息中修改即可引入依赖

    - 统一项目结构 — 不同的开发工具构建出的项目结构可能不同，但是要使用了maven就会统一项目结构

      <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260628092914608.png" alt="image-20260628092914608" style="zoom:50%;" /> 

    - 标准**跨平台**的**自动化项目构建**

- 概述

  maven基于**项目对象模型**（POM）概念，通过一小段描述信息来管理项目结构

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260628093456118.png" alt="image-20260628093456118" style="zoom:50%;" /> 

  私服即镜像源

  - 安装

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260628093622947.png" alt="image-20260628093622947" style="zoom:50%;" /> 



- IDEA中的Maven集成

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260628095211032.png" alt="image-20260628095211032" style="zoom:50%;" /> 

  

  

#### 创建Maven项目

- 示意图

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260628101816453.png" alt="image-20260628101816453" style="zoom:50%;" /> 

- Maven项目目录

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260628102055859.png" alt="image-20260628102055859" style="zoom:50%;" /> 

- Maven项目的坐标

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260628103749581.png" alt="image-20260628103749581" style="zoom:50%;" /> 

  坐标是资源中的唯一标识，通过坐标可以唯一定位资源位置

  1. groupId：定义当前Maven项目隶属的组织名（通常域名反写）
  2. artifactId：定义当前Maven项目名（通常为模块名）
  3. version:当前项目版本号

  

  使用坐标可以定义、引入项目中的依赖

   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260628104124001.png" alt="image-20260628104124001" style="zoom: 80%;" /> 

#### 导入Maven项目

1. IDEA中的Maven模块添加

   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260628104454099.png" alt="image-20260628104454099" style="zoom:50%;" /> 右侧侧边栏

   添加时直接添加pom.xml配置文件即可

2. IDEA中的项目结构

   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260628104633426.png" alt="image-20260628104633426" style="zoom:50%;" /> 

 

#### 依赖管理

1. 依赖配置

   在pom.xml配置文件中编写dependencies标签

   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260628122008001.png" alt="image-20260628122008001" style="zoom:50%;" /> 

2. 依赖传递

   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260628122030133.png" alt="image-20260628122030133" style="zoom:50%;" /> 

   如项目A依赖于B，B中有C、D依赖，那么C、D也会传递给A

3. 排除依赖

   主动断开依赖的资源

   如项目A依赖于B，B中有C、D依赖，那么C、D也会传递给A，可以通过排除依赖排除C或D

   <exclusion>

   </exclusion>   在两个exclusion标签中写上需要排除依赖的坐标

4. 依赖范围

   默认情况下，依赖范围是全局的，可以通过<scope>…</scope>指定范围

   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260628122629989.png" alt="image-20260628122629989" style="zoom:50%;" /> 

#### Maven的生命周期

- Maven中有三套相互独立的生命周期

  1. clean
  2. default
  3. site

  同一套生命周期中，后面阶段的运行时前面的也会运行

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260628123221320.png" alt="image-20260628123221320" style="zoom:50%;" /> 

  1. clean：移除上次构建生成的文件
  2. compile：编译项目源代码
  3. test：使用合适的单元测试框架运行测试（junit）
  4. package：将编译后的文件打包，jar、war等
  5. install：安装项目到本地仓库

  在maven面板中的生命期点击插件即可执行阶段的任务

---

### Spring

- 简介

  Spring发展到今天已经形成了一种开发生态圈，提供了若干个子项目，每个项目用于完成特定的功能

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260628133756041.png" alt="image-20260628133756041" style="zoom:50%;" /> 

  若直接基于Spring Framework开发配置复杂、入门难度大，所以后来推出了SpringBoot，简化了Spring的开发

#### SpringBoot入门

- 需求：使用SpringBoot开发一个Web应用，浏览器发起/hello后给浏览器返回“Hello World”

- 步骤

  1. 创建SpringBoot工程，勾选Web开发相关依赖

     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260628134431824.png" alt="image-20260628134431824" style="zoom:50%;" /> 

     创建SpringBoot模块并进行相应设置

     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260628141241765.png" alt="image-20260628141241765" style="zoom:50%;" /> 

     SpringBoot的父工程

     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260628141600049.png" alt="image-20260628141600049" style="zoom:50%;" /> 

     SpringBoot的初始化启动类

  2. 定义HelloController类，添加hello方法

     ![image-20260628141707685](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260628141707685.png) 

     hellocontroller放在controller包下

     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260628142053715.png" alt="image-20260628142053715" style="zoom:50%;" /> 

     添加hello方法并对其进行请求处理类的声明和处理

  3. 运行测试

     运行启动类后即可用回环url+8080端口进行测试

     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260628142318814.png" alt="image-20260628142318814" style="zoom:50%;" /> 

     localhost:8080/hello   其中/hello即为我们刚刚定义的请求路径

---

### HTTP协议

- 概述

  超文本传输协议，规定了**浏览器与服务器**之间数据传输的规则

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260628142744729.png" alt="image-20260628142744729" style="zoom:50%;" />

  以SpringBoot入门中的程序为例

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260628143033740.png" alt="image-20260628143033740" style="zoom: 43%;" />

  图中

  Response是服务器发回的响应数据

  Request是浏览器发送的请求

  - 特点
    1. 基于TCP协议：面向连接，安全
    2. 基于请求-响应模型：一次请求对应一次响应
    3. HTTP协议是无状态的协议：对事物处理时没有记忆能力。每次请求-响应都是独立的
       - 缺点：多次请求间不能共享数据
       - 优点：速度快

- HTTP请求协议

  - 示意图

    ![image-20260628143651327](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260628143651327.png)

  由上图可见，HTTP请求协议可以分为三个部分

  1. 请求行

     即第一行，由三部分组成。**请求方式+资源路径+协议**

     - 请求方式：GET/POST
     - 请求路径：即GET/POST后跟着的  可以理解为该网页接入了我们Web程序中的哪一个接口。**如第一段就是接入了/brand.finAll方法传递了name和status两个参数进去    第二段接入了/brand方法**
     - 协议：HTTP/1.1

  2. 请求头

     从第二行开始，格式：key=value   以键值对的方式传递数据

     - 常见的请求头

       | 请求头字段      | 说明                                                         |
       | --------------- | ------------------------------------------------------------ |
       | Host            | 请求的主机名                                                 |
       | User-Agent      | 浏览器版本，例如 Chrome 浏览器的标识类似 Mozilla/5.0 ... Chrome/79，IE 浏览器的标识类似 Mozilla/5.0 (Windows NT ...) like Gecko |
       | Accept          | 表示浏览器能接收的资源类型，如`text/*`，`image/*`或者`*/*`表示所有； |
       | Accept-Language | 表示浏览器偏好的语言，服务器可以据此返回不同语言的网页；     |
       | Accept-Encoding | 表示浏览器可以支持的压缩类型，例如 gzip, deflate 等。        |
       | Content-Type    | 请求主体的数据类型。                                         |
       | Content-Length  | 请求主体的大小（单位：字节）。                               |

       User-Agent：用于解决不同浏览器的兼容问题，根据传递过来的不同浏览器信息进行不同的处理

  3. 请求体

     与请求头之间用一行空行隔开，用于存放请求参数，为POST请求独有。GET请求的参数直接跟在请求路径后进行传递

- HTTP响应协议

  - 示意图

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260628145007549.png" alt="image-20260628145007549" style="zoom: 80%;" />

  由上图可见，响应协议与请求协议类似，同样由三部分构成

  1. 响应行

     即第一行，格式为 协议+状态码+描述，描述是对状态码的描述，状态码有很多，常见的有200 OK   404Not Found

     具体可分为**5类**

     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260628145355867.png" alt="image-20260628145355867" style="zoom: 67%;" />

     - tip：重定向状态码

       <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260628145531164.png" alt="image-20260628145531164" style="zoom:50%;" />

  2. 响应头

     从第二行开始，同样以键值对方式传递

     | 响应头字段       | 说明                                                         |
     | ---------------- | ------------------------------------------------------------ |
     | Content-Type     | 表示该响应内容的类型，例如`text/html`，`application/json`。  |
     | Content-Length   | 表示该响应内容的长度（字节数）。                             |
     | Content-Encoding | 表示该响应压缩算法，例如`gzip`。                             |
     | Cache-Control    | 指示客户端应如何缓存，例如`max-age=300`表示可以最多缓存 300 秒。 |
     | Set-Cookie       | 告诉浏览器为当前页面所在的域设置 cookie。                    |

  3. 响应体

     与响应头之间用一行空行隔开，用于存放响应的数据。

- HTTP协议解析

  客户端的HTTP协议解析由浏览器完成，服务端的HTTP协议需要我们去解析  ———  已经被许多公司封装成软件程序，可以直接使用。如：**Apache Tomcat**

  - Web服务器 — Tomcat

    - 简介

      <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260628151059006.png" alt="image-20260628151059006" style="zoom: 50%;" />

    - 基本使用

      - SpringBoot的起步依赖

        ![image-20260628152157016](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260628152157016.png)

        利用Maven的依赖传递，把某项开发所需要的依赖封装在一个起步依赖里

      而在SpringBoot web的起步依赖中已经内嵌了TomCat Web服务器，所以用SpringBoot做出来的Web程序可以直接在服务器访问到

---

### 请求响应

- 简介

  - 流程

    1. TomCat将HTTP协议解析后拆解为HttpServletRequest对象，并交由DispatcherServlet。，由DispatcherServlet。根据其中的请求路径匹配响应的xxxController控制器，将参数交由控制器处理。
    2. 控制器处理好后返回数据给DispatcherServlet，由DispatcherServlet将数据封装为HttpServletResponse响应对象，交给Tomcat由Tomcat发送给浏览器

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260628153721601.png" alt="image-20260628153721601" style="zoom: 50%;" />

    上图就被称为BS架构 — 浏览器 服务器架构

#### 请求

- Postman

  功能强大的网页调试与**发送网页HTTP请求**的Chrome插件，常用于进行接口测试

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260628161005032.png" alt="image-20260628161005032" style="zoom: 33%;" /> 

  通过postman可以对我们开发的网站传递HTTP请求，并且可以看到其返回的数据

- 简单参数

  - 原始接收方式

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260628161342808.png" alt="image-20260628161342808" style="zoom:50%;" /> 

  - SpringBoot中的参数接收

    直接在Controller方法中声明对应的形参即可，注意：要保证前后端**参数名一致**

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260628161606237.png" alt="image-20260628161606237" style="zoom:50%;" /> 

    - 示例

      <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260628162235773.png" alt="image-20260628162235773" style="zoom:50%;" /> 

      <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260628162218142.png" alt="image-20260628162218142" style="zoom: 33%;" /> 

      POST同理，不过数据部分要放在body部分

    

    - 若方法形参名和请求参数名不一致，会输出null。可以用@RequestParam完成映射

      ![image-20260628162852287](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260628162852287.png)

      @RequestParam（name=“name”）中，表示将“name”这个字符串存入name变量中，再把name变量映射到username上，如此一来，前端传递的name=“xxx”会到name变量中，再通过name变量映射给username，tip：name=“xxx”  value=“xxx”用法一样

       

      tip：@RequestParam(name=“xxx”，require=true/false)这是完整形式，require=true时表示这个参数必须传递，默认为true

- 实体参数

  即：使用一个类去接收数据，简单参数就是String Integer这种基本数据类型。实体参数就是定义一个类去接收传递过来有关这个类的参数。**注意：类中相关成员变量的名称需要做到与前端传递参数一致**

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260628164101437.png" alt="image-20260628164101437" style="zoom: 80%;" />

  tip：当遇到类的嵌套时，比如A嵌套了B，B中有c、d成员变量，那么传参时需要传递 B.c   B.d

- 数组集合传参

  - 数组集合使用场景：前端中的checkbox，这种多选的情况就可以用数组集合接收

  - 传递形式

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260628164639599.png" alt="image-20260628164639599" style="zoom: 80%;" /> 

  - 接收方式

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260628165039530.png" alt="image-20260628165039530" style="zoom:50%;" /> 

    同样，形参名需要和传递的形参保持一致

- 日期时间参数

  - 使用LocalDateTime类型的参数接收，需配合@DateTimeFormat(pattern=“”)用于指定时间形式

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260628165355303.png" alt="image-20260628165355303" style="zoom: 80%;" />

- JSON参数

  - 如何传递

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260628170335764.png" alt="image-20260628170335764" style="zoom:50%;" /> POST模式下选择raw JSON

  - 如何接收：通过对应的**实体对象**用于接收

- 路径参数

  - 通过请求URL直接传递参数，使用{…}来标识路径参数，需要使用@PathVariable获取路径参数

    ![image-20260628170633741](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260628170633741.png)

    如上图，在定义Mapping的时候用{id}来表示可能传递的值，后在形参列表通过@PathVariable将获取到的id传递给形参id

    ![image-20260628170859176](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260628170859176.png)

    同理可以定义多个路径参数
  
- :star::star::star注意：**当我接收JSON文本的时候需要加上@RequestBody**

  ​				**传递JSON文本的时候要加上@ResponseBody**     

  **只要交互时有关JSON的传递都要加**

#### 响应

- 响应数据：即方法返回值，通过@ResponseBody响应到浏览器上

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260628171405435.png" alt="image-20260628171405435" style="zoom:50%;" /> 

  由于RestController = Controller+ResponseBody  所以无需再声明

- 实际业务开发中，会将响应的结果统一成一个类

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260628172034161.png" alt="image-20260628172034161" style="zoom:50%;" /> 

  通过Object实现多态，使得所有的类都可以封装在data中。

---

### 分层解耦

- 将方法全部写在Controller中会使得代码的复用性差且难以维护，对此我们要进行**分层解耦**

#### 分层

- 三层架构  — 单一职责原则

  1. controller：控制层，接收前端发送请求，对请求进行处理，并响应数据
  2. service：业务逻辑层，处理具体的业务逻辑
  3. dao：数据访问层（Data Acess Object）【持久层】，负责数据访问操作，包括数据的增删改查

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260628183414686.png" alt="image-20260628183414686" style="zoom:50%;" />

  - DAO层被设为接口的原因	

    1. 数据来源不止一种：可以查 MySQL 数据库、读取 XML 文件、读取 JSON 文件等，不同数据源查询代码完全不一样；

    2. 如果写一个固定的 DAO 具体类，只能适配一种数据源，没法灵活切换；

    3. 把 DAO 定义成接口，只规定通用功能（新增、删除、修改、查询方法签名），相当于定下一套 “存取数据的规矩”；

    4. 后续想用什么数据源，就单独写一个实现类去实现这个 DAO 接口即可，上层 Service 调用完全不用改动。

  - 同理Service层也应该被设为接口，由接口规定需要实现哪些业务功能。再由其实现类去具体实现

  

  - 项目结构示意图

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260628185115220.png" alt="image-20260628185115220" style="zoom:50%;" /> 

    在service的实现类编写代码时，通过 EmpDAO data = new EmpDAOAchive(); 获取DAO接口对象，再通过接口对象里具体的重写方法来实现数据的获取

    同样，在Controller层中，通过EmpService  s = new EmpServiceAchive();实现业务逻辑的调用，调用后接收返回值并return

#### 解耦

- 内聚：软件中各个功能模块内部的功能联系  — 即功能单一程度
- 耦合：衡量软件中各个层/模块之间的依赖、关联程度 — 即功能独立程度

好的项目应该做到高内聚、低耦合

 

- 实现思路

  在项目结构示意图中的讲解**仍然使得模块之间耦合** — 如：service层实现类名改动，controller层也许改动new的对象。所以**上述讲解是错的**

  正确的实现思路应该是创建一个**容器，**将**service**层中的**实现类放入容器**中，在**controller**层直接去**容器里面寻找对应的对象**  上述两个过程分别需要**控制反转（IOC）**和**依赖注入（DI）**两个技术

  ![image-20260628190348386](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260628190348386.png)

  

  - IOC（Inversion Of Control）：对象**创建控制权**由程序自身**转移到外部容器**，这种思想被称为控制反转

  - DI（Dependency Injection）：容器为应用程序提供运行时，所依赖的资源，称之为依赖注入。

  - Bean对象：**IOC容器中创建、管理的对象**，称之为Bean

- 解耦的具体实现

  1. 将Service层与DAO层的实现类交由IOC容器管理

     在实现类上方加上**@Component**标签

     

  2. 为Controller与Service注入运行时依赖的对象

     在需要依赖对象的语句上加上**@Autowired**标签，tip：依赖注入后就不用new实现类了

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260628191521893.png" alt="image-20260628191521893" style="zoom: 67%;" /> 

  如图：**一个Service的实现类，首先要加上@Component标签将其交由容器保管，其次Service层调用DAO层的实现类时不要new，直接依赖注入@Autowired**

- IOC详解

  为了详细的区分Bean对象到底归属于哪一层，又对Component进行了衍生

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260628192437231.png" alt="image-20260628192437231" style="zoom:50%;" />

  真实开发中建议使用衍生注解。对于某些**工具类**可以使用@Component

  tip1：@RestController = @Controller+@ResponseBody 

  tip2:可以对Bean进行命名如：@Servicee(“empservice”)  默认名为类名首字母小写后的单词  一般不用指定名字

   

  - Bean的组件扫描

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260628193206596.png" alt="image-20260628193206596" style="zoom:50%;" />

    简而言之就是：Bean组件的扫描是默认开启的，但是**默认的范围是启动类所在包及其子包**

    若想要扫描到默认范围外的包，需要在启动类上手动设置@ComponentScan(“启动类范围外包名”, “启动类范围里包名”)，原因：当手动设置时，**默认的设置就会被覆盖**，所以除了启动类外的包名，原先启动类内的包也需要设置

- DI详解

  @Autowired默认是按照类型进行依赖注入的，也就是说，当存在多个相同类型的Bean时，会报错

   

  - 解决方法

    1. @Primary：在实现类的上方加，表示该实现类优先被注入

       <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260628194301151.png" alt="image-20260628194301151" style="zoom:50%;" /> 

    2. @Qualifier：配合@Autowired使用，用于指定注入哪个Bean。@Qualifier(“Bean的名字”)

       <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260628194436883.png" alt="image-20260628194436883" style="zoom:50%;" /> 

    3. @Resource（name=“Bean名”）：另一种注解方式，**直接根据名称注入**

       <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260628194553388.png" alt="image-20260628194553388" style="zoom:50%;" /> 

       

---

### Mybatis

DAO层框架，用于**简化JDBC开发**

#### 入门

1. 准备工作（SpringBoot工程，数据库表，**对应实体类**）

   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260629091639193.png" alt="image-20260629091639193" style="zoom: 25%;" /> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260629092900753.png" alt="image-20260629092900753" style="zoom: 33%;" />

   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260629093428717.png" alt="image-20260629093428717" style="zoom: 40%;" /> 成员变量与字段名一一对应



2. 引入Mybatis相关依赖（Mybayis+MySQL驱动），配置Mybatis(配置数据库连接信息)

<img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260629093922999.png" alt="image-20260629093922999" style="zoom:50%;" /> 

3. 编写SQL语句（注解/XML） 需定义一个接口（使用**Mapper** 代替**DAO** ），在Mybatis中只需要定义接口，底层会自动获取**实现类（动态代理生成的代理对象）**

   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260629095255485.png" alt="image-20260629095255485" style="zoom:50%;" /> 

   同DAO，使用了@Mapper后，实现类都会被IOC

4. 在SpringBoot测试单元进行测试

   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260629103548757.png" alt="image-20260629103548757" style="zoom:33%;" /> 

5. 介入数据库提供SQL提示

   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260629103626642.png" alt="image-20260629103626642" style="zoom:50%;" /> 



#### 数据库连接池

- 标准接口：DataSource

- 常见产品

  Druid  Hikari（SpringBoot默认）

- 连接池的切换

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260629104035492.png" alt="image-20260629104035492" style="zoom:50%;" />

#### lombok

- 用于解决定义实体类过于臃肿的问题（原生定义实体类去接收数据库数据时需要提供各类get set方法以及tostring方法等，过于臃肿）

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260629104358541.png" alt="image-20260629104358541" style="zoom: 33%;" /> 

- lombok简介

  一个Java类库，能通过注解的形式自动生成构造器、get set、tostring、hashcode、equals等。简化开发

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260629104512986.png" alt="image-20260629104512986" style="zoom:50%;" /> 

  - lombok依赖

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260629104611977.png" alt="image-20260629104611977" style="zoom: 80%;" />   

    SpringBoot对lombok进行了集中管理 所以不用指定version

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260629105121314.png" alt="image-20260629105121314" style="zoom: 33%;" />  原理：在编译器根据注解生成方法



#### Mybatis基础操作

- 使Mybatis日志在控制台输出，方便理解底层原理<img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260629110807717.png" alt="image-20260629110807717" style="zoom:50%;" />

##### 增

- 基础操作

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260629112638394.png" alt="image-20260629112638394" style="zoom: 40%;" /> 

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260629112650626.png" alt="image-20260629112650626" style="zoom:33%;" /> 

- 底层 — 预编译SQL

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260629113031133.png" alt="image-20260629113031133" style="zoom:50%;" />

- 主键返回：在多表存储时，如：表1  中间表  表2，存入表1后需将主键返回，返回后存入中间表

  默认情况下emp.getId()不会返回主键，需要加上

  **@Options(KeyProperty=“主键名”,useGeneratedKeys=true)** 

  KeyProperty用于指定主键  useGeneratedKey表示需要将主键返回

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260629113725457.png" alt="image-20260629113725457" style="zoom:50%;" /> 

  设置后使用emp.getId()即可获取主键

##### 删

- 基础操作

​	<img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260629110415414.png" alt="image-20260629110415414" style="zoom:50%;" />    

​	<img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260629110429829.png" alt="image-20260629110429829" style="zoom:50%;" /> 



- 底层 — 预编译SQL

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260629110937062.png" alt="image-20260629110937062" style="zoom:50%;" /> 

  性能更高更安全（防SQL注入）

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260629111145966.png" alt="image-20260629111145966" style="zoom:50%;" /> 

  若不采取预编译，每一条编译后的存储在缓存中的结果都是不一样的，所以需要编译多次。



##### 改

- 基础操作

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260629115129423.png" alt="image-20260629115129423" style="zoom:50%;" />

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260629115143281.png" alt="image-20260629115143281" style="zoom:33%;" /> 

   

- 底层 — 预编译SQL

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260629115221070.png" alt="image-20260629115221070" style="zoom:50%;" />

##### 查

- 基础操作

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260629115640990.png" alt="image-20260629115640990" style="zoom:50%;" /> 

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260629115654192.png" alt="image-20260629115654192" style="zoom:50%;" /> 

- 底层 — 预编译SQL

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260629115718555.png" alt="image-20260629115718555" style="zoom:33%;" /> 

- tip：条件查询时，比如like‘%张%’  ，就不能用#{}占位了，因为在‘’内#会被转义成字符，需要用字符串拼接符号**${}** ，但是这样拼接后就无法预编译，所以最好的方法应该是使用concat函数  即： **like concat(‘%’,#{name},‘%’)**

- Mybatis中的数据封装

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260629115817671.png" alt="image-20260629115817671" style="zoom:50%;" />

  - 解决方案

    1. 给字段起别名，别名与属性名相同

    2. 通过@Results(@Reasult(column=“xxx”,property=“xxx”))注解手动映射封装

       <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260629120014042.png" alt="image-20260629120014042" style="zoom: 50%;" /> 

    3. 配置文件中开启Mybatis驼峰命名自动映射开关

       ![image-20260629120133088](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260629120133088.png)

#### XML映射文件

- 对于简单的SQL语句查询可直接使用上述注解的方式，但是对于复杂的SQL语句查询，应当使用XML文件对其进行存储，从而**实现SQL语句与程序源代码的解耦**，方便维护且复用性高

> 规范
>
> - XML 映射文件的名称与 **Mapper 接口名称一致**，并且将 XML 映射文件和 Mapper 接口放置在**相同包下**（**同包同名**）。
>
>    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260629131239508.png" alt="image-20260629131239508" style="zoom:50%;" /> 
>
>   xml存放着resources目录下，为此要创建一份和java目录下同包同名的目录
>
>   一个接口对应一个xml映射文件
>
> - XML 映射文件的 **namespace 属性为 Mapper 接口全限定名一致**。
>
> - XML 映射文件中 **sql 语句的 id 与 Mapper 接口中的方法名一致**，并保持**返回类型一致。**
>
> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260629131301527.png" alt="image-20260629131301527" style="zoom:50%;" />



- MybatisX插件

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260629131648718.png" alt="image-20260629131648718" style="zoom:50%;" /> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260629131702123.png" alt="image-20260629131702123" style="zoom:50%;" />

  可快速定位，方便开发

#### 动态SQL  — XML中的SQL流程控制

- 随着用户输入和外部条件变化而变化的SQL语句

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260629132041599.png" alt="image-20260629132041599" style="zoom:50%;" /> 

  如图所示，上图有三个查询条件，如果用以往的静态写法必须传满三个参数才可以进行查询，而真实情况不是这样的。

- 实现：XML中的标签进行流程控制

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260629132255859.png" alt="image-20260629132255859" style="zoom:50%;" /> 

  - if标签，条件判断，若条件成立则拼接SQL

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260629133006261.png" alt="image-20260629133006261" style="zoom: 50%;" /> 

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260629134259805.png" alt="image-20260629134259805" style="zoom:50%;" />

    

  - foreach标签

    可用于批量删除等操作

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260629135434860.png" alt="image-20260629135434860" style="zoom:50%;" />

  - <sql> <include>标签

    - 问题

      <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260629135645386.png" alt="image-20260629135645386" style="zoom:33%;" /> 

      标红部分为字段名，若后面字段名修改，需要多次修改 复用性差

    - 解决方法

      1. 将字段名存在<sql>标签中

         <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260629135739569.png" alt="image-20260629135739569" style="zoom:50%;" /> 

      2. 使用<include>标签引用

         ![image-20260629135815041](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260629135815041.png) 

---

### jwt、事务管理、异常管理等知识点 ：  [Project01.md](Project01\Project01.md) 

---



### AOP

- AOP：面向切面变成，即：面向特定方法编程  — 通过动态代理实现，在不改变原始方法的源代码前提下，使用动态代理对其进行增强

- 场景

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260701180939070.png" alt="image-20260701180939070" style="zoom:50%;" />

  ![image-20260701181042354](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260701181042354.png)

  动态代理一个模板，通过模板+指定方法就可以统计方法运行时长

- SpringAOP

  ![image-20260701181219086](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260701181219086.png)

  - 快速入门

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260701181244231.png" alt="image-20260701181244231" style="zoom:50%;" /> 

    1. 引入依赖

    2. 编写AOP程序：针对特定方法编程

       ![image-20260701182849592](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260701182849592.png)

       如此一来，在运行Around指定范围内的方法时都会自动加上这一段AOP程序。

- 使用情形及优势

  ![image-20260701183016474](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260701183016474.png)

  ![image-20260701183114989](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260701183114989.png)

#### AOP核心概念

1. 连接点：JoinPoint：可以被AOP控制的方法（暗含方法执行时的相关信息）

2. 通知：Advice：指重复的逻辑，即共性功能（最终体现为一个方法）

3. 切入点：PointCut，匹配连接点的条件，通知仅在切入点方法执行时被应用（以切入点表达式指定范围）

4. 切面：Aspect：描述通知与切入点的对应关系（通知+切入点）

5. 目标对象：Target：通知所应用的对象

![image-20260701183844691](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260701183844691.png)

JoinPoint即所有可以被AOP控制的方法，PointCut即实际被AOP控制的方法



#### AOP执行流程

![image-20260701184047055](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260701184047055.png)

实际上就是注入时注入代理对象，而非原始的目标对象



#### AOP进阶

1. 通知类型

   1. **@Around**：环绕通知，此注解标注的通知方法在目标方法前、后都被执行 
   2. @Before：前置通知，此注解标注的通知方法在目标方法前被执行
   3. @After ：后置通知，此注解标注的通知方法在目标方法后被执行，无论是否有异常都会执行   **又称最终通知**
   4.  @AfterReturning ： 返回后通知，此注解标注的通知方法在目标方法后被执行，有异常不会执行 
   5. @AfterThrowing ： 异常后通知，此注解标注的通知方法发生异常后执行

   注意：

   1. @Around需自己调用ProceedingJoinPoint.proceed()让原始方法运行，其他通知原始方法自动运行
   2. @Around的返回值必须指定为**Object**，来返回原始方法返回值

   tip：切入点表达式的抽取

   ![image-20260701185733304](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260701185733304.png)

2. 通知顺序

   当多个切面都匹配了同一个目标方法时，通知顺序如下

   - @Before的切面类：字典序从小到大
   - @After的切面类：字典序从大到小

   tip：可以使用@Order（数字）加在切面类上控制顺序

   - @Before：数字越小越先执行
   - @After：数字越大越先执行

3. 切入点表达式

   - 作用：决定切入点范围

   - 常见形式

     1. execution(….)：根据方法的签名匹配

        - 格式: excution(权限修饰符 **返回值 包名.类名.方法名(方法参数)** throws异常)    一般只需填写黑体部分    
        - 注意：
          1. 参数类型要是全类名
          2. 可以使用     && || !

        - 通配符

          *表示**单个**任意符号

          ..表示**多个**任意符号

        - 书写建议

          ![image-20260701192601316](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260701192601316.png)

        

     2. annotation(….)：根据注解匹配

        不常用，需要手动标记注解，再去引用注解

        详见：[视频](https://www.bilibili.com/video/BV1m84y1w7Tb?spm_id_from=333.788.player.switch&vd_source=d6f1919e59f384773719ad5aa3d3a0a9&p=180)

4. 连接点

   JoinPoint类，可以通过JoinPoint对象获取目标方法执行时的相关信息，如：类名、方法名、方法参数

   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260701193416462.png" alt="image-20260701193416462" style="zoom:50%;" />

   - 注意

     ![image-20260701193143777](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260701193143777.png)

---

### SpringBoot底层

#### 配置优先级

- 配置

  - 三类配置文件

    1. application.properties
    2. application.yaml
    3. **application.yml（主流）**

    **优先级：properties>yml>yaml**

  - 除了支持配置文件属性配置，还支持**Java系统属性**和**命令行参数**的方法进行配置

    ![image-20260702201651233](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260702201651233.png)

    优先级：命令行参数>Java系统属性>三大配置文件

#### Bean的管理

- Bean的获取

  SpringBoot启动时会将Bean放在IOC容器中，除了@Autowired自动注入，还可通过以下方式获取Bean

  ![image-20260702202223421](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260702202223421.png)

  tip:以上方法都是IOC容器对象的方法

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260702203722029.png" alt="image-20260702203722029" style="zoom:50%;" />

  三个Bean对象是同一个。**默认情况**下，Spring项目启动时，会把Bean都创建好放在IOC容器中

 

- Bean的作用域

  ![image-20260702204319580](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260702204319580.png)

  重点了解前两个，由于**默认情况下为singleton作用域**，所以默认情况下，IOC容器中只会有一个同名Bean，所以Bean的获取中三种方法获取出来的是同一个对象

  - 作用域的设置

    可以通过**@Scope注解**配置作用域

    **@Scope(“prototype”)**  tip：注解在**对应类**的上面

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260702205135665.png" alt="image-20260702205135665" style="zoom:33%;" /> 

    ![image-20260702205238196](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260702205238196.png)

 

- 第三方Bean

  对于自己写的Bean可以使用 @Component、@Service等交由IOC容器管理， 对于**第三方Bean**需要用到**@Bean**交由IOC

  - 步骤

    1. 第三方Bean建议定义在**配置类**中，所有的第三方Bean都放在一个配置类中利于集中管理

        <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260702210545817.png" alt="image-20260702210545817" style="zoom:50%;" /> 

    2.  格式

       ```java
       @Bean
       public 第三方Bean类型 函数名(){
           return new 第三方Bean类型
       }
       ```

       ![image-20260702210522439](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260702210522439.png)

    3. 第三方Bean的名称

       **默认为方法名**

       可通过 **name 或 value属性**指定名称

       <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260702210838980.png" alt="image-20260702210838980" style="zoom:50%;" />

    4. **如果第三方bean需要依赖其它bean对象，直接在bean定义方法中设置形参即可，容器会根据类型自动装配。**

       ![image-20260702211111657](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260702211111657.png)

       

#### SpringBoot原理

:star2::star2::star2:自动配置原理流程总结：[视频](https://www.bilibili.com/video/BV1m84y1w7Tb?spm_id_from=333.788.player.switch&vd_source=d6f1919e59f384773719ad5aa3d3a0a9&p=191)  17m30s

- 起步依赖

  SpringBoot通过**Maven的依赖传递**，将某个业务所需的起步依赖统一配置到一个依赖中并随项目的创建自动添加

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260702211732463.png" alt="image-20260702211732463" style="zoom:50%;" /> 

- 自动配置 

  当spring容器启动后，**一些配置类、bean对象自动存入IOC容器中**，无需我们手动声明，省去繁琐操作

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260702212330112.png" alt="image-20260702212330112" style="zoom: 33%;" /> 如图，所有都是自动配置的Bean

  

  - 原理

    - @Import

      ![image-20260702213734494](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260702213734494.png)
      
      :star2::star2::star2::star2::star2::star2::star2::star2::star2::star2::star2::star2::star2::star2::star2:

    - 首先如果**@Import**导入的是**普通类**，那么则会只将这个普通类放入IOC容器。

    - 其次**@configuration➕@bean**这个组合：**@configuration**将类定义为**配置类**，当**@import配置类**时会扫描配置类下的**所有@Bean将他们都放入IOC容器**，如此一来就实现了**对第三方普通Bean的批量管理**。
    
      - 当我把配置类定义在**application同包及其子包下的时候**可以**直接扫描**到，当扫描到的时候就会将其放入IOC容器。
    
      - 但如果**不在这个默认扫描范围内**的话可以使用**@import去定位**，如此一来就很清晰了  编写starter时手动把配置类全类名都放入一个统一的文件   然后自动配置时会自动调用方法将这些全类名**转为string数组**（**importselector实现类**中的方法）**自动import所有配置类**，找到配置类位置并生成对应bean放入IOC容器

   

  - 与原生Spring的对比

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260702215254182.png" alt="image-20260702215254182" style="zoom:50%;" /> 

    ![image-20260702215347344](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260702215347344.png) 

    ![image-20260702215559142](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260702215559142.png) 

   

  :star::star::star:

  简而言之，在原生Spring中引入依赖的注解需要通过@Import或者@Configuration+@Bean方式手动导入，而在SpringBoot中的starter依赖中，对所有需要导入的Bean都进行了以上处理    —  具体实现：将**所有Bean的配置类全类名**放入一个配置文件中，**（每个Bean配置类内都实现了@Configuration+@Bean）**，只需要直接**@Import这个配置文件中的所有配置类即可**

  ![image-20260702222253449](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260702222253449.png)

- 条件装配

  ![image-20260702222329873](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260702222329873.png)

  自动配置时在IOC中一键导入所有的Bean是不现实的，Bean太多了。所以会使用**条件装配@ConditionalOnxxx** ，限制在某条件满足时才会在IOC中创建这个Bean

   

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260702222512821.png" alt="image-20260702222512821" style="zoom:50%;" />

  - @ConditionalOnClass

    ![image-20260702222843995](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260702222843995.png)

    此处的当前环境指的是整个项目，只要项目中有指定类的class文件，条件就成立

  - @ConditionalOnMissingBean

    ![image-20260702223106828](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260702223106828.png)

    判断IOC容器中是否存在该Bean，

    作用：用于创建一个默认的Bean，若有默认的Bean就不用自己去声明了

  - @ConditionalProperty

    ![image-20260702223344877](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260702223344877.png)

    判断配置文件中是否有我们指定的键值对，若有则创建Bean放入IOC

#### 自定义starter起步依赖

- 并非所有的依赖都被SpringBoot整合为了起步依赖，但有些依赖又非常常用，所以可以自定义一些**公共组件**，在公共组件中将常用依赖配置好。而在SpringBoot项目中，一般会**将这些公共组件封装为SpringBoot中的starter**

- 自定义starter的结构

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260702224919376.png" alt="image-20260702224919376" style="zoom:50%;" />

- 实现

  ![image-20260702225106132](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260702225106132.png)

  1. 创建aliyun-oss-spring-boot-starter模块

     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260702230017362.png" alt="image-20260702230017362" style="zoom: 33%;" /> 

     ![image-20260702230027756](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260702230027756.png) 把其他都删掉

  

  2. 创建aliyun-oss-spring-boot-autoconfigure模块，在starter模块中引入该模块

      <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260702230314338.png" alt="image-20260702230314338" style="zoom:33%;" />

     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260702230630901.png" alt="image-20260702230630901" style="zoom:50%;" /> src别删，要配置

     ![image-20260702230716928](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260702230716928.png)引入

  

  3. 在aliyun-oss-spring-boot-autoconfigure模块中定义自动配置功能，并定义自动配置文件META-INF /spring/xxx.imports

     - 定义自动配置功能

       过于麻烦，[参考视频](https://www.bilibili.com/video/BV1m84y1w7Tb?spm_id_from=333.788.player.switch&vd_source=d6f1919e59f384773719ad5aa3d3a0a9&p=194)  并结合代码理解

---

### Maven进阶

#### 分模块设计与开发

<img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260703102947726.png" alt="image-20260703102947726" style="zoom:50%;" /> 

分模块设计后可以通过maven引入其他模块的依赖，以实现功能的复用与资源共享

- 实践

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260703103244620.png" alt="image-20260703103244620" style="zoom:50%;" /> 

  tip：实际工程中会先对模块功能进行设计，先拆分后编码，此处只做演示

1. 创建模块

   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260703104022891.png" alt="image-20260703104022891" style="zoom:50%;" />

2. 迁移原有pojo类

   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260703104447007.png" alt="image-20260703104447007" style="zoom:50%;" /> 

3. 在原有项目引入pojo依赖

   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260703104623701.png" alt="image-20260703104623701" style="zoom:50%;" /> 

#### 继承与聚合

- 继承

  与Java中的继承类似，子工程可以继承父工程中的配置信息。可以将公共依赖写到父工程中

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260703105506158.png" alt="image-20260703105506158" style="zoom:50%;" /> 

  实现：<parent> … <parent> 中间写父工程坐标

  tip：创建maven模块时，父工程打包方式要设置为pom（默认为jar）

  ![image-20260703105640569](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260703105640569.png)

  <packaging>pom<packaging>

   

  Maven和Java相同，只支持单继承

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260703105824370.png" alt="image-20260703105824370" style="zoom:50%;" /> 这种情况是不被允许的

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260703105837440.png" alt="image-20260703105837440" style="zoom: 50%;" /> 如此解决

   

  - 注意：配置父工程时还需在子工程中用<relativePath>标签指定父工程的pom.xml配置文件，若不指定则会从本地仓库/远程仓库查找该工程

    ![image-20260703110543636](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260703110543636.png)

- 版本锁定

  对于一些依赖，只有**部分子工程**需要使用，如此一来直接在父工程中加入这个依赖就不合适了。但是在子工程中一个一个加入又不方便管理其版本。 对此情况可使用版本锁定来解决

  1. 在父工程中使用<denpendencyManagement>标签对某依赖进行版本锁定，注意:此处只是进行版本锁定，并不会在父工程中引入此依赖

     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260703111219574.png" alt="image-20260703111219574" style="zoom:50%;" /> 

  2. 在需要用到此依赖的子工程中引入

     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260703111237878.png" alt="image-20260703111237878" style="zoom:50%;" /> 

     此时在子工程中引入依赖就无需指定<version>了，只需在父工程中对版本进行统一管理即可

  除此之外，在父工程中还可以使用自定义属性（<properties>）+引用属性（${属性名}）对各依赖的版本进行集中管理

  ![image-20260703113214999](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260703113214999.png)

- 聚合

  分模块开发后，若需要对某个包进行打包，首先要将与其有关的模块install到本地仓库中。当模块过多时会很麻烦  —  聚合用于解决这个问题

  **聚合：将多个模块组成一个整体，同时进行项目的构建**

   

  - 聚合工程

    一个不具有业务功能的**“空工程”**（有且仅有一个pom文件）  一般父工程也会是聚合工程

  - 实现：在聚合工程中通过<modules>标签设置当前聚合工程所包含的子模块名称

    ![image-20260703113955802](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260703113955802.png)

    ../表示上一级目录

    在构建时，maven会自动根据模块间的依赖关系进行打包

#### 私服

- 介绍

   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260703114415215.png" alt="image-20260703114415215" style="zoom:50%;" />

  假设在局域网内的仓库服务，用于代理外部中央仓

- 资源的上传与下载

  [视频](https://www.bilibili.com/video/BV1m84y1w7Tb?spm_id_from=333.788.player.switch&vd_source=d6f1919e59f384773719ad5aa3d3a0a9&p=199)

