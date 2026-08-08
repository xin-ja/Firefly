\---

title: Redis

published: 2026-08-08

description:  Redis

tags: [ Redis]

category:  Redis

draft: false

\---

# Redis

## 入门

### NoSQL

> 非关系型数据库

- 非结构化

  相较于SQL固定的图表形式，NoSQL数据库对数据结构并无较强约束

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260720105240344.png" alt="image-20260720105240344" style="zoom: 33%;" /> 

- 非关联

  相较于SQL中可以使用外键关联不同的表，NoSQL数据库中并不能（NoSQL中一般通过JSON文档嵌套的方式将数据全部存储起来）

- 查询语句非SQL

  相较于SQL中使用SQL语法进行查询，NoSQL数据库无法使用统一的SQL语法进行查询。不同的NoSQL数据库语法都有所不同

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260720105720884.png" alt="image-20260720105720884" style="zoom: 50%;" /> 

- 无法满足/只可基本满足 ACID

  NoSQL数据库无法实现关系型数据库中的事务特性

- 扩展性的不同

  SQL型数据库中的数据绑定太强，当数据过多时分库分表成本巨大。扩展性属于垂直扩展（换一台更强的服务器，若使用中间件进行分库分表会影响性能）

  NoSQL型数据库中的数据是通过Hash运算后存入相应结点。天生就实现了分库分表，若数据过多直接进行服务器集群即可。扩展性属于水平扩展

---

### Redis简介

> 远程词典服务器 — **键值型数据库**

- 特征
  1. 键值型（key-value）
  2. 单线程，每个命令具有原子性
  3. 低延迟、速度快（基于内存、IO多路复用、良好的编码）
  4. 支持数据持久化
  5. 支持主从集群、分片集群
  6. 支持多语言客户端

---

### Redis常见命令

- Redis的常见数据类型

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260720124248806.png" alt="image-20260720124248806" style="zoom:50%;" /> 


  #### Redis通用命令

  > 对任何的数据类型都适用的

  1. KEYS：查看符合模板的所有key （不建议在生产环境设备上使用）

     ```redis
     keys [pattern]
     pattern是redis内置的表达式 
     如：*代表任意多个字符
     ```

  2. DEL：删除指定key (返回值是成功删除的数量)

     ```redis
     del [keyname1] [keyname2] [keyname3] ...
     ```

  3. EXISTS：判断某个key是否存在

     ```redis
     exists [keyname]
     ```

  4. EXPIRE：为某个key设置一个有效期，有效期到期时该key会自动删除

     ```redis
     expire [keyname] [time(s)]
     ```

  5. TTL：查看某个key的剩余有效期

     ```redis
     ttl [keyname]
     #当某个key的ttl返回-2时，代表该key被删除
     #当某个key的ttl返回-1时，代表该数据永久有效
     ```


---

#### String命令

> 字符串类型，Redis中最简单的存储类型

- 根据字符串的格式不同，又可以分为三类

  1. string：普通字符串
  2. int：整数类型，可做自增、自减操作
  3. float：浮点类型，可做自增、自减操作

  不论是哪一种格式**底层都是字节数组形式存储**，只不过编码方式不同。字符串类型的最大空间不能超过512M

1. SET：添加**或修改**已经存在的一个string类型的数据

   ```redis
   set [keyname] [value]
   ```

2. GET：通过key取出value

   ```redis
   get [keyname]
   ```

3. MSET：批量添加多个String类型的键值对

   ```redis
   mset [keyname1] [value1]  [keyname2] [value2]... 
   ```

4. MGET：批量获取key的value

   ```redis
   mget [keyname1] [keyname2]...
   ```

5. INCR：让一个整型的key自增1

   ```redis
   incr [keyname]
   ```

6. INCRBY：让一个整型的key自增并指定步长

   ```redis
   incrby [keyname] [steplength]
   ```

7. INCRBYFLOAT：让一个浮点型的数据进行增长

   ```redis
   incrbyfloat [keyname] [steplength]
   ```

8. SETNX：添加一个string类型的键值对，前提是这个key不存在

   ```redis
   setnx [keyname] [value]
   #若这个keyname已经存在，则不执行
   ```

9. SETEX：添加一个string类型的键值对，并指定有效期

   ```redis
   setex [keyname] [time[s]] [value]
   ```

---

#### Hash类型

> 散列存储，其**value**是一个无需字典，类似Java中HashMap的结构

- string结构将对象序列化为JSON后再存储，当需要修改某个字段时非常不方便

  使用Hash类型存储对象时就可以**针对单个字段进行CRUD了**

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260720132300536.png" alt="image-20260720132300536" style="zoom:50%;" /> 

  

1. HSET

   ```redis
   hset [keyname] [field] [value]
   #一个key可以有多个field
   ```

2. HGET

   ```redis
   hget [keyname] [filed]
   ```

3. HMSET（批量设置**filed value**）

   ```redis
   hmset [keyname] [field1] [value1] [filed2] [value2]...
   ```

4. HMGET

   ```redis
   hmget [keyname] [field1] [field2] ...
   ```

5. HGETALL：获取一个key的所有的filed  value

   ```redis
   hgetall [keyname]
   ```

6. HKEYS：获取一个key中所有的field

   ```redis
   hkeys [keyname]
   ```

7. HVALS：获取一个key中的所有的value

   ```redis
   hvalues [keyname]
   ```

8. HINCRBY：让一格hash类型key的某个field按照指定步长自增

   ```redis
   hincrby [keyname] [fieldname] [steplength]
   ```

9. HSETNX：添加hash类型key的field字段，若不存在则不执行

   ```redis
   hsetnx [keyname] [fieldname] [value]
   ```

---

#### List类型

- 与Java中的LinkedList类似，可以看作是一个**双向链表**。支持正向检索和反向检索

- 特征
  1. 有序
  2. 元素可重复
  3. 插入删除快
  4. 查询速度慢

1. LPUSH：向列表左侧插入一个或多个元素

   ```redis
   lpush [keyname1] [element1] ...
   ```

2. LPOP：移除并返回列表左侧第一个元素，没有返回nil

   ```redis
   LPOP [keyname]
   ```

3. RPUSH：右侧插入

4. RPOP：右侧移除

5. LRANGE：返回一段索引范围内所有元素 **左闭右闭**

   ```redis
   lrange [keyname] [start] [end]
   ```

6. BLPOP、BRPOP：与LPOP和RPOP类似，只不过当元素不存在时会等待指定时长，而不是直接返回nil

   ```redis
   blpop [keyname1] [timeout1] ...
   ```

---

#### Set类型

- 类似Java中的HashSet，可以看作一个value为null的HashMap

- 特征
  1. 无序
  2. 元素不可重复
  3. 查找快
  4. 支持交集、并集、差集等功能

1. SADD：向set中添加一个或多个元素

   ```redis
   sadd [keyname] [member1] [member2] ...
   ```

2. SREM：移除set中的指定元素

   ```redis
   srem [keyname] [member1] [member2] ...
   ```

3. SCARD：返回set中的元素个数

   ```redis
   scard [keyname]
   ```

4. SISMEMBER：判断一个元素是否为某set的成员

   ```redis
   sismember [keyname] [member]
   ```

5. SMEMBERS：获取set中所有元素

   ```redis
   smembers [keyname]
   ```

6. SINTER：求交集

   ```redis
   sinter [keyname1] [keyname2] ...
   ```

7. SDIFF：求差集

   ```redis
   sdiff [keyname1] [keyname2] ...
   ```

   

8. SUNION：求并集

   ```redis
   sunion [keyname1] [keyname2] ...
   ```

---

#### SortedSet

- 可排序的set集合，每一个成员都有一个score属性，可以基于score属性对元素进行排序，底层的实现时一个调表（SkipList）加hash表

1. ZADD：添加一个或多个元素，若已存在则更新score的值

   ```redis
   zadd [keyname] [score1] [member1] ...
   ```

2. ZREM

   ```redis
   zrem [keyname] [member]
   ```

3. ZSCORE：获取指定元素的score值

   ```redis
   zscore [keyname] [member]
   ```

4. ZRANK：获取指定元素的排名

   ```redis
   zrank [keyname] [member]
   ```

5. ZCARD：获取集合中元素个数

   ```redis
   zcard [keyname]
   ```

6. ZCOUNT：获取指定score范围内的**元素个数**

   ```redis
   zcount [keyname] [min] [max]
   ```

7. ZINCRBY：让集合中指定元素按步长自增

   ```redis
   zincrby [keyname] [steplength] [member]
   ```

8. ZRANGE：按照score排名后，获取指定排名内的元素

   ```redis
   zrange [keyname] [min] [max]
   ```

9. ZRANGEBYSCORE：按score排序后，获取score范围内的**元素**

   ```redis
   zrangebyscore [keyname] [min] [max]
   ```

10. ZDIFF、ZINTER、ZUNION：差集、交集、并集

注意：排序默认是升序，若想要降序排序，**在Z后加上REV**即可  

---

### Key的层级格式

> Redis中的key允许有多个单词形成层级结构，多个单词之间**用‘：’隔开**

- 如项目名：xinja，有user和product两种不同的数据
  - user相关的key：xinja:user:1
  - product相关的key：xinja:product:1

- 若Value是一个对象，可以将对象序列化为JSON字符串后存储

  ![image-20260720131745366](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260720131745366.png)

---

### Redis的Java客户端

#### Jedis

- 命令与Redis中的命令一致，但是Jedis实例线程不安全

- 快速入门

  1. 引入Jedis依赖

     ```xml
     <dependency>
         <groupId>redis.clients</groupId>
         <artifactId>jedis</artifactId>
         <version>7.2.0</version>
     </dependency>
     ```

  2. 建立连接

     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260720143319750.png" alt="image-20260720143319750" style="zoom: 80%;" /> 

  3. 使用Jedis操作

     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260720143507304.png" alt="image-20260720143507304" style="zoom: 80%;" /> 

  4. 释放资源

     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260720143528302.png" alt="image-20260720143528302" style="zoom: 80%;" /> 

- Jedis连接池

  Jedis本身线程不安全，在多线程的环境下推荐使用线程池为每一个线程提供独立的Jedis对象

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260720144521471.png" alt="image-20260720144521471" style="zoom: 80%;" /> 

---

#### SpringDataRedis

- 特点

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260720145233649.png" alt="image-20260720145233649" style="zoom: 33%;" /> 

- 各数据类型的API

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260720145326413.png" alt="image-20260720145326413" style="zoom:50%;" /> 

- 快速入门

  1. 引入依赖

     ```xml
            <!--  redis 依赖      -->
             <dependency>
                 <groupId>org.springframework.boot</groupId>
                 <artifactId>spring-boot-starter-data-redis</artifactId>
             </dependency>
     
             <!--  redis连接池依赖      -->
             <dependency>
                 <groupId>org.apache.commons</groupId>
                 <artifactId>commons-pool2</artifactId>
                 <version>2.11.1</version>
                 <scope>compile</scope>
             </dependency>
     
     ```

  2. 配置文件

     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260720150841195.png" alt="image-20260720150841195" style="zoom:50%;" /> 

  3. 注入对象并使用

     ```java
     package xinja.learn.redisdemo;
     
     import org.junit.jupiter.api.Test;
     import org.springframework.beans.factory.annotation.Autowired;
     import org.springframework.boot.test.context.SpringBootTest;
     import org.springframework.data.redis.core.RedisTemplate;
     
     @SpringBootTest
     class RedisDemoApplicationTests {
         @Autowired
         private RedisTemplate redisTemplate;
     
         @Test
         void contextLoads() {
             //写入一条String数据
             redisTemplate.opsForValue().set("name","张三");
     
             //获取String数据
             System.out.println(redisTemplate.opsForValue().get("name"));
         }
     
     }
     ```

- 上述案例中，并未指定序列化方式，默认会将字符串视为Java对象进行序列化。这样存入redis的数据就不完整且可读性差。为此，我们可以手动设置序列化方式

  我们可以通过@Configuration+@Bean手动设置IOC容器中的RedisTemplate对象

  ```java
  package xinja.learn.redisdemo.config;
  
  import org.springframework.context.annotation.Bean;
  import org.springframework.context.annotation.Configuration;
  import org.springframework.data.redis.connection.RedisConnectionFactory;
  import org.springframework.data.redis.core.RedisTemplate;
  import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
  import org.springframework.data.redis.serializer.StringRedisSerializer;
  
  @Configuration
  public class RedisConfig {
  
      @Bean
      public RedisTemplate redisTemplate(RedisConnectionFactory redisConnectionFactory) {
          //创建redis对象
          RedisTemplate redisTemplate = new RedisTemplate<>();
  
          //设置连接工厂
          redisTemplate.setConnectionFactory(redisConnectionFactory);
  
          //为key设置string序列化工具
          redisTemplate.setKeySerializer(new StringRedisSerializer());
          redisTemplate.setHashKeySerializer(new StringRedisSerializer());
  
          return redisTemplate;
      }
  
  }
  ```

  如此一来，为key设置了string专用的序列化工具，key就不会被当成object存储了，在redis中也可以正常显示了     若想要value也正常显示，可以为value专门配置一个jackson2jason的序列化工具

- Spring提供了StringRedisTemplate类，它的key和value的序列化方式**默认为String**，省去了我们自定义RedisTemplate的过程   所以此处的**序列化和反序列化都需要我们手动操作**

  ```java
      @Autowired
      private StringRedisTemplate stringRedisTemplate;
  
  
      @Test
      void contextLoads() {
          User user = new User("张三",18);
  
  //        利用Hutool包中的工具序列化为JSON
          String jsonStr = JSONUtil.toJsonStr(user);
          stringRedisTemplate.opsForValue().set("user:1",jsonStr);
  
          String s = stringRedisTemplate.opsForValue().get("user:1");
  //        利用Hutool包中的工具反序列化
          User bean = JSONUtil.toBean(s, User.class);
  
          System.out.println(bean.getAge());
          System.out.println(bean.getName());
      }
  ```

- SpringDataRedis中的Hash类型

  **opsforHash** 

  新增方法：put  

   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260720161141653.png" alt="image-20260720161141653" style="zoom:50%;" />

  获取方法：get（获取某个键值对）   entries（获取所有键值对） keys（获取所有的key）   values（获取所有的value）

  

  更类似于Java的编程习惯

---

 ## 实战 — 黑马点评

### 0.数据库设计

![image-20260720162740638](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260720162740638.png) 



### 1.基于Session的短信登录

- 流程

  ![image-20260720202911317](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260720202911317.png)

- 验证码API请求

  ![image-20260720203128996](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260720203128996.png) 

- 验证码service层(部分)

  ```java
       //1.校验手机号
          boolean judge = RegexUtils.isPhoneInvalid(phone);
          //2.若不符合则报错
          if (!judge) {
              return Result.fail("手机号格式错误");
          }
  
          //3.若符合则生成验证码
          String code = RandomUtil.randomNumbers(6);
  
          //4.生成后将验证码保存到session
          session.setAttribute("code", code);
  
          //5.发送验证码
          log.info("发送短信验证码成功，验证码：{}",code);
  
          //返回ok
          return Result.ok();
  ```

  

- 登录API请求

  ![image-20260720204544281](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260720204544281.png) 

- 登录校验

  使用拦截器，将所有的请求拦截下来并进行登录校验

- 登录校验API请求

  - /user/me
  - GET

#### 基于Redis实现共享Session信息

- Session登录存在的问题

  多态Tomcat不能实现session信息的共享，当请求切换到不同tomcat服务时容易丢失

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260720215431992.png" alt="image-20260720215431992" style="zoom:50%;" /> 

- 解决方法：将Session用Redis替代，手动维护Redis达到类似Session的效果，且可以实现共享

- 具体流程

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260720220903331.png" alt="image-20260720220903331" style="zoom:33%;" /> 

  ![image-20260720220520276](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260720220520276.png)

  可见，此处通过手动维护Redis实现了类似JWT令牌的功能使得信息可以被共享

---

### 2.商户缓存查询

- 缓存：数据交换的缓冲区（cache），存储数据的临时地方，读写性能高

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260721094520038.png" alt="image-20260721094520038" style="zoom:50%;" /> 

- 作用与成本
  - 作用
    1. 降低后端负载
    2. 提高读写效率，降低响应时间
  - 成本
    1. 数据一致性成本
    2. 代码维护成本
    3. 运维成本

- 在项目中，一些商户查询的信息可以添加到缓存中提高查询效率

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260721095007352.png" alt="image-20260721095007352" style="zoom: 67%;" />  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260721095044756.png" alt="image-20260721095044756" style="zoom: 67%;" />

---

#### 缓存更新策略

- 三种缓存更新策略

  ![image-20260721105835760](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260721105835760.png)

  - 低一致性需求：使用内存淘汰机制，例如：店铺类型的查询缓存
  - 高一致性需求：主动更新，并以超时剔除座位兜底，例如：店铺详情查询缓存

- 主动更新的策略

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260721110205506.png" alt="image-20260721110205506" style="zoom:50%;" /> 

  tip：策略3即为异步写入，被应用于MySQL的底层。即：调用者只操作缓存，程序定期检查缓存数据有无变更，若有则将其异步写入数据库以保证数据一致性

  一般而言都使用方案一

  - 方案一需要考虑的问题

    1. 删除缓存还是更新缓存

       - 更新缓存：每次更新数据库都更新缓存，无效写操作过多
       - **删除缓存**：更新数据库时删除缓存，查询时再更新缓存

    2. 如何保证缓存和数据库操作同时成功或失败 — **原子性**

       - 单体系统，将缓存和数据库放在一个事务中
       - 分布式系统，利用TCC等分布式事务方案

    3. 先操作缓存还是先操作数据库 — **线程安全问题**

       - 先删除缓存再操作数据库

         <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260721111256626.png" alt="image-20260721111256626" style="zoom: 50%;" /> 

         线程1：删缓存，操作数据库

         线程2：查询缓存

       - 先操作数据库再删除缓存

         <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260721111621118.png" alt="image-20260721111621118" style="zoom:50%;" /> 

         线程1：查询缓存

         线程2：删缓存，操作数据库

       对比上面两个情况，**先操作数据库再删除缓存**出现问题的条件很苛刻，出现问题的概率更低

---

#### 缓存穿透

- 客户端请求的数据在**缓存和数据库中都不存在**，这样缓存永远不会生效，这些请求**都会打到数据库**

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260721114741876.png" alt="image-20260721114741876" style="zoom:50%;" /> 

- 解决思路

  1. 缓存空对象

     将空对象缓存到redis中

     优点：实现简单，维护方便

     缺点：额外的内存消耗、可能造成短期的不一致

     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260721115110811.png" alt="image-20260721115110811" style="zoom:50%;" /> 

  2. 布隆过滤

     在客户端和Redis中间再加一层布隆过滤器

     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260721115140411.png" alt="image-20260721115140411" style="zoom:50%;" /> 

     布隆过滤：将数据库中的数据经过Hash算法算出位置，将此比特位置为1表示存在。  （0表示不存在） 【bitMap】

     优点：内存占用少，没有多余的key

     缺点：实现复杂、**可能误判（hash冲突导致）**

- 项目的集成

  ![image-20260721115814140](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260721115814140.png)

---

#### 缓存雪崩

- 在同一时段内，有大量的缓存key同时失效或Redis服务宕机，导致大量请求到达数据库，造成巨大压力

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260721120659612.png" alt="image-20260721120659612" style="zoom:50%;" /> 

- 解决方法

  1. 给不同key的TTL添加随机值

     在**缓存预热（将数据批量从数据库导入缓存）**时，若给不同的key添加相同的TTL会导致大量key同时失效

  2. 利用**Redis集群**提高服务可用性

  3. 给缓存业务添加降级限流策略

     提前做好容错处理，当Redis宕机时，转换限流策略，**拒绝一些请求以保全数据库**

  4. 给业务添加多级缓存

     浏览器缓存、Nginx缓存、Redis缓存、Tomcat缓存、数据库缓存… 

---

#### 缓存击穿

- 又称**热点Key问题**，就是一个**高并发访问**并且**缓存重建业务较为复杂**的Key突然失效了（**TTL到了**），无数请求访问会在瞬间给数据库带来巨大冲击

- 解决方法

  1. 互斥锁

     当热点key失效后，无数的请求打到数据库进行缓存的重建。但实际上缓存的重建只需要查询一次即可。所以可以加互斥锁，限定一条请求打到数据库上并进行重建。重建后解锁，其他的请求就会打到缓存上了

     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260721122202930.png" alt="image-20260721122202930" style="zoom: 67%;" /> 

     优点：没有额外内存消耗

     ​				保证一致性

     ​				实现简单

     缺点：其他锁都在等待，导致性能降低

     ​				有死锁风险

  2. 逻辑过期

     不为热点key设置TTL，而是**在其value上加上一个逻辑上的TTL** 

     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260721122719300.png" alt="image-20260721122719300" style="zoom:50%;" /> 

     当热点key逻辑上过期后，一个线程获得互斥锁，并且开启一个新线程专门用于缓存更新的一系列操作。在**缓存更新期间所有的查询请求都会返回旧数据**

     优点：无需等待、性能较好

     缺点：不保证一致性

     ​				有额外内存消耗

     ​				实现复杂

- 两种方法的项目集成

  - 互斥锁

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260721123556540.png" alt="image-20260721123556540" style="zoom: 80%;" /> 

    项目中的互斥锁不能使用Java中自带的lock 因为此处是否拿到锁的操作是我们自定义的（Java中没抢到锁的线程会阻塞等待，直到锁释放后再去拿锁无法满足业务逻辑）

    为此，我们可以使用Redis中的**setnx特性去造一把自定义锁**

  - 逻辑过期

    ![image-20260721135003679](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260721135003679.png)
    
    tip：此处的业务场景是热key，是针对某一个key解决问题，热key会进行**缓存预热**。所以key肯定会存在缓存里面，若未命中说明肯定不是该热key

---

#### 缓存工具封装

- 将一些常用的缓存解决策略封装成工具类

  ![image-20260721142657213](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260721142657213.png)

- 使用了**泛型编程思想**

---

### 3.秒杀

#### 全局唯一ID

- 当用户抢购时，就会生成订单并保存到表中，而订单表如果使用数据库自增ID就会遇到一些问题：
  1. id规律性太明显 — 用户可以根据id规律获取一些信息
  2. 受**单表数据量**的限制  — 数据量过多时需要拆分表，若仍然使用自增ID会导致id的重复

- 全局ID生成器

  一种分布式系统下用来生成全局唯一ID的工具，一般满足下列特性

  1. 唯一性
  2. 高可用
  3. 高性能
  4. 递增性
  5. 安全性

- 实现

  使用Redis中String类型的INCRBY的特性实现全局ID的生成

  为了增加ID的安全性，我们可以不直接使用Redis的自增数值，而是**拼接一些其他信息** 

  ![image-20260721164144417](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260721164144417.png)

  当在同一时刻有多比订单时，就将序列号自增以确保订单号的一致

- 代码

  ```java
  
      private static final long BEGIN_TIMESTAMP = 1640995200L;
  
      /**
       * 序列号位移位数
       * */
      private static final int COUNT_BITS = 32;
      @Autowired
      private StringRedisTemplate stringRedisTemplate;
  
      //拼接订单号
      public long nextId(String keyPrefix) {//前缀用于区分不同的业务
          //1.生成时间戳
          long nowSec = LocalDateTime.now().toEpochSecond(ZoneOffset.UTC);
          long timeStamp = nowSec - BEGIN_TIMESTAMP;
          //2.生成序列号
  
          String date = LocalDate.now().toString();
          long count = stringRedisTemplate.opsForValue().increment("icr" + keyPrefix + ":" + date);
  
          //3.拼接并返回
          //左移加或运算进行拼接
          return timeStamp << BEGIN_TIMESTAMP | count;
      }
  ```

  

- 除此之外UUID、雪花算法也可以做全局唯一ID，但由于UUID并不能递增，，所以使用的不多;雪花算法对于时钟依赖过高

---

#### 优惠卷秒杀（基础）

![image-20260721171903717](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260721171903717.png)

- 流程

  ![image-20260721173346425](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260721173346425.png)

- 上述流程只是最基础的流程，无法完全解决秒杀时的超卖等问题

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260721175107730.png" alt="image-20260721175107730" style="zoom:50%;" /> **并发安全问题**

- 解决方法：锁

  - 悲观锁

    认为线程安全问题一定会发生，因此在操作数据前会先获取锁，确保线程串行执行  —  Synchronized、lock都属于悲观锁

  - 乐观锁

    认为线程安全问题不一定会发生，因此不加锁，只是在数据更新时判断有没有其他线程对线程进行了修改

    - 若没有修改则认为是安全的
    - 若已被修改说明发生了安全问题，此时可以重试或异常

     

    - 版本号法

      增加一个额外字段version，当数据被修改时version自增

      ![image-20260721175549347](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260721175549347.png) 

    - CAS法 （compare and set）

      在本项目中，库存的数量本身就有着版本信息（每次库存-1，相当于版本更新。所以可以没有version字段）

---

#### 一人一单

- 秒杀券只能一人一张

  ![image-20260721183343482](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260721183343482.png)

- 上述流程只是基础版的，若是请求速度足够快（脚本），产生足够多的线程仍然可以抢到多单。**仍然存在线程安全问题**。而由于此处是在表中插入数据，所以需要使用悲观锁 — 表中数据不存在时无法判别版本

---

#### 集群下的并发安全问题

- 在集群模式下，哪怕实现了原先的一人一单的功能，当一个用户同时发送两个购买请求时，仍然会一人多单

  - 原先单体流程

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260721192135823.png" alt="image-20260721192135823" style="zoom: 80%;" />  

  - 集群模式下

    ![image-20260721192149882](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260721192149882.png)

  可见在集群模式下，每个单体都会有独自的JVM。**但是各个JVM之间相互独立，只能监视自己单体内的锁**

  每个jvm内部都会有一个线程成功，导致会出现一个用户同时发起两个请求，这两个请求正好进入两台不同的服务器，也就是两个不同的jvm，就会成功的下两个订单

  若要解决此问题，就需要用到**分布式锁**

  

#### 分布式锁

- 满足分布式系统或集群模式下多线程可见且互斥的锁

  ![image-20260722094600372](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260722094600372.png)

- 实现分布式锁的三种常见方法

  ![image-20260722095642749](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260722095642749.png)

  tip：MySQL的实现是利用执行事务时的互斥锁

---

##### Redis的分布式锁实现

1. setnx获取锁

2. expire设置TTL，防止因为服务器宕机导致死锁

3. 为了防止在setnx后且还没有expire的情况下服务器突然宕机，还要将**上述两步绑定为一个复合命令保证原子性** 

   ```redis
   set [keyname] [value] ex 10 nx
   # 将setex和设置TTL结合为一句命令
   ```

4. 采用**非阻塞式分布式锁**：若获取锁失败则返回false ，而不是一直等待直到锁释放

   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260722100554647.png" alt="image-20260722100554647" style="zoom:50%;" /> 

- Redis分布式锁的完善

  - 极端情况的问题

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260722103951225.png" alt="image-20260722103951225" style="zoom:50%;" /> 

    因为事务阻塞引起锁触发TTL释放，而后事务完成释放了别的线程的锁

  - 解决

    判断锁的标识是否一致（看看要释放的锁是否是自己的）

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260722104216901.png" alt="image-20260722104216901" style="zoom:50%;" /> 

  

  - 如此解决后仍然可能出现问题 — 判断锁的标识和释放锁这两个步骤**不具备原子性**

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260722105854124.png" alt="image-20260722105854124" style="zoom:50%;" /> 

    可能出现如上状况：**判断锁标识后但还没释放前发生阻塞**

  - 解决

    tip：由于RedisSimpleLock是工具类(没有交给Spring容器)，所以无法使用Transaction注解

    可以使用Redis的Lua脚本进行实现 — Lua脚本：可以在一个脚本中执行多条Redis语句，**确保多条命令执行的原子性** 

    

    在Lua脚本中提供了redis.call()去调用redis

    ![image-20260722110730954](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260722110730954.png) 

    Redis中提供了**EVAL命令**去执行脚本

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260722110856747.png" alt="image-20260722110856747" style="zoom: 80%;" /> 

    script为脚本名  numkeys表示key参数个数  key为key参数  arg表示其他参数

    区分了key参数和其他参数后，key类型参数会被放入KEYS数组，其他参数被放入ARGV数组，在脚本中可以从这两个数组中获取参数

    ![image-20260722111519344](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260722111519344.png)

    Lua脚本语言中数组下标从1开始

    

    - Java中调用Lua脚本

      <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260722112356503.png" alt="image-20260722112356503" style="zoom:50%;" />

---

##### Redisson

- 我们已完成的分布式锁仍然存在一些问题

  1. 不可重入（同个线程无法多次获取统一把锁）

     如：方法A调用方法B，两个方法要获取同一把锁，方法A获取锁后进入方法B获取同一把锁，但是该锁在方法A中已经拿过了还未释放，如此就会形成死锁的局面

  2. 不可重试  —  **订阅机制**

     获取锁只尝试一次就返回false，没有重试机制

  3. 超时释放  — **看门狗机制**

     虽然超时释放可以避免死锁，但如果业务执行耗时过长，也会导致锁的释放，存在安全隐患

  4. 主从一致性

     若Redis搭建了主从集群（读写分离），主从同步存在延迟，当主宕机时从并未同步主中的锁，就会导致其他线程拿到锁

     （当主宕机时，需要在从中选一个作为主，而若这个从并未同步锁的数据，那么其他线程就可以从这个新的主里面获取锁，导致主从不一致）

- Redisson：在Redis基础上实现的分布式工具，里面包含了许多分布式系统所需要用到的技术（包括分布式锁）

- 快速入门

  1. 引入依赖

     ```xml
             <dependency>
                 <groupId>org.redisson</groupId>
                 <artifactId>redisson</artifactId>
                 <version>3.13.6</version>
             </dependency>
     ```

     

  2. 配置redisson客户端@Configuration+@Bean

     ```java
     @Configuration
     public class RedissonConfig {
     
         @Bean
         public RedissonClient redissonClient() {
             //配置类
             Config config = new Config();
             //添加redis地址  这里添加单点地址，也可以通过config.useClusterServers
             config.useSingleServer().setAddress("redis://127.0.0.1:6379").setPassword("cxy06908");
             //创建客户端
             return Redisson.create(config);
         }
     
     }
     ```

     

  3. 使用Redisson的分布式锁

     ```java
             //version3  Redisson
     
             //创建锁对象
             Long UserId = UserHolder.getUser().getId();
             RLock lock = redissonClient.getLock("lock:order:" + UserId);
     
             //获取锁
             //无参表示获取锁失败不等待
             //若想要实现可重试，可以传递时间参数，表示失败后休眠多少时间进行重试
             boolean isLock = lock.tryLock();
     
             if(!isLock){
                 return Result.fail("不允许重复下单");
             }
             //获取锁成功执行下单逻辑
             try {
                 IVoucherOrderService proxy = (IVoucherOrderService) AopContext.currentProxy();
                 return proxy.CreateVoucherOrder(voucherId, voucher);
             } finally {
                 lock.unlock();//使用finally确保锁可以被释放
             }
     ```

- Redisson可重入锁原理

  用Hash结构存储锁的所有者与当前锁被该所有者拿到了几次，当我要拿锁时若锁已经存在，则判断拿锁人是否为当前所的所有者，若是则计数器++。同理释放锁时，计数器- -。等到计数器为0了销毁锁

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260722123944281.png" alt="image-20260722123944281" style="zoom: 80%;" />

  这一整个流程使用LUA脚本书写，用以保证整个过程的原子性

- Redisson可重试锁原理

  ![image-20260722133700083](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260722133700083.png)

  1. 尝试获取锁，尝试后返回ttl  若ttl为null说明获取成功，若当前锁已经被拿走了则返回当前锁的剩余ttl

  - ttl为null

    获取锁成功，判断leaseTime是否为-1  

    - 若不是为-1则说明用户设定了锁的持有时间，会在拿到锁的时候将ttl设置为leaseTime
    - 若是-1说明用户没有设定锁的持有时间，那么就会开启**看门狗机制**  — 若直接设置成**长期有效**，万一完成业务前redis宕机就会**死锁**。而开启看门狗机制，默认的ttl为30s **每10s自动续约（重置ttl）**，业务跑着就持续续命，避免锁提前失效；业务挂了就停止续命，依靠过期时间自动解锁，**完美平衡「锁不过期」和「不死锁」两大需求。**

  - ttl不为null

    获取锁失败，说明锁被别人拿着  **tip:传参时会传入一个waitTime**

    会计算剩余等待时间

    - 若剩余等待时间小于0则不再等待返回false
    - 若剩余等待时间大于0则等待锁被其他线程释放（被释放时会发送消息被接收到），接收到被释放的消息时再次判断等待时间，若大于0则**重新尝试**   —  释放锁发送信号—>接收到信号重新尝试 这个过程**不仅实现了可重试，还减轻了CPU压力**

- Redisson解决主从一致问题

  - 问题

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260722135620130.png" alt="image-20260722135620130" style="zoom: 50%;" /> 

    锁信息没来得及同步，主节点就宕机了

  - 解决思路  — **联锁multilock**

    不分主从，给所有的redis结点都发送锁的信息

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260722135713125.png" alt="image-20260722135713125" style="zoom:50%;" /> 

    只有在所有结点都释放锁的时候才可以获得锁

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260722135920905.png" alt="image-20260722135920905" style="zoom:50%;" />

---

#### 秒杀优化

- 原先的逻辑直接操作数据库，造成大量磁盘IO，且为了线程安全还加了分布式锁，性能太差。

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260722142038502.png" alt="image-20260722142038502" style="zoom:50%;" /> 

- 优化思路：多线程编程  —  不同线程间进行分工

  1. 将判断秒杀库存，校验一人一单等资格校验信息**放入Redis**,并由**线程1**在Redis中完成校验工作；  完成校验工作后将信息**存入阻塞队列**
  2. **线程2**在Tomcat服务器中先在阻塞队列中读取信息，再完成对MySQL的操作—将读取到的信息存入数据库  完成信息的**异步入库** 

  ![image-20260722143203920](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260722143203920.png)

- 具体实现

  - Redis中的信息存储

    ![image-20260722143407967](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260722143407967.png)

    需要存储商品库存和买过该商品的用户（使用Set存储，避免重复）

  - 流程

    ![image-20260722143534081](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260722143534081.png)

    0代表有资格，1、2代表没资格。为了确保操作Redis的原子性，**需要写LUA脚本** 

    ![image-20260722143653006](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260722143653006.png)

    后续在阻塞队列中拿取信息，并写入MySQL即可

---

#### 消息队列

- 基于Java的阻塞队列实现异步秒杀有如下两个问题
  1. 当订单数过多时容易造成**JVM内存溢出**
  2. JVM内存**无持久化机制**，当重启或宕机时阻塞队列中的数据都会**丢失 **

- 解决方法 — 消息队列

  最简单的消息队列模型包括三个角色

  1. 消息队列：，存储和管理消息，也被称为消息代理
  2. 生产者：发送消息给消息队列
  3. 消费者：从消息队列获取消息并处理

  ![image-20260723101314526](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260723101314526.png)

  - 优点

    消息队列独立于JVM外，**不受JVM内存的约束**

    消息队列会维护**数据的持久化**

    消息队列要求消费者消费消息后返回一个确认信息，**确保每个消息被成功消费一次** 

- 常见的消息队列：Kafuka、RocketMQ等，本节课中介绍用**Redis的数据结构模拟实现消息队列**
  - list结构：基于list结构**模拟消息队列**
  - PubSub：基本的**点对点消息模型**
  - Strem：比较**完善的消息队列模型**

- 利用list结构模拟消息队列

  入口和出口不在一边就可以实现队列的特性。Redis中的list是双向链表，只要使用**LPUSH结合RPOP**或**RPUSH结合LPOP**就可以模拟

  此外，若想要完成阻塞的效果（没有消息就等待）需要使用**BLPUSH结合BRPOP**或**BRPUSH**结合**BLPOP**

  - 优点

    可以基本满足消息队列的功能

  - 缺点

    无法避免消息丢失 — 向消费者发送消息后消息就没了，无法保证消息一定被处理

    只支持单消费者 — 一个消费者拿到消息后消息就没了

- 基于**PubSub（发布订阅）**的消息队列

  Redis2.0后引入的消息传递模型。消费者可以订阅一个或多个channel，生产者向channel发送消息后，所有订阅者都能收到相关消息

  - 常用命令
    - SUBSCRIBE channel [channelName]： 订阅一个或多个频道
    - PUBLISH channel msg：向一个频道发送消息
    - PSUBSCRIBE pattern[pattern] ：订阅与pattern格式匹配的所有频道

  - 优点

    采用发布订阅模型，支持**多生产多消费**

  - 缺点

    不支持数据持久化

    无法避免消息丢失

    消息堆积有上限，超出时消息丢失

- 基于Stream的消息队列

  Redis5.0引入的新数据类型，完善的消息队列

  - 写消息

    ![image-20260723104517566](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260723104517566.png)

  - 读消息

    ![image-20260723104902601](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260723104902601.png)

    ![image-20260723104915530](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260723104915530.png)

  - 存在问题

    BLOCK+$模式下，由于一次只能接收一条最新消息，所以当一次性传入好几条消息时，回导致信息的漏读

  - 解决方法

    构建**消费者组** 

    1. 消费者组内的消费者属于竞争关系，当有消息进来时会进行争抢
    2. 消费者组会维护一个消息标识，记录最后一个被处理的消息，这样哪怕宕机重启也知道上次读到哪了，用于确保每一个消息都会被消费
    3. 消息确认，消费者收到消息后，消息处于pending状态，并存入pending-list。处理完后通过XACK确认消息，标记消息为已处理，从pending-list中移除

    ![image-20260723110209012](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260723110209012.png)

    ![image-20260723110659974](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260723110659974.png)

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260723111356418.png" alt="image-20260723111356418" style="zoom: 50%;" />

    刚开始读取未消费的消息**(>)** ，若出现异常则说明有消息没有被处理完成，此时它被存入了pending-list，所以出现异常后需要取pending-list内重新处理**（0） ** 直到被正常处理发出ACK

- 项目集成

  ![image-20260723112012330](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260723112012330.png)

  [视频](https://www.bilibili.com/video/BV1cr4y1671t?spm_id_from=333.788.player.switch&vd_source=d6f1919e59f384773719ad5aa3d3a0a9&p=77)

---

### 4.达人探店

#### 发布探店笔记

- 涉及到的表

  ![image-20260723131043591](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260723131043591.png)



#### 点赞

- 需求

  ![image-20260723134204536](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260723134204536.png)

- 实现思路

  利用Redis的Set数据结构，将某篇博客的所有点赞用户都存入。当用户点赞时，若存在该用户则取消点赞（从Set中删除，并且数据库中点赞数-1）；若用户不存在，则将用户加入Set，数据库中点赞数+1

  key：博客id     value：用户id

#### 点赞排行榜

- 需求

  ![image-20260723140725060](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260723140725060.png)

  类似微信朋友圈的点赞排序

  ![image-20260723140904295](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260723140904295.png) 

- 为了实现排行的功能，原先的Set就无法满足了，需要使用**SortedSet** 

  改用SortedSet后**key为blogId、value为userId、score为时间戳**

---

### 5.关注

#### 关注和取关

- 接口

  ![image-20260723145411240](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260723145411240.png)

- 涉及到的表

  ![image-20260723145531697](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260723145531697.png)



#### 共同关注

- 接口

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260723151839391.png" alt="image-20260723151839391" style="zoom:50%;" /> ![image-20260723152824769](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260723152824769.png)

- 思路

  利用Redis中的Set集合求交集

#### 关注推送

- 关注推送也称Feed流，为用户提供“沉浸式”体验，通过无线下拉刷新获取新的信息 （如：抖音等平台就基于Feed流不断提供视频）

- Feed流的两种常见模式

  1. Timeline：不做内容筛选，简单的按照内容发布时间排序，常用于好友或关注，如：朋友圈

     优：信息全面，不会有确实，实现简单

     缺：信息噪音较多，用户不一定感兴趣，内容获取效率低

  2. 智能排序：利用智能算法推送用户喜欢的内容

     优：用户粘度高，易沉迷

     缺：若算法不精准，可能起到反作用

- Timeline

  - 拉模式

    也称读扩散

    ![image-20260723154836827](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260723154836827.png) 

    只有在读取的时候才会进行消息的拉取和排序，利于节省内存空间

    缺点：每次读取都要进行拉取和排序，效率较低

  

  - 推模式

    也称写扩散

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260723155041430.png" alt="image-20260723155041430" style="zoom:50%;" /> 

    直接将消息推送到粉丝的收件箱中并进行排序，效率高

    缺点：内存占用高

  

  - 推拉结合

    也称读写混合模式，兼具上两种的优点

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260723155402142.png" alt="image-20260723155402142" style="zoom:50%;" /> 

    对于活跃粉丝，使用推模式，使得粉丝读取时的延迟效率高

    对于僵尸粉，由于其很少看，所以在其需要读取的时候进行拉取即可

     

  - 三种模式的对比

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260723155626590.png" alt="image-20260723155626590" style="zoom:50%;" /> 

    **用户量不到千万都算少**

- 项目集成

  使用推模式，每当新增探店笔记时，直接推送到粉丝的收件箱

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260723155942874.png" alt="image-20260723155942874" style="zoom:50%;" /> 

  **收件箱使用Redis实现，先查询发布笔记的作者的粉丝，再向粉丝发送笔记id，使用Redis存储发送过来的笔记id**

  - Feed流的分页问题
  
    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260723160558585.png" alt="image-20260723160558585" style="zoom:50%;" /> 
    
    在查询完第一页后若在查询第二页之前又有信息推送进来，会导致两页的重复
    
    解决方法 — 滚动分页
    
    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260723160745751.png" alt="image-20260723160745751" style="zoom:50%;" /> 
    
    维护一个lastId记录上次查询的最后一个角标
    
    
    
    滚动分页具体分析：[视频](https://www.bilibili.com/video/BV1cr4y1671t?spm_id_from=333.788.player.switch&vd_source=d6f1919e59f384773719ad5aa3d3a0a9&p=86)
    
     
    
    滚动分页接口
    
    ![image-20260723164153818](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260723164153818.png) 

---

 ### 6.附近商户

> 基于Redis实现地理坐标搜索的功能

- GEO数据结构

  Geolocation，代表地理坐标（经纬度）。Redis3.2后加入。

  - 常用命令

    GEOADD:添加一个地理空间信息，包含：**经度、纬度、值 **

    

    GEODIST:计算指定两点间的直线距离并返回

    

    GEOHASH:将指定的member坐标转换成hash字符串形式存储

    

    GEOPOS:返回指定member的坐标

    

    GEORADIUS:指定圆心、半径，找到该圆包括的所有member，并按照圆心之间的距离排序后返回。6.2后废弃

    

    GEOSEARCH:在指定范围内搜索member，按照指定点之间的距离排序后返回，范围可以是圆形或矩形 （版本过低没有）

    

    GEOSEARCHSTORE:与GEOSEARCH功能一致，只不过会将结果存储  （版本过低没有）

- 接口

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260724102216135.png" alt="image-20260724102216135" style="zoom: 33%;" /> 

  传统的分页查询 + 距离的计算 + 距离的排序 （此处圆心处在前端写死）

  typeId用于分类（美食、KTV等）  current用于分页  x，y用于计算距离并排序

  存入Redis：

  1. 将商户根据typeId进行分组，存入不同的GEO集合当中去
  2. 每个GEO集合内存储位置信息

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260724103606988.png" alt="image-20260724103606988" style="zoom:50%;" />

  

---

### 7.签到功能

> 基于BitMap实现签到功能

- BitMap

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260724122219580.png" alt="image-20260724122219580" style="zoom: 80%;" /> 

  为此我们可以使用BitMap（位图）来记录用户签到信息

  将每一个bit未对应当月的每一天，形成**映射关系**。1表示签到0表示未签到   

  Redis中利用String类型数据结构实现BitMap，因此最大上限未512M，转换成bit位为2^32^  个bit位

- Redis中的BitMap用法

  1. SETBIT：向指定位置（offset）存入一个0 / 1

  2. GEIBIT：获取指定位置（offset）的bit值

  3. BITCOUNT：统计BitMap中为1的bit位数量

  4. BITFIELD：操作（查询、修改、自增）指定位（offset）的值 **【一般用于查询】**

     ```redis
     BITFIELD [keyname] GET u2 0
     # u代表无符号 i代表有符号   u2 0代表按照无符号从0索引开始读取2位
     ```

     

  5. BITFIELD_RO：获取BitMap中的bit数组，以十进制返回

  6. BITOP：将多个BitMap的结果做位运算

  7. BITPOS：查找BitMap中第一个0 / 1出现的位置

- 项目集成（签到功能）

  ![image-20260724123759038](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260724123759038.png)

  操作BitMap需要使用**opsForValue**

  Redis存储结构：   key：当前月   value：签到信息

- 统计连续签到次数

  ![image-20260724130026659](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260724130026659.png)

  - 如何得到本月到今天为止的所有签到数据？

    **BITFIELD查询** 

    ```redis
    BITFIELD [keyname] GET u? 0
    # ?为到本月到今天为止的天数
    ```

  - 如何从后向前遍历每个bit位

    返回的数据是十进制，我们只需要**将其与1进行与运算**即可得到最低位的比特位  **得到后>>  更新最低为比特位** 

- 接口

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260724130633564.png" alt="image-20260724130633564" style="zoom:50%;" /> 

---

### 8.UV统计

- UV：Unique Visitor，也称独立访客量，1天内同一个用户多次访问只记录一次
- PV：Page View，也称页面访问量或点击量，一个用户多次打开页面时则记录多次PV

- UV统计在服务端做会比较麻烦，因为要判断用户是否已经统计过了。需要将统计过的用户保存。但是如果每个访问用户都存到Redis中，数据量会非常恐怖

- HyperLogLog(HLL)：由LogLog算法衍生，用于确定非常大的集合的基数，而不用存储其所有值

  Redis中的HLL基于string实现，每个HLL内存永远小于16kb，其测量结果是概率性的，由0.81%的误差，对于UV统计可忽略

- Redis中的HLL命令

  ```redis
  #1
  PFADD [keyname] element1 [element2...]
  #2
  PFCOUNT key1 [key2...]
  #3
  PFMERGE destkey sourcekey1 [sourcekey2]
  ```

  

---

## 高级

### 分布式缓存 — Redis集群

- 单结点问题
  1. Redis是内存存储，若使用单节点Redis服务器，若服务器宕机Redis内部**存储的内容会直接丢失 ** —  实现**Redis数据持久化**
  2. 单节点的Redis**无法满足超高并发的情况**  — **主从集群**，实现**读写分离**
  3. 单节点Redis中无法满足故障恢复 — 利用**Redis哨兵**，实现健康检测和自动恢复
  4. 单节点的Redis存储能力有限 — 搭建**分片集群**，利用插槽机制实现**动态扩容**

#### Redis持久化

- RDB持久

  Redis DataBase Backup File（Redis数据备份文件），**也称Redis数据快照**。即：将内存中所有数据记录到磁盘中。**当Redis重启后，从磁盘读取快照文件，恢复数据** 

  快照文件为RDB文件，默认保存在当前运行目录

  ```redis
  #两个生成RDB文件的命令
  save  #Redis主进程执行RDB，会阻塞所有命令 一般不推荐使用
  bgsave #后台保存，开启子进程执行RDB，避免主进程受影响
  ```

   

    Redis**停机**时会**主动进行一次RDB** ，本身是可以实现持久化的。但是若是Redis突然宕机仍是有数据丢失风险，可以在redis.config配置文件中进行配置

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260726105356986.png" alt="image-20260726105356986" style="zoom:50%;" /> 

   

  - Linux-C**子进程**的创建（fork）

    1. Linux系统中，所有的进程都无法直接操作物理内存，而是通过页表**（物理内存和虚拟内存的映射表）**，操作虚拟内存 
    2. fork子进程时，会将主进程的页表进行拷贝，从而可以操作到相同的物理内存区域
    3. 子进程通过页表读取物理内存中的内容并写新RDB文件替换旧文件
    4. 当子进程进行拷贝时，物理内存会被设置read-only，主进程若要继续写入数据，需要使用到**copy-on-write**技术 （将相应的物理内存拷贝一份，主进程的页表映射临时改到那一份，使得主进程在拷贝内存中写入）

    ![image-20260726111235127](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260726111235127.png)

    - tip：由copy-on-write技术可推测出，极端情况下需要拷贝所有的数据，即Redis所占内存翻倍。所以Redis部署时需要预留一定内存空间

    

  - RDB的缺点
    1. **若RDB执行间隔时间过长**，两次RDB之间写入数据有丢失风险
    2. fork子进程、压缩、写出RDB文件耗时较长**，若RDB间隔时间过短** ，会给CPU带来较大负担

- AOF持久

  Append Only File（追加文件）。即：将Redis处理的每一个**写命令**记录在AOF文件中，可以看作命令日志文件  — **类似MySQL中的binlog** 

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260726112155646.png" alt="image-20260726112155646" style="zoom:50%;" />  AOF所存储的内容$用于分割，3表示字符串长度

   

  AOF默认关闭，需要修改redis.config开启

  ![image-20260726112702063](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260726112702063.png)

  - 一般使用everysec，always导致磁盘IO过多、no会导致过多数据丢失

  - 开启AOF后会主动读取AOF文件，原先的RDB文件不再被读取。

- 因为是记录命令，对一个key-value会有多个操作命令，AOF都要记录下来，所以AOF的文件大小会比RDB大很多**（有许多无意义的操作）**，对于多次写操作而言，最后一次写操作才具有意义。可以通过**bgrewriteaof命令**实现AOF文件的重写，用**最少的命令达到相同效果**

  在配置文件中可以配置bgrewriteaof的自动触发

  ![image-20260726115310861](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260726115310861.png)



- 在实际开发中会将上述两种方法结合使用，主要使用AOF实现数据持久化，RDB作为备份

---

#### Redis主从集群

- 主从集群

  一个主节点做写操作，从结点同步主节点的数据，用于读操作。由于读操作多于写操作，所以通常使用一个主节点对于多个从结点  **（同MySQL）**

- 主从配置流程

  修改redis.config配置文件，搭建各结点之间的主从关系

  slaveof <masterip> <masterport>    指定该结点为某结点的从结点，需要写上主节点的ip和端口号

  > 5.0后新增replicaof  与slaveof等效

- 数据同步原理

  1. 主从第一次同步是**全量同步** 

     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260726121523822.png" alt="image-20260726121523822" style="zoom: 67%;" /> 

     master如何判断slave是不是第一次来同步？

     - Replication Id：**数据集标记**，slave第一次来的ReplicationId与master的ReplicationId不同的，当进行了第一次同步后slave会继承master的ReplicationId
     - offset：**偏移量**，记录在rel_bakLog中，会随着数据的增多而逐渐增大，slave同步rel_bakLog后会将offset也同步，后续只需比较master和slave中的offset大小就知道有没有新数据需要更新了

     master通过**ReplicationId是否相同判断是否为第一次同步**，通过**offset的对比判断全量同步是否结束**  

   

  2. 主从第一次同步是全量同步，但如果slave重启后同步，则会执行**增量同步** 

     ![image-20260726122806711](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260726122806711.png)

     通过ReplicationId相同判断已经进行过全量同步了，只需要通过repl_bakLog进行增量同步即可（对比offset得出哪些数据是未同步的）

   

  - repl_bakLog

    repl_bakLog本质是数组存储数据，但是当**存满后会覆盖原先的旧数据**，逻辑上呈现环形存储结构

    - 当slave和master的差距**小于环的大小时**即可进行增量同步

      ![image-20260726123257867](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260726123257867.png)  ![image-20260726123305812](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260726123305812.png)

    - 当slave和master的差距大于环的大小时，无法进行增量同步  只能进行全量同步了

        ![image-20260726123441022](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260726123441022.png)

- 主从配置的优化   —   **优化全量同步**

  1. 在master中配置**repl-diskless-sync yes** 启用无磁盘复制，避免全量同步时的磁盘IO

     原本的流程：master生成RDB文件（产生磁盘IO） —>   通过网络发送给slave

     开启后的流程： 直接通过网络将数据发送给slave

  2. Redis单节点上的内存不要太大，**减少RDB导致过多的磁盘IO** 

  3. 适当提高repl_baklog的大小，实现slave宕机时尽快实现故障恢复，**尽可能避免全量同步**

  4. 限制一个master上的slave结点数量，可采用主-从-从的链式结构，减少master的压力

     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260726124351462.png" alt="image-20260726124351462" style="zoom:50%;" /> 

---

#### Redis哨兵

- slave宕机恢复后可以找master同步数据，那master宕机怎么办？

  > 利用Redis哨兵监控集群状态，当发现master宕机，立即选用一个slave作为master

- 哨兵的作用和原理

  - 作用

    - 监控

      Sentinel会不断检查master和slave是否健康工作

    - 自动故障恢复

      若master发生故障，Sentinel会将一个slave提升为master。当故障实例恢复后也以新的master为主

    - 通知

      Redis客户端服务不再是直接将Redis的主结点访问地址写死，而是通过访问Sentinel得知地址，当发生主节点切换时，Sentinel会向客户端发送**服务变更通知**

     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260726125700986.png" alt="image-20260726125700986" style="zoom: 80%;" /> 

   

  - 原理

    Sentinel基于心跳机制检测服务状态，**每隔一秒向集群的每一个实例发送ping命令** 

    - 主观下线：某个Sentinel发现实例未在规定时间内响应
    - 客观下线：超过指定数量（quorum）的Sentinel都认为某实例主观下线。quorum值最好超过Sentinel实例数量的一半

    

    

    一旦发现master故障，Sentinel会从slave中选一个新master，选择依据如下

    - 首先判断slave结点与master结点的断开时间，若超过指定值（down-after-milliseconds*10），则会排出该slave
    - 然后判断slave结点的slave-priority，越小优先级越高，如果是0则用不参加选举
    - 若slave-priority一样，则判断slave的offset值，越大说明数据越新，优先级越高
    - 若上述所有都一致（都一致说明选谁都可以），则选取slave结点中运行id最小的

     

     

    选取新的master后需要进行主从关系的调整

    1. Sentinel给被选中的slave发送slaveof no one命令，让其成为新master
    2. Sentinel向其他所有slave发送slaveof [新masterIp]，让这些结点都成为新master的slave，开始从新master上同步数据
    3. 最后，Sentinel将故障结点标记为slave，当故障节点恢复后自动成为新master的slave

    ![image-20260726130938720](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260726130938720.png)



- 哨兵集群的搭建

  1. 为每个哨兵配置sentinel.conf配置文件

     ![image-20260726131355386](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260726131355386.png)

     - 参数解读

       **port 27001**

       当前哨兵进程占用端口 27001

       **sentinel announce-ip 192.168.150.101**

       指定哨兵对外通信暴露的内网 IP

       **sentinel monitor mymaster 192.168.150.101 7001 2**

       监控主节点组名 mymaster，主库地址 192.168.150.101:7001；至少 2 个哨兵判定宕机，主节点才会被认定客观下线

       **sentinel down-after-milliseconds mymaster 5000**

       哨兵 5 秒收不到节点响应，就主观判定该节点下线

       **sentinel failover-timeout mymaster 60000**

       故障转移全过程超时时间 60 秒，超时则放弃本次切换

       **dir "/tmp/s1"**

       哨兵持久化日志、数据存放目录

   

  2. 启动Sentinel

     ```bash
     redis-sentinel .../.../sentinel.conf
     ```

- RedisTemplate的哨兵模式

  > 在Sentinel集群监管下的Redis主从集群，其节点会因为自动故障转移而发生变化，**Redis的客户端**必须感知这种变化，及时**更新连接信息**。Spring的RedisTemplate底层利用lettuce实现了**节点的感知和自动切换。**

  1. 引入Redis的start依赖

  2. 在application.yml中指定Sentinel相关信息

     ![image-20260726132632113](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260726132632113.png) 

  3. 配置主从的读写分离

     ![image-20260726132746781](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260726132746781.png)

---

#### 分片集群

> 主从和哨兵可以解决**高可用、高并发读**的问题，但仍有两个问题没被解决
>
> - 海量数据的存储
> - 高并发写的问题
>
> 利用分片集群即可解决

- 分片集群特征

  - 集群中有多个master，每个master保存不同的数据
  - 每个master可以有多个slave
  - master间可以通过ping检测彼此健康状态，**起到哨兵效果** 
  - 客户端请求可以访问集群中的任意节点，最终会被转发到正确结点

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260726134705520.png" alt="image-20260726134705520" style="zoom:67%;" /> 

- 分片集群的搭建

  - 创建文件夹，形成**集群结构**

    ``` 
    /usr/local/redis-cluster/
    ├── 7001/
    │   └── redis.conf
    ├── 7002/
    │   └── redis.conf
    ├── 7003/
    │   └── redis.conf
    ├── 8001/
    │   └── redis.conf
    ├── 8002/
    │   └── redis.conf
    └── 8003/
        └── redis.conf
    ```

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260726140028927.png" alt="image-20260726140028927" style="zoom: 80%;" /> 

    redis.conf内容  上述6379端口号需修改为对应端口号

  - **集群关系**的搭建

    - 5.0版本之前需要借助第三方工具

    - 5.0之后可以使用内置命令进行分片集群

      ![image-20260726140440091](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260726140440091.png)

- 散列插槽

  Redis会把每个master结点映射到0~16383共16384个插槽（hash slot）上。

  - 在Redis中，数据的key不是和结点绑定的，而是通过hash计算与插槽绑定的。redis会根据**key有效部分**计算出插槽值去查询数据

    当只有一个主结点时，此主节点占据了0~16383所有的插槽，那么查询时肯定就会去这个结点中去查询

    而当有多个主结点时，则需要将插槽分配给各个主节点，计算出的hash值落在哪个主节点范围内，就去该主节点内查询

    ![image-20260726141524358](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260726141524358.png)

   

  - key的有效部分

    - 当key中无{}时，整个key都是有效部分
    - key中有{}且{}内至少有一个字符时，{}内部为有效部分

    若想要将同一类数据**固定保存在同一个Redis服务器**中可以使用**{}将其有效部分固定为一致的**，如此一来算出来的插槽就一样，固定存入同一个Redis中

   

  - 在集群模式下，登录到某个cli的指令

    ```bash
    redis -cli -c -p xxxx # 指定端口
    ```

    假设登录到7001端口的redis服务器后，进行插入操作，若算出来的hash插槽不再7001这个结点的范围内（假设在7002结点范围内），那么就会将这条数据**重定向**存入7002端口的那个redis服务器

    同理，查询时若也不在该结点内，也会**重定向**到正确结点进行查询

- 集群伸缩

  - 添加一个结点到集群

    ![image-20260726142900921](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260726142900921.png)

    需要传入新增结点的端口和已存在结点的端口（用于通知有新结点的加入）

    默认加入为master节点，若是加上下面两个模式中的任意一个会变成slave

  - 除此之外还有删除集群结点等命令，一般通过帮助文档进行操作

  

- 故障转移

  分片集群中无哨兵结点，但各个主节点之间互相监控，可以实现哨兵效果

  - 数据迁移

    当需要使用新设备的Redis替换老设备的Redis成为主节点时，可以使用**cluster failover命令**手动地实现master结点的切换

    cluster failover：可以手动使master结点宕机，并将执行该命令的结点变为master结点

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260726144500401.png" alt="image-20260726144500401" style="zoom: 80%;" />  

    

- RedisTemplate访问分片集群

  用法与访问哨兵基本一致

  1. 引入redis的starter一来
  2. 配置分片集群地址
  3. 配置读写分离

  与哨兵模式相比，只有分片集群的配置方法略有差异  —  无需配置Sentinel的地址+端口，而是将分片集群中所有结点的地址+端口配置进去

---

### 多级缓存

- 为请求处理的各个环节都加上缓存，减轻Tomcat的压力，提升服务性能

  ![image-20260727100145496](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260727100145496.png)

  

#### JVM进程缓存

- 缓存的分类
  - 分布式缓存：Redis
    - 优点：存储容量更大，可靠性更好，可在集群间共享
    - 缺点：访问有网络开销
    - 场景：缓存数据量较大，可靠性要求较高，需要在集群间共享
  - 进程本地缓存：HashMap、GuavaChache等
    - 优点：读取本地内存，无网络开销，速度更快
    - 缺点：存储容量有限，可靠性较低，无法共享
    - 场景：性能要求较高，缓存数据量较小

- Caffeine

  基于Java8开发的，提供了近乎最佳命中率的高性能本地缓存库。目前Spring内部的缓存使用的就是Caffeine

  - 基本API的使用

    ```java
    @Test
    void testBasicOps() {
        // 创建缓存对象
        Cache<String, String> cache = Caffeine.newBuilder().build();
    
        // 存数据
        cache.put("gf", "迪丽热巴");
    
        // 取数据, 不存在则返回null
        String gf = cache.getIfPresent("gf");
        System.out.println("gf = " + gf);
    
        // 取数据, 不存在则去数据库查询
        String defaultGF = cache.get("defaultGF", key -> {
            // 这里可以去数据库根据 key 查询value
            ...
        });
        System.out.println("defaultGF = " + defaultGF);
    }
    ```

  - Caffeine中的缓存驱逐策略

    1. 基于容量：缓存达容量上限
    
       ```java
       // 创建缓存对象
       Cache<String, String> cache = Caffeine.newBuilder()
               .maximumSize(1)  // 设置缓存大小上限为 1
               .build();
       ```
    
       
    
    2. 基于时间：为缓存设置有效时间
    
       ```java
       // 创建缓存对象
       Cache<String, String> cache = Caffeine.newBuilder()
               .expireAfterWrite(Duration.ofSeconds(10))  // 设置缓存有效期为 10 秒，从最后一次写入开始计时
               .build();
       ```
    
       
    
    3. 基于引用：设置缓存为软引用或弱引用，利用GC来回收缓存数据。性能较差，不建议使用
    
    默认情况下，当一个缓存元素过期时，Caffeine不会自动立即将其清理或驱逐。而是在一次读或写操作后，或者在空闲时间完成对失效数据的驱逐

---

#### NGINX缓存

- Lua

  一种轻量小巧的脚本语言，用标准C语言编写且开源，设计目的是为了嵌入应用系统中，从而提供灵活的扩展和定制功能

  在NGINX中也可以嵌入Lua脚本操作NGINX缓存

  - Lua中的数据类型

    | 数据类型 | 描述                                                         |
    | -------- | ------------------------------------------------------------ |
    | nil      | 这个最简单，只有值 nil 属于该类，表示一个无效值（在条件表达式中相当于 false）。 |
    | boolean  | 包含两个值：false 和 true                                    |
    | number   | 表示双精度类型的实浮点数                                     |
    | string   | 字符串由一对双引号或单引号来表示                             |
    | function | 由 C 或 Lua 编写的函数                                       |
    | table    | Lua 中的表（table）其实是一个 "关联数组"（associative arrays），数组的索引可以是数字、字符串或表类型。在 Lua 里，table 的创建是通过 "构造表达式" 来完成，最简单构造表达式是 {}，用来创建一个空表。 |

  - 声明变量时无需指定变量类型

    ```lua
    local 变量名 = 变量值
    -- 例
    local arr = {'java','python','lua'}
    local map = {name='jack',age=21}
    
    -- lua中数组下标从1开始
    print(arr[1])
    print(map['name'])
    print(map.name)
    ```

  - for循环

    - 遍历数组

      ```lua
      local arr = {'java','python','lua'}
      for index,value in ipairs(arr) do
          print(index,value)
      end
      ```

    - 遍历table

      ```lua
      local map = {name='jack',age=21}
      for key,value in pairs(map) do
          print(key,value)
      end
      ```

  - 函数、条件控制

    - 函数

      ```lua
      function printArr(arr)
          for index,value in ipairs(arr) do
          print(index,value)
      	end
      end
      ```

    - 条件控制

      ```lua
      if(布尔表达式)
      then
          
      else
      
      end
      
      -- and(&&) or(||) not(!)
      ```



- OpenResty

  基于NGINX的高性能Web平台，可方便地搭建能处理高并发、扩展性极高的动态Web应用、Web服务和动态网关

  - 特点

    具备NGINX完整功能

    基于Lua语言进行扩展，集成大量Lua库、第三方模块

    允许使用Lua自定义业务逻辑、自定义库

> OpenResty技术和后端感觉关系不大，主要是在NGINX中用Lua语言实现缓存的操作。暂且搁置，若以后需要再回来看

---

#### Redis缓存预热

- 冷启动：服务刚启动时，Redis中没有缓存，若所有商品数据都在第一次查询时添加缓存，可能会给数据库带来较大压力

- 缓存预热：实际开发中，利用大数据统计用户访问的热点数据，项目启动前将其放入Redis中

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260727124751382.png" alt="image-20260727124751382" style="zoom:50%;" />

  如图所示，实现InitializingBean接口，重写afterPropertiesSet方法，如此一来即可在配置加载好后对Redis进行缓存预热（在重写方法中查询商品并存入Redis）

Tip：Redis预热后，OpenResty就可以从Redis中读取数据存入NGINX缓存

---

#### 缓存同步策略

缓存数据同步的常见方式有三种：

- **设置有效期**：给缓存设置有效期，到期后自动删除。再次查询时更新
  - 优势：简单、方便
  - 缺点：时效性差，缓存过期之前可能不一致
  - 场景：更新频率较低，时效性要求低的业务
- **同步双写**：在修改数据库的同时，直接修改缓存
  - 优势：时效性强，缓存与数据库强一致
  - 缺点：有代码侵入，耦合度高；
  - 场景：对一致性、时效性要求较高的缓存数据
- **异步通知**：修改数据库时发送事件通知，相关服务监听到通知后修改缓存数据
  - 优势：低耦合，可以同时通知多个缓存服务
  - 缺点：时效性一般，可能存在中间不一致状态
  - 场景：时效性要求一般，有多个服务需要同步



- 基于Canal的异步通知

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260727130733958.png" alt="image-20260727130733958" style="zoom:50%;" />

- Canal：alibaba开源项目，基于数据库增量日志解析，提供数据订阅&消费

  Canal原理：伪装成从节点读取主从同步的日志，读取日志后向各个服务通知数据的修改

- Canal的监听

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260727131653934.png" alt="image-20260727131653934" style="zoom:50%;" />

  

[安装Canal](https://www.bilibili.com/video/BV1cr4y1671t?spm_id_from=333.788.videopod.episodes&vd_source=d6f1919e59f384773719ad5aa3d3a0a9&p=131)       [监听Canal（集成）](https://www.bilibili.com/video/BV1cr4y1671t?spm_id_from=333.788.videopod.episodes&vd_source=d6f1919e59f384773719ad5aa3d3a0a9&p=132)

---

### Redis最佳实践

#### 键值设计

##### 高质key结构

- Redis的key虽然可以自定义，但最好遵循以下预定

  1. 遵循基本格式：**[业务名称]:[数据名]:[id]**
  2. 长度不超过44字节
  3. 不包含特殊字符

  例如：登录业务，保存用户信息  **login:user:10** 

  - 优点
    1. 可读性强
    2. 避免key冲突
    3. 方便管理
    4. 更节省内存：**key**是string类型，底层编码包含int、embstr、raw三种，小于44字节使用embstr，采用**连续内存空间**，内存占用更小；大于44字节时使用raw，使用了指针指向另一块空间，在指针指向的空间存储key

---

##### BigKey问题

- BigKey通常以Key的大小和Key中成员数量综合判定
  - Key本身数据量过大  如：一个String类型的key，大小为5MB
  - Key中成员过多  如：一个ZSET类型的Key，成员数量为10000个
  - Key中成员所占内存过大  如：一个Hash类型的Key，成员占内存100MB 



- BigKey危害

  - 网络阻塞

    对BigKey执行读请求时，少量的QPS就可能导致带宽被占满，导致Redis实例乃至物理机变慢

  - 数据倾斜

    BigKey所在的Redis实例内存使用率远超其他实例，无法使用数据分片的内存资源达到均衡

  - Redis阻塞

    对元素较多的hash、list、zset等做运算时非常耗时，会导致主线程被阻塞

  - CPU压力

    对BigKey数据的序列化和反序列化会导致CPU使用率飙升，影响Redis实例和本机其他应用



- 推荐值
  - 对于String类型，单个Key的value小于10KB
  - 对于集合类型的Key，建议元素数量小于1000



- 如何发现BigKey

  1. **redis-cli–bigkeys** 命令

     会得出每一种类型的**占用最大的Key**

  2. scan扫描

     自己编程，利用Redis的scan命令扫描Redis中所有的key，利用strlen、hlen等命令判断key的长度

     ```redis
     SCAN [cursor] 
     #cursor游标在此为下标
     #每次scan后会返回一个游标
     #不断地scan 返回的游标直至返回值变为0说明全部扫完了
     ```

     

  3. 第三方工具：如Redis-Edb-Tools分析RDB快照

  4. 网络监控

     自定义工具，监控进出Redis的网络数据，超出预警值时告警



- BigKey的删除

  BigKey的内存占用较多，即便删除也十分耗时，导致Redis主线程阻塞

  - Redis4.0以下的版本

    若是集合类型，**遍历**BigKey的元素，先逐个删除元素，最后删除BigKey   如何遍历？ — SCAN扫描

  - Redis4.0及以上的版本

    UNLINK命令：**异步的DEL**

    ```redis
    unlink [keyname]
    ```

---

##### 恰当的数据类型

- 删除BigKey后我们要重新设计，将BigKey打散存储



- 保存对象的三种方式

  ![image-20260727151340765](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260727151340765.png)

  综上，hash为存储对象的最优方式



- **hash的优化**：假设hash类型的key，其中有100万对field和value，field是自增id

  - 存在的问题
    1. hash中的键值对超过500时，会使用哈希表而不是ZipList存储，占用内存多
    2. 可以通过`hash-max-ziplist-entries`配置entry上限。但如果entry过多就会导致BigKey问题，所以不建议

  - 解决方法

    将这个大哈希拆分成小哈希，将id/100作为key，id%100作为field，这样拆分成一万个小哈希，每个小哈希里面有100个field-value

    ![image-20260727152312660](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260727152312660.png)

    

---

#### 批处理优化

- 单个命令的执行流程

  一次命令的响应时间 = 1次往返网络传输耗时**（$ms$）**+1次命令执行的耗时**（$\mu s$）**

  可见网络传输的耗时远大于命令执行的耗时，所以**一次尽可能执行多条命令**，提高效率

##### PipeLine

> Pipeline多个命令间不具备原子性

- jedis中的类，用于向Redis中导入大量数据

  ![image-20260727153757849](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260727153757849.png)

  上图张的 `pipeline.set` 还可以是  `pipeline.hset`  `pipeline.lpush` 等

- 在Spring中，也有pipeline，被封装在redisTemplate的方法中

  `redisTemplate.executePipelined` 



##### 集群下的批处理

- 集群模式下进行批处理时，批处理命令的多个key必须落在一个插槽中，否则会执行失败  —  保存到不同插槽时可能要进行**重定向**，但是批处理要求在同一个Redis实例中一次执行完所有命令

- 解决方法

  ![image-20260727155457681](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260727155457681.png)

  Tip：法3就是多线程版的法2，开启线程池，一次同时发出m个请求

  由于法4会出现数据倾斜，所以一般不建议使用，建议使用**法3**

  Spring提供的RedisTemplate使用法3解决了集群下的批处理问题，方法为：**multiSet  multiGet**  **(适用于String类型)**

---

#### 服务端优化

##### 持久化配置

- Redis持久化虽然可以保证数据安全，但也带来很多额外开销，因此持久化遵循以下建议

  1. 用来做缓存的Redis实例尽量不要开启持久化功能  — 为分布式锁等模块开启持久化

  2. 建议关闭RDB持久化功能，使用**AOF（数据安全性高、不易丢失数据、数据一致性高）**

  3. 利用脚本定期在slave结点做RDB（bgsave），实现**数据备份**

  4. 设置AOF合理的**rewrite阈值**，避免频繁rewrite

  5. 配置`no-appendfsync-on-rewrite=yes`,禁止在rewrite期间做AOF，避免因AOF引起的阻塞

     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260727161652345.png" alt="image-20260727161652345" style="zoom:50%;" /> 

     如图所示，主线程在接收到写操作时，会将命令写入AOF缓冲区，此时AOF缓冲区会做两件事

     1. 刷盘`fsync`，将新增写操作刷入AOF文件
     2. 对比刷盘时间，若上次刷盘时间过长则会代表上次的数据还未成功写入AOF文件，会阻塞等待刷盘结束再通过该命令以保证数据安全

     由此可知，如果在rewrite期间做AOF会**导致主线程被rewrite占用，刷盘会被阻塞，导致主线程阻塞** 

---

##### 慢查询

- 在Redis执行时耗时超过某个阈值的**命令（包括查询和修改等）**，成为慢查询

  ![image-20260727162628365](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260727162628365.png)

  由于Redis是单线程的，所以当同一时间有多个命令时，会将命令存入队列，当某个命令执行时间过长时，会导致队列中的命令由于等待时间过长而报错



- 慢查询的配置

  `redis.config`中 通过`slowlog-log-slower-than` 设定慢查询阈值，默认值为10000 建议 1000

  `slowlog-max-len` ：慢查询日志（本质是一个队列）的长度，默认128 建议1000

---

#### 命令及安全配置

- Redis会绑定在0.0.0.0:6379，这样Redis会暴露在公网上，而Redis如果**没有做身份认证（设置密码）**，会出现很严重的安全漏洞



- 为避免漏洞，给出一些建议

  ① Redis 一定要设置密码 

  ② 禁止线上使用下面命令：keys、flushall、flushdb、config set 等命令。可以利用 rename-command 禁用。

  ③ bind：限制网卡，禁止外网网卡访问 

  ④ 开启防火墙

  ⑤ 不要使用 Root 账户启动 Redis 

  ⑥ 尽量不要使用默认的端口

---

#### 内存配置

- Redis内存不足时，可能导致Key频繁被删除、响应时间变长、QPS不稳定等问题。当内存使用率达到90%以上时就需要注意并快速定位到内存占用原因

  ![image-20260727164831569](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260727164831569.png)



- Redis提供了一些命令，可以查看到Redis目前内存分配状态
  - info memory
  - memory xxx —  memory status



- 内存缓冲区可以分为三种

  - 复制缓冲区：主从复制的`repl_backlog_buf`，如果**太小可能导致频繁的全量复制**，影响性能。可以通过`repl-backlog-size`设置，默认为1mb

  - AOF缓冲区：AOF刷盘前的缓存区域，AOF执行rewrite的缓冲区。无法设置容量上限（无上限）

  - 客户端缓冲区：分为输入缓冲区和输出缓冲区，输入缓冲区最大为1G且无法修改，输出缓冲区可以设置

    ![image-20260727165911438](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/redis/image-20260727165911438.png)

  可以使用clients list命令列出连接客户端信息进行判断到底是哪个客户端出现了问题

---

#### 集群和主从

- **集群完整性问题**

  在Redis的默认配置中，如果发现任意一个插槽不可用，则整个集群都会停止对外服务。

  为了保证高可用性，建议将配置文件中`cluster-require-full-coverage`配置为 no



- **集群带宽问题**

  集群中没有哨兵，集群结点之间会**不断互相ping**来确定集群中其他结点的状态。当结点过多时频繁的ping携带大量数据会**占满网络带宽**

  - 解决方法
    1. 避免大集群，集群节点数不要太多，若业务庞大，则建立多个集群
    2. 避免单个物理机中运行太多Redis实例
    3. 配置合适的`cluster-node-timeout`值  —  ping的时间间隔是该值的$1/2$

  

- **数据倾斜问题**

    数据出现BigKey或集群批处理时使用了相同的hash_tag，都会造成数据倾斜问题。



- **客户端性能问题**

  一旦做了集群，将来客户端不管是利用Jedis还是lettuce，在访问集群的时候都需要在集群中做节点的选择、读写分离的判断、插槽的判断等等，势必会给客户端性能带来一些影响。

    

- **命令的集群兼容性问题**

    当使用批处理的命令时，redis要求key必须落在相同的slot上，然后大量的key同时操作是无法完成的，客户端必须要对这样的数据进行处理具体参考批处理优化部分。



- **lua和事务问题**

    lua和事务都是要保证原子性，如果key不在一个节点，那么无法保证lua的执行和事务的特性，所以在集群模式无法执行lua和事务。



- **集群和主从的选择**：单体Redis（主从Redis）已经能达到万级别的QPS，并且也具备很强的高可用特性。如果主从能满足业务需求，尽量使用主从。不到万不得已，尽量不要搭建Redis集群。







