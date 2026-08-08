---

title: JDBC

published: 2026-08-08

description: JDBC

tags: [ JDBC]

category: JDBC

draft: false

---

# JDBC

## 简介

**J**ava **D**ATa**B**ase **C**onnectivity，Java语言用于操作关系型数据库的一套API。通过JDBC可以操作不同的关系型数据库，JDBC的本质是一套标准接口，对于每一个数据库需要有自己的**实现类**

<img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/jdbc/image-20260627095427670.png" alt="image-20260627095427670" style="zoom:50%;" />

- 优点：Java提供一套标准接口，各厂商对其进行实现类编写，导入jar包即可使用。统一规范

---



## 快速入门

- 步骤

  1. 创建工程，导入驱动jar包

  2. 注册驱动

     ```java
     Class.forName("com.mysql.jdbc.Driver");
     //MySQL8以上的版本
     Class.forName("com.mysql.cj.jdbc.Driver");
     ```

  3. 获取连接

     ```java
     Connection conn = DriverManager.getConnection(url,username,password);
     ```

  4. 定义SQL语句

     ```java
     String sql = "insert/update...";
     ```

  5. 获取SQL对象

     ```java
     Statement stmt = conn.createStatement();
     ```

  6. 执行SQL

     ```java
     stmt.executeUpdate(sql);
     ```

  7. 处理返回结果

  8. 释放资源

---



## API详解

### 1. DriverManager（驱动管理类）

- 作用

  1. 注册驱动

     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/jdbc/image-20260627103233200.png" alt="image-20260627103233200" style="zoom:50%;" />

     使用Class.forName加载驱动时 Driver类的底层会有一个静态代码块自动调用DriverManager

     **tip：MySQL5后的驱动，可以不写注册驱动这个步骤**

  2. 数据库连接

     获取连接：**static getConnection(url,username,password)**

     - url

       ```java
       jdbc:mysql://ip:端口号/数据库名称？参数键值对1&参数键值对2
       ```

       若连接的是本机的MySQL  ip：端口号可省略  简写为

       jabc:mysql**///**数据库名

 

### 2.Connection（数据库连接对象）

- 作用

  1. 获取执行SQL的对象

     - 普通执行对象

       ```java
       Statement createStatement();
       ```

       <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/jdbc/image-20260627104051005.png" alt="image-20260627104051005" style="zoom:50%;" />

     - 预编译SQL的执行SQL对象：防SQL注入

       ```java
       PreparedStatement  preparedStatement(sql);
       ```

     - 执行存储过程的对象

       ```java
       CallableStatement prepareCall(sql);
       ```

       

  2. 管理事务

     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/jdbc/image-20260627104255086.png" alt="image-20260627104255086" style="zoom:50%;" />

     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/jdbc/image-20260627104642419.png" alt="image-20260627104642419" style="zoom:50%;" />

     配合try catch实现事物的回滚

### 3.Statement

- 作用

  执行SQL语句

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/jdbc/image-20260627104850505.png" alt="image-20260627104850505" style="zoom:50%;" /> 

  ResultSet是一个**集合**



### 4.ResultSet（结果集对象）

- 作用

  封装了DQL语句的结果

  - 获取查询结果

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/jdbc/image-20260627105154501.png" alt="image-20260627105154501" style="zoom:50%;" /> 

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/jdbc/image-20260627105558399.png" alt="image-20260627105558399" style="zoom:50%;" /> 

    tip：除了通过Label（字段名）获取，还可以通过columnindex（列索引）获取



### 5.PreparedStatement

- 作用

  预编译SQL语句并执行，防SQL注入

  - SQL注入

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/jdbc/image-20260627110408737.png" alt="image-20260627110408737" style="zoom:50%;" />

    输入密码时通过‘1’=‘1’来保证表达式的永真

   

  - 步骤

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/jdbc/image-20260627110535671.png" alt="image-20260627110535671" style="zoom:50%;" /> 

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/jdbc/image-20260627110836144.png" alt="image-20260627110836144" style="zoom: 80%;" /> 

   

  - 原理

    1. 防SQL注入原理

       对传入的数据进行了处理，将敏感的字符集**转义** ，如：转义‘1’=‘1’中的‘  如此一来其就会变成文本被解读
    
    2. 对SQL进行预编译，**性能更高**
    
       <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/jdbc/image-20260627112302878.png" alt="image-20260627112302878" style="zoom:50%;" />
    
       在Java运行直接对SQL语法进行预编译，**省去了MySQL检查语法与编译SQL 的时间**
    
    ![image-20260627112458735](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/jdbc/image-20260627112458735.png)
  
   
  
  - 预编译功能的开启
  
    ![image-20260627112537920](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/jdbc/image-20260627112537920.png)
  
    tip：第二步用于开启慢查询日志，用于演示预编译功能
  
  ---
  
  

## 数据库连接池

### 简介

<img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/jdbc/image-20260627114501063.png" alt="image-20260627114501063" style="zoom:50%;" /> 

类似线程池，可以实现Connection对象的复用，防止资源的浪费

### 实现

<img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/jdbc/image-20260627114714110.png" alt="image-20260627114714110" style="zoom:50%;" /> 

- Druid使用步骤

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/jdbc/image-20260627114832317.png" alt="image-20260627114832317" style="zoom:50%;" /> 





