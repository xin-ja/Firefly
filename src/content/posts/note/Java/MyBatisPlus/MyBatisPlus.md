\---

title: MyBatisPlus

published: 2026-08-08

description:  MyBatisPlus

tags: [ MyBatisPlus]

category:  MyBatisPlus

draft: false

\---

# MyBatisPlus

## 入门

### 入门案例

1. 引入MP依赖，使用MP的依赖替代MyBatis的依赖

   ```xml
           <!--MybatisPlus-->
           <dependency>
               <groupId>com.baomidou</groupId>
               <artifactId>mybatis-plus-boot-starter</artifactId>
               <version>3.4.3</version>
           </dependency>
   ```

   

2. 自定义的Mapper继承MP提供的**BaseMapper接口**，BaseMapper中提供了许多简单的方法

   ```java
   public interface UserMapper extends BaseMapper<User> 
   ```

3. 直接调用方法

   ```：java
   userMapper.insert(user);
   User user = userMapper.selectById(5L);
   List<User> users = userMapper.selectBatchIds(List.of(1L, 2L, 3L, 4L));
   userMapper.updateById(user);
   userMapper.deleteById(5L);
   ```

---

### 常见注解

- MyBatisPlus通过**扫描实体类**，并基于**反射**获取**实体类信息**作为**数据库表信息**，所以我们需要将类中以下元素与数据库表对齐
  1. **类名**的驼峰转下划线作为**表名** 
  2. 名为**id**字段作为**主键** 
  3. **变量名**驼峰转下划线作为**表的字段名**



- 上述为具体约定，当然我们也可以使用注解来指定对应关系

  1. @TableName：用来指定**表名**

     ```java
     @TableName("表名")
     ```

     

  2. @TableId：用来指定表中**主键字段** 

     ```java
     @TableId(value="",type=IdType. )
     ```

     - Idtype的取值有以下几种
       1. AUTO：主键自增
       2. INPUT：主键需要自己set
       3. ASSIGN_ID：分配ID 基于内部接口IdentifierGenerator中的nextId来生成id，默认实现为**雪花算法**

  3. @TableField：用来指定表中**普通字段**

     ```java
     @TableField("")
     ```

     - 使用场景

       1. 成员变量名与数据库字段不一致

       2. 成员变量名**以is开头**，且是**布尔类型**

       3. 成员变量名与**数据库关键字冲突** — 如：order（与ORDER BY冲突）

          ```java
          @TableField("`order`")
          //``用于转义
          ```

       4. 成员变量**不是数据库字段**

          ```java
          @TableField(exist = false)
          ```

---

### 常见配置

- 在application.yaml中MP支持自定义配置，MP的配置继承了MyBatisPllus原生配置和一些自己特有的配置

  ```yaml
  mybatis-plus:
    type-aliases-package: com.itheima.mp.domain.po #别名扫描包 这样一来在po下的实体类在Mapper.xml映射文件中就可以不用写全类名了
    mapper-locations: classpath*:/mapper/**/*.xml #指定Mapper.xml文件路径
    configuration:
      map-underscore-to-camel-case: true #开启驼峰下划线映射
      cache-enabled: false #二级缓存，一般不开
    global-config:
      db-config:
        id-type: assign_id #id为雪花算法生成
        update-strategy: not_null #update策略：只更新非空字段
  ```

  其中大部分的配置都有默认值，不用配

  Tip：MP更适合单表查询的简化，一些多表联查等复杂查询还是需要xml映射

---

## 核心功能

### 条件构造器

- MP支持各种复杂的where条件，通过**条件构造器（Wrapper）**构造

  1. 查询名字中带o的，存款大于等于1000元的人的id、username、info、balance字段

     ```java
             //构建查询条件
             QueryWrapper<User> queryWrapper = new QueryWrapper<User>()
                         .select("id","username","info","balance")
                                 .like("username","o")
                                         .ge("balance",1000);
             List<User> users = userMapper.selectList(queryWrapper);
             users.forEach(System.out::println);
     ```

     

  2. 更新用户名为jack的用户余额为2000

     ```java
             //1.要更新的数据
             User user = new User();
             user.setBalance(2000);
             //2.查询条件
             QueryWrapper<User> wrapper = new QueryWrapper<User>().eq("username","jack");
             userMapper.update(user,wrapper);
     ```

  

  3. 更新id为1，2，4的用户余额扣200

     ```java
             List<Long> ids = List.of(1L,2L,4L);
             UpdateWrapper<User> updateWrapper = new UpdateWrapper<User>()
                     .setSql("balance=balance-200")
                     .in("id",ids);
             userMapper.update(null, updateWrapper);
     ```

  上述Wrapper写字段名时都直接采用硬编码，开发规范中不太建议，LambdaWrapper就用于解决硬编码问题

  ```java
          LambdaQueryWrapper<User> lambdaQueryWrapper = new QueryWrapper<User>().lambda()
                  .select(User::getId, User::getUsername,User::getInfo,User::getBalance,User::getCreateTime)
                  .like(User::getUsername,"o")
                  .ge(User::getBalance,2000);
          List<User> users = userMapper.selectList(lambdaQueryWrapper);
  ```

---

### 自定义SQL

- 可以利用MP的Wrapper来构建复杂的where条件，然后自己定义SQL语句剩下的部分

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mybatis-plus/image-20260730141457183.png" alt="image-20260730141457183" style="zoom:33%;" />

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mybatis-plus/image-20260730141702178.png" alt="image-20260730141702178" style="zoom: 33%;" />

---

### Service接口

- IService接口

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mybatis-plus/image-20260730142140390.png" alt="image-20260730142140390" style="zoom: 25%;" />

  基本上和BaseMapper一致

  save用于新增   remove用于删除   update用于更新  get用于单个查询  list用于多个数据查询  page用于分页查询  lambda用于复杂查询条件的拼接

- IService接口的继承

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mybatis-plus/image-20260730142928168.png" alt="image-20260730142928168" style="zoom:50%;" /> 

  1. 自定义接口需要继承IService接口

     ```java
     public interface IUserService extends IService<User> 
     ```

     

  2. 我们自定义接口的实现类需要继承IService的实现类

     ```java
     public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements IUserService 
     ```

      

  3. 注入自定义的Service就可以直接用了

     ```java
         @Autowired
         private IUserService userService;
     ```

     ```java
             User user = userService.query().eq("username", "Lilei").one();
             System.out.println(user);
     ```

 

- MP的Service在Controller中的注入

  IDEA不建议使用@Autowired自动注入，而建议使用构造函数注入

  对此我们可以使用Lombok+final修饰词完成

  ```java
  @RequiredArgsConstructor //Lombok注释，只会对必须构造的变量提供构造函数
  private final IUserService userService;//final修饰，该变量必须构造
  ```



- 注入后，对于**简单的操作**我们可以直接使用MP的Service直接在Controller层使用

  ```java
      @PostMapping
      public void save(@RequestBody UserFormDTO userFromDTO){
          User user = BeanUtil.copyProperties(userFromDTO, User.class);
          userService.save(user);
      }
  
      @DeleteMapping("/{id}")
      public void deleteById(@PathVariable Long id){
          userService.removeById(id);
      }
      
      @GetMapping("/{id}")
      public UserVO getById(@PathVariable Long id){
          User user = userService.getById(id);
          UserVO userVO = BeanUtil.copyProperties(user, UserVO.class);
          return userVO;
      }
      
      @GetMapping
      public List<UserVO> list(@RequestParam("ids") List<Long> ids){
          List<User> users = userService.listByIds(ids);
          return BeanUtil.copyToList(users, UserVO.class);
      }
  
  ```



- 使用Service中的lambda实现动态SQL

  查询动态SQL

  ```java
  lambdaQuery().like(name!=null,User::getUsername,name);
  lambdaQuery().gt(min!=null,User::getBalance,min).lt(max!=null,User::getBalance,max).list();
  ```

  更新动态SQL

  ```java
          lambdaUpdate()
                  .set(User::getBalance,remainMoney)
                  .set(remainMoney==0,User::getStatus,2)//set
                  .eq(User::getId,id)//where
                  .eq(User::getBalance,user.getBalance())//CAS乐观锁
                  .update();//update
  ```



- Service中的批处理（批量插入）
  1. 开启rewriteBatchedStatements=true，jdbc的配置，开启后进行批处理时会对批处理的SQL语句进行处理，加快效率
  2. 将大量数据分批次加入list集合中，调用Service中的saveBatch方法进行一次性的插入

---

## 扩展功能

### 代码生成器

- 上述MP代码都很像，可以使用MP的API自动生成。也可以使用插件自动生成。

- 插件的使用

  1. 下载插件（MyBatisPlus为例）

     ![image-20260730155829643](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mybatis-plus/image-20260730155829643.png) 下载好后有这俩选项

  2. 先进行数据库的选择

     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mybatis-plus/image-20260730160103533.png" alt="image-20260730160103533" style="zoom:50%;" />  

  3. 进行代码生成选项选择

     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mybatis-plus/image-20260730160905985.png" alt="image-20260730160905985" style="zoom:50%;" />

     选好后点code generatro

---

### 静态工具

- 与IService中的方法类似，不过Db静态工具的方法都是静态的

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mybatis-plus/image-20260730161346069.png" alt="image-20260730161346069" style="zoom: 67%;" />

  用于解决循环依赖的问题，当会出现循环依赖时，使用静态工具进行查询

  循环依赖：MP的的Service将Mapper层的活给压缩到了Service上，这就可能会导致A业务需要查B的表，同时B需要查A的，那么就要在A中注入B的MPService依赖且在B中注入A的MPService依赖

---

### 逻辑删除

- 有些字段只想要进行逻辑上的删除，如订单，商家在日后会进行统计，所以不可删除。对此可以使用逻辑删除

  逻辑删除：在表中添加一个字段，用于标记数据的状态（有无被删除），删除时只要去更新此字段的值即可

  ```sql
  UPDATE user SET delete = 1 WHERE id = 1 AND delete=0;
  SELECT * FROM user WHERE delete=0;
  ```



- MP中逻辑删除的实现

  只需在application.yaml配置文件中进行设置，MP底层会自动帮我们修改CRUD语句实现逻辑删除

  ```yaml
  mybatis-plus:
    global-config:
      db-config:
        logic-delete-value: delete #需要实行逻辑删除的字段名
        logic-delete-field: 1 #逻辑已删除的值
        logic-not-delete-value: 0 #逻辑未删除的值
  ```

  修改后CRUD所调用的函数都不需要变化

---

### 枚举处理器

- 对于一些状态，Java中可以使用枚举类进行标识。但是存入数据库时需要将枚举类转换为相对应的类型（如：INT）存入。**MyBatis**中有各种处理器帮助我们实现各种数据的自动转换，但是其枚举处理器写的不是很好。**MP**在其基础上进行扩展，其中就写了一个**新的枚举处理器**



- 我们需要告诉MP哪个类的成员变量是枚举的，这样之后就会对其进行自动转换

  1. 直接在那个变量上加上**@EnumValue**注解  **（标注Java —> 数据库的字段）**

     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mybatis-plus/image-20260730163738178.png" alt="image-20260730163738178" style="zoom:50%;" />

  2. 配置文件中开启MP的枚举处理器

     ```yaml
     mybatis-plus:
       configuration:
         default-enum-type-handler: com.baomidou.mybatisplus.core.handlers.MybatisEnumTypeHandler
     ```

  3. 在向前端返回JSON数据时，也会对枚举数据类型进行处理，自动返回枚举名（NORMAL、FREEZE）

     若想要返回value或者desc需要在对应变量上面加上**@JsonValue**注解 **（标注Java —> 前端的字段）**

---

### JSON处理器

- 在MySQL中是有JSON类型的，但Java中没有。在Java中，可以直接使用String去记录JSON，但这样不够灵活，当想要修改JSON里的数据时每次都要**手动**反序列化成对象修改再序列化存入；**MP**中提供了JSON处理器，开启后MP会**自动**去实现序列化和反序列化。如此一来我们可以直接将对应JSON格式定义为一个对象，由MP完成类型的转换



- 实现

  1. 在对应的成员变量上加上**@TableField(typeHandler=JacksonTypeHandler.class)** (typeHandler还可以是别的)，用于指定该成员需要进行JSON的转换

     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mybatis-plus/image-20260730165550142.png" alt="image-20260730165550142" style="zoom:33%;" />

  2. 在**@TableName**的注解上加上**autoRedultMap=true**属性,开启自动的ResultMap映射

     ![image-20260730165717608](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mybatis-plus/image-20260730165717608.png)

---

## 分页插件功能

- MP提供了很多插件功能，其中最常用的就是分页插件

### 基本用法

1. 在配置类中注册MP的拦截器，并向拦截器中添加分页插件

   ```java
   @Configuration
   public class MyBatisConfig {
   
       @Bean
       public MybatisPlusInterceptor mybatisPlusInterceptor() {
           //1.创建拦截器
           MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
   
           //2.创建分页插件
           PaginationInnerInterceptor paginationInnerInterceptor = new PaginationInnerInterceptor(DbType.MYSQL);
           paginationInnerInterceptor.setMaxLimit(1000L);//可以对插件进行一些配置
           //3.添加插件
           interceptor.addInnerInterceptor(paginationInnerInterceptor);
   
           return interceptor;
       }
   
   }
   ```

2. 进行分页查询

   ```java
           //准备分页条件
           int curPage = 1;//当前页
           int pageSize = 10;//一页的大小
           //设置分页参数
           Page<User> pageCondition = new Page<>(curPage, pageSize);
           //设置排序条件
           pageCondition.addOrder(OrderItem.desc("id"));
   
           //查询   后面还可以跟第二个参数：Wrapper，进行分页条件查询
           //Wrapper可以使用LambdaWrapper进行动态SQL查询
           Page<User> res = userService.page(pageCondition);
   	
   		//或者可以用lambdaQuery进行条件分页查询
   		// userService.lambdaQuery().中间衔接查询条件.page(pageCondition);
   
           //解析分页结果
           long total = res.getTotal();//记录总条数
           long pages = res.getPages();//总页数
           List<User> records = res.getRecords();//分页结果
   ```

