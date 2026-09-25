# JUC

## 1.进程和线程

### 1.1进程与线程

- 进程和线程的概念

  - 进程
    - 程序由指令和数据组成。指令需要运行，数据需要读写，就必须将**指令加载到CPU，数据加载到内存中**。指令运行过程中还需用到磁盘、网络等设备。**进程就是用来加载指令、管理内存、管理IO的**
    - 当一个程序被运行时，从磁盘加载这个程序的代码到内存，这时就开启了一个进程
    - 进程可被视为程序的一个实例。**大部分程序可以同时运行多个实例进程**
  - 线程
    - 一个进程之内可以分为一到多个线程
    - 一个线程就是一个指令流，将指令中的一条条指令以一定顺序交给CPU执行
    - Java中，线程是**最小的调度单位**、进程是**资源分配的最小单位**。windows中，进程是不活动的，只作为线程的容器

   

  - 二者对比
    - 进程之间相互独立，线程存在进程中，是进程的一个子集
    - 进程拥有共享资源，如内存空间等，供其内部线程共享

---

### 1.2并行与并发

- 并行和并发

  - 并发（concurrent）：单个CPU核心，根据时间片轮询算法分别为不同的线程分配时间片。在**微观上线程之间是串行**的，但由于每个时间片都很短，所以宏观上线程之间是并行的
  - 并行（parallel）：CPU有多个核心时，不同核心执行不同的线程，实现真正意义上的并行

  > 在真正的计算机中，虽然已经普及了多核CPU。但是线程数肯定是多于CPU核心数的，所以在计算机上一般是并发、并行都有的



- 高并发效率

  - 由上可知，单核CPU是无法提高运算效率的（单核CPU只能实现纯粹的并发，在微观上是串行的）。单核CPU的并发只能解决**线程阻塞问题（异步）**

  

  - 多核CPU虽然可以跑多个线程，但能否提高运行效率要分情况
    - 有些任务被拆分后被多核CPU并行执行可以提高运算效率，但不是所有任务都可以被拆分
    - 也不是所有任务都需要拆分。

---

### 1.3异步应用

- 同步和异步

  从方法调用的角度来讲

  - 同步：需要等待结果返回才能继续执行
  - 异步：不需要等待结果返回就能继续执行

  **多线程可以让方法执行变为异步，**如读取磁盘文件时：假设读取操作花费了5s，若不多开一个线程去专门执行读取操作，整个主线程就需要阻塞5s，等到读取结束才可继续执行



---

## 2.Java线程

### 2.1线程的创建

1. 直接使用Thread

   ```java
   Thread t = new Thread(){
       @Overwrite
       public void run(){
           //需要执行的任务
       }
   };
   t.setName("t1");//取名
   t.start();//启动线程
   ```

2. Thread+Runnable(线程要执行的代码)

   ```java
   Runnable run = new Runnable(){
       @Overwrite
       public void run(){
           //...
       }
   };
   Thread t = new Thread(run);//此处也可以使用匿名内部类
   t.start();
   ```

   - Lambda表达式的简化

     ```java
     Thread t = new Thread(()->{...});
     t.start();
     ```

3. Thread+FutureTask （可以用于接收任务的返回值)

   ```java
   FutureTask<Integer> task = new FutureTask(()->{
       return 100;
   });//泛型中写入返回值类型
   
   //上述代码通过了Lambda表达式简化。FutureTask中真正应该传入的是重写的Callable接口中的call方法
   FutureTask<Integer> task = new FutureTask(
   	new Callable<Integer>(){
           @Overwrite
           public Integer call() throws Exception{
               return 100;
           }
       }
   );
   
   new Thread(task,"t3").start();
   
   //主线程阻塞，同步等待task执行完毕的结果
   Integer result = task.get();
   ```

---

### 2.2线程运行的原理

1. JVM会为每个线程分配一块独立的栈空间。一块栈空间由多个栈帧组成，对应着每次方法调用时所占内存（同一时间一个线程只能有一个活动栈帧）

   > 栈空间中有着局部变量表、返回地址、锁记录、操作数栈。其中返回地址用于**函数嵌套调用结束后的定位**
   >
   > 线程运行时，通过栈+程序计数器的配合实现代码的运行

2. 线程的上下文切换（Thread Context Switch）

   因为以下一些原因导致CPU不再执行当前线程，转而执行另一个线程的代码

   - 线程的CPU时间片用完了
   - 垃圾回收
   - 有优先级更高的线程需要运行
   - 线程调用了sleep、yield（礼让线程）、wait、join、park、synchronized、lock等方法

   当上下文切换发生时，需要由操作系统保存当前线程状态，并恢复另一个线程状态。   ———  这个**保存状态的功能通过程序计数器实现**

   > Tip：频繁的上下文切换会影响性能

---

### 2.3常见方法

| 方法名             | static | 功能说明                                                     | 注意                                                         |
| ------------------ | ------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| start()            |        | 启动一个新线程，在新的线程运行 run 方法中的代码              | start 方法只是让线程进入就绪，里面代码不一定立刻运行（CPU 的时间片还没分给它）。每个线程对象的 start 方法只能调用一次，如果调用了多次会出现 IllegalThreadStateException |
| run()              |        | 新线程启动后会调用的方法                                     | 如果在构造 Thread 对象时传递了 Runnable 参数，则线程启动后会调用 Runnable 中的 run 方法，否则默认不执行任何操作。但可以创建 Thread 的子类对象，来覆盖默认行为 |
| join()             |        | 等待线程运行结束                                             |                                                              |
| join(long n)       |        | 等待线程运行结束，最多等待 n 毫秒                            |                                                              |
| getId()            |        | 获取线程长整型的 id                                          | id 唯一                                                      |
| getName()          |        | 获取线程名                                                   |                                                              |
| setName(String)    |        | 修改线程名                                                   |                                                              |
| getPriority()      |        | 获取线程优先级                                               |                                                              |
| setPriority(int p) |        | 修改线程优先级                                               | java 中规定线程优先级是 1~10 的整数，较大的优先级能提高该线程被 CPU 调度的机率 |
| getState()         |        | 获取线程状态                                                 | Java 中线程状态是用 6 个 enum 表示，分别为：NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING, TERMINATED |
| isInterrupted()    |        | 判断是否被打断，                                             | 不会清除 打断标记                                            |
| isAlive()          |        | 线程是否存活（还没有运行完毕）                               |                                                              |
| interrupt()        |        | 打断线程                                                     | 如果被打断线程正在 sleep，wait，join 会导致被打断的线程抛出 InterruptedException，并清除打断标记；如果打断的正在运行的线程，则会设置打断标记；park 的线程被打断，也会设置打断标记 |
| interrupted()      | static | 判断当前线程是否被打断                                       | 会清除 打断标记                                              |
| currentThread()    | static | 获取当前正在执行的线程                                       |                                                              |
| sleep(long n)      | static | 让当前执行的线程休眠 n 毫秒，休眠时让出 cpu 的时间片给其它线程 |                                                              |
| yield()            | static | 提示线程调度器让出当前线程对 CPU 的使用                      | 主要是为了测试和调试                                         |

---

#### 2.3.1start、run

- start()：会创建一个新线程，并且由新的线程调用run()方法，来执行任务。**一个Thread对象只能调用一次**
- run()：当某线程执行到run()时，该线程就会去执行任务。而非开启一个新线程

```java
Thread t1 = new Thread(()->{
    log.debug("running");
});

//此处调用run，运行run方法的并不是t1线程，而是main线程
//相当于告诉main线程去执行t1中的run方法
t1.run();
```

---

#### 2.3.2 sleep、yield

- sleep(long n)

  1. 调用sleep会使得线程从$Runnnig$的状态进入$Timed Waiting$的状态

  

  2. 其他线程可以使用`interupt`方法打断正在睡眠的线程，此时sleep方法会抛出$InterruptedException$

     > 这也就是为什么调用sleep()方法时需要使用try catch包围。我们可以catch到InterruptException并进行后续处理

  

  3. 睡眠线程苏醒后进入$Runnable$状态，需要重新参与时间片的抢夺，所以未必会立刻得到执行

  

  4. 建议使用TimeUnit的sleep代替Thread的sleep得到更好的可读性

     ```java
     TimeUnit.SECOND.sleep(1);//使当前线程睡眠1s
     ```



- yield

  1. 调用yield()会让当前线程从$Running$进入$Runnable$就绪状态，然后调度执行其他线程

  

  2. 具体实现依赖于操作系统的任务调度器

     > 例如：当没有其他线程时，调用yield是无法将时间片让出去的



- 二者区别

  sleep()会强制线程休眠，休眠期间无法争夺时间片。yield()直接变成就绪状态，只是会将时间片让出。就绪状态下，原先执行yield()的线程还是有可能抢夺到时间片



- 应用

  编写服务端程序时，需要使用whil(true)使得服务一直运行。在没有利用CPU进行运算时，while(true)的空转会浪费CPU资源。此时就可以使用`sleep()`或者`yield()`让出CPU的使用权

  ```java
  while(true){
      try{
          Thread.sleep(50);
      }
      catch(InterruptedException e){
          //...
      }
  }
  ```

  - 可以使用`wait()`或条件变量达到类似的效果，不过这两种都需要加锁，并且需要相应的唤醒操作，一般适用于要进行**同步的场景（线程 A 等待某个业务条件满足，线程 B 干完活之后通知唤醒 A）**；`sleep()`适用于无需锁同步的场景
  - SpringBoot框架中已经实现了阻塞



---

#### 2.3.3线程优先级

- 数字越大表示优先级越高，有以下两个相关方法
  - setPriority(int p)
  - getPriority()



- 线程优先级会提示(hint)调度器优先调度该线程，**但仅仅是一个提示**，调度器可以忽略它
- 如果CPU较忙，那么优先级高的线程会获得更多的时间片；但CPU悠闲时，优先级几乎没作用

---

#### 2.3.4 join

- 需要等待哪个线程运行结束，就由哪个线程去调用`join()`方法

  ```java
  static int r = 0;
  
  public static void main(String[] args) {
      test1();
  }
  
  private static void test1() {
      Thread t1 = new Thread(() -> {
          try {
              Thread.sleep(1);
          } catch (InterruptedException e) {
              e.printStackTrace();
          }
          r = 10;
      });
      t1.start();
      //在test1线程中，使用t1调用join方法，那么test1线程就会阻塞在这里，直到t1线程结束
      t1.join();
      log.debug("结果为:{}", r);
  }
  ```



- join还有一个重载版本  —  join(long n) 限定了等待时间

---

#### 2.3.5 interrupt

- 可以用于打断sleep、wait、join等**处于阻塞状态的线程**

  ```java
  public static void main(String[] args) throws InterruptedException {
      Thread t1 = new Thread(() -> {
          log.debug("sleep...");
          try {
              Thread.sleep(5000); // wait, join
          } catch (InterruptedException e) {
              e.printStackTrace();
          }
      }, "t1");
  
      t1.start();
      Thread.sleep(1000);
      log.debug("interrupt");
      t1.interrupt();
      log.debug("打断标记:{}", t1.isInterrupted());//false
  }
  ```



- 当线程处于**阻塞状态**时，使用`线程对象.interrupt()`会苏醒该线程，线程会抛出异常**并清空`isinterrupt()`状态（置为false）**

  若是对**非阻塞状态**的线程进行`interrupt`的话，**`isinterrupt()`状态会被置为true。**除此之外被打断的线程不会受到任何影响，可以**在线程内获取打断状态后决定是否要对线程进行一些操作（停止）**

---

##### 设计模式：两阶段终止

- Two phase Termination

  目的是为了在一个线程T1中“优雅”地终止另一个线程T2

  此处的【优雅】指的是给T2线程料理后事的机会



- 错误思路

  - 使用线程对象的`stop()`方法停止线程

    stop方法会真正杀死线程，如果此时线程锁住了共享资源，那么锁就再也没有机会释放

  - 使用`System.exit(int status)`

    这种方法会杀死整个程序

  

- 正确流程

  在可能会被打断的线程内进行监控，监控外部是否有其他线程对其进行了打断（若进行了打断则料理后事，并关闭线程【通过break循环的方式结束】）

  1. 在正常运行时被打断：下次循环时就会被监测到
  2. 在sleep时被打断，由于sleep会清除打断标记，所以**需要在catch块中重新标记**

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/juc/image-20260913201029587.png" alt="image-20260913201029587" style="zoom:50%;" />

  ```java
  Thread t = new Thread(() -> {
      while (true) {
          // 判断打断标记
          if (Thread.currentThread().isInterrupted()) {
              // 料理后事：关闭连接、保存数据等
              cleanUp();
              break;
          }
          try {
              // 睡眠2s
              Thread.sleep(2000);
              // 无异常：执行业务代码
              monitorTask();
          } catch (InterruptedException e) {
              // sleep被打断会抛异常，并且自动清除打断标记！
              // 所以这里需要手动重新设置打断标记
              Thread.currentThread().interrupt();
          }
      }
  });
  
  ```

---

#### 2.3.6过时方法

- 几个不推荐使用的方法

  - stop()：杀死线程
  - suspend()：挂起（暂停）线程
  - resume()：恢复线程  — 配合suspend

  > 这几个方法都容易破坏同步代码块（不能及时释放锁），造成线程死锁

- 取代方案

  - stop —>   双阶段中止设计模式
  - suspend  —>  wait方法

---

#### 2.3.7守护线程

- `线程对象.setDaemon(true)`

  当其他非守护线程都结束了，即使守护线程中还有代码没有结束，守护线程也会被强制结束

  - 垃圾回收器的线程就是一种守护进程，当程序停止后，垃圾回收也会停止

---

### 2.4线程状态

- 操作系统层面描述  — 五种线程状态

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/juc/image-20260913204510151.png" alt="image-20260913204510151" style="zoom:50%;" />

  - 【初始状态】仅是在语言层面创建了线程对象，还未与操作系统线程关联

  - 【可运行状态】（就绪状态）指该线程已经被创建（与操作系统线程关联），可以由 CPU 调度执行

  - 【运行状态】指获取了 CPU 时间片运行中的状态
    - 当 CPU 时间片用完，会从【运行状态】转换至【可运行状态】，会导致线程的上下文切换

  - 【阻塞状态】
    - 如果调用了阻塞 API，如 BIO 读写文件，这时该线程实际不会用到 CPU，会导致线程上下文切换，进入【阻塞状态】
    - 等 BIO 操作完毕，会由操作系统唤醒阻塞的线程，转换至【可运行状态】

  - 【终止状态】表示线程执行完毕，生命周期结束，不会转换成其他状态



- 从Java API层面描述 — 六种状态

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/juc/image-20260913205001890.png" alt="image-20260913205001890" style="zoom:50%;" />

  - 【NEW】线程刚创建，还未执行start()方法

  - 【RUNNABLE】：调用start()后，注意：Java中，RUNNABLE涵盖了**操作系统层面的**运行状态、可运行状态、阻塞状态

    > 此处的阻塞状态指的是执行BIO操作时的阻塞状态。而非Java中细分出来的三个阻塞状态

  - 【BLOCKED】：等待锁的阻塞、【WAITING】：无限制的等待、【TIMED WAITING】：有时限的等待

    其中`sleep`属于【TIMED WAITING】   `join`属于【WAITING】
  
  - 【TERMINATED】是结束状态

---

## 3.共享模型之管程（悲观锁）

### 3.1多线程访问共享资源的问题

- 高并发的意义

  当线程处于阻塞状态时，CPU无法被用于运算。为了使得CPU得到充分的利用，采用分时间片的方式让多个线程轮询使用CPU。可以**使得CPU得到充分的利用**。除此之外，多线程还可以进行异步调用等等。



- 共享资源问题

  当线程操作共享资源时分为以下几步

  1. 获取共享资源
  2. 进行运算
  3. 将运算结果写回

  先假设**线程A**在**时间片耗尽**时，正进行到第二步（也就是**没将数据写回**）。后续**线程B**拿到时间片**对共享资源进行操作**，操作完后线程A又拿到时间片，准备将数据写回   **注意：此时的数据仍是线程B操作前的数据！**  当A进行写回后，就**将共享数据覆盖了**，这样一来线程B所做的操作都没了    

  **综上，由于代码的非原子性，导致共享资源一致性被破坏了**



- 临界区（Critical Section）

  由上述可知，当多线程对共享资源进行读写操作时（单纯读是OK的），容易出现线程安全问题

  一段**代码块**内如果存在对**共享资源的多线程读写操作**，称这段代码块为**临界区**

- 竞态条件（Race Condition）

  多线程在临界区内执行，由于**代码的执行序列不同**而**导致结果无法预测**，称之为发生了**竞态条件**

---

### 3.2 $synchronized$解决方法

- 为了避免上述问题的发生，可以**使用$synchronized$ “保护”临界区，防止竞态条件的发生**

  ```java
  synchronized(对象){
      临界区
  }
  ```

  **$synchronized$保证了临界区代码的串行执行** — 当线程A拿到锁后，线程B就不能拿到锁，也就是说线程B无法进入临界区操作共享资源

  - 注意
    1. $synchronized()$内必须填入的是对象
    2. 填入的对象必须是唯一的，确保所有线程争抢的是同一把锁



- 底层原理

  1. 线程执行到`synchronized(对象)`时，都会**尝试去获取锁**。现假设线程A获取到了锁

  2. 当线程A时间片耗尽，不再具备CPU使用权，CPU重新分配时间片，现假设线程B获取到了时间片

  3. 线程B执行到`synchronized(对象)`时，由于A还没有释放锁，线程B**无法获取锁**，会**进入【BLOCK】状态，并且立刻交出时间片（CPU只会为Runnable状态的线程分配时间片）**

     > 线程B会被存入该锁对象的**entryList（阻塞队列）**中

  4. 直到线程A执行完临界区代码，**释放锁后**，**线程B**会被“唤醒”，**从BLOCK状态变为Runnable状态**，继续**参与时间片的争抢**

     > 释放锁后，会唤醒**entryList（阻塞队列）**中的所有线程

   

  `synchronized`实际上是**使用了对象锁**，保证了**临界区内代码的原子性**



- 一些改进

  ```java
      static int ans = 0;
      static final Object lock = new Object();
  
      public static void main(String[] args) throws InterruptedException {
          Thread t1 = new Thread(() -> {
              for (int i = 0; i < 50000; i++) {
                  synchronized (lock) {
                      ans++;
                  }
              }
          });
  
          Thread t2 = new Thread(() -> {
              for (int i = 0; i < 50000; i++) {
                  synchronized (lock) {
                      ans--;
                  }
              }
          });
  
  ```

  我们可以将上述代码**封装为一个线程安全的类**，方便外界的调用

  ```java
  class Room{
      private int ans = 0;
      
      public void increment(){
          synchronized (this) {
              ans++;
          }
      }
      
      public void decrement(){
          synchronized (this) {
              ans--;
          }
      }
      
      public synchronized int getAns(){
          return ans;
      }
  }
  
  ```

---

#### 3.2.1方法上的$synchronized$

- 在成员方法上直接使用$synchronized$修饰，**等价于`synchronized(this)`锁住了整个方法**

  ```java
      public synchronized void increment(){
            ans++;
      }
  ```

- 在静态方法上使用$synchronized$修饰，**等价于`synchronized(类.class)`锁住了整个方法**

  ```java
  class Test{
      public synchronized static void test(){
          
      }
  }
  
  //等价于
  
  class Test{
      public static void test(){
          synchronized(Test.class){
              
          }
      }
  }
  ```

---

### 3.3线程安全分析

- 成员变量和静态变量
  - 若不被共享，则线程安全
  - 若被共享
    - 若只有读操作，则线程安全
    - 若有读写操作，则这段代码是临界区，需要考虑线程安全问题



- 局部变量是否线程安全

  - 单纯的局部变量是线程安全的，原因：**局部变量存储在栈中，是线程独有的**，不被共享

  - 但是**局部变量引用的对象**则未必（引用型变量所指向的对象存在堆中，**堆是线程共享的**）

    - 若该对象没有逃离方法的作用范围，则线程安全
    - 若该对象逃离方法作用范围，则需要考虑线程安全问题

    ```java
    class ThreadSafe{
    	//tip：如果list被创建在这，那么list就是成员变量了，是共享资源，而不是局部变量
        //ArrayList<String> list = new ArrayList<>();
    
        public final void method(int loopNumber) {
            ArrayList<String> list = new ArrayList<>();
            for (int i = 0; i < loopNumber; i++) {
                method2(list);
                method3(list);
            }
        }
    
        public void method2(ArrayList<String> list) {
            list.add("1");
        }
    
        public void method3(ArrayList<String> list) {
            list.remove(0);
        }
    }
    ```

    如上述代码，上述代码中的**list是method中的局部变量**，也就是说，每当一个线程执行到method时，都会新创建一个list对象，这样一来，只要我们能保证list**不被返回出去**（即：**没有逃离方法作用范围**），我们就**可以保证list不被其他线程所用（保证不会有多个线程调用list）**如此就不会存在线程安全问题了

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/juc/image-20260914153556112.png" alt="image-20260914153556112" style="zoom:50%;" />

    > 上述过程被称为逃逸分析

    ```java
    class ThreadSafe{
    	//tip：如果list被创建在这，那么list就是成员变量了，是共享资源，而不是局部变量
        //ArrayList<String> list = new ArrayList<>();
    
        public final void method(int loopNumber) {
            ArrayList<String> list = new ArrayList<>();
            for (int i = 0; i < loopNumber; i++) {
                method2(list);
                method3(list);
            }
        }
    
        public void method2(ArrayList<String> list) {
            list.add("1");
        }
    
        public void method3(ArrayList<String> list) {
            list.remove(0);
        }
    }
    
    class ThreadSafeSubClass extends ThreadSafe{
        @Override
        public void method3(ArrayList<String> list) {
            new Thread(()->{
                list.remove(0);
            }).start();
        }
    }
    ```

    此处的$ThreadSafeSubClass$是线程不安全的。

    原因：此处重写了$method3$，调用了一个新线程去进行`list.remove(0)`，这样一来，**list对象就会逃逸，可以同时被多个线程访问到**

    - 改进

      1. 若在$ThreadSafe$类中对method2、3使用$private$修饰符，子类就无法重写method3，即：子类继承的method中所调用的method2、3仍是父类中的。  这样就可以防范线程安全问题
      2. 或者可以加上$final$，也可达到相同的效果（子类无法重写）

      > 由上可知，**$private$和$final$在一定程度上可以保障线程安全**

    > 综上，局部变量引用对象的“逃逸”，本质上就是该对象可以被多个线程访问到。

---

### 3.4常见的线程安全类

- String
- Integer等包装类
- StringBuffer
- Random
- Vector
- Hashtable
- java.util.concurrent包下的所有类

注意：上述的线程安全类中的单个方法都是线程安全的，但是如果在一段代码块中**调用多个方法**，该**代码块还是会受到线程上下文切换的影响（临界区）。**

---

#### 3.4.1不可变类线程安全性

- 如：String、Integer等都是不可变类，即**其内部状态是不可改变的、是只读的。**所以它们都是线程安全的

  > 对String进行操作时，会**创建一个新的字符串对象**。并不会对原本的对象进行操作，所以是只读的，是线程安全的  

---

### 3.5Monitor

- Java对象头

  - 普通对象头

    ```ruby
    |------------------------------------------------|
    |              Object Header (64 bits)           |
    |------------------------------------------------|
    |     Mark Word (32 bits) | Klass Word (32 bits) |
    |------------------------------------------------|
    ```

  - 数组对象头

    ```ruby
    |-----------------------------------------------------------|
    |                  Object Header (96 bits)                  |
    |-----------------------------------------------------------|
    |Mark Word(32bits)|Klass Word(32bits)| array length(32bits) |
    |-----------------------------------------------------------|
    ```

  其中，Mark Word的结构为

  ```ruby
  |----------------------------------------------------|-------------------|
  |                Mark Word (32 bits)                 |       State       |
  |----------------------------------------------------|-------------------|
  | hashcode:25 | age:4 | biased_lock:0 | 01           | Normal            |
  |----------------------------------------------------|-------------------|
  | thread:23 | epoch:2 | age:4 | biased_lock:1 | 01   | Biased            |
  |----------------------------------------------------|-------------------|
  |        ptr_to_lock_record:30        | 00           | Lightweight Locked|
  |----------------------------------------------------|-------------------|
  |   ptr_to_heavyweight_monitor:30     | 10           | Heavyweight Locked|
  |----------------------------------------------------|-------------------|
  |                                     | 11           | Marked for GC     |
  |----------------------------------------------------|-------------------|
  ```

  在**不同状态（State）下，Mark Word所存储的信息是不同的。** 



- Monitor（监视器or管程）工作原理

  1. 每个**Java对象都可以关联一个Monitor对象**，如果使用`synchronized`给对象**上锁（重量级锁）后**，该**对象头的Mark Word中就存储了指向Monitor对象的指针**
  2. 每个线程执行到`synchronized`后都会根据Mark Word中的指针找到Monitor。并查看Monitor中的$owner$是否已经被占据。若每被占据则获取锁，占据$owner$ ； 若被占据则进入$Entry\ \ List$阻塞队列，线程状态变为BLOCK
  3. 锁被释放后，会唤醒$Entry\ \ List$阻塞队列中的某个线程，成为新的$Owner$

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/juc/image-20260914170035683.png" alt="image-20260914170035683" style="zoom: 80%;" />

---

### 3.6$synchronized$优化

- `synchronized`开销成本过高，可以使用轻量级锁、偏向锁等进行优化

---

#### 3.6.1轻量级锁

- 使用场景

  若一个对象虽然有多个线程访问，但多线程访问的时间的错开的；也就是**没有竞争**，那么可以用轻量级锁来优化

  轻量级锁对使用者是透明的，由底层自动加锁。即语法仍然是`synchronized`



- 底层上锁原理

  创建**锁记录（Lock Record）对象**，每个线程的**栈帧**都会包含一个锁记录的结构，内部可以**存储锁定对象的$Mark Word$**

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/juc/image-20260915142600482.png" alt="image-20260915142600482" style="zoom:50%;" />

  - $Object\ \ Reference$：存储对象地址

  - $lock\ record \ 地址 \ 00$: 存储的是锁信息，会与$Mark\ \ Word$中的内容进行**交换**。

    - 若**交换成功，表示成功上锁**

      <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/juc/image-20260915142942898.png" alt="image-20260915142942898" style="zoom:50%;" />

    - 若$Mark\ \ Word$中的状态已经是00（已被上锁），则上锁失败。表明此时**有竞争**，进入**锁膨胀**过程。

    - 若是某线程自己又一次执行`synchronized`**锁重入**，那么**再添加一条Lock Record作为重入计数**

      <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/juc/image-20260915143744444.png" alt="image-20260915143744444" style="zoom:50%;" />

      

    

    > 1. **00表示的是轻量级锁的状态、01表示的是未加锁的状态**（tip：重量级锁为10）
    >
    > 2. 这个交换信息的过程被称为**CAS(Compare And Swap)**，是**原子性**的

- 底层解锁原理

  - 退出`synchronized`代码块时，如果有取值为$null$的锁记录，表示**重入锁**，直接重置锁记录，表示**重入计数减一**
  - 若取值不为$null$，**执行CAS**。交换信息，相当于解锁
    - 若交换成功，说明解锁成功
    - 若交换**失败**，说明产生了竞争，**锁膨胀为了重量级锁**，此时需进入重量级锁解锁流程

---

##### 锁膨胀

- 当轻量级锁产生竞争时，触发锁膨胀，轻量级锁膨胀为重量级锁

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/juc/image-20260915144640036.png" alt="image-20260915144640036" style="zoom:50%;" />



- 膨胀原理

  当发生竞争时，竞争失败的锁需要阻塞等待 — 阻塞等待就需要进入重量级锁中的$Entry\ \ List$

  - 膨胀流程

    竞争失败，申请$Monitor$重量级锁，并让对象指向$Monitor$。$Monitor$的地址指向占有锁的线程，自己进入$Entry\ \ List$。

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/juc/image-20260915145238069.png" alt="image-20260915145238069" style="zoom:50%;" />

  - 膨胀锁解锁

    1. 锁膨胀后，会**将对象$Mark\ \ Word$的内容修改为$Monitor$的地址**，当原线程想用**CAS解锁轻量级锁时**，会发现锁标志**变为了10(重量级锁)**，进入重量级锁解锁过程
    2. 将$Monitor$中的$Owner$清空，并**唤醒$Enntry\ \ List$中的阻塞线程**，使其成为**新的$Owner$**

---

#### 3.6.2锁的自旋

- **重量级锁**竞争时，还可以采用**自旋**的方式进行优化。若当前线程自旋成功（即：持锁线程释放了锁），这样就可以**避免阻塞，避免线程上下文切换的发生，提高效率**

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/juc/image-20260915150514352.png" alt="image-20260915150514352" style="zoom:40%;" />

  如上图，当线程2发现锁被占用时，并不会立即进入阻塞队列，而是自旋重试获取锁。

  - 在一定自旋次数内，若线程1释放了锁，那么线程2就可以直接获取到锁，不用发生上下文切换
  - 若超过一定自选次数还没有获取到锁，则会进入阻塞队列等待。同时交出时间片，发生上下文切换

  > 注意
  >
  > 1. Java6后的自旋锁是自适应的，若线程刚刚自选成功了，那么认为自旋成功率高，后面会多自旋几次。反之少自旋几次
  > 2. 自旋操作会占用CPU时间，需要多个线程并行执行。所以单核CPU不能自旋
  > 3. Java7后不能控制是否开启自旋

---

#### 3.6.3偏向锁

- 偏向锁是对轻量级锁的进一步优化。

  在**轻量级锁**中，当发生**锁重入**时，**仍然需要执行CAS操作**。但实际上，**重入锁即使CAS了也会失败**（重入锁的Lock Record存储的是null）。只不过失败后会这条锁记录保留

  偏向锁只有在**第一次获取锁的时候**，会使用**CAS直接将线程ID设置到对象的$Mark\ \ Word$上。**如此一来，只要不发生竞争，后续进行重入时，就无需CAS了

  > ```ruby
  > |----------------------------------------------------|-------------------|
  > |                Mark Word (32 bits)                 |       State       |
  > |----------------------------------------------------|-------------------|
  > | hashcode:25 | age:4 | biased_lock:0 | 01           | Normal            |
  > |----------------------------------------------------|-------------------|
  > | thread:23 | epoch:2 | age:4 | biased_lock:1 | 01   | Biased            |
  > |----------------------------------------------------|-------------------|
  > |        ptr_to_lock_record:30        | 00           | Lightweight Locked|
  > |----------------------------------------------------|-------------------|
  > |   ptr_to_heavyweight_monitor:30     | 10           | Heavyweight Locked|
  > |----------------------------------------------------|-------------------|
  > |                                     | 11           | Marked for GC     |
  > |----------------------------------------------------|-------------------|
  > ```
  >
  > 如图所示，Biased状态为偏向锁，其直接将$threadId$存入了$Mark\ \ Word$中



- 第一次获取锁时，若模式为偏向锁，线程ID会被直接写入$Mark\ \ Word$，在释放锁后，线程ID仍然会在$Mark\ \ Word$中，不会被擦除。如此一来，后续若该线程仍要获取锁，也可以不用CAS



- 偏向锁撤销的情况

  1. 调用对象的`hashCode()`方法，**由于hashCode要存储进$Mark\ \ Word$中，**所以会撤销偏向锁的状态，变回$Normal$状态，再存入hashCode。

     > 1. 轻量级锁的Lock Record会与Mark Word中的信息发生CAS。所以轻量级锁时，对象的hashCode在Lock Record中，后续会还原
     > 2. 重量级锁时，hashCode存储在Monitor中，后续也会还原

  2. **当其他线程获取偏向锁对象的锁时（哪怕不发生竞争）**，也会撤销偏向锁状态，将**锁升级为轻量级锁**

     > 偏向锁哪怕在解锁后，**其Mark Word仍然指向原先偏向的线程。**所以当其他线程再次获取锁时，由于Mark Word中的线程ID不对应，会直接获取轻量级锁

---

##### 批量重偏向和批量撤销

- 批量重偏向

  假设某个类有50个对象，**全部偏向$T1$线程**。在**不发生竞争的前提下**，$T2$线程进行`synchronized`时，会**触发这些对象的偏向锁撤销（撤销偏向锁，升级为轻量级锁）**；当触发的**偏向锁撤销**达到**20次**时，触发**批量重偏向**，**剩下的30个对象**全部**设为$T2$的偏向锁**

  > JVM会认为可能是偏向锁偏向错误



- 批量撤销

  当撤销偏向的次数达到了**40次**，JVM会认为**竞争过于激烈**，并非偏向锁偏向错误。此时JVM会将**这个类的所有对象批量撤销偏向锁（新创建的类也是不可偏向的）**

---

#### 3.6.4锁消除

- JIT运行时编译器会对代码进行分析，当其对锁对象进行**逃逸分析**后，发现**并不会出现线程安全问题**，那么其就**不会进行上锁**

  > 逃逸分析：分析当前锁对象是否会被多个线程竞争（当前共享资源是否会逃逸）

---

### 3.7 wait & notify

- 适用场景&原理

  当$Owner$线程发现条件不满足，调用`wait()`方法，即可进入$Monitor$的$WaitSet$，状态变为$WAITING$

  - $BLOCKED$和$WAITING$的线程都处于阻塞状态，不占用CPU时间片
  - $BLOCKED$会在锁被释放后唤醒
  - $WAITING$会在$Owner$线程调用`notify()`或者`notifyAll()`方法时被唤醒。唤醒后进入$EntryList$重新竞争

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/juc/image-20260915172756432.png" alt="image-20260915172756432" style="zoom:50%;" />

---

#### 3.7.1APIs

> 以下三个方法需要在获取了锁，成为$Owner$后才可调用

- `obj.wait()`:让进入object监视器的线程到$WaitSet$等待

  - `obj.wait(long timeout)`：有时限的等待

  > 在线程内调用wait方法一般使用`锁对象.wait()`，如此一来当前线程就会进入$WaitSet$

- `obj.notify()`:随机挑选一个$WaitSet$中的线程唤醒

- `obj.notifyAll()`:唤醒$WaitSet$中的所有线程

---

#### 3.7.2使用规范

- `sleep(long n)`和`wait(long n)`的区别
  1. `sleep`是`Thread`的静态方法，而`wait`是Object的方法，所有的对象都拥有
  2. `sleep`不需要强制和`synchronized`配合使用，但是`wait`需要和`synchronized`一起用
  3. `sleep`在睡眠的同时，不会释放对象锁，但`wait`在等待时，会释放锁（$WATING$属于一种阻塞状态）



- 为避免虚假唤醒的问题，建议使用以下形式编写wait&notify

  - 虚假唤醒：当有多个线程`wait`时，`notify`只可随机叫醒一个线程。所以一般会使用`notifyAll()`。但是使用`notifyAll()`唤醒所有线程后，不一定所有的线程的条件都满足了

  - 解决方法

    ```java
    //wait线程
    synchronized(lock){
        while(条件不成立){
            lock.wait();//此处省略try...catch...
        }
    }
    
    //notify线程
    synchronized(lock){
        //...业务代码（完成唤醒条件）
        lock.notifyAll();
    }
    ```

    如此一来，`wait`线程被唤醒后，如果条件还不满足，会继续`wait`

---

#### 3.7.3设计模式：保护性暂停（Guarded Suspension）

- 适用场景

  一个线程等待另一个线程的执行结果



- 要点

  1. 有**一个结果**需要从一个线程传递到另一个线程，让他们关联同一个$GuardedObject$
  2. 如果有结果不断从一个线程到另一个线程可以适用消息队列
  3. JDK中，`join`的实现、`Future`的实现，采用的就是此模式
  4. 因为要等待另一方的结果，因此归类到同步模式

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/juc/image-20260915182156766.png" alt="image-20260915182156766" style="zoom:50%;" />



- 实现

  ```java
  public class JUCLearnMain {
      public static void main(String[] args) throws InterruptedException {
          //模拟：线程1等待线程2的下载结果
          GuardedObject guardedObject = new GuardedObject();
          new Thread(() -> {
              //等待结果
              long start = System.currentTimeMillis();
              Object response = guardedObject.getResponse();
              long end = System.currentTimeMillis();
              log.info("response: {} waitingTime:{}", response, end - start);
          },"t1").start();
  
          new Thread(() -> {
              //下载代码略
              try {
                  sleep(1000);
              } catch (InterruptedException e) {
                  throw new RuntimeException(e);
              }
              guardedObject.setResponse("hello");//生产结果
          },"t2").start();
      }
  }
  
  class GuardedObject{
      //结果
      private Object response;
  
      //获取结果
      public Object getResponse() {
          synchronized (this) {
              while (response == null) {
                  try {
                      this.wait();
                  } catch (InterruptedException e) {
                      throw new RuntimeException(e);
                  }
              }
              return response;
          }
      }
      
      //获取结果  带时限的重载方法(join源码与之同理)
      public Object getResponse(long timeout) {
          synchronized (this) {
              //开始时间
              long start = System.currentTimeMillis();
              //等待时间
              long waitTime = 0;
              while (response == null) {
                  if(waitTime >= timeout) {
                      break;
                  }
                  try {
                      //中间可能有虚假唤醒，虚假唤醒后的剩余等待时间为timeout-waitTime
                      this.wait(timeout-waitTime);
                  } catch (InterruptedException e) {
                      throw new RuntimeException(e);
                  }
                  waitTime = System.currentTimeMillis() - start;
              }
              return response;
          }
      }
  
  
      //产生结果
      public void setResponse(Object response) {
          synchronized (this) {
              //给结果赋值
              this.response = response;
              //唤醒线程
              this.notifyAll();
          }
      }
  ```

---

#### 3.7.4设计模式：生产者消费者（异步）

- 不同于保护性暂停，不需要产生结果和消费结果的线程一一对应。生产者只负责产生数据；消费者只负责消费数据。二者之间通过消息队列进行解耦

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/juc/image-20260915192620992.png" alt="image-20260915192620992" style="zoom:50%;" />

  - 消息队列是有容量限制的，满时不会再加入数据，空时不再消耗数据
  - JDK中各种阻塞队列，采用的就是这种模式



- 简易实现

  ```java
  
  //消息队列类，Java线程间通信
  class MessageQueue{
      private LinkedList<Message> queue = new LinkedList<>();
      private int capacity;
  
      public MessageQueue(int capacity) {
          this.capacity = capacity;
      }
      //获取消息
  
      public Message take(){
          synchronized (queue) {
              while(queue.isEmpty()){
                      try {
                          queue.wait();
                      } catch (InterruptedException e) {
                          throw new RuntimeException(e);
                      }
              }
              Message msg = queue.poll();
              queue.notifyAll();
              return msg;
          }
      }
  
      //存入消息的方法
  
      public void put(Message message){
          synchronized (queue) {
              while(queue.size() >= capacity){
                  try {
                      queue.wait();
                  } catch (InterruptedException e) {
                      throw new RuntimeException(e);
                  }
              }
              queue.offer(message);
              queue.notifyAll();
          }
      }
  
  }
  
  final class Message{
      private int id;
      private Object msg;
  
      public Message(int id, Object msg) {
          this.id = id;
          this.msg = msg;
      }
  
      public Message() {
      }
  
      public int getId() {
          return id;
      }
  
      public void setId(int id) {
          this.id = id;
      }
  
      public Object getMsg() {
          return msg;
      }
  
      public void setMsg(Object msg) {
          this.msg = msg;
      }
  
      @Override
      public String toString() {
          return "Message{" +
                  "id=" + id +
                  ", msg=" + msg +
                  '}';
      }
  }
  ```

---

### 3.8Park & Unpark

- 两个都是$LockSupport$中的类

  ```java
  //暂停当前线程
  LockSupport.park();
  
  //恢复某个线程的运行
  LockSupport.unpark(Thread targetThread);
  ```



- 与wait & notify的区别
  - wait & notify需要配合$Monitor$使用
  - park & unpark是**以线程为单位**来【阻塞】和【唤醒】线程。且唤醒线程是精准的
  - park & unpark，哪怕先执行unpark，再执行park。仍然可以唤醒



- 原理

  **每个线程**都有自己的$Parker$对象，由三部分组成`_counter`、`_cond`、`mutex`

  - 调用`park()`
    1. 检查`_counter`
       - `_counter==1`，不做任何处理，将`_counter`置为0
       - `_counter==0`，获得`_mutex`互斥锁。线程进入`_cond`条件变量【阻塞】
  - 调用`unpark()`
    1. 设置`_counter`为1
    2. 检查线程运行状态
       - 线程在`_cond`中阻塞时：`_counter`置为0。唤醒线程，继续运行
       - 线程在正常运行：不做任何处理

  > 综上：unpark()相当于补充`_counter`，park()相当于消耗`_counter`，只有在`_counter==0`时执行park()才可以使得线程阻塞。且unpark()阻塞的线程也会消耗`_counter`（unpark在起初会补充一次`_counter`，唤醒线程时消耗`_counter`）

---

### 3.9线程状态转换

- 示意图

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/juc/image-20260913205001890.png" alt="image-20260913205001890" style="zoom:50%;" />

  1. 【NEW】 $–->$  【RUNNABLE】

     `start()`，调用后从【NEW】状态变为【RUNNABLE】状态

  

  2. 【RUNNABLE】 $<-->$ 【WAITING】(无时限等待)

     `wait() & notify()|notifyAll() | interrupt()`可以使得状态在【RUNNABLE】和【WAITING】之间转换

     - `notify()|notifyAll() | interrupt()`后，$WaitSet$中的线程会被唤醒**参与锁的竞争。**

       若竞争成功，【WAITING】 –>  【RUNNABLE】

       若竞争失败，【WAITING】 –>  【BLOCKED】

   

  3. 【RUNNABLE 】 $<-->$【WAITING】

     调用`join()`方法，线程会从【RUNNABLE】$–->$【WAITING】；当等待线程结束后从【WAITING】 $-->$【RUNNABLE】

  

  4. 【RUNNABLE】 $<-->$ 【WAITING】

     `park()&unpark()`。

     - 当前线程调用`LockSupport.park()`会让当前线程从【RUNNABLE】$-->$【WAITING】
     - 调用`LockSupport.unpark(目标线程)`或调用了线程的`interrupt()`，会让目标线程从【WAITING】$–->$【RUNNABLE】

  

  5. 【RUNNABLE】$<-->$【TIMED_WAITING】

     `wait(long n)`

     - 调用`notify()|notifyAll()|interrupt()` 或者 **超时**。就会从【TIMED_WAITING】$-->$【RUNNABLE】

   

  6. 【RUNNABLE】$<-->$【TIMED_WAITING】

     `t.join(long n)`

   

  7. 【RUNNABLE】$<-->$【TIMED_WAITING】

     `Thread.sleep(long n)`

   

  8. 【RUNNABLE】$<-->$【TIMED_WAITING】

     `LockSupport.parkNanos(long nanos)` 或 `LockSupport.parkUntil(long millis)`

   

  9. 【RUNNABLE】 $<-->$ 【BLOCKED】

     调用`synchronized(obj)`竞争锁失败后会进入$EntryList$   【RUNNABLE】$-->$【BLOCKED】

     锁被释放后重新**竞争锁成功后**，【BLOCKED】$–->$ 【RUNNABLE】

   

  10. 【RUNNABLE】 $-->$ 【TERMINATED】

      所有代码运行完毕后，线程死亡

---

### 3.10锁粒度

- 锁的粒度过大时，会导致锁住的返回过大，并发效率过低。使用细粒度的锁可以增强线程的并发效率
  - 好处：**增强并发度**
  - 坏处：若考虑不周，当一个线程获取了多把锁后，容易造成**死锁**

---

### 3.11活跃性

- 死锁

  发生在锁的嵌套中

  - 线程$T1$获取了锁A，想要获取锁B
  - 线程$T2$获取了锁B，想要获取锁A

  这样一来就会造成$T1、T2$都在等待对方释放锁，代码无法继续向下执行，造成死锁

  

  - 如何定位死锁
    1. $jps$定位到程序PID。
    2. 使用`jstack pid`查看



- 活锁

  两个线程同时运行，但是它们的结束条件相悖，就会造成二者的竞争而无法结束线程

  ```java
  public class JUCLearnMain {
      private static int count = 10;
  
      public static void main(String[] args) throws InterruptedException {
  
  
          new Thread(() -> {
              while (count < 20) {
                  try {
                      sleep(200);//此处sleep用于消耗时间片，否则在所给的时间片中能直接完成任务
                  } catch (InterruptedException e) {
                      throw new RuntimeException(e);
                  }
                  count++;
                  log.debug("count:{}", count);
              }
          }).start();
  
          new Thread(() -> {
              while (count > 0) {
                  try {
                      sleep(200);//此处sleep用于消耗时间片，否则在所给的时间片中能直接完成任务
                  } catch (InterruptedException e) {
                      throw new RuntimeException(e);
                  }
                  count--;
                  log.debug("count:{}", count);
              }
          }).start();
      }
  }
  ```

  - 活锁的解决

    实际开发中，可以为线程**增加随机的睡眠时间**，使得线程之间的运行错开。



- 饥饿

  线程由于优先级过低，始终得不到CPU的时间片，也不能够结束。

---

### 3.12ReentrantLock

- 可重入锁，具备一下特点

  - 可打断

    > 在阻塞状态下等待锁时，使用`interrupt()`方法可以直接终止等待

  - 可设置超时时间

    > 若超时没有获取到锁就不获取了

  - 可设置为公平锁

    > 公平锁：防止线程饥饿，排队获取锁

  - 支持多个条件变量

    > 具有多个$WaitSet$（条件不满足时的等待场所）。满足不同条件的等待的场所不同，**可实现精准唤醒**

  与`synchronized`一样，都支持可重入

  ```java
  reentrantLock.lock();//获取锁
  try{
      //临界区
  }finally{
      reentrantLock.unlock();//释放锁
  }
  ```



- 可重入

  ```java
      private static ReentrantLock reentrantLock = new ReentrantLock();
  
      public static void main(String[] args) throws InterruptedException {
          reentrantLock.lock();
          try {
              log.debug("1");
              reentrantLock.lock();
              try{
                  log.debug("2");
              }
              finally {
                  reentrantLock.unlock();
              }
          }
          finally {
              reentrantLock.unlock();
          }
      }
  ```

- 可打断

  `reentrantLock.lockInterruptibly()`

  ```java
      private static ReentrantLock reentrantLock = new ReentrantLock();
  
      public static void main(String[] args) throws InterruptedException {
          Thread t1 = new Thread(() -> {
              try {
                  log.debug("尝试获取锁");
                  //如果竞争到锁则获取到reentrantLock的对象锁
                  //如果竞争失败则进入阻塞队列，但是不同于synchronized，此处可以被其他线程使用interrupt打断
                  reentrantLock.lockInterruptibly();
              } catch (InterruptedException e) {
                  log.debug("阻塞被打断，没有获取锁");
                  throw new RuntimeException(e);
              }
          });
  
          reentrantLock.lock();//主线程先获取锁，使得t1线程进入阻塞队列
          t1.start();
          t1.interrupt();//直接打断t1线程
      }
  ```

- 锁超时

  `tryLock(int timeout,TimeUnit.xxx)`，尝试获取锁，若获取失败，尝试等待指定时间。若超过指定时间未获取到锁，则获取锁失败。

  > `tryLock()`表示：若没有获取到锁，不等待，直接失败

  ```java
      private static ReentrantLock reentrantLock = new ReentrantLock();
  
      public static void main(String[] args) throws InterruptedException {
          Thread t1 = new Thread(() -> {
              try {
                  if (!reentrantLock.tryLock(5, TimeUnit.SECONDS)) {
                      log.debug("获取锁失败");
                      return;
                  }
              } catch (InterruptedException e) {
                  log.debug("获取锁失败");
                  throw new RuntimeException(e);
              }
  
              try {
                  log.debug("获取锁成功");
              }finally {
                  reentrantLock.unlock();
              }
  
          });
  
          reentrantLock.lock();//主线程先获取锁，使得t1线程进入阻塞队列
          t1.start();
          try {
              sleep(4000);
          }
          finally {
              reentrantLock.unlock();
          }
  
      }
  ```

- 公平锁

  `new ReentrantLock(true)`。$ReentrantLock$默认是不公平的，通过设置`true`来得到公平锁

  > 公平锁：在阻塞队列中的锁被唤醒时不再是竞争锁，而是按照进入阻塞队列的顺序依次成为$Owner$

- 条件变量

  `synchronized`也有条件变量，即$WaitSet$，当不满足条件时，持锁线程可以进入$WaitSet$等待。 而`ReentrantLock`可以具有多个条件变量，即：有多个$WaitSet$。如此一来就可以实现**精准唤醒**

  `newCondition()`，返回值为$Condition$    

  `condition.await()`:进入条件变量等待

  `condition.signal()、condition.signalAll()`:唤醒条件变量中的一个线程或全部线程

  ```java
      private static ReentrantLock reentrantLock = new ReentrantLock();
  
      public static void main(String[] args) throws InterruptedException {
          Condition condition1 = reentrantLock.newCondition();
          Condition condition2 = reentrantLock.newCondition();
  
          new Thread(()->{
              reentrantLock.lock();
              try{
                  log.debug("进入condition1");
                  condition1.await();//进入condition1等待,有时限重载版本
                  log.debug("被唤醒");
              } catch (InterruptedException e) {
                  throw new RuntimeException(e);
              } finally {
                  reentrantLock.unlock();
              }
          },"t1").start();
  
          sleep(1000);
          log.debug("唤醒t1");
          reentrantLock.lock();//唤醒前要先获得锁，和wait&notify一致
          try {
              condition1.signalAll();//精准唤醒，signal() / signalAll()
          }
          finally {
              reentrantLock.unlock();
          }
      }
  ```

---

#### 设计模式：控制线程顺序

##### 固定运行顺序

- 一个线程打印1，一个线程打印2。现要求必须先打印2，再打印1

  - wait & notify实现

    ```java
        private static final Object lock = new Object();
    
        public static void main(String[] args) throws InterruptedException {
            new Thread(() -> {
            synchronized (lock){
                while (!flag) {
                        try {
                            lock.wait();
                        } catch (InterruptedException e) {
                            throw new RuntimeException(e);
                        }
                }
            }
                log.debug("1");
            }).start();
    
            new Thread(() -> {
                synchronized (lock){
                    log.debug("2");
                    flag = true;
                    lock.notify();
                }
            }).start();
    
    
        }
    ```

  - ReentrantLock实现

    ```java
        private static ReentrantLock reentrantLock = new ReentrantLock();
    
        private static boolean flag = false;
    
        public static void main(String[] args) throws InterruptedException {
    
            Condition condition = reentrantLock.newCondition();
    
            new Thread(()->{
                reentrantLock.lock();
                try {
                    while (!flag) {
                        try {
                            condition.await();
                        } catch (InterruptedException e) {
                            throw new RuntimeException(e);
                        }
                    }
                    log.debug("1");
                }
                finally {
                    reentrantLock.unlock();
                }
            }).start();
    
            new Thread(()->{
                reentrantLock.lock();
                try {
                    log.debug("2");
                    flag = true;
                    condition.signal();
                }
                finally {
                    reentrantLock.unlock();
                }
            }).start();
    
        }
    ```

  - park & unpark实现

    ```java
        public static void main(String[] args) throws InterruptedException {
    
            Thread t1 = new Thread(() -> {
                LockSupport.park();
                log.debug("1");
            });
    
            Thread t2 = new Thread(() -> {
                log.debug("2");
                LockSupport.unpark(t1);
            });
    
            t1.start();
            t2.start();
        }
    ```

---

##### 交替输出

- 线程1输出 a 5次，线程2输出 b 5次，线程3输出 c 5次。要求结果为abc abc abc abc abc

  - wait & notify实现

    ```java
        public static void main(String[] args) throws InterruptedException {
            WaitNotify wn = new WaitNotify(0,5);
    
            new Thread(() -> {
                wn.print("a",0,1);
            }).start();
    
            new Thread(() -> {
                wn.print("b",1,2);
            }).start();
    
            new Thread(() -> {
                wn.print("c",2,0);
            }).start();
        }
    
    }
    
    //将waitNotify整个过程抽象成一个waitNotify类
    @Slf4j
    class WaitNotify{
        /*     flag
        a       0
        b       1
        c       2
    */
        private int flag;
        private int loopNum;
    
        public WaitNotify(int flag, int loopNum) {
            this.flag = flag;
            this.loopNum = loopNum;
        }
    
        public void print(String str,int waitFlag,int nextFlag){
            for (int i = 0; i < loopNum; i++) {
                synchronized (this){
                    while(flag != waitFlag){
                        try {
                            this.wait();
                        } catch (InterruptedException e) {
                            throw new RuntimeException(e);
                        }
                    }
                    log.info("{}",str);
                    flag = nextFlag;
                    this.notifyAll();
                }
            }
        }
    
    }
    ```

  - ReentrantLock实现

    ```java
        public static void main(String[] args) throws InterruptedException {
            AwaitSignal as = new AwaitSignal(5);
            Condition a = as.newCondition();
            Condition b = as.newCondition();
            Condition c = as.newCondition();
    
            new Thread(() -> {
                as.print("a",a,b);
            }).start();
    
            new Thread(() -> {
                as.print("b",b,c);
            }).start();
    
            new Thread(() -> {
                as.print("c",c,a);
            }).start();
    
            Thread.sleep(1000);//确保a 、 b 、 c都准备就绪
            as.lock();
            try {
                a.signal();//在第一次执行了print后，a、b、c线程都进入了条件变量中阻塞。需要由主线程a才可以正常运行
            }
            finally {
                as.unlock();
            }
        }
    
    }
    
    @Slf4j
    class AwaitSignal extends ReentrantLock {
        private int loopNum;
        public AwaitSignal(int loopNum) {
            this.loopNum = loopNum;
        }
    
        public void print(String str,Condition Curcon,Condition Nextcon){
            for (int i = 0; i < loopNum; i++) {
                lock();
                try {
                    try {
                        Curcon.await();
                        log.info(str);
                        Nextcon.signal();
                    } catch (InterruptedException e) {
                        throw new RuntimeException(e);
                    }
                }
                finally {
                    unlock();
                }
            }
        }
    
    }
    ```

  - park & unpark实现

    ```java
    public class JUCLearnMain {
    
        static Thread a,b,c;//提前声明，不然会出现循环问题
    
        public static void main(String[] args) throws InterruptedException {
            ParkUnpark pu = new ParkUnpark(5);
    
            a = new Thread(()->{
                pu.print("a",b);
            });
    
            b = new Thread(()->{
                pu.print("b",c);
            });
    
            c = new Thread(()->{
                pu.print("c",a);
            });
    
            a.start();
            b.start();
            c.start();
    
            LockSupport.unpark(a);//a、b、c准备就绪后，唤醒a
        }
    
    }
    
    @Slf4j
    class ParkUnpark{
        private int loopNum;
    
        public ParkUnpark(int loopNum) {
            this.loopNum = loopNum;
        }
    
        public void print(String str,Thread next){
            for(int i=0;i<loopNum;i++){
                LockSupport.park();//第一次进来时，a、b、c都会被park
                log.info("{}",str);
                LockSupport.unpark(next);
            }
        }
    
    }
    ```

---

## 4.共享模型之内存

> 第三章中的$Monitor$关注的是访问共享变量时，保证**临界区代码的原子性**
>
> 第四章中关注的是共享变量在多线程间的**【可见性】**以及多条指令执行时的**【有序性】**问题

---

### 4.1Java内存模型JMM

- JMM即Java Memeroy Model，定义了**主存**（所有线程共享的数据）、**工作内存**（线程私有的内存）**抽象概念**。底层对应着CPU寄存器、缓存、硬件内存、CPU指令优化等

  JMM主要体现在以下方面

  - **原子性**：保证指令不受线程上下文切换影响
  - **可见性**：保证指令不受CPU缓存的影响
  - **有序性**：保证指令不受CPU指令并行优化的影响

---

### 4.2可见性

```java
    private static boolean run = true;
    public static void main(String[] args) throws InterruptedException {

        new Thread(() -> {
            while (run) {

            }
        },"t").start();

        sleep(1000);
        log.debug("停止run");
        run = false;

    }
```

上述代码不会停止

- 原因

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/juc/image-20260918104219012.png" alt="image-20260918104219012" style="zoom:50%;" />

  1. 起初t线程每调用一次就需要从主内存中获取`run`,但是这样效率不够高
  2. main线程`sleep`了1s，在这1s内t线程运行了多次，发现run的值一直是`true`，就会触发JIT优化，**将主内存中的run拷贝一份到CPU的高速缓存中**  其目的是为了高效地读取run
  3. 但是这样一来，当**主线程将主内存**中的run修改为`true`后，**对于t线程而言，是不可见的**。所以t线程会一直运行下去

- 解决方法

  添加`volatile`（易变）关键词，对于`volatile`修饰的变量，**线程必须从主内存中读取**

  - 注意

    1. `volatile`只能用于修饰**成员变量和静态成员变量**这种共享变量

    2. `volatile`只能保证可见性，无法保证原子

       <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/juc/image-20260918105405928.png" alt="image-20260918105405928" style="zoom: 80%;" />

       如图所示，`volatile`只是限制了线程读取时必须去主内存中读。**若是有多个线程去修改共享变量，还是会有线程安全问题**

  - 适用场景

    **一个写线程，多个读线程**：保证没有线程安全的前提下使用`volatile`

    - 注意

      `synchronized`既保证可见性，也保证原子性

---

#### 设计模式两则

##### 1. 两阶段终止模式（改进）

- 原版本

  ```java
  Thread t = new Thread(() -> {
      while (true) {
          // 判断打断标记
          if (Thread.currentThread().isInterrupted()) {
              // 料理后事：关闭连接、保存数据等
              cleanUp();
              break;
          }
          try {
              // 睡眠2s
              Thread.sleep(2000);
              // 无异常：执行业务代码
              monitorTask();
          } catch (InterruptedException e) {
              // sleep被打断会抛异常，并且自动清除打断标记！
              // 所以这里需要手动重新设置打断标记
              Thread.currentThread().interrupt();
          }
      }
  });
  ```

  原版本通过监视`isinterrupted`来决定是否要结束线程。

- 新版本

  ```java
  private volatile static boolean stop = false;
  
  Thread t = new Thread(() -> {
      while (true) {
          // 判断打断标记
          if (stop) {
              // 料理后事：关闭连接、保存数据等
              cleanUp();
              break;
          }
          try {
              // 睡眠2s
              Thread.sleep(2000);
              // 无异常：执行业务代码
              monitorTask();
          } catch (InterruptedException e) {
          }
      }
  });
  ```

  使用该版本，通过共享变量去标记是否打断。如此一来在接收到$InterruptedException$时，就无需额外`interrupt`去设置标记了。   由于t线程是读取stop，由其他线程修改stop。所以需要使用`volatile`修饰，确保可见性

---

##### 2.同步模式之Balking

- Balking（犹豫）模式用在一个线程发现另一个线程或者本线程**已经做了某件相同的事**，那么本线程就无需再做了，直接结束返回

  本质上就是通过一个线程间的共享标记，用于标记某事有无被做过

  - 示例

    ```java
    class Balking{
        private static boolean isDone = false;//标记有无被做过
    
        public void start(){
    		synchronized(this){//使用synchronized保证可见性和原子性  (该方法涉及到了isDone的读写)
                if(isDone){//读 --- 可见性
                    return;
                }
                isDone = true;//写 --- 原子性
            }
            new Thread(() -> {...}).start();
        }
    }
    ```

  - 应用

    可以使用Balking模式实现线程安全的**懒汉式单例**模式

    ```java
    public final class Singleton{
        private Singleton(){}
    
        private static Singleton INSTANCE = null;//共享单例
    
        public static synchronized Singleton getInstance(){//使用Balking实现懒加载
            if(INSTANCE == null){
                INSTANCE = new Singleton();
            }
            return INSTANCE;
        }
    }
    
    ```

---

### 4.3有序性

- 指令重排序

  JVM在**不影响单线程程序结果的前提下**，会对指令进行重排序的优化，以提高指令执行的效率

  - 可重排的例子

    ```java
    int a = 10;
    int b = 20;//这两条谁先谁后都可以
    
    System.out.println(a+b);
    ```
  
  - 不可重排的例子
  
    ```java
    int a = 10;
    int b = a - 5;//这两条就无法重排序,b依赖于a
    ```
  
    
  
  一条指令的执行可以被划分为$取指令(IF) -> 指令译码(ID) -> 执行指令(EX) -> 内存访问(MEM) -> 数据写回(WB)$这五个阶段。JVM会适当调整一些指令的执行顺序，利用一些阶段的空闲时间去执行其他阶段，以此加快效率。
  
  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/juc/image-20260918115816498.png" alt="image-20260918115816498" style="zoom:50%;" />
  
  > 如图所示，进行重排后，不同指令之间就不再是串行执行，在一定程度上是并行的（并行执行不同指令的不同阶段）



- 多线程下，指令的重排序会影响最终结果

  ```java
  int num = 0;
  boolean ready = false;
  
  // 线程1 执行此方法
  public void actor1(I_Result r) {
      if(ready) {
          r.r1 = num + num;
      } else {
          r.r1 = 1;
      }
  }
  
  // 线程2 执行此方法
  public void actor2(I_Result r) {
      num = 2;
      ready = true;
  }
  ```

  - 正常情况

    1. 线程1先执行 —  `r.r1 = 1`
    2. 线程2先执行 — `r.r1 = 4`

  - 非正常情况

    `actor2`中的那两条指令可进行重排，重排后线程2先执行`ready = true`。若恰巧碰上时间片到期了且下一次线程1抢到时间片，就会出现`r.r1 = 0`的情况



- 解决

  **使用`volatile`修饰符禁止指令重排序**

---

### 4.4volatile原理

- volatile的底层实现原理是**内存屏障**，$Memory\  \ Barrier$
  - 对volatile变量的写指令后会加入写屏障
  - 对volatile变量的读指令后会加入读屏障

---

#### 4.4.1可见性保障

- 写屏障保证在**该屏障之前的**，对**共享变量的改动**，都同步到主存中

  > 写屏障后，会通知所有CPU，当前变量的值发生变化，会使得CPU高速缓存中的变量失效。

  ```java
  static int num;
  static volatile boolean ready = false;
  public void actor2(){
      num = 2;
      ready = true;//此处对volatile变量改动
      //写屏障     写屏障前的所有写入操作都会被同步到主存中，此处包括num的写操作和ready的写操作
  }
  ```

- 读屏障保证在**该屏障之后**，对**共享变量的读取操作**，读取到的都是主存中的最新数据

  ```java
  public void actor1(I_Result r){
      //读屏障
      if(ready){//此处是对volatile变量的读取
          r.r1 = num+num;
      }
      else{
          r.r1 = 1;
      }
  }
  ```

<img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/juc/image-20260918193154863.png" alt="image-20260918193154863" style="zoom:50%;" />

---

#### 4.4.2有序性的保障

- 写屏障会保证指令重排序时，**不会将写屏障前的代码排在写屏障后**

  ```java
  static int num;
  static volatile boolean ready = false;
  public void actor2(){
      num = 2;
      ready = true;//此处对volatile变量改动
      //写屏障   保证了num = 2不会被重排到ready = true后
  }
  ```

- 读屏障会确保指令重排序时，**不会将读屏障之后的代码排在读屏障前**

  ```java
  public void actor1(I_Result r){
      //读屏障
      if(ready){/
          r.r1 = num+num;
      }
      else{
          r.r1 = 1;
      }
  }
  ```

> 读、写屏障保障了线程对于**共享变量的“写”顺序是不被指令重排所影响的**。以写屏障为例，其保障了对其他共享变量的指令重排不被重排到volatile共享变量后，如此一来对共享变量的写顺序就是有序的了；读屏障同理

---

#### 4.4.3为何不能保证原子性

- 原子性问题的根本原因是线程与线程之间由于指令的插入而造成的结果不一致。但是读写屏障是作用于某线程内部的**（规范某条线程内部对共享变量的修改）**。无法解决线程间的原子性问题

---

### 4.5double-checked-locking

- 以著名的double-cheked-locking懒汉式单例模式为例

  ```java
  public final class Singleton{
      private Singleton(){}
  
      private static Singleton INSTANCE = null;//共享单例
  
      public static synchronized Singleton getInstance(){//使用Balking实现懒加载
          if(INSTANCE == null){
              INSTANCE = new Singleton();
          }
          return INSTANCE;
      }
  }
  
  ```

  - 若`getInstance`方法**不加`synchronized`同步会出现的问题**

    假设两个线程，t1、t2。t1先调用`getInstance`方法，恰好执行到`INSTANCE = new Singleton();`时时间片耗尽。此时t2进入，执行到`if(INSTANCE == null)`就会判断为`true`，如此一来就会有多个实例了

  - 在整个方法上加上`synchronized`虽然可以实现代码块的同步，但是：当**首次`getInstance`创建好了单例后，实际上后面就无需`synchronized`了**。若是每次都要`synchronized`反而影响性能 —  **可以使用`double-checked-locking`提高效率**

    ```java
    public final class Singleton{
        private Singleton(){}
    
        private static volatile Singleton INSTANCE = null;//共享单例
    
        public static Singleton getInstance(){//使用Balking实现懒加载
           	if(INSTANCE == null){
                synchronized(Singleton.class){
                    if(INSTANCE == null){
                       INSTANCE = new Singleton();
                    }
                }
            }
            return INSTANCE;
        }
    }
    
    ```

    使用double-checked-locking模式

    - 第一次check`if(INSTANCE == null)`是因为：若**已经创建过单例了**，则无需`synchronized`加锁，直接返回INSTANCE，**提高效率**
    - 第二次check`if(INSTANCE == null)`是因为：若t1首次调用`getInstance`方法，进入同步代码块。**在临界区代码执行完之前CPU时间片耗尽。**此时t2进入$EntryList$等待。等到t1释放锁后，t2会成为$Owner$进入同步代码块。所以第二次check就是为了防止这种情况创建多个实例

    

    - Tip：为何INTSTANCE需要使用`volatile`修饰？

      根本原因：**第一重check并没有在`synchronized`中**，导致INSTANCE这个共享变量没有完全交由`synchronized`同步，所以无法保证其有序性。`INSTANCE = new Singleton();`会发生指令重排 : 会**预先对INSTANCE赋地址值，后在这个地址上创建对象**

      <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/juc/image-20260918202347078.png" alt="image-20260918202347078" style="zoom:40%;" />

      如图所示，`INSTANCE = new Singleton();`进行了指令重排，可能导致t2线程引用空对象；加上`volatile`后如下图所示

      <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/juc/image-20260918202536448.png" alt="image-20260918202536448" style="zoom: 40%;" />

---

### 4.6happens-before原则

- happens-before规定了对共享变量的写操作对其他线程的读可见。其是可见性和有序性的一套规则总结。
  1. 线程`synchronized`解锁前的写，对接下来的其他线程可见
  2. 线程对`volatile`的写，对于接下来的其他线程可见
  3. 线程`start`前的写，对该线程`start`后可见
  4. 线程结束前对变量的写，对其他得知其结束的线程可见（如：t1结束前对共享变量的写，t2调用了`t1.join()`。那么t2在t1结束后对其的写是可见的）
  5. 线程t1打断t2前，t2对变量的写。对于其他得知t2被打断后的线程可见（如：t3调用`t2.isInterrupted`对其监视，在t2被t1打断后。t3可以看见t2对变量的写）
  6. JVM 在创建对象、数组或初始化类变量时，会把字段初始化为默认值；这个“默认初始化”对其他线程可见。
  7. happens-before具有传递性，如果 $x \ hb \ y \ \&\&\ y\ hb\ z\  那么\  x\ hb\ z$ 

---

## 5.乐观锁

> 乐观锁思想，用于保证并发安全的一种无锁思想

---

#### 5.1示例：扣减库存

多线程扣减库存时，由于库存是共享资源，所以需要保证其线程安全性

- 有锁实现

  ```java
  class Account1 implements Account{
      private Integer balance;
  
  
      public Account1() {
      }
  
      public Account1(Integer balance) {
          this.balance = balance;
      }
  
      public int getBalance() {
          synchronized (this) {
              return balance;
          }
      }
  
      public void withdraw(int amount) {
          synchronized (this) {
              balance -= amount;
          }
      }
  }
  ```

- 无锁实现，底层使用CAS这种乐观锁思想实现。在`java.util.concurrent`包下，`AtomicInteger`类有CAS的成员方法

  ```java
  class Account1 implements Account{
      private AtomicInteger balance;
  
  
      public Account1() {
      }
  
      public Account1(Integer balance) {
          this.balance = new AtomicInteger(balance);
      }
  
      public int getBalance() {
          return balance.get();
      }
  
      public void withdraw(int amount) {
  //        while(true){
  //            //获取余额最新值
  //            int prev = balance.get();
  //
  //            //修改后的余额
  //            int next = prev - amount;
  //
  //            if(balance.compareAndSet(prev, next)){
  //                break;//若CAS成功（期间无其他线程修改），则跳出循环
  //            }
  //            //否则继续下一次尝试
  //        }
  //        
          balance.getAndAdd(-1*amount);
      }
  }
  ```

---

#### 5.2CAS和volatile

- CAS($Compare\ and \ set$)，在Java中，CAS操作是**原子的**

  - `balance.compareAndSet(prev, next)`，示意图如下

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/juc/image-20260920121407299.png" alt="image-20260920121407299" style="zoom:50%;" />

    - 线程1获取余额并进行修改，修改后调用`compareAndSet(prev, next)`方法
      - 若线程1传入的 `prev` 值与Account内的 `balance`值一致，则说明期间没有其他线程进行 set。将`balance`的值设置为`next`
      - 若不一致，则说明期间有其他线程已经进行过修改，由于CAS是原子性的，此次修改不能成功。循环重新进行CAS，直至修改成功

- 由于**CAS可能会不断地重试**，也就是会**不断地`get`共享变量**，如此一来可能导致[共享变量的可见性问题](#4.2可见性)，所以在`AtomicInteger`类中，共享变量`value`是被`volatile`修饰的

---

#### 5.3CAS效率分析

- 虽然CAS可能需要不断地重试，在**竞争不激烈**的情况下**相较于`synchronized`的上下文切换，CAS的重试成本较低。**

  - **若竞争激烈**，大部分地线程都会修改失败，过多的重试会拖慢效率

- 但是CAS**通常不被用于单核CPU**，原因：CAS需要进行重试，单核CPU重试的代价要高于多核CPU

  - 多核CPU中自旋重试的线程可以单独占用一个核进行重试，其他线程仍能正常对共享资源进行修改
  - 单核CPU中自旋重试的线程只能占用唯一的核进行重试，直到时间片耗尽。在竞争激烈的情况下，重试的代价对于单核CPU来说过大了

  > 在高竞争场景下，CAS 重试都会浪费 CPU资源；单核 CPU 因为没有其他核心可并行执行，重试带来的整体影响更明显。

---

#### 5.4一些原子类

---

##### 5.4.1原子整数

- AtomicBoolean
- AtomicInteger
- AtomicLong

> 上述三者方法使用很类似，下面以AtomicInteger为例

```java
        //构造方法
        AtomicInteger i = new AtomicInteger(0);

        //CAS
        boolean res = i.compareAndSet(0, 1);

        //自增并获取值  等价于基本类型的 ++i
        int iag = i.incrementAndGet();
        //获取值并自增  等价于i++
        int gai = i.getAndIncrement();
        //自减并获取值  等价于基本类型的 --i
        int dag = i.decrementAndGet();
        //获取值并自减  等价于i--
        int gad = i.getAndDecrement();

        //先获取再做加法
        int gaa = i.getAndAdd(5);
        //先做加法再获取
        int aag = i.addAndGet(5);

        //更复杂的运算
        int uag = i.updateAndGet(x -> (x + 1) * 10);
        int gau = i.getAndUpdate(x -> x * 10);
```

> 上述所有方法都是基于CAS思想来保证线程安全的

---

##### 5.4.2原子引用

- AtomicReference

  ```java
      AtomicReference<BigDecimal> bigDecimalAtomicReference = new AtomicReference<>(new BigDecimal("1.0"));
  
      BigDecimal res = bigDecimalAtomicReference.get();
  
      bigDecimalAtomicReference.compareAndSet(new BigDecimal("1.0"), new BigDecimal("2.0"));
  
      bigDecimalAtomicReference.updateAndGet(x -> x.subtract(new BigDecimal("1.0")));
      bigDecimalAtomicReference.updateAndGet(x -> x.multiply(BigDecimal.TEN));
  ```

  

- AtomicStampedReference

  用于解决[ABA问题](#ABA问题)

  ```java
          AtomicStampedReference<String> atomicStampedReference = new AtomicStampedReference<>("A", 1);
  
          String prev = atomicStampedReference.getReference();
          int stamp = atomicStampedReference.getStamp();
  
          atomicStampedReference.compareAndSet(prev,"B",stamp,stamp+1);
  
  ```

  只有在stamp的状态与共享变量stamp的最新值对的上时，才可以执行CAS



- AtomicMarkableReference

  AtomicStampedReference的简化版。版本号不使用int，使用boolean。**仍然会产生ABA问题**

  ```java
          AtomicMarkableReference<String> atomicMarkableReference = new AtomicMarkableReference<>("A", false);
  
          String reference = atomicMarkableReference.getReference();
  
          atomicMarkableReference.compareAndSet(reference,"B",false,true);
  ```

---

###### ABA问题

- CAS中会出现**ABA问题**

  由于CAS是根据共享变量最新值与线程修改时获取到的值做对比来确认在当前线程修改过程中有无其他线程进行了修改

  那么可能出现以下情况

  1. 线程1拿到共享变量状态为A，要将其改为C
  2. 在这期间，其他线程将共享变量从A改为了B，又将B改回了A。

  如此一来，虽然其他线程对共享变量进行了修改，但是**线程1是无法感知到的**



- 解决：CAS时额外使用一个版本号进行比较，该版本号是自增的，也就是说不会出现状态上的重复。如此一来就可以避免ABA问题

---

##### 5.4.3原子数组

- **原子引用改变的是引用的值**，如AtomicReference示例中，每改变一次就要新创建一个`BigDecimal`对象。而原子数组是**直接对引用型变量所指向的那个对象做修改**



- AtomicIntegerArray
- AtomicLongArray
- AtomicReferenceArray

---

##### 5.4.4原子更新器

- 字段更新器，可以针对**对象的某个域（Field）进行原子操作**，**只能配合`volatile`修饰的字段使用**，否则会出现异常



- AtomicReferenceFieldUpdater
- AtomicIntegerFieldUpdater
- AtomicLongFieldUpdater

```java
public class JUCLearnMain {

    public static void main(String[] args) {
        Student s = new Student();

        AtomicIntegerFieldUpdater<Student> age =
                AtomicIntegerFieldUpdater.newUpdater(Student.class, "age");
        
        age.compareAndSet(s,0,18);

        
        AtomicReferenceFieldUpdater<Student, String> name =
                AtomicReferenceFieldUpdater.newUpdater(Student.class, String.class, "name");
        
        name.compareAndSet(s,null,"张三");
        
    }
}

class Student{
    volatile String name;
    volatile int age;

    public Student() {
    }

    public Student(String name, int age) {
        this.name = name;
        this.age = age;
    }
}
```

---

##### 5.4.5原子累加器

- JDK8后添加了几个专门用于做累加的类，相较于AtomicInteger、AtomicLong等类，这几个类的累加效率更高



- LongAdder:只做简单累加

  ```java
  LongAdder counter = new LongAdder();
  counter.increment();    // +1
  counter.add(5);         // +5
  long total = counter.sum(); //汇总base+cells
  ```

  LongAdder原理：CAS操作时，**不在同一个累加单元上进行累加**。如：线程1在累加单元1上进行累加；线程2在累加单元2上进行累加。最后将结果汇总到共享变量上。如此一来就**减少了CAS时失败的可能性，所以可以提高效率**

- DoubleAdder

- LongAccumulatorAdder：在`new`时，可通过传入Lambda表达式**自定义运算规则**

  ```java
  // 运算：取最大值，初始值0
  LongAccumulator acc = new LongAccumulator(Long::max,0);
  acc.accumulate(10);
  acc.accumulate(20);
  System.out.println(acc.get()); //20
  ```

- DoubleAccumulatorAdder

---

#### 5.5Unsafe对象

- Unsafe对象提供了底层的操作内存、操作线程的方法。无法直接调用，需要反射获取

  ```java
      public static void main(String[] args) throws NoSuchFieldException, IllegalAccessException {
          //获取类对象
          Class<Unsafe> unsafeClass = Unsafe.class;
  
          //反射获取theUnsafe静态单例
          Field theUnsafe = unsafeClass.getDeclaredField("theUnsafe");
  
          //暴力反射，打开private权限
          theUnsafe.setAccessible(true);
  
          //get()读取字段的值，由于theUnsafe是静态变量，直接传入null获取其指向的Unsafe对象的地址
          Unsafe unsafe = (Unsafe) theUnsafe.get(null);
  
      }
  ```



- Unsafe 的 CAS操作

  ```java
          Field theUnsafe = Unsafe.class.getDeclaredField("theUnsafe");
          theUnsafe.setAccessible(true);
          Unsafe unsafe = (Unsafe) theUnsafe.get(null);
  
          //1.获取成员变量偏移地址
          long idOffset = unsafe.objectFieldOffset(Teacher.class.getDeclaredField("id"));
          long nameOffset = unsafe.objectFieldOffset(Teacher.class.getDeclaredField("name"));
  
          Teacher teacher = new Teacher();
          //2.执行CAS
          unsafe.compareAndSwapInt(teacher,idOffset,0,1);
          unsafe.compareAndSwapObject(teacher,nameOffset,null,"张三");
  
          System.out.println(teacher.id);
          System.out.println(teacher.name);
  ```

---

## 6.不可变类

---

### 6.1不可变对象

- 问题示例

  ```java
          SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
  
          for (int i = 0; i < 10; i++) {
              new Thread(() -> {
                  try {
                      Date date = sdf.parse("2006-09-08 00:00:00");
                  } catch (ParseException e) {
                      throw new RuntimeException(e);
                  }
              }).start();
          }
  ```

  可变对象`SimpleDateFormat`在多线程使用的情况下会报错



- 解决

  除了`synchronized`加锁外，还可以**使用不可变类`DateTimeFormatter`**

  ```java
          DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
  
          for (int i = 0; i < 10; i++) {
              new Thread(() -> {
                  dtf.parse("2006-09-08 00:00:00");
              }).start();
          }
  ```



- 不可变类的设计

  1. ` final`的使用

     不可变类中，所有的属性都是`final`的

     - 保证了属性是只读的，不可修改
     - 保证了类中的方法不能被覆盖，防止子类对其不可变性进行破坏

  2. 保护性拷贝

     当**对外部返回对象/从外部接收传入的可变对象时**，新建一份副本，将对外暴露的引用和内部对象隔离开来，防止外部代码修改内部对象

     > 如String类中，当我们调用substring等方法对字符串对象进行修改时，都会保护性拷贝出一份相同的对象，在拷贝的对象上进行修改。  如此一来就**防止了多线程共享一份变量，是线程安全的**

---

### 6.2享元模式

- Flyweight pattern  当需要**重用数量有限的同一类对象**时适用



- 体现

  1. JDK中Integer、Character等包装类提供的`ValueOf(int x)`方法，如：Long的`ValueOf`方法会预先创建$[-128,\ 127]$之间的Long对象。在这个范围内会重用对象，大于这个范围的才会创建Long对象

     > Long、Integer、Byte的范围都是$[-128,\ 127]$。Character的范围是$[0,\ 127]$。Boolean只有$True \ False$

  2. $StringTable$串池

  3. BigInteger、BigDecimal

     这二者也是不可变对象。对于其**单个方法调用是原子的、线程安全的**，但是多个方法一起调用无法保证其原子性

---

#### 6.2.1自定义数据库连接池

```java
class ConnectPool{
    //1.连接数：初始化后固定，使用final修饰
    private final int poolSize;

    //2.连接对象的数组
    private Connection[] connections;

    //3.连接状态：0表示空闲，1表示繁忙。
    //由于可能有多个线程对其进行更改，所以要使用原子类
    private AtomicIntegerArray state;

    //4.构造方法
    public ConnectPool(int poolSize) {
        this.poolSize = poolSize;
        this.connections = new Connection[poolSize];
        this.state = new AtomicIntegerArray(new int[poolSize]);
        for (int i = 0; i < poolSize; i++) {
            connections[i] = new MockConnetion();//MockConnection为Connection接口的实现类
        }
    }

    //5.建立连接
    public Connection getConnection() {
        while (true) {
            for (int i = 0; i < poolSize; i++) {//寻找空闲连接
                if (state.get(i)==0) {
                    if (state.compareAndSet(i, 0, 1)) {//CAS标记state，表示该连接被占用
                        return connections[i];//返回连接
                    }
                }
            }

            //若没有连接，当前线程进入等待
            synchronized (this){
                try {
                    this.wait();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    //6.释放连接
    public void FreeConnection(Connection connection) {
        for (int i = 0; i < poolSize; i++) {
            if (connections[i]==connection) {
                state.set(i,0);//释放连接时，当前连接只有当前线程有操作权，所以没有线程安全问题

                //归还连接后，有空闲连接了，notyfiAll唤醒等待线程
                synchronized (this){
                    this.notifyAll();
                }
                break;
            }
        }
    }
}
```

---

### 6.3final原理

- 设置`final`变量的原理

  字节码中，在**`final`变量的赋值操作后，会加入一个写屏障**。如此一来，保证了`final`变量初始化时对其他线程的可见性，同时也预防了指令重排的干扰。保证了其他线程可以正确地读取`final`变量的值

  如`int a = 20`在字节码中分为两步

  1. 内存中创建a变量，初始值为0
  2. 给a变量赋值为20

  若不加`final`即无写屏障时，多线程下有的线程读取a的值时就有可能读取到`a = 0`的情况

  加上`final`后，字节码中加上了写屏障，**写屏障后，会通知所有CPU将其得到的a变量失效。**如此一来，后续线程再对a进行读取时读取到的值就都是正确的了。且由于`final`变量是不可修改的，所以哪怕存到高速缓存中也不会有可见性问题



- 获取`final`变量的原理

  ```java
  static final int A = 10;
  static final String B = "abc";
  ```

  会被直接优化为**编译期常量**，存入常量池。若不加`final`，读取时需要使用`getstatic`指令，效率较慢

  ```java
  int x = A;
  ```

  由于A被存入了常量池中，所以如此赋值时会直接将10push进栈中

---

## 7.并发工具 — 线程池

### 7.1简易线程池实现

> 线程使用一次就直接释放的话复用性不够高，浪费资源。可以使用线程池实现线程的复用。
>
> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/juc/image-20260921145935210.png" alt="image-20260921145935210" style="zoom: 33%;" />

---

#### 7.1.1阻塞队列

- 平衡消费者线程和生产者线程的桥梁



- 阻塞队列的实现  —  双向链表

  ```java
  @FunctionalInterface //拒绝策略,函数式接口，可以由用户调用时传入Lambda自定义拒绝策略
  interface RejectPolicy<T>{
      public void reject(BlockingQueue<T> queue,T task);
  }
  
  class BlockingQueue<T>{
      //1.任务队列
      private Deque<T> queue = new ArrayDeque<>();
  
      //2.锁（防止同个任务被多个线程获取且防止多线程同时向队列添加任务）
      private ReentrantLock lock = new ReentrantLock();
  
      //3.两个条件变量
      Condition FullWaitSet = lock.newCondition();//队列满时，生产者等待
      Condition EmptyWaitSet = lock.newCondition();//队列空时，消费者等待
  
      //4.容量
      private int capacity;
  
  
      public BlockingQueue(int capacity) {
          this.capacity = capacity;
      }
  
      //阻塞获取
      public T take(){
          lock.lock();
          try {
              while (queue.isEmpty()){
                  try{
                      EmptyWaitSet.await();
                  } catch (InterruptedException e) {
                      throw new RuntimeException(e);
                  }
              }
              T task = queue.poll();
              FullWaitSet.signal();
              return task;
          }
          finally {
              lock.unlock();
          }
      }
  
      //带超时的阻塞等待
      public T take(long timeout, TimeUnit unit){
          lock.lock();
          try {
              //将超时时间转换为纳秒
              long nanos = unit.toNanos(timeout);
              long remainTime = nanos;
  
              while (queue.isEmpty()){
                  try{
                      //返回的是剩余时间
                      remainTime = EmptyWaitSet.awaitNanos(remainTime);
                      if (remainTime <= 0){
                          return null;
                      }
  
                  } catch (InterruptedException e) {
                      throw new RuntimeException(e);
                  }
              }
  
              T task = queue.poll();
              FullWaitSet.signal();
              return task;
          }
          finally {
              lock.unlock();
          }
      }
  
      //阻塞添加
      public void put(T t){
          lock.lock();
          try {
              while (queue.size() == capacity){
                  FullWaitSet.await();
              }
              queue.addLast(t);
              EmptyWaitSet.signal();
          } catch (InterruptedException e) {
              throw new RuntimeException(e);
          }
          finally {
              lock.unlock();
          }
      }
  
      //带超时的阻塞添加，配合线程池中的拒绝策略使用
      public boolean put(T t,long timeout, TimeUnit unit){
          lock.lock();
          long remainTime = unit.toNanos(timeout);
  
          try {
              while (queue.size() == capacity){
                 remainTime = FullWaitSet.awaitNanos(remainTime);
                 if (remainTime <= 0){
                     return false;//超时，添加失败
                 }
              }
              queue.addLast(t);
              EmptyWaitSet.signal();
              return true;
          } catch (InterruptedException e) {
              throw new RuntimeException(e);
          }
          finally {
              lock.unlock();
          }
  
      }
  
      //尝试放入（拒绝策略）
      public void tryPut(RejectPolicy<T> rejectPolicy, T task) {
          lock.lock();
          try {
              if(queue.size() == capacity){//满了，执行拒绝策略
                  rejectPolicy.reject(this, task);
              }
              else{//空闲，直接放入
                  queue.addLast(task);
                  EmptyWaitSet.signal();
              }
          }
          finally {
              lock.unlock();
          }
      }
  }
  ```

---

#### 7.1.2简易线程池

- 实现

  ```java
  public class JUCLearnMain {
  
      public static void main(String[] args)  {
          ThreadPool threadPool = new ThreadPool(
                  3,5,TimeUnit.SECONDS,0,
                  (queue,task)->{
                      //queue.put(task);//死等
                      queue.put(task,2,TimeUnit.SECONDS);//超时等待
                  }
          );
  
          for (int i = 0; i < 4; i++) {
              final int I = i;
              threadPool.execute(() -> {
                  try {
                      log.info("任务{}",I);
                      Thread.sleep(4000);
                  } catch (InterruptedException e) {
                      throw new RuntimeException(e);
                  }
              });
          }
      }
  
  }
  
  @FunctionalInterface //拒绝策略,函数式接口，可以由用户调用时传入Lambda自定义拒绝策略
  interface RejectPolicy<T>{
      public void reject(BlockingQueue<T> queue,T task);
  }
  
  class ThreadPool{
      //任务队列
      private BlockingQueue<Runnable> taskQueue;
  
      //线程集合
      private HashSet<Worker> workers = new HashSet<>();
  
      //核心线程数
      private int coreSize;
  
      //获取任务的超时时间
      private long timeout;
      private TimeUnit timeUnit;
  
      private RejectPolicy<Runnable> rejectPolicy;
  
      public ThreadPool(int coreSize, long timeout, TimeUnit timeUnit,int queueSize,RejectPolicy<Runnable> rejectPolicy) {
          this.coreSize = coreSize;
          this.timeout = timeout;
          this.timeUnit = timeUnit;
          taskQueue = new BlockingQueue<>(queueSize);
          this.rejectPolicy = rejectPolicy;
      }
  
      //执行任务
      public void execute(Runnable task){
          synchronized (workers) {
              //当核心线程没有满时，直接创建核心线程去执行
              if(workers.size() < coreSize){
                  Worker worker = new Worker(task);
                  workers.add(worker);
                  worker.start();
              }
              else {//否则加入任务队列，交由线程池中的线程执行
                  //以下五种拒绝策略由调用者使用Lambda表达式自行选择
                  //1.死等
                  //2.带超时等待
                  //3.让调用者放弃任务执行
                  //4.让调用者抛出异常
                  //5.让调用者自己执行任务
                  taskQueue.tryPut(rejectPolicy,task);
              }
          }
      }
  
      private class Worker extends Thread{
          private Runnable task;
  
          public Worker(Runnable task){
              this.task = task;
          }
  
          @Override
          public void run() {
              //执行任务
              //1.当task不为空，执行任务
              //2.当task为空，从任务队列获取任务
              while(task != null || (task = taskQueue.take(timeout,timeUnit)) != null){
                  try {
                      task.run();
                  } catch (Exception e) {
                      throw new RuntimeException(e);
                  }
                  finally {
                      task = null;
                  }
              }
  
              //若等待超时，则移除当前线程。注意：操作workers共享资源时要加锁
              synchronized (workers) {
                  workers.remove(this);
              }
          }
      }
  }
  ```

---

### 7.2JDK中的线程池

- 继承关系

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/juc/image-20260921164224757.png" alt="image-20260921164224757" style="zoom: 80%;" />

---

#### 7.2.1ThreadPoolExecutor

- 线程池状态

  $ThreadPoolExecutor$使用`int`的高3位来表示线程状态，低29位标识线程数量

  | 状态名     | 高 3 位 | 接收新任务 | 处理阻塞队列任务 | 说明                                      |
  | ---------- | ------- | ---------- | ---------------- | ----------------------------------------- |
  | RUNNING    | 111     | Y          | Y                |                                           |
  | SHUTDOWN   | 000     | N          | Y                | 不会接收新任务，但会处理阻塞队列剩余任务  |
  | STOP       | 001     | N          | N                | 会中断正在执行的任务，并抛弃阻塞队列任务  |
  | TIDYING    | 010     | -          | -                | 任务全执行完毕，活动线程为 0 即将进入终结 |
  | TERMINATED | 011     | -          | -                | 终结状态                                  |

  > JDK中的线程池实现**更新线程池状态、worker 数量时**，**用 CAS，乐观锁**
  >
  > 将这些信息存储在一个原子变量`AtomicInteger`中，目的是为了将线程池状态和线程个数的信息合二为一，这样就可以用一次CAS原子操作进行赋值



- 构造方法

  ```java
  public ThreadPoolExecutor(int corePoolSize,//核心线程数
                            int maximumPoolSize,//最大线程数
                            long keepAliveTime,//线程存活时间
                            TimeUnit unit,//时间单位
                            BlockingQueue<Runnable> workQueue,//阻塞队列
                            ThreadFactory threadFactory,//线程工厂 - 用来创建线程，可以自定义线程名、优先级等
                            RejectedExecutionHandler handler)//拒绝策略
  ```





- 工作方式

  1. 有新任务时，核心线程未满时。会创建核心线程去执行任务（懒加载）

     - 创建核心线程后，核心线程不会被销毁，会一直从阻塞队列中取任务执行

  2. 有新任务时，核心线程满了，但是阻塞队列未满时。将任务存入阻塞队列

  3. 有新任务时，核心线程、阻塞队列都满了时。创建临时线程直接执行新任务。

     - 不同于核心线程，临时线程有生存时间，时间一过就会被销毁。临时线程最大值 = `maximumPoolSize - corePoolSize`

  4. 有新任务时，核心线程、阻塞队列、临时线程都满了（==maximumPoolSize），触发拒绝策略

     - JDK中的四种拒绝策略

       | 拒绝策略            | 行为                                           |
       | ------------------- | ---------------------------------------------- |
       | AbortPolicy         | 抛异常，**默认**                               |
       | CallerRunsPolicy    | 提交任务的调用线程自己去执行任务               |
       | DiscardPolicy       | 直接丢掉当前新任务，无异常                     |
       | DiscardOldestPolicy | 丢掉队列头部等待最久的旧任务，再尝试加入新任务 |

     > 除此之外，很多第三方框架还会对拒绝策略进行扩展



- 提交任务的方法

  1. `void execute(Runnable command)`：直接执行任务。但是提交的任务是`Runnable`，无返回值

  2. `Future<T> submit(Callable<T> task)`：传入的是`Callable<T>`参数，**可以返回结果**其中T为返回值类型

     ```java
             Future<String> f1 = pool.submit(new Callable<String>() {
                 @Override
                 public String call() throws Exception {
                     Thread.sleep(1000);
                     return "hello";
                 }
             });
     
             System.out.println(f1.get());
     
             //可以使用Lambda表达式简化
             Future<String> f2 = pool.submit(() -> {
                 Thread.sleep(1000);
                 return "world";
             });
     
             System.out.println(f2.get());
     ```

  3. `List<Future<T>> invokeAll(Collection<? extends> Callable<T> tasks)`：提交tasks集合中所有的任务。将**所有的返回值存入一个List返回**

     ```java
             List<Callable<String>> tasks = new ArrayList<>();
             for (int i = 0; i < 5; i++) {
                 final int finalI = i;
                 tasks.add(()->{
                     return "任务"+finalI;
                 });
             }
     
             List<Future<String>> futures = pool.invokeAll(tasks);
             for (Future<String> future : futures) {
                 System.out.println(future.get());
             }
     ```

  4. `T invokeAny(Collection<? extends> Callable<T> tasks)`：传入任务集合，但是当一个任务成功执行后，直接返回执行成功任务的返回值。**其他任务就不执行了**

     ```java
             List<Callable<String>> tasks = new ArrayList<>();
             for (int i = 0; i < 5; i++) {
                 final int finalI = i;
                 tasks.add(()->{
                     return "任务"+finalI;
                 });
             }
     
             String s = pool.invokeAny(tasks);
             System.out.println(s);
     ```



- 关闭线程池的方法

  1. `void shutdown()`：将线程池的状态变为$SHUTDOWN$。

     - 不会接收新任务；

     - 已提交的任务会执行完；

     - 只会打断线程池中的空闲线程，并不会打断线程池中正在调用任务的线程

  2. `List<Runnable> shutdownNow()`：将线程池状态变为$STOP$

     - 不会接收新任务
     - 会将队列中的任务返回
     - 用`interrupt`的方式中断正在执行的任务

  3. `boolean isShutdown()`：判断线程池是否处于$SHUTDOWN$状态

  4. `boolean isTermination()`：判断线程池是否处于$TERMINATED$状态

  5. `boolean awaitTermination(long timeout,Timeunit unit)`：调用 `shutdown()` 之后，**阻塞当前线程**，等待线程池所有任务执行完毕；最多等待指定超时时间，返回布尔值标记是否正常全部结束。

---

#### 7.2.2Executors

- $ThreadPoolExecutor$用于自定义线程池。JDK中提供了$Executors$，其中有7种**现成的线程池**供我们快速创建



1. 固定大小线程池`newFixedThreadPool()`

   ```java
       public static ExecutorService newFixedThreadPool(int nThreads) {
           return new ThreadPoolExecutor(nThreads, nThreads,
                                         0L, TimeUnit.MILLISECONDS,
                                         new LinkedBlockingQueue<Runnable>());
       }
   ```

   ```java
   ExecutorService executorService = Executors.newFixedThreadPool(5);
   ```

   1. 固定大小线程池中**只有核心线程**，无临时线程
   2. 阻塞队列是无界的，可存放任意数量的任务



2. 带缓冲功能的线程池`newCachedThreadPool()`

   ```java
       public static ExecutorService newCachedThreadPool() {
           return new ThreadPoolExecutor(0, Integer.MAX_VALUE,
                                         60L, TimeUnit.SECONDS,
                                         new SynchronousQueue<Runnable>());
       }
   ```

   ```java
   ExecutorService pool = Executors.newCachedThreadPool();
   ```

   1. **核心线程数为0**，最大线程数是$Integer.MAX\_VALUE$。临时线程生存时间为60s

   2. 阻塞队列采用$SynchronousQueue$，它没有容量，没有线程来取是放不进去的

      > 队列只是一个 “中转站通道”，**不存放任务**，任务必须**立刻交给等待的线程**，没人接就**阻塞**。



3. 单线程线程池`newSingleThreadExecutor`

   ```java
       public static ExecutorService newSingleThreadExecutor() {
           return new FinalizableDelegatedExecutorService
               (new ThreadPoolExecutor(1, 1,
                                       0L, TimeUnit.MILLISECONDS,
                                       new LinkedBlockingQueue<Runnable>()));
       }
   ```

   ```java
   ExecutorService pool = Executors.newSingleThreadExecutor();
   ```

   1. 只有一个线程。可以保证任务串行执行

      > - 与自己创建一个线程执行任务的区别
      >
      >   自己创建一个单线程串行执行任务，如果任务执行失败而终止那么没有任何补救措施，而线程池还会新建一个线程，保证池的正常工作
      >
      > - 与`newFixedThreadPool(1)`的区别
      >
      >   `newSingleThreadExecutor`由`FinalizableDelegatedExecutorService`封装而来，只对外暴露一个接口，无法通过set方法对其参数进行修改。而`FixedThreadPool`可以对其参数修改

   2. 队列是无界队列，可存放任意个任务

---

#### 7.2.3设计模式：工作线程模式

- 让**有限的工作线程（Worker Thread）来轮流异步处理无限多的任务**，也可将其归类为分工模式。其**典型实现就是线程池**，同时也体现了享元模式

  > 注意：不同的任务类型应当使用不同的线程池，这样可以避免饥饿



- 饥饿

  固定大小的线程池会发生饥饿现象。通常由于线程数的不足，导致程序无法向下执行。

  如：现有任务1任务2。**任务2依赖于任务1的结果**，线程池中只有两个线程。两个线程都去执行了任务2，那么此时任务1就陷入了饥饿。任务1无法得到执行，导致任务2也无法继续执行

  - 解决方法

    **不同的任务类型应当使用不同的线程池**



- 池大小

  - **CPU密集型**运算

    通常采用**$CPU核数+1$**，能够实现最优的CPU利用率，+1是为了保证当线程由于**页缺失故障（操作系统）**或其他原因导致的**暂停**。额外的这个线程可以顶上去，**保证CPU时钟周期不被浪费**

  - **IO密集型**运算

     IO密集型任务执行时CPU不总是处于繁忙状态。如：某IO密集型任务CPU计算时间是50%，剩下50%时间是IO阻塞时间。若希望充分地利用这50%的阻塞时间，就可以开多线程提高利用率

    $线程数 = 核数 \times 期望CPU利用率 \times \frac{总时间(CPU计算时间+等待时间)}{CPU计算时间}$

---

#### 7.2.4任务调度线程池

> 当我们需要定时执行任务时，可以使用任务调度线程池



- 在【任务调度线程池】加入前，一般使用 `java.util.Timer`来实现定时功能

  ```java
          Timer timer = new Timer();
  
          TimerTask timerTask = new TimerTask() {
              @Override
              public void run() {
                  log.info("test");
              }
          };
  
          //第二个参数是延迟执行时间，第三个参数是执行周期
          timer.schedule(timerTask, 1000, 1000);
  ```

  - Timer的优点

    简单易用

  - Timer的缺点

    所有任务都由一个线程调度，因此所有任务都是串行执行的。这就会导致效率低下且前一个任务的异常会影响到下一个任务



- $ScheduledThreadPool$

  `Executors.newScheduledThreadPool(int poolSize)`

  ```java
          ScheduledExecutorService pool = Executors.newScheduledThreadPool(5);
  
          //延时执行任务1
          pool.schedule(()->{
              log.info("test");
          },1,TimeUnit.SECONDS);
  
          //延时执行任务2
          ScheduledFuture<String> res = pool.schedule(() -> {
              log.info("test2");
              return "SUCCESS";
          }, 1, TimeUnit.SECONDS);
  
          //循环执行任务1（只可传递Runnable）
          //第一次执行时延迟2s，随后以1s为周期循环执行
          pool.scheduleAtFixedRate(()->{
              log.info("test3");
              try {
                  sleep(2000);
              } catch (InterruptedException e) {
                  throw new RuntimeException(e);
              }
          },2, 1, TimeUnit.SECONDS);
  
          //循环执行任务2（只可传递Runnable）
          pool.scheduleWithFixedDelay(()->{
              log.info("test4");
              try {
                  sleep(2000);
              } catch (InterruptedException e) {
                  throw new RuntimeException(e);
              }
          },2,1, TimeUnit.SECONDS);
  
          System.out.println(res.get());
  
  ```

  可见，$ScheduledThreadPool$执行延时任务时，既可以传递$Runnable$也可以传递$Callable$

  - scheduleAtFixedRate：从上一次调用任务开始计算

    如：周期为2s，任务执行需要1s   第一次任务开始是00  ，结束为01，第二次开始为02…

  - scheduleWithFixedDelay：从上一次调用任务结束开始计算

    如：周期为2s，任务执行需要1s   第一次任务开始是00 ，结束为01，第二次开始为03…

---

#### 7.2.5线程池中的异常处理方法

1. 使用`try...catch...`手动处理
2. 当线程池中的任务类型为Future时，也就是说任务有返回值时，若出现异常并不会停止JVM运行。而是会将异常包装在返回值里。如此一来调用`get()`方法获取到的就不是返回值，而是异常

---

### 7.3TomCat中的线程池

- Tomcat的连接器$Connector$中使用到了连接池

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/juc/image-20260922153208862.png" alt="image-20260922153208862" style="zoom:50%;" />

  - $LimitLatch线程$用于限流，可以**控制最大连接个数**。类似JUC中的Semaphore

  

  - $Acceptor线程$只负责**接收新的socket连接**

  

  - $Poller线程$只负责**监听 socket channel 是否有可读的IO事件**

    若有可读IO事件，则说明浏览器将数据发送过来了。Tomcat就会将其**封装为一个任务对象(socketProcessor)，提交给$Executor$线程池处理**

  

  - $Executor$线程池中的$Worker线程$最终负责**处理请求**

    - Tomcat线程池扩展了$ThreadPoolExecutor$，重写了`execute()`逻辑

      若总线程数达到$maximumPoolSize$，不会立即抛出异常。而是再次尝试将任务房屋队列，若仍失败才抛出异常

      > JDK原生的ThreadPool是`核心线程 -> 队列 -> 临时线程 -> 拒绝策略`。而由于Tomcat中的队列长度为Integer.MAX_VALUE。基本可以视为无界的，也就是说Tomcat的任务队列不会满，所以Tomcat对逻辑进行了调整 `核心线程 -> 临时线程 -> 队列 -> 拒绝策略`优先触发临时线程，提高并发效率

---

### 7.4Fork/Join

- JDK1.7后加入的新线程池实现，体现了分治思想，适用于**能够进行任务拆分的CPU密集型计算**

  Fork/Join可以把每个任务分解和合并交给不同的线程完成。默认会创建**与CPU核心数大小相同的线程池**



- 使用

  1. 创建任务对象（**任务对象**需要继承$RecursiveTask<T>(有返回值)$或$RecursiveAction（无返回值）$）
  2. 使用`ForkJoinPool`线程池对象调用任务

  ```java
  public class JUCLearn {
      public static void main(String[] args) throws ExecutionException, InterruptedException {
          ForkJoinPool pool = new ForkJoinPool();
          System.out.println(pool.invoke(new MyTask(3)));//提交任务
      }
  }
  
  //1-n之间的整数求和
  class MyTask extends RecursiveTask<Integer> {
  
      private int n;
  
      public MyTask(int n) {
          this.n = n;
      }
  
      @Override
      protected Integer compute() {
          if(n==1){//结束条件
              return 1;
          }
  
          //让一个线程执行此任务
          ForkJoinTask<Integer> fork = new MyTask(n - 1).fork();
  
          //join()方法得到返回值
          return fork.join()+n;
      }
  
  }
  ```

---

## 8.并发工具 — JUC

### 8.1AQS原理

> AbstractQueuedSynchronizer，是**阻塞式锁和相关的同步工具的框架**。
>
> - synchronized由cpp代码调用
> - ReentrantLock由**Java代码实现，其底层就是AQS**



- 特点

  - 用**state属性**来**标识资源的状态（独占模式和共享模式）**，子类需要定义如何维护该状态，控制如何获取锁和释放锁

    > 用来记录**资源占用计数、重入次数、锁是否被持有**

    - `getstate` ： 获取state状态
    - `setState`：设置state状态
    - `compareAndSetState`：使用CAS机制设置state状态

  

  - 提供了基于**FIFO的等待队列**，类似于$Monitor$的$EntryList$

    > 当某线程占用了锁后，其他线程需要进入等待队列等待

   

  - **条件变量**用于实现**等待唤醒机制**，支持多个条件变量，类似$Monitor$中的$WaitSet$



- 获取锁与释放锁

  - 获取

    ```java
    if(!tryAcquire(arg)){//获取锁，若获取失败
    	//入等待队列，可以选择阻塞当前线程（park、unpark）    
    }
    ```

    使用`tryAcquire(arg)`方法获取锁，若获取成功，会将state修改，标识锁已被持有

  - 释放

    ```java
    if(tryRelease(arg)){//释放锁，若释放成功
        //让阻塞线程恢复
    }
    ```



- 简易版锁的实现

  ```java
  class MyLock implements Lock{
  
      //同步器类   独占锁
      class Mysync extends AbstractQueuedSynchronizer {
          @Override//获取锁
          protected boolean tryAcquire(int arg) {
              if(compareAndSetState(0, 1)) {//将state改为1,表示锁被占用
                  //加锁，并设置owner为当前线程
                  setExclusiveOwnerThread(Thread.currentThread());
                  return true;
              }
              return false;
          }
  
          @Override//释放锁
          protected boolean tryRelease(int arg) {
              setExclusiveOwnerThread(null);//清空owner，注意顺序，要先操作owner在操作state
              setState(0);//持有锁线程释放锁时，其他线程不可能来争抢
              return true;
          }
  
          @Override//检查是否持有锁
          protected boolean isHeldExclusively() {
              return getState() == 1;
          }
  
          //条件变量获取
          public Condition newCondition() {
              return new ConditionObject();
          }
      }
  
      private Mysync sync = new Mysync();
  
      @Override//加锁，不成功进入等待队列
      public void lock() {
          sync.acquire(1);//调用AQS中的方法
      }
  
      @Override//加锁（可打断）
      public void lockInterruptibly() throws InterruptedException {
          sync.acquireInterruptibly(1);//调用AQS中的方法
      }
  
      @Override//尝试加锁（一次）
      public boolean tryLock() {
          return sync.tryAcquire(1);
      }
  
      @Override//尝试加锁，带超时
      public boolean tryLock(long time, TimeUnit unit) throws InterruptedException {
          return sync.tryAcquireNanos(1, unit.toNanos(time));
      }
  
      @Override//释放锁
      public void unlock() {
          //release会间接调用tryRelease，并唤醒正在阻塞的线程
          sync.release(1);
      }
  
      @Override
      public Condition newCondition() {
          return sync.newCondition();
      }
  }
  ```

  可见，AQS中将锁的底层操作的大部分方法都实现了。其逻辑和$Monitor$的底层很像

---

### 8.2ReentrantLock底层原理

- 继承关系

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/juc/image-20260922172516566.png" alt="image-20260922172516566" style="zoom:50%;" />

---

#### 8.2.1非公平锁实现原理

- 构造器所初始化的sync就是NonfairSync

  ```java
  public ReentrantLock(){
      sync = new NonfairSync();
  }
  ```

---

##### 加锁

```java
final void lock(){
    if(compareAndSetState(0,1)){
        setExclusiveOwnerThread(Thread.currentThread());//若成功，直接将当前线程写入Owner
    }
    else{
        acquire(1);
    }
}
```

- 加锁成功

  `compareAndSetState(0,1)`成功后，直接将当前线程写入$ExclusiveOwnerThread$

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/juc/image-20260922174507157.png" alt="image-20260922174507157" style="zoom: 50%;" />

- 加锁失败流程

  失败后会进入`acquire(1)`方法。

  ```java
      public final void acquire(int arg) {
          if (!tryAcquire(arg) &&
              acquireQueued(addWaiter(Node.EXCLUSIVE), arg))
              selfInterrupt();
      }
  ```

  1. 重新尝试加锁，若成功则将当前线程设为$Owner$
  2. 若尝试加锁失败，则进入 `addWaiter 和 acquireQueued`方法

  - addWaiter：构造Node队列

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/juc/image-20260922181034581.png" alt="image-20260922181034581" style="zoom: 50%;" />

    链表中**第一个节点是dummy哨兵节点**

  - acquireQueued

    > 该方法中有一个死循环，若当前节点是最新进来的节点且`shouldParkAfterFailedAcquire`返回false。就可以一直尝试获取锁

    1. 在进行了addWaiter后，若自己排在dummy后面（排在第二个），那么就可以再次`tryAcquire`尝试获取锁
    2. 再次尝试获取锁失败后，进入`shouldParkAfterFailedAcquire`方法，**若该方法返回真**，说明应当**进入阻塞。**若返回假则继续重试
    3. **第一次**进入`shouldParkAfterFailedAcquire`方法内会把当前节点的**前驱节点的State变为-1**表示后续过程中**该前驱节点需要去唤醒其后面的节点**（即：当前节点）。并**返回false**。
    4. **第二次**进入`shouldParkAfterFailedAcquire`方法内，由于前驱节点已经是-1了。返回true，**当前节点进入阻塞**

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/juc/image-20260922182210606.png" alt="image-20260922182210606" style="zoom:50%;" />

    > - 经过多次上述流程，示意图会变为以下的样子
    >
    >   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/juc/image-20260922182338854.png" alt="image-20260922182338854" style="zoom:50%;" />

   

  3. 当锁被释放后，$Owner$空出来了，dummy唤醒其后继结点参与锁的竞争

     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/juc/image-20260922183009468.png" alt="image-20260922183009468" style="zoom:50%;" />

     如图所示，dummy唤醒Thread1，恰好与Thread4进行锁的竞争

---

##### 可重入

- 获取锁时分以下几种情况

  1. $Owner$未被占用，直接获取锁，state变为1

  2. $Owner$被占用

     1. **获取锁的还是当前线程**

        **`state++`（可重入）**

     2. 获取锁的不是当前线程，回到加锁失败流程



- 释放锁时

  每释放一次锁，就对`state--`

  - 若`state!=0`，返回false表示锁还没有释放完
  - 若`state==0`，将$Owner$清空，返回true

---

##### 可打断

> 注：在[加锁](#加锁)环节我们说到，acquireQueued方法中有一个死循环。

- 默认情况下是不可打断模式

  打断被阻塞的线程时，线程会从打断的位置醒来并继续向下执行。但是由于此模式下必须要获得锁之后才能退出死循环。若线程醒来后仍不能获得锁，那么就会在下一轮循环再次陷入阻塞

- 可打断模式

  打断被阻塞的线程时，线程会从打断的位置醒来并继续向下执行。在此模式下，线程被打断后会直接抛出异常强制退出死循环

---

#### 8.2.2公平锁

- 在[加锁](#加锁)环节的最后，当锁被释放后，AQS队列中的阻塞线程被唤醒后有可能会与外部的线程去竞争锁，这种情况下有可能竞争不到，这就是非公平的体现。

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/juc/image-20260922183009468.png" alt="image-20260922183009468" style="zoom:50%;" />

- 公平锁在外部线程获取锁之前加了一步：检查AQS队列中是否有阻塞线程。若有，则将锁让给阻塞线程；若没有，才去争抢。如此一来就保证了公平性

---

#### 8.2.3条件变量

- 每个条件变量对应着一个等待队列，其实现类时ConditionObject



- `await()`

  1. 调用`await()`后，会进入ConditionObject的addConditionWaiter流程。**创建出来的Node的状态为-2（表示等待状态）**，并将Node与当前线程关联。进入队列尾部

     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/juc/image-20260922185928804.png" alt="image-20260922185928804" style="zoom: 80%;" />

  2. 调用`fullRelease`，将**当前线程所拥有的锁全部释放掉**（可能重入）。随后调用`unpark`唤醒阻塞队列中的一个线程，让其进行锁的竞争



- `signal()`

  1. 判断当前线程是否为$Owner$，若不是则抛出异常（只有$Owner$有资格`signal`）

  2. 进入ConditionObject的`doSignal`流程，取得**等待队列中的第一个Node**

  3. 执行`transferForSignal`，将该Node加入AQS阻塞队列的尾部，将该Node关联的Thread的waitStates改为0。该Node的前驱结点改为-1（表示负责阻塞唤醒该Node）

     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/juc/image-20260922190653936.png" alt="image-20260922190653936" style="zoom:50%;" />

     > 图中Thread0为被signal的结点

---

### 8.3ReentrantReadWriteLock

> 一个支持重入的读写锁

- 当读操作远远高于写操作时，读写锁可以支持：**当多线程同时发生读操作时使其并发执行（加非互斥锁）**；当**读写操作**同时发生或**写操作**同时发生时，正常加锁**互斥**，使其串行执行。

---

#### 8.3.1应用

```java
class DataContainer{
    private Object data = new Object();

    private ReentrantReadWriteLock rwLock = new ReentrantReadWriteLock();

    //读锁
    private ReentrantReadWriteLock.ReadLock rlock = rwLock.readLock();

    //写锁
    private ReentrantReadWriteLock.WriteLock wlock = rwLock.writeLock();

    public Object read(){
        log.info("获取读锁");
        rlock.lock();
        try{
            log.info("读取");
            Thread.sleep(1000);
            return data;
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        } finally{
            log.info("释放读锁");
            rlock.unlock();
        }
    }

    public void write(Object data){
        log.info("获取写锁");
        wlock.lock();

        try{
            log.info("写入");
        }finally {
            log.info("释放写锁");
            wlock.unlock();
        }

    }
}
```

1. 当两个线程同时读时，加非互斥锁。即：**t1获取锁后，t2仍能获得锁**
2. 当读写或写写发生时，锁就互斥了



- 注意事项
  1. 读锁不支持条件变量
  2. 重入锁时，不允许锁的升级：先获取读锁，重入时不能获取写锁
  3. 重入锁时，允许锁的降级：先获取写锁，重入时允许获取读锁

---

#### 8.3.2原理

> - 读写锁用的是同一个Sync同步器，因此等待队列、state等也是同一个。
> - 下面案例中t1加读锁，t2加写锁

1. **t1成功上锁**，流程与$ReentrantLock$相比无特殊之处，不同的是**写锁状态占了state的低16位，读锁占了state的高16位**

   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/juc/image-20260923143742879.png" alt="image-20260923143742879" style="zoom:50%;" />

2. **t2进行上锁时**，进入读锁的`sync.acquireShared(1)`流程，首先会进入`tryAcquireShared`流程。若有写锁占据，那么`tryAcquireShared`返回-1表示失败

3. **t2上锁失败后**，会进入`sync.doAcquireShared(1)`流程。与$ReentrantLock$加锁失败流程类似；

   1. 首先会调用`addWaiter`在阻塞队列中添加节点。与$ReentrantLock$不同的是，添加的结点是$Node.SHARED$模式，而非$Node.EXLUSIVE$
   2. 由于t2是刚被加进去的，其Node排在dummy后面。会在死循环中再尝试获取锁
   3. 每一次循环失败后都会进入`shouldParkAfterFailedAcquire`，第一次进入会将前驱节点变为-1（有职责唤醒后继结点），返回false；第二次返回true，Node彻底进入阻塞。

   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/juc/image-20260923144909994.png" alt="image-20260923144909994" style="zoom:50%;" />

   > 同理若此时有其他线程也想来加锁，就会被串在后面
   >
   > <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/juc/image-20260923145543845.png" alt="image-20260923145543845" style="zoom:50%;" />

   4. **t1释放锁时**，会对`state--`，**若`state==0`释放锁**，清空$ExclusiveOwnerThread$。**唤醒t2**，t2唤醒后仍然处于`doAcquireShared`的死循环中，下一次循环t2会继续尝试获取锁

      - 由于t2是读锁，所以t2是无需用到$ExclusiveOwnerThread$的；且t2获取锁的方式就是在state的**高十六位上CAS加一**（实际上是+65536）
      - 每一个$Node.SHARED$的线程被唤醒后，会检查其后继结点是否也是$Node.SHARED$。若是，则其后记结点也会被唤醒并获取读锁。

      <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/juc/image-20260923150948800.png" alt="image-20260923150948800" style="zoom:50%;" />

      > 综上，读锁之间就可以实现并发运行。

   5. **当t2、t3释放锁时**，`state--`，当`state==0`时代表着读锁被释放，去到阻塞队列中唤醒t4。t4被唤醒后，尝试获取锁成功，`state`低位+1，将t4放入$ExclusiveOwnerThread$

---

### 8.4StampedLock

- JDK8加入，为了进一步优化读性能

  - 特点

    在使用读锁、写锁时都必须配合【戳】使用

    - 加读锁

      ```java
      long stamp = lock.readLock();
      lock.unlockRead(stamp);
      ```

    - 加写锁

      ```java
      long stamp = lock.writeLock();
      lock.unlockWrite(stamp);
      ```

  - 提升效率的原因

    采用【乐观读】的思想。即：**刚开始读时不对其加任何锁**，只是多了一步“验戳”的操作。当有写线程来影响时，“验戳”失败，进行**锁的升级**（升级为读锁）  ——— **有点类似于轻量级锁**

    ```java
    long stamp = lock.tryOptimisticRead();
    if(!lock.validate(stamp)){//验戳
        //锁升级
    }
    ```

    > `validate(stamp)` = 从拿到 stamp 到现在，**有没有任何线程成功获取过写锁**。
    >
    > **验戳操作需要在乐观读读完数据后**，若验戳成功说明乐观读期间无线程干扰，数据干净；否则说明数据可能不干净，需要升级为读锁后重新读取



- 使用

  ```java
  @Slf4j
  class DataContainer{
      private Object data = new Object();
  
      private final StampedLock lock = new StampedLock();
  
      public Object read(){
          log.info("乐观读");
          long stamp = lock.tryOptimisticRead();//乐观读
  
          log.info("乐观读取中。。。");
  
          if(lock.validate(stamp)){//乐观读读完后验戳
              //升级锁
              log.info("乐观读失败，升级锁再次读取");
              stamp = lock.readLock();
              try {
                  log.info("读锁获取成功，读取数据中。。。");
                  return data;
              }
              finally {
                  log.info("释放读锁");
                  lock.unlockRead(stamp);
              }
  
          }
  
          log.info("乐观读取成功，返回数据");
          return data;
      }
  
      public void write(){
          log.info("获取写锁");
  
          long stamp = lock.writeLock();
  
          try{
              log.info("写入");
          }finally {
              log.info("释放写锁");
              lock.unlockWrite(stamp);
          }
  
      }
  }
  ```



- 缺点
  1. 不支持条件变量
  2. 不支持可重入

---

### 8.5 Semaphore

> 信号量，用于限制能同时访问共享资源的线程上限



- 使用

  ```java
          //1.创建semaphore对象 第一个参数表示同时刻最大线程数为3  第二个参数填true可以实现公平
          Semaphore semaphore = new Semaphore(3);
  
          //2.10个线程同时访问
          for (int i = 0; i < 10; i++) {
              new Thread(() -> {
  
                  try {
                      semaphore.acquire();//获得semaphore中的许可
                  } catch (InterruptedException e) {
                      throw new RuntimeException(e);
                  }
  
                  log.info("running...");
  
                  try {
                      Thread.sleep(1000);
                      log.info("end");
                  } catch (InterruptedException e) {
                      throw new RuntimeException(e);
                  }finally {
                      semaphore.release();//释放semaphore许可
                  }
  
              }).start();
          }
  
  ```



- 原理

  - 构造方法

    调用构造方法后，会将`state`设为构造方法中传入的值。下面假设为3

  

  - `acquire`

    调用`acquire`获取锁成功后，会CAS对`state--`。并返回`state`表示剩余的资源数。当`state==0`时，**竞争失败**，线程进入AQS阻塞队列（模式为$Node.SHARED$）

    - 同理，竞争失败后的逻辑同$ReentrantLock$中的逻辑，会尝试两次，若不成功进入阻塞，前驱节点状态变为-1，表示有唤醒责任

   

  - `release`

    调用`release`释放锁，会CAS对`state++`。并唤醒阻塞队列中的对应线程，且由于模式为$Node.SHARED$，在被唤醒后会**“连锁唤醒”**后面的结点；连锁唤醒的结点会去争抢锁，没抢到的继续循环进入阻塞队列

---

### 8.6CountdownLatch

>  倒计时锁，用于进行线程同步协作。

- 构造参数用来初始化倒计时的值，`await()`用来让当前线程阻塞，其他线程，每调用一次`countDown()`计数就会减一。等到计数变为0后唤醒阻塞线程



- 使用

  ```java
          CountDownLatch countDownLatch = new CountDownLatch(3);
  
          new Thread(()->{
              try {
                  Thread.sleep(1000);
              } catch (InterruptedException e) {
                  throw new RuntimeException(e);
              }
              countDownLatch.countDown();
          }).start();
  
          new Thread(()->{
              try {
                  Thread.sleep(1000);
              } catch (InterruptedException e) {
                  throw new RuntimeException(e);
              }
              countDownLatch.countDown();
          }).start();
  
          new Thread(()->{
              try {
                  Thread.sleep(1000);
              } catch (InterruptedException e) {
                  throw new RuntimeException(e);
              }
              countDownLatch.countDown();
          }).start();
  
          log.info("阻塞");
          countDownLatch.await();
          log.info("唤醒");
  ```



- 与join的对比

  真实开发中通常使用线程池，线程池中的核心线程会不断复用。join阻塞无法等到线程结束，此时使用CountdownLatch就比较灵活



- 应用

  微服务架构中，在实现某业务时可能需要Rest发送请求，从其他服务中获取一些信息。等待信息全部返回后才能继续执行当前业务。

  - 若单线程执行效率可能过低
  - 多线程调用的话就需要用到CountdownLatch等待全部结果返回

---

### 8.7CyclicBarrier

- 与CountdownLatch一样，用于线程间的协作。但是不同于CountdownLatch的不可重用。CyclicBarrier是可重用的



- 使用

  ```java
          ExecutorService executorService = Executors.newFixedThreadPool(2);
  
          CyclicBarrier cyclicBarrier = new CyclicBarrier(2,()->{
              log.info("第二个参数，可以进行数据汇总....");
          });
  
          log.info("start.....");
  
          executorService.submit(() -> {
              try {
                  cyclicBarrier.await();//调用await()线程阻塞，同时state--
                  log.info("release...");
              } catch (InterruptedException | BrokenBarrierException e) {
                  throw new RuntimeException(e);
              }
          });
  
          executorService.submit(() -> {
              try {
                  Thread.sleep(2000);
                  cyclicBarrier.await();//调用await()线程阻塞，同时state--
                  log.info("release...");
              } catch (InterruptedException | BrokenBarrierException e) {
                  throw new RuntimeException(e);
              }
          });
  
          executorService.shutdown();
  
  ```

  当计数减为0后，**CyclicBarrier会重置计数**

  - 注意

    线程池的线程数最好和CyclicBarrier的计数一致，否则数据汇总时可能会出问题

---

### 8.8线程安全集合类

> 具体可以分为三类：1. 遗留  2.修饰  3.JUC

1. 遗留的线程安全类

   如$Hashtable$等，由于版本较早，底层使用的是`synchronized`效率较低



2. 使用`Collections`修饰的线程安全类

   - 如
     - Collections.synchronizedCollection
     - Collections.synchronizedList
     - Collections.synchronizedMap
     - Collections.synchronizedSet
     - Collections.synchronizedNavigableMap
     - Collections.synchronizedNavigableSet
     - Collections.synchronizedSortedMap
     - Collections.synchronizedSortedSet

   使用了设计模式中的装饰器模式，给原集合方法直接加上了`synchronized(this)`。效率也并没有很好



3. `java.util.concurrent.*`

   1. `Blocking`类

      大部分实现基于$ReentrantLock$锁，如$BlockingQueue$等

   2. `copyOnWrite`类

      在修改时进行拷贝，适用于读多写少的场景，开销较大

   3. `concurrent`类

      内部很多操作使用CAS优化，一般可提供较高的吞吐量

      - 弱一致性

        - 遍历时弱一致性。如：利用迭代器遍历时，如果容器发生修改，迭代器仍可以继续遍历。此时遍历的结果是旧的（`fail-safe`机制）

          > 非线程安全集合中，若其他线程进行了并发修改，会立刻抛出异常（`fail-fast`机制）

        - 求大小弱一致性，求`size`不一定准确

        - 读取弱一致性，可能读到脏数据

---

### 8.9ConcurrentHashMap

> concurrentHashMap的成员方法与HashMap一致。下面**主要讨论其原理**

- 多线程操作$HashMap$中的元素时有**线程安全问题**。$concurrentHashMap$可以保证如`put`、`get`单成员方法是原子的，但是**无法保证多个方法组合起来是原子的**（所有的线程安全类都是如此）

  - 解决方法

    1. 使用`synchronized`使得多个操作是原子的。但是开销过大。

    2. $concurrentHashMap$中提供了`computeIfAbsent、compute`等方法。

       ```java
               ConcurrentHashMap<Integer, Integer> map = new ConcurrentHashMap<>();
       
               List<Thread> threads = new ArrayList<>();
               for (int i = 0; i < 200; i++) {
                   Thread thread = new Thread(() -> {
                       map.compute(1, (k, v) -> v == null ? 1 : v + 1);
                   });
                   threads.add(thread);
               }
       
               for (Thread thread : threads) {
                   thread.start();
               }
               for (Thread thread : threads) {
                   thread.join();
               }
       
               System.out.println(map.get(1));
       ```

       - **`computeIfAbsent`：只在 key 缺失 /value=null 时，才执行函数生成 value；value 存在直接返回旧值，不跑 lambda。适合「不存在则新建，存在不改动」**
       - **`compute`：**无论 key 存不存在，**每次调用都会执行 lambda；适合每次都要更新、累加**

---

#### 8.9.1HashMap高并发下的危害

> 除了由于多线程访问共享变量时造成的数据不一致外，在高并发的情况下，若HashMap进行了**扩容**。可能会直接导致程序的卡死 —  **死链（JDK7）**

- HashMap底层为 `数组 + 链表 + 红黑树`

  - 根据`hashCode()`方法计算出数组下标

  - 若发生冲突，使用链表的方式解决哈希冲突。若一个下标下的冲突节点过多会转为红黑树加快查找效率

  - 数组初始长度为8，到达扩容阈值（3/4）后扩容到16。并将HashMap中原先的结点**重新计算下标**，并**迁移到扩容后的数组中**

    > 扩容的好处：将结点重新排布，使其更加分散。减少冲突，提高查找效率



- 死链（只在JDK7即以前的版本出现）

  - 原因
    1. JDK7即以前，当发生哈希冲突时，会使用**头插法**将冲突的结点串起来
    2. 扩容时需对原哈希表中的数据进行迁移。迁移的过程是顺序迁移的

   

  - 流程

    > 扩容时使用两个指针`e 、 next`完成
    >
    > ```java
    > next = e.next;//next暂存e的后面的结点
    > //头插
    > e.next = dummy.next;
    > dummy.next = e;
    > e = next;//更新e
    > ```

    1. 哈希表中存储的元素个数达到阈值，触发扩容

       <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/juc/image-20260924181355472.png" alt="image-20260924181355472" style="zoom: 40%;" /> Tip：实际数组大小为16

    2. 现假设线程T1、T2都要进行扩容这个操作。但线程T1在读取到`1`这个结点后时间片就耗尽，被挂起

       此时`e -> 1  next->35`

    3. 线程T2抢夺到了时间片并完成了扩容操作

       <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/juc/image-20260924181424714.png" alt="image-20260924181424714" style="zoom:50%;" />

    4. 线程T1拿到时间片，`e -> 1  next->35`。继续执行迁移操作时，开辟一个新数组，仍会使用头插法。

       1. 对`1`进行头插

          <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/juc/image-20260924182504508.png" alt="image-20260924182504508" style="zoom: 33%;" /> 

          对`1`头插结束后更新`e next`   `e = next;next = e.next`。如此一来`e -> 35  next->1`

       2. 对`35`进行头插

           <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/juc/image-20260924184246428.png" alt="image-20260924184246428" style="zoom: 33%;" />

          对`1`头插结束后更新`e next`   `e = next;next = e.next`。如此一来`e -> 1  next->null`

       3. 如此一来问题就出现了，后续仍要对`1`进行头插。就会**出现环**

          <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/juc/image-20260924184538861.png" alt="image-20260924184538861" style="zoom:50%;" /> （为方便观察，将16的线去除了）

    **综上，出现`1->35->1`的环后就会陷入死循环即死链**。在JDK8中改为尾插法后，迁移时就不会破坏顺序，也就不会出现这种多线程下的死链问题。

---

#### 8.9.2 JDK8中ConcurrentHashMap的原理

##### 重要属性和内部类

```java
// 默认为 e
// 当初始化时，为 -1
// 当扩容时，为 -(1 + 扩容线程数)
// 当初始化或扩容完成后，为 下一次的扩容的阈值大小
private transient volatile int sizeCtl;

// 整个 ConcurrentHashMap 就是一个 Node[]
static class Node<K,V> implements Map.Entry<K,V> {}

// hash 表
transient volatile Node<K,V>[] table;

// 扩容时的新 hash 表
private transient volatile Node<K,V>[] nextTable;

// 扩容时如果某个 bin 迁移完毕，用 ForwardingNode 作为旧 table bin 的头结点
static final class ForwardingNode<K,V> extends Node<K,V> {}

// 用在 compute 以及 computeIfAbsent 时，用来占位，计算完成后替换为普通 Node
static final class ReservationNode<K,V> extends Node<K,V> {}

// 作为 treebin 的头节点，存储 root 和 first
static final class TreeBin<K,V> extends Node<K,V> {}

// 作为 treebin 的节点，存储 parent, left, right
static final class TreeNode<K,V> extends Node<K,V> {}
```

- $ForwardingNode$用于扩容时的标记，当扩容处理完某个下标的所有结点后，就会在这个下标上加上$ForwardingNode$

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/juc/image-20260924185655694.png" alt="image-20260924185655694" style="zoom: 80%;" />

  1. 当其他线程来扩容时遇到$ForwardingNode$就会知道这个下标被处理过了，就不会对其进行迁移处理
  2. 扩容过程中，当其他线程来`get`时遇到$ForwardingNode$时，就会去扩容后的数组里寻找

- TreeBin和TreeNode用于构建红黑树：**链表长度超过8且数组长度大于64**时将链表转换为红黑树

---

##### 重要方法

```java
// 获取 Node[] 中第 i 个 Node
static final <K,V> Node<K,V> tabAt(Node<K,V>[] tab, int i)

// cas 修改 Node[] 中第 i 个 Node 的值, c 为旧值, v 为新值
static final <K,V> boolean casTabAt(Node<K,V>[] tab, int i, Node<K,V> c, Node<K,V> v)

// 直接修改 Node[] 中第 i 个 Node 的值, v 为新值
static final <K,V> void setTabAt(Node<K,V>[] tab, int i, Node<K,V> v)
```

---

##### 构造器分析

```java
public ConcurrentHashMap(int initialCapacity, float loadFactor, int concurrencyLevel) {
    if (!(loadFactor > 0.0f) || initialCapacity < 0 || concurrencyLevel <= 0)
        throw new IllegalArgumentException();
    if (initialCapacity < concurrencyLevel)   // Use at least as many bins
        initialCapacity = concurrencyLevel;   // as estimated threads
    long size = (long)(1.0 + (long)initialCapacity / loadFactor);
    // tableSizeFor 仍然是保证计算的大小是 2^n，即 16,32,64 ...
    int cap = (size >= (long)MAXIMUM_CAPACITY) ?
        MAXIMUM_CAPACITY : tableSizeFor((int)size);
    this.sizeCtl = cap;
}
```

- 三个参数

  1. $initialCapacity$：初始化长度
  2. $loadFactor$：负载因子，超过这个比例时会进行扩容
  3. $concurrencyLevel$：并发度。

- 保证初始化长度>=并发度

  ```java
      if (initialCapacity < concurrencyLevel)   // Use at least as many bins
          initialCapacity = concurrencyLevel;   // as estimated threads
  ```

- 由于hash算法需要保证长度是2^n^，所以$tableSizeFor$会把$initialCapacity$变为合适的大小

- $ConcurrentHashMap$实现的是**懒惰加载**，不会立刻就创建那么大的空间。只有在用到后才会创建空间

---

##### get分析

```java
public V get(Object key) {
    Node<K,V>[] tab; Node<K,V> e, p; int n, eh; K ek;
    // spread 方法能确保返回结果是正数
    int h = spread(key.hashCode());
    if ((tab = table) != null && (n = tab.length) > 0 &&
        (e = tabAt(tab, (n - 1) & h)) != null) {
        // 如果头结点已经是要查找的 key
        if ((eh = e.hash) == h) {
            //判断key是否相同，若相同则返回
            //(ek = e.key) == key优化：有可能key和e.key存在StringTable中，引用相同
            if ((ek = e.key) == key || (ek != null && key.equals(ek)))
                return e.val;
        }
        // hash 为负数表示该 bin 在扩容中或是 treebin, 这时调用 find 方法来查找
        else if (eh < 0)
            return (p = e.find(h, key)) != null ? p.val : null;
        //上述情况都不是，说明发生了哈希冲突 正常遍历链表, 用 equals 比较
        while ((e = e.next) != null) {
            if (e.hash == h &&
                ((ek = e.key) == key || (ek != null && key.equals(ek))))
                return e.val;
        }
    }
    return null;
}
```

- $ConcurrentHashMap$中的`get`全程没有用锁

- `spread` 方法能确保返回结果是正数的原因：负数在后面会用于表示其他信息且数组下标只能为正的

  > (n - 1) & h实际上是一种取模的操作，但是效率更高

---

##### put分析

```java
public V put(K key, V value) {
    return putVal(key, value, false);
}

final V putVal(K key, V value, boolean onlyIfAbsent) {
    if (key == null || value == null) throw new NullPointerException();
    // 其中 spread 方法会综合高位低位，具有更好的 hash 性
    int hash = spread(key.hashCode());
    int binCount = 0;
    for (Node<K,V>[] tab = table;;) {
        // f 是链表头节点
        // fh 是链表头结点的 hash
        // i 是链表在 table 中的下标
        Node<K,V> f; int n, i, fh;
        // 要创建 table
        if (tab == null || (n = tab.length) == 0)
            // 初始化 table 使用了 cas, 无需 synchronized 创建成功, 进入下一轮循环
            tab = initTable();
        // 要创建链表头节点
        else if ((f = tabAt(tab, i = (n - 1) & hash)) == null) {
            // 添加链表头使用了 cas, 无需 synchronized
            if (casTabAt(tab, i, null,
                    new Node<K,V>(hash, key, value, null)))
                break;
        }
        // 帮忙扩容
        else if ((fh = f.hash) == MOVED)
            // 帮忙之后, 进入下一轮循环
            tab = helpTransfer(tab, f);
        else {
            V oldVal = null;
            // 锁住链表头节点
            synchronized (f) {
                // 再次确认链表头节点没有被移动
                if (tabAt(tab, i) == f) {
                    // 链表
                    if (fh >= 0) {
                        binCount = 1;
                        // 遍历链表
                        for (Node<K,V> e = f;; ++binCount) {
                            K ek;
                            // 找到相同的 key
                            if (e.hash == hash &&
                                    ((ek = e.key) == key ||
                                            (ek != null && key.equals(ek)))) {
                                oldVal = e.val;
                                // 更新
                                if (!onlyIfAbsent)
                                    e.val = value;
                                break;
                            }
                            Node<K,V> pred = e;
                            // 已经是最后的节点了, 新增 Node, 追加至链表尾
                            if ((e = e.next) == null) {
                                pred.next = new Node<K,V>(hash, key,
                                        value, null);
                                break;
                            }
                        }
                    }
                    // 红黑树
                    else if (f instanceof TreeBin) {
                        Node<K,V> p;
                        binCount = 2;
                        // putTreeVal 会看 key 是否已经在树中, 是, 则返回对应的 TreeNode
                        if ((p = ((TreeBin<K,V>)f).putTreeVal(hash, key,
                                value)) != null) {
                            oldVal = p.val;
                            if (!onlyIfAbsent)
                                p.val = value;
                        }
                    }
                }
                // 释放链表头节点的锁
            }
            if (binCount != 0) {
                if (binCount >= TREEIFY_THRESHOLD)
                    // 如果链表长度 >= 树化阈值(8), 进行链表转为红黑树
                    treeifyBin(tab, i);
                if (oldVal != null)
                    return oldVal;
                break;
            }
        }
    }
    // 增加 size 计数
    addCount(1L, binCount);
    return null;
}

```

1. 懒惰初始化，若put时哈希表还没有被创建会调用`initTable`方法进行初始化

   `initTable`中**使用了CAS保证只有一个线程在对哈希表进行初始化**，并且使用了`Thread.yield()`使得其他线程礼让等待这个线程初始化。当初始化完成后，其他线程会退出循环

2. 若哈希表已经被创建了，尝试put数据，分为以下几种情况

   1. 未发生哈希冲突且无其他线程在扩容，使用`casTabAt`进行put
   2. 有其他线程在扩容（遇到$ForwardingNode$），帮助其扩容
   3. 发生哈希冲突，启用$binCount$记录长度，用于后续的链表和红黑树之间的转换
      1. 链表：为**表头结点加锁**，遍历链表。若找到相同的key将其value覆盖；若到了链表结尾仍未找到，新增结点
      2. 红黑树：调用`putTreeVal`方法插入

   

3. put完数据后，使用`addCount`方法统计size（size++）。用于后续的扩容判断

   > addCount使用了类似LongAdder的分段求和的方法

---

##### size计算流程

- size的计算实际发生在`put`、`remove`等修改集合的方法内

  计算过程中使用了类似LongAdder的分段求和的方法。

  - 当没有竞争时，向baseCount累加计数
  - 发生竞争时，新建counterCells数组，每个线程分配到其中一个，在那一个上进行累加最后汇总
    - counterCells初始化有2个cell
    - 如果竞争比较激烈，会创建新的cell

  > 这种计算方式只能保证弱一致性，最后得到的结果不一定准确

---

#### 8.9.3JDK7中的ConcurrentHashMap

内部维护了一个segments数组，每个segment元素对应着一把锁

put修改哈希表时会先计算哈希值得到segments数组下标，找到后获取该下标处的锁，获取锁后进行操作就可以保证线程安全

![image-20260924202539361](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/juc/image-20260924202539361.png) 如图：**每个segment对应着一个HashEntry，HashEntry内又是数组+链表的结构**

- 优点：不同线程访问的segment，实际上是没有冲突的

- 缺点：**segments数组**默认大小为16，容量初始化后就无法扩容。且无法懒惰初始化

  > JDK7 的扩容时，是**对 segment 对应的 HashEntry 进行扩容**

---

### 8.10.LinkedBlockingQueue

- 底层基于单向链表+头尾指针实现

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/juc/image-20260925085013042.png" alt="image-20260925085013042" style="zoom:50%;" />

  有哨兵结点dummy。last始终指向队尾

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/juc/image-20260925085404945.png" alt="image-20260925085404945" style="zoom:50%;" />

  出队时会使用first指针辅助实现。使用first临时标记下一个结点`first = head.next`，`head.next = null`帮助GC后`head = first`。完成元素的出队

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/juc/image-20260925085624044.png" alt="image-20260925085624044" style="zoom:50%;" />



- 加锁分析

  底层使用了两把锁。同一时刻，可以允许两个线程（一个生产者，一个消费者）同时执行；**一把锁加在队首；一把锁加在队尾**

  ```java
  //用于put，给生产者用
  private final ReentrantLock putLock = new ReentrantLock();
  
  //用于take，给消费者用
  private final ReentrantLock takeLock = new ReentrantLock();
  ```

  - 当$节点总数>=2$时。putLock保证了队尾结点的线程安全，takeLock保证了队首元素的线程安全。两把锁保证了入队出队没有竞争
  - $节点总数<2$时（即只有dummy节点）。这时take线程会被notEmpty条件阻塞（take发现队列为空调用`wait`）。有竞争，会阻塞



- put操作

  ```java
  public void put(E e) throws InterruptedException {
      if (e == null) throw new NullPointerException();
      int c = -1;
      Node<E> node = new Node<E>(e);
      final ReentrantLock putLock = this.putLock;
      // count 用来维护元素计数
      final AtomicInteger count = this.count;
      putLock.lockInterruptibly();
      try {
          // 满了等待
          while (count.get() == capacity) {
              // 倒过来读就好: 等待 notFull
              notFull.await();
          }
          // 有空位，入队且计数加一
          enqueue(node);
          c = count.getAndIncrement();
          // 若当前线程put后，队列还有空位，由当前线程叫醒其他 put 线程
          if (c + 1 < capacity)
              notFull.signal();
      } finally {
          putLock.unlock();
      }
      // 如果队列中有一个元素，叫醒 take 线程
      if (c == 0)
          // 这里调用的是 notEmpty.signal() 而不是 notEmpty.signalAll() 是为了减少竞争
          signalNotEmpty();
  }
  
  ```

  put的实现使用了`signal()`而非`signalAll()`是为了减少由于`signalAll()`引起的多余竞争。

  由于一次只唤醒一个线程，当当前线程put完后会检查队列是否还有空位，若有也会`signal()`唤醒其他生产者线程去做`put`操作。如此一来不仅提高了put效率，也使得我们的两把锁得到充分利用

  > 为什么说使得两把锁得到充分利用？
  >
  > - 这里实现使用两把锁，一把锁put操作，一把锁get操作。如此一来就将生产者消费者隔离开来了，若只等待消费者消费完后再去唤醒put操作的话，在消费者消费的这段时间内put锁是闲置的。此处在put完后检查队列是否为满，若没满则由put线程去唤醒其他put线程。实现了put锁的充分利用



- 与ArrayBlockingQueue的对比
  - Linked 支持有界（可以是无界的），Array **强制有界**
  - Linked 实现是链表，Array 实现是数组
  - Linked 是**懒惰**的，而 Array 需要提前初始化 Node 数组
  - Linked 每次入队会生成新 Node，而 Array 的 Node 是提前创建好的
  - Linked 两把锁，Array 一把锁



- ConcurrentLinkedQueue

  与LinkedBlockingQueue非常相似

  - 两把锁，一把锁队首一把锁队尾
  - 有dummy节点

  > 不同的是，ConcurrentLinkedQueue的锁使用的CAS乐观锁，而非ReentrantLock悲观锁

---

### 8.11CopyOnWriteArrayList

- 底层采用了$CopyOnWrite$即：`写入时拷贝`思想。增删改操作会将数组**拷贝**一份，**更改操作在新数组上执行**。此时就不会影响其他线程的并发读。实现了**读写分离**

  适用于**读多写少**的场景



- 以`add`方法为例

  ```java
  public boolean add(E e) {
      synchronized (lock) {
          // 获取旧的数组
          Object[] es = getArray();
          int len = es.length;
          // 拷贝新的数组（这里是比较耗时的操作，但不影响其它读线程）
          es = Arrays.copyOf(es, len + 1);
          // 添加新元素
          es[len] = e;
          // 替换旧的数组
          setArray(es);
          return true;
      }
  }
  ```

  JDK11使用`synchronized`加锁，JDK8使用$ReentrantLock$

- 读的方法是不加锁的，如此一来就可以保证读写的并发



- 读取存在弱一致性（对数组元素进行修改后，无法使得读取操作及时得知，因此可能读到旧数据）
