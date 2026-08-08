\---

title: Rocket MQ

published: 2026-08-08

description:  Rocket MQ

tags: [ Rocket MQ]

category:  Rocket MQ

draft: false

\---

# Rocket MQ

## MQ简介

- Message Queue（消息队列），是在消息传输过程中保存消息的容器。多用于**分布式系统间的通信**。

  - 优

    1. 应用解耦

       加入MQ后，**消费者与生产者之间互不影响**，消费者只负责从MQ中拿消息，生产者只负责向MQ中存消息

    2. 异步提速

       生产者发完消息后，可以继续执行自己的业务逻辑，不用等待消费者同步完成业务

    3. 削峰填谷

       如：**秒杀**场景时，会**对数据库造成巨大的压力**，此时生产方可以将消息存入MQ（如存了10万条/秒），消费方再逐量从MQ中取（每秒取1万条）

       ![image-20260728103735977](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mq/image-20260728103735977.png)

       

  - 缺：

    1. 系统可用性降低

       系统引入外部依赖越多，系统稳定性越差。一旦MQ宕机，就会对业务造成影响

       - **如何保证MQ的高可用？**

    2. 系统复杂度提高

       加入MQ后需进行异步调用，增加了系统复杂度

       - **如何保证消息没有被重复消费？怎么处理消息丢失情况？如何保证消息传递的顺序性？**

    3. 一致性问题

       加入MQ后为**异步处理数据**，生产方将消息存入MQ后就可以通知用户下单成功，但是下单的消息并未写入到数据库，后续写入过程中有可能会失败，导致数据不一致

       - **如何保证数据处理的一致性？**

---

## Rocket MQ工作原理

环境有以下三个角色  **Producer、Broker、Consumer**  ，其中Broker是部署者Rocket MQ的机器   

在Broker和Consumer之间有着一个长连接的**监听器**，用于监听Broker中是否有消息

当三个角色都被部署成**集群**时，Producer在向Broker存消息前还需向**命名服务器集群**（存储着多个Broker的ip）发送消息以**获取Broker信息**  ；同理，Consumer也需从命名服务器获取Broker的ip

![image-20260728115251445](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mq/image-20260728115251445.png)

**命名服务器集群**：类似于大脑，各个机器都需在命名服务器上注册，并采用**心跳机制**定期向命名服务器集群发送消息，用以**监控健康状态**。类似于**Redis中的哨兵**

在Rocket MQ中存储的消息被封装为一个**对象**，Message为消息本体，Topic和Tag用于对**消息进行分类**

命名服务器集群负责统一管理这些消息的去处，实现类似**“负载均衡”**的效果

---

## Rocket MQ的启动命令

- 配置环境变量
  1. ROCKETMQ_HOME：D:\RocketMQ\rocketmq-all-5.3.4-bin-release
  2. NAMESRV_ADDR：localhost:9876



- 下面的操作都需切换到rocketmq的bin目录下

  - 启动namesrv(命名服务)

    ```cmd
    start mqnamesrv.cmd
    ```

  - 启动broker（经纪人）

    ```cmd
    start mqbroker.cmd -n 127.0.0.1:9876 autoCreateTopicEnable=true
    ```

  - 测试

    ```cmd
    tools.cmd org.apache.rocketmq.example.quickstart.Producer
    ```

---

## Rocket MQ Demo

- 一对一模式

  1. 引入依赖

     ```xml
             <dependency>
                 <groupId>org.apache.rocketmq</groupId>
                 <artifactId>rocketmq-client</artifactId>
                 <version>5.3.4</version>
             </dependency>
     ```

  2. 编写生产者

     ```java
     //生产者Demo
     public class ProducerDemo {
     
         public static void main(String[] args) throws MQClientException, MQBrokerException, RemotingException, InterruptedException {
             //1.创建生产者对象
             DefaultMQProducer producer = new  DefaultMQProducer("ProducerGroup");
     
             //2.设置命名服务器的端口，后续要向它请求brokerIp
             producer.setNamesrvAddr("localhost:9876");
     
             //3.启动生产者
             producer.start();
     
             //4.发送消息
             SendResult res = producer.send(new Message("topic1", "tag1", "Hello RocketMQ".getBytes()));
     
             //处理返回值
             System.out.println(res);
     
             //5.释放资源
             producer.shutdown();
     
         }
     
     }
     ```

  3. 编写消费者

     ```java
     public class ConsumerDemo {
         public static void main(String[] args) throws MQClientException {
             //1.创建消费者
             //tip:消费者有两种DefaultMQPushConsumer、DefaultMQPullConsumer
             //由于Pull拉取的方式消耗资源过多，已被废弃
             DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("ConsumerGroup");
     
             //2.设置命名服务器端口
             consumer.setNamesrvAddr("localhost:9876");
     
             //3.指定监听的队列(订阅队列)
             //此处监听topic1中的所有tag  subExpression支持使用通配符
             consumer.subscribe("topic1", "*");
     
             //4.注册一个消息的监听者，并制定接收到消息后的业务逻辑
             //MessageListenerConcurrently是一个接口，此处创建匿名内部类or Lambda
             consumer.registerMessageListener(new MessageListenerConcurrently() {
                 @Override
                 public ConsumeConcurrentlyStatus consumeMessage(List<MessageExt> msgs, ConsumeConcurrentlyContext context) {
                     for (MessageExt msg : msgs) {
                         //getBody拿出来的是byte[]  此处转换为String再打印
                         System.out.println(new String(msg.getBody()));
                     }
     
                     //返回枚举类的信息（成功or稍后再试）
                     return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
                 }
             });
     
             //5.启动消费者
             consumer.start();
     
             //消费者无需释放 --- 消费者要一直监听消息队列
     
         }
     }
     
     ```

     

---

## 多消费者模式

- 分布式模式下，会出现多个消费者监听一个消息队列以提升业务处理的效率



- 为模拟上述情况，Demo代码不变，Prodecuer循环发送**十条消息**，并且用**两个Consumer**去监听消息队列时。

  - 两个消费者在**同个消费者组**时，消息会被负载均衡，每个Consumer会分配到**5条消息**，**消息不会被重复消费**
  - 两个消费者在**不同消费者组**时，每个Consumer会接收到**10条消息**，**消息可以被重复消费** 

  综上，**消息是否可被重新消费取决于消费者是否同组** 。如此就可以实现

  1. 同一个业务的消费者分到同一组可以加快消息处理的效率。
  2. 不同业务的消费者组都可以收到完整的消息



- 原理：RocketMQ将消息发至对应Topic中时，会将消息进行复制，每有一个组就进行一次复制，使得**每个消费者组都可以得到完整的消息**。当消费者组得到完整消息后，**消息就会负载均衡到组内的每一个消费者**



- 若想要**同一个组内的所有消费者都能收到所有的消息**而非负载均衡平均分配，可以使用**setMessageModel()方法**设置模式

  ```java
  consumer.setMessageModel(MessageModel.BROADCASTING);//广播模式
  ```

  ![image-20260728141557483](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mq/image-20260728141557483.png) 

  如图：默认为clustering模式（集群，负载均衡），broadcast（广播模式）

---

## 消息类别

### 同步消息

- 特征：即时性较强，需要立即知道发送是否成功，例如短信、转账通知等

  原先Demo中的消息都是同步消息，即发送完立马可以得到result

---

### 异步消息

- 特征：即时性较弱，无需立即知道是否发送成功，但后续必须要有result返回，例如订单中的某些信息



- 异步消息的Demo

  ```java
          //异步消息
          producer.send(new Message("topic1", "Hello World".getBytes()),
                  new SendCallback() {
                      @Override
                      //发送成功的回调方法
                      public void onSuccess(SendResult sendResult) {
                          System.out.println(sendResult);
                      }
  
                      @Override
                      //发送失败的回调方法
                      public void onException(Throwable e) {
                          System.out.println(e);
                      }
                  });
  ```

  异步消息在发送时需要传递一个**回调函数**。当异步消息发送出去后会继续向下执行业务代码，等到消息发送的结果返回时会调用回调函数

---

### 单向消息

- 特征：无需知道是否发送成功，例如日志消息

- 单项消息Demo

  ```java
          //单向消息
          producer.sendOneway(new Message("topic1", "Hello World".getBytes()));
  ```

---

### 延时消息

- 特征：消息发送时并不直接发送到消息服务器，而是**根据设定的等待时间到达**，起到延时到达的**缓冲作用**

- 延时消息Demo

  ```java
          //延时消息
          Message message = new Message("topic1", "Hello World".getBytes());
          //设置延时等级
          message.setDelayTimeLevel(1);
          //设置具体延迟时间ms
          message.setDelayTimeMs(10);
          //设置具体延迟时间s
          message.setDelayTimeSec(10);
          //设置具体送达时间
          message.setDeliverTimeMs(System.currentTimeMillis()+10*1000);
          producer.send(message);
  ```

  以上四种延时方法选一种即可

---

### 批量消息

- 特征：批处理发送消息，节约网络传输开销



- 批量消息的Demo

  ```java
          //批量消息
          List<Message> msgs = new ArrayList<>();
          Message m1 = new Message("topic1", "Hello World1".getBytes());
          Message m2 = new Message("topic1", "Hello World2".getBytes());
          Message m3 = new Message("topic1", "Hello World3".getBytes());
  
          msgs.add(m1);
          msgs.add(m2);
          msgs.add(m3);
          
          producer.send(msgs);
  ```

  实际上就是**发送一个消息集合**，批量消息还可以搭配异步



- 注意点

  1. 批量消息应该有相同的topic

  2. 相同的waitStoreMsgOK

  3. 批量消息不能是延时消息

  4. 消息内容总长度不能超过**4M**

     **消息内容长度：topic+body+消息追加属性（key与value对应的字符串字节数）+日志（固定20字节）**

---

## 消息的过滤

### tag过滤

- 消费者在订阅队列时，第二个参数可以传递一个**subExpression表达式**，用来过滤同个Topic下的不同tag

  ```java
  consumer.subscribe("topic1", "*");
  consumer.subscribe("topic1", "tag1||tag2");
  ```

  Tip：表达式**只支持以上两种写法**，不支持“tag*”这样的模糊匹配

---

### SQL过滤

- 消息可以设置追加属性

  ```java
  //Producer中添加属性
  
          //消息可以追加属性
          Message m1 = new Message("topic1","tag1", "Hello World1".getBytes());
          m1.putUserProperty("age", "17");
          Message m2 = new Message("topic1", "tag1","Hello World2".getBytes());
          m2.putUserProperty("age","20");
  
          SendResult res = producer.send(m1);
          SendResult res1 = producer.send(m2);
  ```

- 在**Consumer**中可以利用**类似SQL语法的语法**去进行过滤

  ```java
          //按照SQL过滤
          consumer.subscribe("topic1", MessageSelector.bySql("age > 18"));
  ```



- 注意

  SQL过滤默认是没有开启的，需要在**broker.conf**配置文件中添加`enablePropertyFilter=true`将其开启才可以正常使用该功能

  添加配置后重启broker需要添加以下参数

  ```cmd
  start mqbroker.cmd -n 127.0.0.1:9876 autoCreateTopicEnable=true -c ..\conf\broker.conf
  # -c强制读取配置文件
  ```

---

## SpringBoot中集成RocketMQ

### Demo

1. 导入依赖

   ```xml
           <dependency>
               <groupId>org.apache.rocketmq</groupId>
               <artifactId>rocketmq-spring-boot-starter</artifactId>
               <version>2.3.1</version>
           </dependency>
   ```

2. 在application.yaml中配置**命名服务器端口与生产者组**

   ```yaml
   rocketmq:
     name-server: localhost:9876
     producer:
       group: demo_producer
   ```

3. 注入**RocketMQTemplate模板类**（用于连接和断连）并编写demo

   ```java
       @Autowired
       private RocketMQTemplate rocketMQTemplate;
   
       @GetMapping("/send")
       public String send() throws InvalidProtocolBufferException {
           String msg = new String("Hello MQWithSpringBoot");
           //自动将消息转化为字节数组并向topic1发送消息
           rocketMQTemplate.convertAndSend("topic1", msg);
           //若向要指定tag，需要用:隔开
           //rocketMQTemplate.convertAndSend("topic1:tag1", msg);
   
           return "success!";
       }
   ```

4. 除此之外，convertAndSend 还可以**序列化对象并传输** 

   注意：在网络中传输对象前必须对其进行**序列化**，对象类必须实现**Serializable接口**

   **Serializable接口：标记型接口，无重写方法，用于标记该类允许被序列化** 

   ```java
   //User类
   public class User implements Serializable {
       private String name;
       private String age;
   ```

   ```java
   //传输实体类
           User u = new User("zhangsan",18);
           rocketMQTemplate.convertAndSend("topic2", u);
   ```

5. 消费者的接收

   1. 将Consumer交给IOC容器管理
   2. 使用@RocketMQMessageListener注解指定topic、group、tag

   ```java
   @Service
   @RocketMQMessageListener(topic = "topic2",consumerGroup = "group1")
   //若想要指定tag
   //@RocketMQMessageListener(topic = "topic1",consumerGroup = "group1",selectorExpression = "*")
   public class DemoConsumer implements RocketMQListener<User> {
       
       @Override
       public void onMessage(User message) {
           //业务逻辑
           System.out.println(message);
       }
   }
   
   ```

---

### 其他操作的集成

- 发送同步消息

  ```java
  		//同步发送
          rocketMQTemplate.syncSend("topic",u);
  ```

- 异步发送

  ```java
          //异步发送
          rocketMQTemplate.asyncSend("topic",u, new SendCallback() {
              @Override
              public void onSuccess(SendResult sendResult) {
                  System.out.println(sendResult);
              }
  
              @Override
              public void onException(Throwable e) {
                  System.out.println(e);
              }
          });
  ```

- 单向消息发送

  ```java
  		rocketMQTemplate.sendOneWay("topic", u);
  ```

- 延迟发送

  ```java
  		//延迟发送
  		rocketMQTemplate.syncSendDelayTimeSeconds("topic",u,20*1000);
  ```

- 批量发送

  ```java
          List<User> list = new ArrayList<>();
          list.add(u);
          rocketMQTemplate.syncSend("topic3", list);
  ```

- SQL过滤

  ```java
  @RocketMQMessageListener(topic = "topic2",consumerGroup = "group1",selectorType = SelectorType.SQL92,selectorExpression = "age>18")
  ```

- 改变消息接收模式

  ```java
  @RocketMQMessageListener(topic = "topic2",consumerGroup = "group1",messageModel = MessageModel.BROADCASTING)
  ```



---

## 消息的特殊处理

### 消息顺序

- 默认情况下，一个topic会生成**四个消息队列**

- 消息传输过程中可能会错乱

  - 消息错乱原因

    并发情况下，在一个订单创建的过程中会有其他订单也在创建，如此一来无法控制存入消息队列的顺序

    RocketMQ 只保证：同一个队列（MessageQueue）内的消息严格先进先出；**不同队列之间消息完全无序。** 

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mq/image-20260728192321745.png" alt="image-20260728192321745" style="zoom: 33%;" /> 

  - 解决方法

    让同一笔订单的消息进入同一个队列，使得同一笔订单的不同消息**在同一队列内排序。**

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mq/image-20260728192458427.png" alt="image-20260728192458427" style="zoom:33%;" />

    1. 生产者方：可以在存入消息的时候传入一个**MessageQueueSelector(接口)的实现类** ，重写其中的队列选择方法，如此一来，每当要发送一个消息之前，都会**根据重写的方法去选择存入哪个队列**。我们只需自定义算法，确保同一笔订单的消息进入同一个队列即可

       > 在RocketMQ原生的API中**MessageQueueSelector**是在调用send()方法时传入的一个参数
       >
       > 而在SpringBoot中，可以通过**setMessageQueueSelector（）** 来设置队列选择器
       >
       > ```java
       >         rocketMQTemplate.setMessageQueueSelector(new MessageQueueSelector() {
       >             @Override
       >       //mqs为存储队列的集合可以通过mqs.size()获取有几条队列  通过mqs.get(idx)获取指定队列
       >       //msg为要发送的消息
       >       //arg为专门用于路由运算的数据，如业务的key（orderid/userid等）
       >             public MessageQueue select(List<MessageQueue> mqs, Message msg, Object arg) {
       >                 return mqs.get(?);
       >             }
       >         });
       > ```

    2. 消费者方

       原生API：注册**MessageListenerOrderly**。

       在SpringBoot中被集成为注解中的**consumerMode参数** 

       ```java
       @RocketMQMessageListener(topic = "topic2",consumerGroup = "group1",consumeMode = ConsumeMode.ORDERLY)
       
       ```

       

       > **一条队列只会被分配给一个消费组中的一个消费者**
       >
       > MessageListenerOrderly与[RocketMQ Demo](#Rocket MQ Demo)中的MessageListenerConcurrently对比
       >
       > Concurrently在拿到队列时会直接开启**多线程去处理队列信息**，如此一来消息就会乱掉
       >
       > Orderly在拿到队列后会先获取**锁**，保证线程的**串行执行**，如此消息就不会乱了

---

### 事务消息

- 概念

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mq/image-20260728201647345.png" alt="image-20260728201647345" style="zoom:33%;" /> 

  > 一同执行本地数据库操作和MQ消息发送操作两个操作。
  >
  > 1. **通过数据库事务的原子性保证 MQ消息发送的原子性**
  > 2. **向本地数据库存入订单数据备份，以确保消息不丢失**

  1. MQ发送half消息

     **half消息**：将消息完整地发给Broker，但是Broker并不会将其放入队列（消费者无法消费）

  2. Broker接收到half消息后返回OK

  3. 生产者操作数据库，开启事务

  4. 根据事务的成功或失败，向Broker发送**提交或回滚**。若事务成功Broker将消息加入队列；若事务失败Broker将消息删除

  - 事务补偿机制：若执行本地事务的过程中发生**宕机、网络阻塞等情况**，会导致Broker收不到提交或回滚信息，此时触发事务补偿机制
    5. Broker向生产者发送未收到4的确认
    6. 生产者检测本地事务状态
    7. 检测后再向Broker发送事务的状态

- 实现

  ```java
          //1.事务消息使用的时事务消息生产者TransactionMQProducer
          TransactionMQProducer producer = new TransactionMQProducer("group1");
          producer.setNamesrvAddr("localhost:9876");
  
          //2.设置事务的监听
          producer.setTransactionListener(new TransactionListener() {
              @Override
              //执行本地事务的逻辑（对应步骤3）
              public LocalTransactionState executeLocalTransaction(Message msg, Object arg) {
                  //将消息保存到本地数据库
                  //....
  
                  //正常提交则返回COMMIT_MESSAGE状态
                  //中途若抛出异常还可以用try catch包围并返回LocalTransactionState.ROLLBACK_MESSAGE 或 UNKNOW
                  System.out.println("正常事务过程");
                  return LocalTransactionState.COMMIT_MESSAGE;
              }
  
              @Override
              //抛异常时的检查（事务补偿）
              public LocalTransactionState checkLocalTransaction(MessageExt msg) {
                  System.out.println("事务补偿检查");
  
                  //通过sql去数据库中查询数据是否存入成功
                  //若成功
  //                return  LocalTransactionState.COMMIT_MESSAGE;
                  //若失败
                  return LocalTransactionState.ROLLBACK_MESSAGE;
              }
          });
  
          String msg = "ABC";
          Message message = new Message("topic10", "tag1", msg.getBytes());
          //发送事务消息
          producer.sendMessageInTransaction(message,null);
  ```

---

## 集群

- 多个**主从结点**构成一个集群

  - master和slave消息同步方式为同步（性能低、一致性高）

    每有一条消息就进行一次同步，网络传输开销过大

  - master和slave消息同步方式为异步（性能高、一致性较低）

    先存在缓存里，等到消息够多再一次性同步



- MQ分为nameserver服务器和broker服务器。

  nameserver服务器部署成集群后各服务器之间比较独立，**无主从关系**

  broker服务器部署成集群后需要指定归属的集群名（brokerName）和集群Id（只有集群Id为0的才会成为master），**有主从关系**

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mq/image-20260729105146872.png" alt="image-20260729105146872" style="zoom: 25%;" />

- 工作流程

  ![image-20260729105410706](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mq/image-20260729105410706.png)

---

## 高级特性

### 消息的存储

1. 生产者向MQ（Broker）发送消息
2. MQ接收到消息，将消息进行**持久化**，将数据刷盘**存入磁盘中**
3. MQ返回ACK给生产者，表示消息发送成功
4. MQ将消息推送给消费者
5. 消费者消费消息后返回ACK给MQ，表示该消息已被消费者消费
6. MQ将磁盘中的该条消息进行删除

- 注意

  第五步MQ在**指定时间内未接收到ACK**会认定**消费失败**，重新执行4、5、6



- RocketMQ快速读写的原因
  - RocketMQ的CommitLog文件是存储消息的文件，默认预先申请1G的空间，这样等到消息来时就可以直接进行**顺序写入**（而非随机写入），大大加快写的效率
  - 运用了“零拷贝”技术



- RocketMQ数据存储结构

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mq/image-20260729121259762.png" alt="image-20260729121259762" style="zoom:25%;" />

  - **commitLog**存储了队列本身的数据
  - **consumequeue**消费者逻辑队列中存储了三种**offset**（偏移量），用于记录**消息长度**以及某一队列被哪个用户**读到哪一条了**。专门服务消费者
  - **index**索引，用于消息检索的**哈希索引**，只存hash值+CommitLog偏移，用于快速查找消息的位置



- RocketMQ刷盘机制
  - 同步刷盘
    1. 生产者发送消息到MQ，MQ接收到消息数据
    2. MQ挂起生产者发送消息的线程
    3. MQ将消息写入内存
    4. 内存数据写入硬盘
    5. 硬盘存储后返回SUCCESS
    6. 释放被挂起的生产者线程
    7. 发送ACK给生产者
  - 异步刷盘
    1. 生产者发送消息给MQ，MQ接收到消息
    2. MQ将消息写入内存
    3. MQ发送ACK给生产者
    4. 等到消息积累到一定的量，同一写入硬盘

---

### 高可用性

- nameserver

  无状态**（集群后各nameserver间独立）**+全服务注册（所有的Broker会在每一台nameserver进行注册）

- 消息服务器（Broker）

  主从架构

- 消息生产者

  生产者将相同的topic绑定到多个group组，保障master挂掉后，其他master仍可以正常进行消息接收

- 消息消费者

  RocketMQ自身会根据master的压力确认是否由master承担消息读取的功能，当master繁忙时，自动切换由slave承担数据读取的工作。实现**读写分离**

---

### 负载均衡

- Producer负载均衡

  - RocketMQ实现了不同broker集群中对同一topic对应消息队列的负载均衡

    即：若有一个topicA，在多个broker服务器中都有其队列存在，那么在Producer发送消息时，会尽量平均分配每一条队列的消息数量

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mq/image-20260729122931695.png" alt="image-20260729122931695" style="zoom:50%;" />

- Consumer负载均衡

  - 平均分配

    为同一消费组内的不同消费者平均分配消息队列条数

  - 循环平均分配

    集群模式下，为不同消费者分担的队列如下图所示。如此一来，哪怕其中一个服务器宕机，也能确保各个消费者所承担的压力是相同的

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mq/image-20260729123405197.png" alt="image-20260729123405197" style="zoom:50%;" />

---

### 消息重试

- 消息消费后**未正常返回消费成功的信息**将启动消息重试机制

  - 消息重试机制

    - [顺序消息](#消息顺序)

      消息消费失败后，RocketMQ会自动进行消息重试**（间隔1s）**

      注意：应用会出现消息消费被阻塞的情况，因此，要对顺序消息的消费情况进行监控，避免消息阻塞导致消息一直重发

      ![image-20260729123727938](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mq/image-20260729123727938.png)

    - 无序消息

      无序消息包括普通消息、定时消息、延时消息、事务消息

      无序消息重试仅适用于负载均衡（集群）模型下的消息消费，不适用于广播模式下的消息消费

      为保障无序消息的消费，MQ 设定了**合理的消息重试间隔时长**

      ![image-20260729123921421](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mq/image-20260729123921421.png)

      默认尝试十六次，**每次的重试时间间隔都比前一次长 **若十六次都没成功，就不发送该消息

- 死信队列

  当消息重试达到一定次数后（默认16次），MQ将无法正常发送的消息称为**死信消息存入死信队列**

  - 死信队列特征

    - 归属某一个组（Group Id），而不归属 Topic，也不归属消费者
    - 一个死信队列中可以包含同一个组下的多个 Topic 中的死信消息
    - 死信队列不会进行默认初始化，当第一个死信出现后，此队列首次初始化

  -  死信队列中消息特征

    - 不会被再次重复消费
  
    - 死信队列中的消息有效期为 3 天，达到时限后将被清除
  
  - 死信处理
  
    1. 直接忽略不管
    2. 监控平台中，查找死信，获取死信的messageId，通过id对死信的精准消费

---

### 消息重复消费

- 原因
  - 生产者发送了重复的消息
    - 网络闪断
    - 生产者宕机
  - 消费者重复消费
    - 网络闪断
    - broker重启
    - 消费者重启
    - 客户端扩容/缩容



- 解决

  - 使用业务id作为消息的key。
  - 消费者对key进行判定，未使用过则放行，使用过则抛弃





