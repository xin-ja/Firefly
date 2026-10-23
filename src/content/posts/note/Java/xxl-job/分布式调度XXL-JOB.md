---

title: xxl-job

published: 2026-10-23

description: xxl-job

tags: [xxl-job]

category: xxl-job

draft: false

---

# 分布式调度XXL-JOB

> 任务调度即**定时任务**

## 1.概述

- 为什么需要分布式调度？

  Spring中提供的@Scheduled也能实现调度功能。

  ```java
  //1.在启动类上写上@EnableScheduling
  
  //2.写定时任务
  @Scheduled(cron = "0/20 * * * * ?")
  public void doWork(){
      //doSth.
  }
  ```

  但是这个调度方法只适用于单机，在集群下有以下问题

  1. 无法实现集群状态下的高可用
  2. 在集群状态下若给每一台服务器都加上@Scheduled注解会导致任务的重复执行



- XXL-JOB介绍

  大众点评开源的分布式任务调度平台，是一个轻量级的分布式任务调度平台。

  - 架构图

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/xxl-job/image-20261023175956968.png" alt="image-20261023175956968" style="zoom: 33%;" />

    调度中心是一套独立的程序，也可以称为**注册中心。**

    执行器是业务程序中的XXL-JOB客户端，需要配置调度中心的IP地址，去**调度中心注册**

---

## 2.快速入门

### 2.1任务调度器

1. 去GitHub下载源码

2. 初始化调度数据库

   源码文件中会有一个`/xxl-job/doc/db/tables_xxl_job.sql`脚本，执行该脚本创建任务调度数据库

3. 编译源码

   使用IDEA打开源码并编译，使得其依赖被拉取

4. 配置部署调度中心

   修改`xxl-job-admin`模块中的`application.properties`，将数据库账号密码配置上

   ```properties
   spring.datasource.url=jdbc:mysql://127.0.0.1:3306/xxl_job?useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai
   spring.datasource.username=root
   spring.datasource.password=你的密码
   # 访问路径
   server.port=8080
   server.servlet.context-path=/xxl-job-admin
   ```

5. 运行程序，开启`XXlJobAdminApplication`。访问`localhost:8080/xxl-job-admin`。登陆账号`admin`，密码`123456`

---

### 2.2执行器

1. 添加Maven依赖

   ```xml
   <dependency>
       <groupId>com.xuxueli</groupId>
       <artifactId>xxl-job-core</artifactId>
       <version>2.5.0</version>
   </dependency>
   ```

2. 在`application.yml`中添加

   ```yaml
   xxl:
     job:
       admin:
         addresses: http://127.0.0.1:8080/xxl-job-admin  # 调度中心ip+端口
       access-token: default_token #token用于注册时的身份校验
       executor:
         appname: demo-executor  # 执行器名称，注册分组标识
         ip: # 为空自动获取本机IP
         port: 9999 # 执行器服务端口，单机多实例要不同端口
         logpath: ../logs/xxl-job
         logretentiondays: 30
   ```

3. 添加XXL-JOB的配置类

   ```java
   @Configuration
   public class XxlJobConfig {
       @Value("${xxl.job.admin.addresses}")
       private String adminAddresses;
       @Value("${xxl.job.access-token}")
       private String accessToken;
       @Value("${xxl.job.executor.appname}")
       private String appname;
       @Value("${xxl.job.executor.port}")
       private int port;
       @Value("${xxl.job.executor.logpath}")
       private String logPath;
       @Value("${xxl.job.executor.logretentiondays}")
       private int logRetentionDays;
   
       @Bean
       public XxlJobSpringExecutor xxlJobExecutor() {
           XxlJobSpringExecutor executor = new XxlJobSpringExecutor();
           executor.setAdminAddresses(adminAddresses);
           executor.setAccessToken(accessToken);
           executor.setAppname(appname);
           executor.setPort(port);
           executor.setLogPath(logPath);
           executor.setLogRetentionDays(logRetentionDays);
           return executor;
       }
   }
   
   ```

4. 编写任务处理类

   ```java
   @Component
   public class SimpleXxlJob{
       @XxlJob("demoJobHandler")
       public void demoJobHandler(){
           System.out.println("执行任务");
       }
   }
   ```

5. 在`localhost:8080/xxl-job-admin`的执行器管理中配置任务调度的时间等

   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/xxl-job/image-20261023183159044.png" alt="image-20261023183159044" style="zoom:33%;" />

---

## 3.GLUE模式

- 示意图

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/xxl-job/image-20261023183327683.png" alt="image-20261023183327683" style="zoom:50%;" />

  默认模式为Bean，调度器会寻找@XxlJob(“name”)注解所标注的name并执行对应任务

  GLUE模式可以**实现任务的热更新**。在选中GLUE模式后，**直接点击编辑GLUE**，在里面写上一段调用对应任务的代码即可，如下所示

  ```java
  package com.xxl.job.service.handler;
  
  import cn.wolfcode.xxljobdemo.service.HelloService;
  import com.xxl.job.core.handler.IJobHandler;
  import org.springframework.beans.factory.annotation.Autowired;
  
  public class DemoGlueJobHandler extends IJobHandler {
      @Autowired
      private HelloService helloService;
      @Override
      public void execute() throws Exception {
          helloService.methodA();
      }
  }
  ```

---

## 4.集群模式下的负载均衡策略

- 直接在任务调度平台上可以对任务进行负载均衡的编辑

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/xxl-job/image-20261023184324086.png" alt="image-20261023184324086" style="zoom: 80%;" />

  



- 分片广播

  当任务数量很多时，可以对执行器集群进行分片（shard），并将任务交由集群并行执行

  1. 在调度器平台中开启分片广播

     开启分片广播后，调度器会向所有执行器发布任务。并将分片参数也一起发送，执行器们就可以通过分片参数计算得到自己要处理的数据是哪些。如此一来就通过分片实现了并行执行

  2. 在执行器业务代码中编写分片逻辑

     ```java
     @Component
     public class SimpleShardingJob {
         /**
          * JobHandler名称：simpleShardingHandler（后台任务页面填写这个名字）
          */
         @XxlJob("simpleShardingHandler")
         public void simpleShardingTask() throws Exception {
             // ========== 核心：获取分片参数 ==========
             int shardIndex = XxlJobHelper.getShardIndex();//当前执行器编号
             int shardTotal = XxlJobHelper.getShardTotal();//执行器数量
     
            	//假设业务是处理1-2000共两千条数据
             //执行器就可以通过 id % shardTotal == shardIndex 判断某条数据是否该由自己执行
         }
     }
     ```



