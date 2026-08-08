---

title: Tlias

published: 2026-08-08

description:  JavaWeb

tags: [ JavaWeb]

category:  JavaWeb

draft: false

---

# Tlias

## 准备工作

![image-20260630100211951](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260630100211951.png)

- 开发规范 — Restful

  REpresentation State Transfer。一种表述性状态转换，用于统一开发规范

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260630102933723.png" alt="image-20260630102933723" style="zoom:50%;" />

  - **GET用于查询**
  - **POST用于增**
  - **PUT用于改**
  - **DELETE用于删**

  描述模块功能通常使用复数，也就是加s的格式来描述，表示此类资源，而非单个资源，如users

- 开发规范 — 统一响应结果

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260630103147704.png" alt="image-20260630103147704" style="zoom:50%;" /> 

- 开发流程

  1. 查看页面原型明确需求
  2. 根据需求设计数据库表结构
  3. 阅读接口文档
  4. 思路分析
  5. 接口开发
  6. 接口测试
  7. 前后端联调



## 部门管理

- 日志tip：lombok中提供了@Slf4j注解，加上注解后可以直接调用Logger日志对象

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260630105042060.png" alt="image-20260630105042060" style="zoom:50%;" /> 

- **指定请求方式**tip：GetMapping、PostMapping、PutMapping、DeleteMapping等

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260630105531850.png" alt="image-20260630105531850" style="zoom:50%;" /> 



## 员工管理

- 分页查询

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260630124214596.png" alt="image-20260630124214596" style="zoom:50%;" />

  ```sql
  select * from emp limit (页数-1)*一页的数据条数,一页的数据条数
  -- 如select * from emp limit 0,5
  ```

  tip：前端拿到总记录数（COUNT）就可以自动计算总页数

  实现思路<img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260630125126879.png" alt="image-20260630125126879" style="zoom:50%;" />

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260630125232213.png" alt="image-20260630125232213" style="zoom:50%;" /> PageBean类

@RequestParam(defaultValue=“1”) 可以设置默认值

![image-20260630132419761](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260630132419761.png)

- **分页查询逻辑较为复杂但步骤固定**，有Mybatis插件PageHelper简化开发

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260630132832219.png" alt="image-20260630132832219" style="zoom:50%;" />

  使用PageHelper，在Mapper层中我们只需要写“select * from emp”即可，在Service层中调用PageHelper的相关方法时会自动进行分页的查询操作及统计总数

  - 配置

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260630133317106.png" alt="image-20260630133317106" style="zoom:50%;" />

  - Mapper层

    ![image-20260630133509624](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260630133509624.png) 

  - Service层

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260630134028688.png" alt="image-20260630134028688" style="zoom:50%;" />

- 条件分页查询

  在分页查询的基础上加上条件，在Mapper层进行SQL语句的改动及Service层和Controller层参数的改动    tip：此时要使用动态SQL，所以要用XML映射

  - xml映射文件



- 删除功能

  分单个删除和批量删除，直接写批量删除即可。

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260630144305536.png" alt="image-20260630144305536" style="zoom:50%;" /> 

- 新增员工中的文件上传（上传图片）

  - 简介

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260630151604421.png" alt="image-20260630151604421" style="zoom:50%;" />

    - 前端部分

      <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260630153111727.png" alt="image-20260630153111727" style="zoom:50%;" /> 

      enctype=“multipart.form-data”打开多态传输，不打开无法正常传输文件/图片/音频/视频等

    - 后端部分

      调用MultipartFile  API接收多态类型的文件

      <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260630153247962.png" alt="image-20260630153247962" style="zoom:50%;" />

      注意：参数名和形参名一致，或用RequestParam映射

      tip:如此上传的文件是临时的，程序关闭后自动删除

     

- 文件的持久化保留（本地）

  MutipartFile中提供了transferTo方法用于转存

  ![image-20260630153835923](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260630153835923.png)

  配合MutiparFile中的getOriginalFilename实现文件的本地持久化保存

  单单通过以上操作文件名可能重复，配合uuid生成唯一的文件名

  ![image-20260630154151773](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260630154151773.png)

  SpringBoot当中最大文件上传大小为1M，可通过配置修改

  ![image-20260630154352894](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260630154352894.png)



- 文件持久化保留（阿里云OSS）

  本地存储限制很多，云端存储方便安全

  - 准备

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260630154938938.png" alt="image-20260630154938938" style="zoom:50%;" />

<img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260630155829419.png" alt="image-20260630155829419" style="zoom:50%;" />


- 阿里云OSS的集成

  准备工作好后，即可将其集成到项目中

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260630163013740.png" alt="image-20260630163013740" style="zoom:50%;" />

  选择图片后，调用uploadController将图片上传至oss，oss返回URL至前端，前端访问URL实现图片的渲染，填写好信息保存，保存时调用EmpController

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260630163317192.png" alt="image-20260630163317192" style="zoom:50%;" /> 

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260630164133591.png" alt="image-20260630164133591" style="zoom:50%;" /><img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260630164148527.png" alt="image-20260630164148527" style="zoom: 25%;" />  

 ## 优化（配置）

- application.properties

  ![image-20260630174322054](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260630174322054.png)

  参数可能会发生变化，若发生变化需要重新编译代码，且参数可能与其他源文件耦合，不便于维护和管理

  可以将参数写入配置文件，实现参数的解耦，参数修改时可以实现热切换

  在 [application.properties](tlias\src\main\resources\application.properties) 中配置参数

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260630174728938.png" alt="image-20260630174728938" style="zoom:50%;" />

  @Value(${xxx})进行配置的注入

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260630175129860.png" alt="image-20260630175129860" style="zoom:50%;" />

- yml（yaml）配置文件

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260630175611131.png" alt="image-20260630175611131" style="zoom:67%;" /> 

  - 基本语法

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260630175940289.png" alt="image-20260630175940289" style="zoom: 80%;" />
    
  - yml数据格式
  
    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260630180233923.png" alt="image-20260630180233923" style="zoom:50%;" /> 

<img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260630180821119.png" alt="image-20260630180821119" style="zoom:33%;" /> 

- 常见配置文件格式对比

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260630175741764.png" alt="image-20260630175741764" style="zoom:50%;" /> 

  XML标签化，过于臃肿 

  properties层级结构不清晰

  yml结构清晰，完全以数据为中心



- ConfigerationProperties

  - 问题

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260630181233558.png" alt="image-20260630181233558" style="zoom:33%;" /> 

  - 一键注入前提

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260630181259379.png" alt="image-20260630181259379" style="zoom:50%;" />

    1. **新建一个类用于存储配置**
    2. **属性名要一致**
    3. **要提供get set方法 — 直接@Data**
    4. **交给IOC容器管理 — @Component**
    5. **用@ConfigerationProperties（perfix=“xxxx”）注入前缀**

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260630181803910.png" alt="image-20260630181803910" style="zoom:50%;" />

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260630181942901.png" alt="image-20260630181942901" style="zoom:50%;" />

## 登录

- 登录功能

  即去emp表中根据username和password两个字段查询是否有员工信息

### 登录校验

若无登录校验，那么只要访问对应url就可以进入操作界面。不同的页面之间是没有联系的

登录校验：接收到请求后先校验用户有无登录。若无则给前端返回一个错误的结果并跳转到登录界面

<img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260701125338214.png" alt="image-20260701125338214" style="zoom:50%;" />

拦截请求 –> 获取登陆标记 –>若登陆则放行

- 登陆标记：要求用户登录成功后每一次请求中都可以获取该标记 ——— **会话技术** 



- 会话：用户开始访问web服务器时会话建立，直到有任意一方断开连接会话结束，**一次会话中可以包含多次请求和响应**

  会话跟踪：一种维护浏览器状态的方法，服务器需识别多次请求是否源自同一浏览器，以便在同一次会话的多次请求间**共享数据**

  

  1. 客户端会话跟踪技术：Cookie

     - 优点：HTTP协议中支持的技术

     - 流程

       <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260701130752233.png" alt="image-20260701130752233" style="zoom:50%;" />

     简而言之：Cookie就是服务器下发、保存在浏览器本地的一小段键值对。浏览器中保存Cookie后的每一次请求都会将Cookie发送给服务器，服务器通过读取Cookie得到Cookie中的数据

     - Cookie基本操作

       ![image-20260701131137287](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260701131137287.png)

       如图所示，通过HttpServletResponse这个对象中的addCookie方法就可以在回复报文中设置Cookie值，并且在往后的请求中可以通过getCookie方法获取Cookie值

     - 缺点

       1. 移动端APP无法使用
       2. 不安全，用户可以自己禁用Cookie
       3. Cookie不能跨域(前后端部署服务器不同，Cookie会失效)

  

  2. 服务端会话跟踪技术：Session

     底层基于Cookie，只是将Cookie存储的键值对内容变为了Session编号，拿到Cookie后去服务器中寻找对应Session编号的历史操作

     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260701132126165.png" alt="image-20260701132126165" style="zoom:80%;" />

     - Session基本操作

       ![image-20260701132237501](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260701132237501.png)

       如图所示，通过HttpSesion中的setAttribute和getAttribute方法进行历史操作的存储与读取      tip：/s2接口中接收HttpServletRquest对象，并通过其getSession方法先找到Session才可以进行Session的读取

      

     - 优点：存储在服务器端，安全
     - 缺点：
       1. 当前服务器都是集群部署，通过负载均衡服务器转发到各个服务器，无法保证每次转发的服务器都一致，就无法保证可以读取到历史操作
       2. Cookie中的其他缺点

   

  3. 令牌技术 
     - 优点：**存储在客户端**
       1. 支持PC端、移动端
       2. 解决集群环境下的认证问题
       3. 减轻服务器端存储压力
     - 缺点：需要自己实现





- 统一拦截：过滤器Filter    拦截器Intercreptor

### JWT令牌

- JSON Web Token：定义了一种简洁的（可直接在请求头中传输）、自包含（可在JWT令牌中自定义存储数据）的格式，用于通信双方以json数据格式安全的传输信息  — 即：将JSON数据格式进行了安全封装

- 组成

  ![image-20260701134349496](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260701134349496.png)

  三部分之间用  .  分割

  第一部分存储的是编码（加密）算法

  第二部分存储的是数据

  第三部分存储的是**基于前两部分**生成的独一无二的令牌

- 场景：登录认证
  1. 第一次登陆成功后，**生成令牌**
  2. 后续每个请求都携带JWT令牌，系统在每次请求处理前，先**校验令牌**，若校验成功则放行

- 操作

  1. 引入依赖

     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260701135110629.png" alt="image-20260701135110629" style="zoom:50%;" /> 

  2. 调用API实现令牌的生成和校验

     生成

     ![image-20260701140020916](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260701140020916.png)

     解析

     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260701140921412.png" alt="image-20260701140921412" style="zoom:50%;" />

- 案例集成

  登录后下发令牌（封装在Result中返回给前端）

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260701142512186.png" alt="image-20260701142512186" style="zoom:50%;" />

  ![image-20260701142452631](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260701142452631.png)

  如图所示，登陆成功后jwt令牌会被存储在浏览器本地

  



### 过滤器

<img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260701142833690.png" alt="image-20260701142833690" style="zoom:50%;" /> 

将所有请求拦截下来检验JWT

- 快速入门

  1. 定义Filter：定义一个类，**实现Filter接口**，并重写其方法

     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260701144745560.png" alt="image-20260701144745560" style="zoom:50%;" />

  2. 配置Filter：加上**@WebFilter**注解，配置拦截资源的路径。启动类上加**@ServletComponentScan**开启Servlet组件支持

     ![image-20260701144756600](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260701144756600.png)

- 详细

  1. 执行流程

     拦截request –> 检验 –>放行request –> 拦截response–>一些操作–>放行response

     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260701145214571.png" alt="image-20260701145214571" style="zoom:50%;" />

     放行方法：**chain.doFilter(request,response)**

   

  2. 拦截路径

     Filter可以根据需求，配置不同拦截资源路径

     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260701145558195.png" alt="image-20260701145558195" style="zoom:50%;" />

  

  3. 过滤器链

     一个web程序中可以有多个过滤器，多个过滤器形成了一个过滤器链

     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260701145728921.png" alt="image-20260701145728921" style="zoom:50%;" />

     具有多个Filter时，会按照字典序排序，字典序小的Filter类会排在前面，优先拦截

     

- 项目集成

  创建一个Filter，加上检验逻辑

  - 登录请求外的所有请求都需校验令牌
  - 有令牌且令牌合法放行，非法返回错误信息

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260701150635652.png" alt="image-20260701150635652" style="zoom: 67%;" />

  ```java
  package xinja.project.tlias.filter;
  
  
  import com.alibaba.fastjson.JSONObject;
  import io.jsonwebtoken.*;
  import jakarta.servlet.*;
  import jakarta.servlet.annotation.WebFilter;
  import jakarta.servlet.http.HttpServlet;
  import jakarta.servlet.http.HttpServletRequest;
  import jakarta.servlet.http.HttpServletResponse;
  import lombok.extern.slf4j.Slf4j;
  import xinja.project.tlias.pojo.Result;
  
  
  import java.io.IOException;
  @Slf4j
  @WebFilter(urlPatterns = "/*")//拦截所有请求路径的请求
  public class LoginCheckFilter implements jakarta.servlet.Filter {
      @Override
      public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
          //强转
          HttpServletRequest req = (HttpServletRequest) request;
          HttpServletResponse resp = (HttpServletResponse) response;
  
          //1.获取url
          String url = req.getRequestURL().toString();
          //2.若包含login，则放行
          if(url.contains("login")){
              log.info("login,放行");
              chain.doFilter(request,response);
              return;
          }
          //3.否则，获取请求头token
          else {
              String jwt = req.getHeader("token");
  
              //jwt不存在
              if (jwt == null || jwt.length() == 0) {
                  log.info("jwt不存在");
                  Result notLogin = Result.error("NOT_LOGIN");
                  //controller会将对象自动转换为JSON，此处需要手动转换
                  //使用Ali的fastjson依赖
                  String res = JSONObject.toJSONString(notLogin);
  
                  //通过resp响应数据
                  resp.getWriter().write(res);
                  return;
              }
  
              //jwt存在，检验
              try {
                  Jwts.parser().setSigningKey("xin").parseClaimsJws(jwt);
                  //令牌解析失败会报错，所以用try catch包裹
              } catch (ExpiredJwtException e) {
                  log.info("解析令牌失败");
                  Result notLogin = Result.error("NOT_LOGIN");
                  //controller会将对象自动转换为JSON，此处需要手动转换
                  //使用Ali的fastjson依赖
                  String res = JSONObject.toJSONString(notLogin);
  
                  //通过resp响应数据
                  resp.getWriter().write(res);
                  return;
              }
  
              log.info("令牌合法，放行");
              chain.doFilter(request,response);
  
          }
  
      }
  }
  
  ```

  

### 拦截器

![image-20260701154918718](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260701154918718.png)

- 快速入门

  1. 定义拦截器，实现HandlerInterceptor，并重写其方法

     ![image-20260701155059769](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260701155059769.png)

  2. 注册拦截器

     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260701155658158.png" alt="image-20260701155658158" style="zoom:50%;" />

- 详解

  - 拦截路径：拦截器不仅可以指定要拦截哪些路径（addPathPatterns），还可以指定哪些路径不拦截（excludePathPatterns）

    ![image-20260701155927836](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260701155927836.png)

    ![image-20260701155942210](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260701155942210.png)

   

  - 执行流程（与过滤器一同比较）

    - 过滤器流程

      <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260701160414989.png" alt="image-20260701160414989" style="zoom:50%;" />

      请求会直接到达Filter，放行后进入后端服务器

      

    - 加上拦截器的流程

      拦截器为SpringBoot提供，所以通过过滤器后会进入SpringBoot环境中，拦截器的位置位于前端控制器和Controller之间，所以拦截器是用于控制请求能否进入Controller的

      ![image-20260701160558462](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260701160558462.png)

    

    - 二者对比

      ![image-20260701160724666](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260701160724666.png)

    

- 项目集成

  逻辑和过滤器完全一致，应该定义在**preHandle**中



## 异常处理

![image-20260701161533550](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260701161533550.png)

- 处理方案

  1. 所有方法都加try catch   —  不现实，且臃肿

  2. 全局异常处理器  — 简单便捷

     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260701161746461.png" alt="image-20260701161746461" style="zoom:50%;" /> 

     若出现异常直接抛入全局异常处理器

- 全局异常处理器

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260701162226511.png" alt="image-20260701162226511" style="zoom:50%;" />

## 事务管理

- 原先删除部门的SQL语句并不完善，部门表与员工表是一对多的关系，删除某部门后，该部门的所有员工也应该删除

  为了防止二表数据出现不一致，所以可以使用事务管理

- 我们无需在SQL语句上自己编写事务的逻辑，SpringBoot中提供了**@Transctional**注解用于开启事务

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260701173911375.png" alt="image-20260701173911375" style="zoom:50%;" />

  - 除此之外，可以在appropriate.yml配置文件中开启Spring事务管理日志方便查看事务执行情况

    ![image-20260701174323305](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260701174323305.png)

- 演示

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260701174932733.png" alt="image-20260701174932733" style="zoom:50%;" /> 手动制造异常

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260701174946773.png" alt="image-20260701174946773" style="zoom:50%;" /> rollback日志

- 正常情况下，只有RuntimeException（运行时异常）才会回滚，可以使用runbackFor属性控制出现何种异常时回滚事务

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260701175640696.png" alt="image-20260701175640696" style="zoom:50%;" /> 

  如此一来出现何种异常都会事务回滚了

- 事务的传播行为：指的是一个**事务方法A被另一个事务方法B调用时**，  **A应该加入到事务B中还是独立于事务B呢**？—  可以使用 **peopagation属性控制**

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javaweb/image-20260701175841859.png" alt="image-20260701175841859" style="zoom:50%;" /> 



