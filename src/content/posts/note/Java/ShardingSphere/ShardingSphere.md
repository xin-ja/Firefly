---

title: ShardingSphere

published: 2026-10-23

description: ShardingSphere

tags: [ShardingSphere]

category: ShardingSphere

draft: false

---

# ShardingSphere

## 1.高性能架构模式

> 当海量用户访问服务器时，单台数据库服务器难以满足业务需求时，需要考虑**数据库集群的方式来提升性能**。高性能数据库集群有两种方式：**读写分离与数据库分片**

---

### 1.1读写分离

基于数据库主从架构，主机负责写入操作。从机从主机复制数据达到数据同步的效果，从机负责读操作

常常是一主多从（业务通常读多写少）

- CAP定理

  又称布鲁尔定理，在分布式系统中，当**涉及到读写操作时**，只能保证**一致性（Consistency）、可用性（Availability）、分区容错性（Partition Tolerance）**中的**两个**

  我们**只能从CP或AP中选择**

  详见：[MicroService](C:\Users\Xinja\Desktop\workspace\Java\MicroService\MicroServices.md)

---

### 1.2数据库分片

> 读写分离分散了数据库读写操作的压力，但无法解决数据库的存储压力
>
> 首先要明确的是：**分片是提前预防！**是预估某个业务的数据量会很多，所以提前对其进行分片，这样一来哪怕后面数据量很多也可以适当缓解。而不是等到数据量很多了再去分片

- 数据分片

  将**存放在单一数据库中的数据分散存储到多台服务器中**。数据库分片的有效手段是对关系型数据库进行`分库分表`。数据分片的拆分方式又分为`垂直分片和水平分片`



1. 垂直分片

   - 垂直分库

     核心理念是**专库专用**，将同一个业务的表存入同个数据库

     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/shardingsphere/image-20261022183348106.png" alt="image-20261022183348106" style="zoom: 25%;" />

     垂直分片虽然可以缓解数据量和访问量带来的问题，但**无法根治** — 当单表数据量过大时，查询操作仍然非常耗时（还会面临深分页等问题）

   - 垂直分表

     适用于**数据行数不多**，但是**表的字段很多/表的字段占用磁盘空间很大**。

     对表进行纵向拆分，将字段拆分开来。如：表A有`a、b、c、d、e、f、g`字段，其中a是主键。那么可以将其垂直拆分为`a、b、c`和`a、d、e、f、g`两张表（第二张表的a作为逻辑外键，使得两张表关联起来，如此一来查询的时候可以通过a查询到d、e、f、g）

2. 水平分片

   又称横向拆分，当单表行数很大时，可以**横向对表进行拆分。字段保持完整**

   - 拆分后如何进行路由？

     假设现在将表A拆分成了表B和表C，表B在数据库1，表C在数据库2。我们可以根据`id%2`的结果进行路由，当`id%2==1`时就路由到数据库1；`id%2==0`就路由到数据库2

   > 水平分表：当对表进行水平分片后，假设表A拆分成了B、C。若B、C存在同一台数据库服务器中可以满足业务要求，就不对其进行额外操作了
   >
   > 水平分库：若水平分片后存在一台服务器中仍然无法满足业务要求，可以考虑将拆分开的表存入不同的服务器中（不同的数据库中）

---

### 1.3高性能架构模式带来的问题

1. 对数据库进行分库分表的操作，如果手动操作的话非常麻烦

2. 当对数据库进行读写分离、分库分表后，表与表之间的关系就变得十分复杂。若仍去手动调用会非常麻烦

- 解决方法

  1. 程序封装

     在**数据访问层上进行封装**，使得我们的SQL可以直接被路由到对应的表上

     - 对应技术：ShardingSphere-JDBC

  2. 数据库封装

     使用**中间件**，`业务服务器 --> 中间件 --> 数据库`

     - 对应技术：Mycat、ShardingSphere-Proxy

  > ShardingSphere-JDBC是在业务代码中的数据访问层进行封装处理，因此只有Java程序可以进行操作
  >
  > Mycat、ShardingSphere-Proxy是**中间件**，是**独立于业务服务器的一套程序**，所有的语言都可以对其进行操作

---

## 2.Docker中MySQL主从的搭建

> 为了后续的学习，此处在Docker中搭建MySQL主从

### 2.1主服务器的搭建

1. 创建Master

   ```bash
   docker run -d \
   -p 3307:3306 \
   -v /atguigu/mysql/master/conf:/etc/mysql/conf.d \
   -v /atguigu/mysql/master/data:/var/lib/mysql \
   -e MYSQL_ROOT_PASSWORD=123456 \
   --name atguigu-mysql-master \
   mysql:8.0.29
   ```

   | 参数                                              | 含义                                                         |
   | ------------------------------------------------- | ------------------------------------------------------------ |
   | `-d`                                              | 后台守护进程运行容器                                         |
   | `-p 3307:3306`                                    | 端口映射：宿主机 3307 → 容器 3306                            |
   | `-v /atguigu/mysql/master/conf:/etc/mysql/conf.d` | 挂载配置目录：宿主机`/atguigu/mysql/master/conf` 映射到 mysql 容器的配置目录，放自定义 my.cnf |
   | `-v /atguigu/mysql/master/data:/var/lib/mysql`    | 挂载数据目录：数据库数据持久化到宿主机，删容器数据不会丢     |
   | `-e MYSQL_ROOT_PASSWORD=123456`                   | 设置 root 账号密码为 123456                                  |
   | `--name atguigu-mysql-master`                     | 容器名字，方便后续操作                                       |
   | `mysql:8.0.29`                                    | 使用 mysql8.0.29 镜像                                        |

2. 在宿主机上创建`/atguigu/mysql/master/conf/my.cnf`配置文件。用于映射Master容器的MySQL配置

   ```bash
   vim /atguigu/mysql/master/conf/my.cnf
   ```

   - 配置内容如下

     ```ini
     [mysqld]
     # 服务器唯一id，主库写1，从库不能等于1
     server-id=1
     # 设置日志格式，STATEMENT：记录SQL语句；ROW：记录行变更（MySQL8默认ROW）
     binlog_format=STATEMENT
     # 开启二进制日志（注释去掉，启用binlog，主从复制必须开启）
     log-bin=binlog
     # 设置需要复制的数据库，默认复制全部数据库
     #binlog-do-db=mytestdb
     # 设置不需要复制的数据库
     #binlog-ignore-db=mysql
     #binlog-ignore-db=infomation_schema
     ```

3. 重启Master容器

   ```bash
   docker restart atgugigu-mysql-master
   ```

4. 进入Master容器测试

   ```bash
   # 进入mysql主容器，设置字符集防止中文乱码
   docker exec -it atguigu-mysql-master env LANG=C.UTF-8 /bin/bash
   ```

   ```sql
   # 在容器内部，登录mysql客户端
   mysql -uroot -p
   # 修改root账号的密码认证插件
   ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '123456';
   ```

5. 在Master容器中创建slave用户

   ```sql
   -- 创建slave用户 atguigu_slave，允许任意IP连接
   CREATE USER 'atguigu_slave'@'%';
   
   -- 设置密码，指定mysql_native_password认证方式，密码123456
   ALTER USER 'atguigu_slave'@'%' IDENTIFIED WITH mysql_native_password BY '123456';
   
   -- 授予主从复制权限，只给REPLICATION SLAVE权限（最小权限原则）
   GRANT REPLICATION SLAVE ON *.* TO 'atguigu_slave'@'%';
   
   -- 刷新权限，让配置立即生效
   FLUSH PRIVILEGES;
   ```

6. 查询Master的状态

   ```sql
   SHOW MASTER STATUS;
   ```

   ![image-20261022193432030](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/shardingsphere/image-20261022193432030.png)

   记录下**binlog、Position**的值，后续主从复制从这开始

---

### 2.2从服务器的搭建

> 我们搭建的是一主双从的结构

1. 创建slave1

   ```bash
   docker run -d \
   -p 3308:3306 \
   -v /atguigu/mysql/slave1/conf:/etc/mysql/conf.d \
   -v /atguigu/mysql/slave1/data:/var/lib/mysql \
   -e MYSQL_ROOT_PASSWORD=123456 \
   --name atguigu-mysql-slave1 \
   mysql:8.0.29
   ```

2. 创建宿主机中的映射配置文件

   ```bash
   vim /atguigu/mysql/slave1/conf/my.cnf
   ```

   ```ini
   [mysqld]
   # 服务器唯一id，每台服务器的id必须不同，如果配置其他从机，注意修改id
   server-id=2
   # 中继日志名，默认xxxxxxxxxxxx-relay-bin
   #relay-log=relay-bin
   ```

3. 重启从服务器并测试

   ```bash
   docker restart atguigu-mysql-slave1
   ```

   ```bash
   # 进入mysql主容器，设置字符集防止中文乱码
   docker exec -it atguigu-mysql-slave1 env LANG=C.UTF-8 /bin/bash
   ```

   ```sql
   # 在容器内部，登录mysql客户端
   mysql -uroot -p
   # 修改root账号的密码认证插件
   ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '123456';
   ```

4. 在从机中配置主从关系

   ```sql
   CHANGE MASTER TO MASTER_HOST='172.27.218.24',  #Linux虚拟机的IP地址，此处是WSL的IP地址，在docker中若使用“127.0.0.1”会指向容器自己
   MASTER_USER='atguigu_slave', MASTER_PASSWORD='123456', MASTER_PORT=3307, # 前面创建的访问账号
   MASTER_LOG_FILE='binlog.000003', MASTER_LOG_POS=1993;
   ```

5. 同理创建slave2  此处略

6. 开启主从复制

   在两台从服务器中执行

   ```sql
   START SLAVE;
   ```

---

### 2.3停止与重置

```sql
STOP SLAVE; #停止主从复制
RESET SLAVE ALL;  #重置主从复制的配置
```

---

## 3.ShardingSphere-JDBC

> 轻量级的Java框架，在Java的**JDBC层提供额外的服务**。它使用客户端直连数据库，以jar包的形式提供服务。
>
> 可以理解为**增强版的JDBC**，可以对分库分表后的数据库进行操作。完全兼容JDBC和各种ORM框架（Mybatis）

---

### 3.1读写分离

- 配置

  ```properties
  # 配置真实数据源
  spring.shardingsphere.datasource.names=master,slave1,slave2
  
  # 配置第 1 个数据源
  spring.shardingsphere.datasource.master.type=com.zaxxer.hikari.HikariDataSource
  spring.shardingsphere.datasource.master.driver-class-name=com.mysql.jdbc.Driver
  spring.shardingsphere.datasource.master.jdbc-url=jdbc:mysql://172.27.218.24:3307/db_user
  spring.shardingsphere.datasource.master.username=root
  spring.shardingsphere.datasource.master.password=123456
  
  # 配置第 2 个数据源
  spring.shardingsphere.datasource.slave1.type=com.zaxxer.hikari.HikariDataSource
  spring.shardingsphere.datasource.slave1.driver-class-name=com.mysql.jdbc.Driver
  spring.shardingsphere.datasource.slave1.jdbc-url=jdbc:mysql://172.27.218.24:3308/db_user
  spring.shardingsphere.datasource.slave1.username=root
  spring.shardingsphere.datasource.slave1.password=123456
  
  # 配置第三个数据源
  spring.shardingsphere.datasource.slave2.type=com.zaxxer.hikari.HikariDataSource
  spring.shardingsphere.datasource.slave2.driver-class-name=com.mysql.jdbc.Driver
  spring.shardingsphere.datasource.slave2.jdbc-url=jdbc:mysql://172.27.218.24:3309/db_user
  spring.shardingsphere.datasource.slave2.username=root
  spring.shardingsphere.datasource.slave2.password=123456
  
  # 配置读写分离类型 （Static 、 Dynamic）
  # myds 表示该读写分离数据源的名字，就是master slave1 slave2三者共同组成了一个更高层的数据源
  # 往后myds也可以作为数据源被封装
  spring.shardingsphere.rules.readwrite-splitting.data-sources.myds.type= Static
  
  # 配置写库
  spring.shardingsphere.rules.readwrite-splitting.data-sources.myds.props.write-data-source-name=master
  
  # 配置读库
  spring.shardingsphere.rules.readwrite-splitting.data-sources.myds.props.read-data-source-names=slave1,slave2
  
  # 负载均衡算法名称
  spring.shardingsphere.rules.readwrite-splitting.data-sources.myds.load-balancer-name=alg_round
  
  # 负载均衡算法配置
  # 负载均衡算法类型
  spring.shardingsphere.rules.readwrite-splitting.load-balancers.alg_round.type=ROUND_ROBIN
  
  
  # 配置sql的打印输出
  spring.shardingsphere.props.sql-show=true
  ```



- 上述配置好后，数据库的CRUD操作与平时无异。ShardingSphere-JDBC会自动将操作路由到对应的库去（写操作master，读操作slave1、slave2轮询）。

  - 例外：@Transacational注解

    为了保证主从库间的事务一致性，避免跨服务的分布式事务。ShardingSphere-JDBC在处理事务时，**事务中的读写操作都会在主库中完成**

    > 原因：主从复制是异步的，若在一个事务当中写完数据就去从库中读，可能从库还未同步到主库新插入的数据。这样就会导致**读到脏数据**

    注意：在JUnit环境下进行测试时，即使没有发生异常，也会对事务进行回滚（测试回滚功能）

---

### 3.2垂直分片

> ShardingSphere不支持垂直分表，**只支持垂直分库**

#### 3.2.1场景搭建

![image-20261023105312102](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/shardingsphere/image-20261023105312102.png)

模拟两台数据库分布在两台不同的服务器（server-user、server-order）上

1. 创建server-user容器

   ```bash
   docker run -d \
   -p 3301:3306 \
   -v /atguigu/server/user/conf:/etc/mysql/conf.d \
   -v /atguigu/server/user/data:/var/lib/mysql \
   -e MYSQL_ROOT_PASSWORD=123456 \
   --name server-user \
   mysql:8.0.29
   ```

2. 登陆MySQL服务器

   ```bash
   docker exec -it server-user env LANG=C.UTF-8 /bin/bash #进入容器
   
   mysql -u root -p #登陆MySQL
   ```

   ```sql
   # 修改root账号的密码认证插件
   ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '123456';
   ```

3. 创建数据库和表

   ```sql
   CREATE DATABASE db_user;
   USE db_user;
   CREATE TABLE t_user (
     id BIGINT AUTO_INCREMENT,
     uname VARCHAR(30),
     PRIMARY KEY (id)
   );
   ```

4. 相同方式创建server-order并完成初始化

   在这台服务器中创建db_order和order表

   ```sql
   CREATE DATABASE db_order;
   USE db_order;
   CREATE TABLE t_order (
     id BIGINT AUTO_INCREMENT,
     order_no VARCHAR(30),
     user_id BIGINT,
     amount DECIMAL(10,2),
     PRIMARY KEY(id)
   );
   ```

---

#### 3.2.2配置

```properties
# 配置真实数据源
spring.shardingsphere.datasource.names=server-order,server-user

# 配置第 1 个数据源
spring.shardingsphere.datasource.server-user.type=com.zaxxer.hikari.HikariDataSource
spring.shardingsphere.datasource.server-user.driver-class-name=com.mysql.jdbc.Driver
spring.shardingsphere.datasource.server-user.jdbc-url=jdbc:mysql://172.27.218.24:3301/db_user
spring.shardingsphere.datasource.server-user.username=root
spring.shardingsphere.datasource.server-user.password=123456

# 配置第 2 个数据源
spring.shardingsphere.datasource.server-order.type=com.zaxxer.hikari.HikariDataSource
spring.shardingsphere.datasource.server-order.driver-class-name=com.mysql.jdbc.Driver
spring.shardingsphere.datasource.server-order.jdbc-url=jdbc:mysql://172.27.218.24:3302/db_order
spring.shardingsphere.datasource.server-order.username=root
spring.shardingsphere.datasource.server-order.password=123456

# 垂直分库配置
# 标准分片表配置
# 由数据源名 + 表名组成，以小数点分隔。多个表以逗号分隔，支持 inline 表表达式。
# 缺省表示使用已知数据源与逻辑表名称生成数据节点，用于广播表（即每个库中都需要一个同样的表用于关联查询，多为字典表）或只分库不分表且所有库的表结构完全一致的情况
# actual-data-nodes = 数据库+表名  <table-name>:逻辑表名，即Java程序中实体类对应的表名(t_user\t_order)
spring.shardingsphere.rules.sharding.tables.t_user.actual-data-nodes=server-user.t_user
spring.shardingsphere.rules.sharding.tables.t_order.actual-data-nodes=server-order.t_order
# 如此一来，将逻辑表和真实的表进行了映射，当我们对逻辑表进行CRUD时，ShardingSphere就会把请求路由到指定服务器的对应数据库的表中
```

---

#### 3.2.3测试

```java
    @Test
    public void testInsertOrderAndUser(){
        User user = new User();
        user.setUname("翠花");
        userMapper.insert(user);

        Order order = new Order();
        order.setOrderNo("XINJA001");
        order.setUserId(user.getId());
        order.setAmount(new BigDecimal(100));
        orderMapper.insert(order);
    }
```

如上。由于`User`类对应逻辑表`t_user`，而这张逻辑表又被映射到了`server-user.t_user`这个数据节点上。所以对User进行操作时，最后都会被路由到`server-user.t_user`。`Order`同理

---

### 3.3水平分片

#### 3.3.1场景搭建

<img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/shardingsphere/image-20261023112730415.png" alt="image-20261023112730415" style="zoom:50%;" />

> 假设order表过大，要将其水平分片。分片到`server-oeder0`中的`t_order0、t_order1`和`server-order1`中的`t_order0、t_order1` 共分为四张表

1. 创建server-order0容器

   ```bash
   docker run -d \
   -p 3310:3306 \
   -v /atguigu/server/order0/conf:/etc/mysql/conf.d \
   -v /atguigu/server/order0/data:/var/lib/mysql \
   -e MYSQL_ROOT_PASSWORD=123456 \
   --name server-order0 \
   mysql:8.0.29
   ```

2. 登陆该容器并进行初始化

   ```bash
   docker exec -it server-order0 env LANG=C.UTF-8 /bin/bash #进入容器
   
   mysql -u root -p #登陆MySQL
   ```

   ```sql
   # 修改root账号的密码认证插件
   ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '123456';
   ```

3. 初始化数据库和表

   ```sql
   CREATE DATABASE db_order;
   USE db_order;
   CREATE TABLE t_order0 (
     id BIGINT,
     order_no VARCHAR(30),
     user_id BIGINT,
     amount DECIMAL(10,2),
     PRIMARY KEY(id)
   );
   CREATE TABLE t_order1 (
     id BIGINT,
     order_no VARCHAR(30),
     user_id BIGINT,
     amount DECIMAL(10,2),
     PRIMARY KEY(id)
   );
   ```

4. server-order1同理

---

#### 3.3.2配置

> 注意：对表进行水平分片后，不能再用自增ID了。因为每张表是独立的，如果使用自增ID的话分表之间的ID会重复，不是全局唯一的，只是我们逻辑上将其连起来了。所以对于水平分片的表，我们需要有**全局唯一的ID（雪花算法）**

```properties
# -------------------------------------------------数据源配置
spring.shardingsphere.datasource.names=server-order0,server-order1,server-user

# 配置第 1 个数据源
spring.shardingsphere.datasource.server-user.type=com.zaxxer.hikari.HikariDataSource
spring.shardingsphere.datasource.server-user.driver-class-name=com.mysql.jdbc.Driver
spring.shardingsphere.datasource.server-user.jdbc-url=jdbc:mysql://172.27.218.24:3301/db_user
spring.shardingsphere.datasource.server-user.username=root
spring.shardingsphere.datasource.server-user.password=123456

# 配置第 2 个数据源
spring.shardingsphere.datasource.server-order0.type=com.zaxxer.hikari.HikariDataSource
spring.shardingsphere.datasource.server-order0.driver-class-name=com.mysql.jdbc.Driver
spring.shardingsphere.datasource.server-order0.jdbc-url=jdbc:mysql://172.27.218.24:3310/db_order
spring.shardingsphere.datasource.server-order0.username=root
spring.shardingsphere.datasource.server-order0.password=123456

# 配置第 3 个数据源
spring.shardingsphere.datasource.server-order1.type=com.zaxxer.hikari.HikariDataSource
spring.shardingsphere.datasource.server-order1.driver-class-name=com.mysql.jdbc.Driver
spring.shardingsphere.datasource.server-order1.jdbc-url=jdbc:mysql://172.27.218.24:3311/db_order
spring.shardingsphere.datasource.server-order1.username=root
spring.shardingsphere.datasource.server-order1.password=123456


# -------------------------------------------------标准分片表配置（数据节点配置）
spring.shardingsphere.rules.sharding.tables.t_user.actual-data-nodes=server-user.t_user

# spring.shardingsphere.rules.sharding.tables.t_order.actual-data-nodes=server-order0.t_order0,server-order0.t_order1,server-order1.t_order0,server-order1.t_order1
# 可以简化为 inline表达式  如下
spring.shardingsphere.rules.sharding.tables.t_order.actual-data-nodes=server-order$->{0..1}.t_order$->{0..1}


# -------------------------------------------------分库策略，缺省表示使用默认分库策略，以下的分片策略只能选其一
# 用于单分片键的标准分片场景

# 分片列名称
spring.shardingsphere.rules.sharding.tables.t_order.database-strategy.standard.sharding-column=user_id
# 分片算法名称
#spring.shardingsphere.rules.sharding.tables.t_order.database-strategy.standard.sharding-algorithm-name=alg_inline_userid
spring.shardingsphere.rules.sharding.tables.t_order.database-strategy.standard.sharding-algorithm-name=alg_mod

# -------------------------------------------------分表策略
# 用于单分片键的标准分片场景

# 分片列名称
spring.shardingsphere.rules.sharding.tables.t_order.table-strategy.standard.sharding-column=order_no
# 分片算法名称
#spring.shardingsphere.rules.sharding.tables.t_order.database-strategy.standard.sharding-algorithm-name=alg_inline_userid
spring.shardingsphere.rules.sharding.tables.t_order.table-strategy.standard.sharding-algorithm-name=alg_hash_mod

# -------------------------------------------------分片算法配置

# 1.行表达式分片算法（自定义分片算法）
## 分片算法类型
#spring.shardingsphere.rules.sharding.sharding-algorithms.alg_inline_userid.type=INLINE
## 分片算法属性配置(自定义inline表达式)
#spring.shardingsphere.rules.sharding.sharding-algorithms.alg_inline_userid.props.algorithm-expression=server-order$->{user_id%2}

# 2.取模分片算法
spring.shardingsphere.rules.sharding.sharding-algorithms.alg_mod.type=MOD
# 取模的模数
spring.shardingsphere.rules.sharding.sharding-algorithms.alg_mod.props.sharding-count=2


# 3.哈希取模分片算法
spring.shardingsphere.rules.sharding.sharding-algorithms.alg_hash_mod.type=HASH_MOD
# 取模的模数
spring.shardingsphere.rules.sharding.sharding-algorithms.alg_hash_mod.props.sharding-count=2
```

---

#### 3.3.3水平分片下的多表联查问题

假设有`order`表和`order_detail`表都做了水平分片，那么有以下几个要注意的点

1. 二者的分片规则与分片键需要一致，如此一来分片后可以使得同一个order的相关数据存储在同一个服务器当中。避免了跨库查询
2. 当分片规则和分片键一致后，可以确定`order0`表中的order，其detail信息肯定会出现在`order_detail0`中。如此一来我们可以将`order0 \ order_detail0`做一个绑定，使得多表联查时不会产生笛卡尔积
   - 做绑定的键一定要是分片键
   - 多表联查时的条件需要是做了绑定的两个分片键，如此才不会产生笛卡尔积

---

### 3.4.广播表

广播表指的是所有分片数据源中都会存在的表，表结构及其数据在每个数据库中都是一致的。适用于数据量不大且需要与海量数据的表进行关联查询的场景  例如：字典表

- 特性
  - 插入、更新操作会实时在所有节点上执行，保持各个分片的数据一致性
  - 查询操作只从一个节点获取
  - 可以跟任何一个表进行JOIN操作



1. 创建广播表

   在server-order0、server-order1、server-user中都创建一份t_dict表

   ```sql
   CREATE TABLE t_dict(
       id BIGINT,
       dict_type VARCHAR(200),
       PRIMARY KEY(id)
   );
   ```

2. 创建实体类和Mapper

3. 配置

   ```properties
   spring.shardingsphere.rules.sharding.tables.t_dict.actual-data-nodes=server-order$->{0..1}.t_dict,server-user.t_dict
   spring.shardingsphere.rules.sharding.broadcast-tables[0]=t_dict
   ```



- 作用

  将那种与多个数据库中都有关系的表作为广播表，每个数据库中配置一张，如此就避免了跨库查询

---





















