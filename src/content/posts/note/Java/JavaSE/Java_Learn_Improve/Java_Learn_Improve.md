---

title: JavaSE_Improve

published: 2026-08-08

description: JavaSE

tags: [JavaSE]

category: JavaSE

draft: false

---

# Java_Learn_Improve

---



## 单列集合进阶

> - 体系图
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260615172319615.png" alt="image-20260615172319615" style="zoom:50%;" />
>
> - List系列集合
>
>   - 特点：添加的元素是**有序**、可重复、有索引的
>
>     tip：此处的有序指：放入顺序和取出来的顺序相同 即：顺序读取
>
> - Set系列集合
>
>   - 特点：添加的数据是无需、不重复、无索引的
>
>     tip：此处的无序指的是放入顺序和取出来的顺序不相同，即：可随机读取
>
> - 使用场景
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260616200921935.png" alt="image-20260616200921935" style="zoom:50%;" /> 

### 单列集合Collection

> - Collection 的成员方法
>
>   Collection：单列集合的祖宗**接口**，其功能所有的单列集合都可继承使用
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260615172701575.png" alt="image-20260615172701575" style="zoom:50%;" />
>
>   由于Collection是接口，我们需要创建其实现类的对象，此处学习Collection我们使用多态的方式接收 如下：
>   
>   ```java
>   Collection<String> coll = new ArrayList<>();
>   //以Collection实现类ArrayList实现多态
>   ```
>
>   - 细节1
>
>     Collection是单列集合祖宗接口，所以Collection中的remove不能通过索引删除  （Set是无索引的）
>
>   - 细节2
>   
>     Collection的contains方法是**基于equals**的，若想要对某个自定义的类对象进行contains查询**需要重写equals**  否则默认使用object中的equals，按照地址值比较
>



### 集合的遍历（迭代器）

> - Set系列无索引，无法用索引的方式去遍历，所以需要**迭代器**遍历
>
>  
>
> - 迭代器遍历
>
>   迭代器 — Iterator类，专门用于集合遍历
>
>   - 迭代器获取
>
>     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260615174305776.png" alt="image-20260615174305776" style="zoom:67%;" />
>
>   - 迭代器常用方法
>
>     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260615174335787.png" alt="image-20260615174335787" style="zoom:50%;" /> 
>
>   - 样例
>
>     ```java
>     ArrayList<String> list = new ArrayList<>();
>     Iterator<String> it = list.iterator();
>     while(it.hasNext()){
>         String str = it.next();
>         System.out.println(str);
>     }
>     ```
>
>   - 注意
>
>     1. 若没有元素了还要继续获取，会报错：NoSuchElementException
>
>     2. 迭代器遍历完指针**不会复位**
>
>     3. **迭代器遍历时，不能用集合的方法进行增加或者删除**  
>
>        - 解决方法：调用迭代器的方法进行**删除**
>
>          ```java
>          it.remove();
>          ```
>
> - 增强for遍历：**底层仍是迭代器**
>
>   - 适用对象：单列集合和数组
>
>   - 格式
>
>     ```java
>     for(元素数据类型 变量名:需要遍历的数组/集合){
>         //相当于有一个迭代器去遍历集合/数组，并赋值给我们定义的那个变量
>     }
>     ```
>
>     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260615180000333.png" alt="image-20260615180000333" style="zoom:50%;" />
>
>   - 快捷方式
>
>     ```java
>     集合名字.for
>     ```
>
> - Lambda表达式遍历 — foreach
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260615180231814.png" alt="image-20260615180231814" style="zoom:50%;" />
>
>   - 底层：遍历集合，获取每个元素并传递给accept方法处理，**这个accept方法即为我们要重写的方法 返回值为void类型**
>
>   - 样例
>
>     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260615181054327.png" alt="image-20260615181054327" style="zoom: 50%;" /> 
>

#### 迭代器底层

> 迭代器底层维护了**cursor（游标）**和**lastRet（游标的上一个）**来维护迭代器指向位置
>
> - 调用next时
>
>   ```java
>   int temp = cursor;
>   cursor++;
>   return (E) elementData[lastRet=temp];
>   ```
>
> - 调用hasNext
>
>   ```java
>   return size!=cursor;//当cursor==size时说明已经没有下一个了 ，返回给hasNext后就会调用报错的代码
>   ```
>
> - 除此之外，迭代器中还维护着一个**expectedModCount**，其初始值为**modCount**即：集合发生变化的次数（增删次数），若在调用迭代器的时候进行增删，modCount就会++ 导致expectedModCount！=modCount，此时就会调用报错（并发修改异常）的代码





### List

> List继承了Collection中的所有方法，但是因为List有索引，所以新增了很多操作索引的方法
>
> - 新增方法
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260615183640331.png" alt="image-20260615183640331" style="zoom:50%;" />
>
> - 注意
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260615185005903.png" alt="image-20260615185005903" style="zoom:50%;" />
>
> - List集合的遍历方式
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260615185238214.png" alt="image-20260615185238214" style="zoom:50%;" /> 
>
>   1. 迭代器遍历
>
>      <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260615185247832.png" alt="image-20260615185247832" style="zoom:50%;" /> 
>
>   2. 列表迭代器 — ListIterator
>
>      继承于迭代器，是Iterator的子接口，在Iterator的基础上**加了一些方法** — 在遍历的过程中可以添加元素
>
>      <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260615190202213.png" alt="image-20260615190202213" style="zoom:50%;" /> 
>
>   3. 增强for遍历
>
>      <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260615185329319.png" alt="image-20260615185329319" style="zoom:80%;" /> 
>
>   4. Lambda foreach遍历
>
>      <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260615185406558.png" alt="image-20260615185406558" style="zoom:50%;" /> 
>
>   5. 普通for循环
>
>      <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260615185439217.png" alt="image-20260615185439217" style="zoom:50%;" /> 



#### ArraytList（动态数组）底层原理

> 1. 空参构造ArrayList时，在底层创建一个默认长度为0的数组
> 2. 添加第一个元素时，底层创建一个新的长度为10的数组
> 3. 数组存满后创建一个新数组，扩容为1.5倍
> 4. 若一次添加多个元素，导致扩容1.5倍还是放不下，则新创建数组的长度以实际为准



#### LinkedList （双向链表）

> 查询慢，增删快
>
> - LinkedList本身提供了很多特有的用于操作首尾元素的方法
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260615191426328.png" alt="image-20260615191426328" style="zoom:50%;" />
>
> - LinkedList的底层维护了一个双向链表，并且维护了两个指针：first、last  分别指向双向链表的头尾



### 泛型

> JDK5引入的特性，可以在**编译阶段**约束操作的数据类型，并进行检查
>
> - 格式
>
>   <数据类型>
>
>   注意：泛型**只支持引用数据类型** — 原因：集合中存储的是Object类型，基本数据类型无法转换为Object
>
> - 作用：若没有泛型，所有的数据都会被认为是**Object类型存入**，导致添加的数据类型很乱。这样取出来的时候就不知道是什么类型的了   泛型在添加数据时就对数据进行了约束，**使得集合里面的数据类型统一**
>
> - 扩展：Java中的泛型是**伪泛型** ： 添加数据时会对数据进行类型检查，检查通过存入集合，但是是以Object类型存入。当拿出来时再对Object类型进行强转，转为泛型  — 原因：为了适配JDK5前的集合存储，所以只在Object存储的基础上添加了一个泛型的检验和转换
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260616174717677.png" alt="image-20260616174717677" style="zoom:50%;" />

#### 泛型类、泛型方法、泛型接口

> - 泛型类
>
>   定义某个类时，若其中某个变量数据类型不确定时，就可以定义泛型类
>
>   ```java
>   public class MyArrayList<E>{//E可以理解为变量，用于记录数据类型的变量
>       Object[] obj = new[10];//实际存储的还是Object
>       int size;
>       public boolean add(E e){//此处E e表示适用E变量存储的数据类型创建一个变量e
>           obj[size++] = e;
>           return true;
>       }
>       
>       public E get(int index){
>           return <E>obj[index];//从里面取元素时需要强转
>       }
>       
>       @Overwrite
>       public String toString(){
>           return Arrays.toString(obj);
>       }
>   }
>   ```
>
> - 泛型方法
>
>   方法中的形参不确定时，可以使用类名后定义的泛型<E>,详见上方代码    
>
>   ```java
>   //除此之外我们还可以把泛型直接加在方法上
>   public <E> boolean add(E e){//此时的E只有在该方法里可使用
>           obj[size++] = e;
>           return true;
>   }
>   
>   //注意：<E>需要写在修饰符的后面返回类型的前面 如：
>   public static <E> void show(){
>       
>   }
>   ```
>
> - 泛型接口
>
>   接口形参不确定时可以在接口名后定义泛型<E>
>
>   ```java
>   public interface List<E>{
>                                                             
>   }
>   ```
>
>   - 如何使用泛型接口
>
>     1. 实现类给出具体类型
>
>        ```java
>        public class MyArrayList implements List <String>{
>                                                                                                                                                                                                         
>        }
>        ```
>
>        
>
>     2. 实现类延续泛型，创建实现类对象时再确定类型
>                                                                                                            
>        ```java
>        public class MyArrayList<E> implements List<E>{
>            //相当于写一个泛型类，实现泛型接口
>        }
>        ```
>
>        



#### 泛型的继承和通配符

> 泛型本身不具有继承性，但是数据具备继承性
>
> ```java
> //下面三个类中 Fu继承于Ye  Zi继承于Fu
> ArrayList<Ye> list1 = new ArrayList<>();
> ArrayList<Fu> list1 = new ArrayList<>();
> ArrayList<Zi> list1 = new ArrayList<>();
> 
> public void method1(ArrayList<Ye>){//这样写的话只能接收Ye类型的ArrayList，Fu和Zi无法被接收
>     
> }
> 
> public <E> void mothod2(ArrayList<E> list){//如果这样写的话，method方法是可以正常接收所有类型的ArrayList的
>     									//但是这样的话  除去Ye Fu Zi三个类的其他类型也可以被正常接收
> }
> 
> //通配符
> /*
> * ? extends xx表示可以接收xx类型及其所有子类  ? super xx表示可以接收xx类型及其所有父类
> * 通过这个通配符我们就可以限定类型的范围
> **/
> 
> public void method3(ArrayList<? extends Ye>){
>     
> }
> ```
>
> - 应用场景
>
>   若类型不确定，但能知道以后只能传递某个继承体系中的类型，就可以使用泛型通配符用以限制范围



### Set

> - 特点
>
>   - 无序：存取顺序不一致
>   - 不重复：可以去重
>   - 无索引：无法使用索引获取元素
>
>   tip：由于Set无重复的特性，所以调用add添加时其boolean的返回值就有了作用 — 若重复会添加失败
>
> - Set的实现类
>   - HashSet:无序、不重复、无索引
>   - LinkedHashSet：有序、不重复、无索引
>   - TreeSet：可排序、不重复、无索引
> - 遍历方式
>   - 迭代器
>   - 增强for
>   - Lambda表达式foreach
>
>  
>
> - 示例
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260616190236389.png" alt="image-20260616190236389" style="zoom:50%;" /> 如图所示，存取顺序不一致

#### HashSet

> - 底层采取**哈希表**存储数据
>
> - 组成
>
>   - JDK8前：数组+链表（链表用于处理哈希冲突）
>   - JDK8后：数组+链表+红黑树
>
> - 哈希值（hashCode）
>
>   在Object类中默认使用地址值进行哈希值的计算
>
>   一般情况下会重写hashCode方法，利用对象内部属性值计算哈希值
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260616190700338.png" alt="image-20260616190700338" style="zoom:50%;" /> 
>
>  
>
> - 底层原理
>
>   1. <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260616190943838.png" alt="image-20260616190943838" style="zoom:50%;" /> 
>
>   2. 根据元素哈希值和数组长度计算出存入位置
>
>      ```java
>      int index = (数组长度-1) & 哈希值；
>      ```
>
>   3. 判断该位置是否为NULL，若是则存入，若已被占用则调用**equals方法**比较属性值是否相同，若相同则舍弃当前元素，若不相同（哈希碰撞），则采用链表的方式避免哈希冲突
>
>      <img src='https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260616191439728.png' alt='image-20260616191439728' style="transform: rotate(270deg); zoom: 35%;"> 
>
>      - JDK8前处理方式：新元素进入数组，以链表的形式挂在后面
>      - JDK8后处理方式：新元素直接挂在后面
>
>   4. 当数组被占用的格数超过 16*0.75=12个时，会进行扩容 /  当链表长度大于8且数组长度大于等于64时，会转为红黑树，以提高查找效率
>
>      <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260616192025990.png" alt="image-20260616192025990" style="zoom:50%;" /> 
>
>      tip：只有链表部分转为红黑树，数组访问为O(1),链表为O(n) 红黑树为O(logn)，转为红黑树后查找流程为：根据哈希函数算出索引–>直接根据索引找到数组中的位置—>在红黑树中查找
>
> - **注意：如果Set中存储的是自定义的类，必须重写equals和hashCode方法**    ， 非自定义类java已经写好了  且Set是存储不了基本数据类型的   详见：[泛型](#泛型)



#### LinkedHashSet

> - 底层
>
>   LinkedHashSet的底层仍是哈希表，但是每个元素都额外的多了一个双链表机制记录存储的顺序，所以LinkedHashSet是有序存取的
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260616193106219.png" alt="image-20260616193106219" style="zoom:50%;" /> 
>
>   存入之后会把元素之间串起来
>
>   LinkedHashSet在遍历时就会循着这个链表遍历



#### TreeSet

> - 底层基于红黑树实现，可以对数据进行排序  默认从小到大
>
> - 排序规则
>
>   - Integer、Double等类型默认从小到大升序
>
>   - Character、String根据字典序升序
>
>   - **自定义类型**
>
>     1. 实现**Comparable接口**指定比较规则
>
>        ```java
>        public class Student implements Comparable<Student>{
>            int age;
>            String name;
>        
>            @Overwrite
>            public int compareTo(Student o){
>                return this.age-o.age;
>            }
>            //底层由红黑树实现，当构建红黑树时就会调用这个方法取比较
>            //this：代表要插入的结点  o：代表已经构建好的红黑树的结点
>            //o初始都为根结点，底层会使用这个方法不断的比较，直到找到合适的插入位置，在此过程中o会不断变化
>            //o的变化即：若this.age>o.age 就往右子树找  反之向左子树找
>        
>            //成功插入后按照红黑树的规则进行自平衡
>        }
>        
>        ```
>     
>     2. 比较器排序：创建TreeSet对象时，传递**比较器Comparator**制定规则
>     
>        - tip：默认使用第一种，当第一种不能满足当前需求时，使用第二种
>     
>        - Comparator：一个函数式接口，实际传递的是其**实现类**  —— 可以使用匿名实现类/Lambda表达式
>     
>          <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260616200754844.png" alt="image-20260616200754844" style="zoom:50%;" /> 
>     
>        - 方式二优先级更高

---

## 双列集合进阶



### 双列集合特点

> 一次添加**一对**元素，一对元素分别为键、值，键值一一对应
>
> 键是唯一的，不可重复，值是不唯一的可以重复   二者构成一个整体 被称为**键值对/键值对对象/Entry对象**
>
> - Map体系
>
>    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260616204537495.png" alt="image-20260616204537495" style="zoom:50%;" /> 



### Map

> - 双列集合的顶层接口，其中的方法是所有双列集合继承使用的
>
> - 常用API
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260616204622520.png" alt="image-20260616204622520" style="zoom:50%;" />
>
> - 格式
>
>   由于Map数据有一对。所以写泛型时也需写两个
>
>   ```java
>   Map<String,String> m = new HashMap<>();
>   ```
>
> - put方法
>
>   1. 添加数据时若键不存在，则直接添加键值对，返回null
>   2. 若键存在，会对原有的键值对进行覆盖，并把旧值返回
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260616205145147.png" alt="image-20260616205145147" style="zoom:50%;" />
>
> - remove方法
>
>   删除并返回**值**
>
> - clear方法：清空
>
> - containsKey方法：判断某键是否存在，返回boolean
>
> - containsValue方法：判断某值是否存在，返回boolean
>
> - isEmpty方法：判断是否为空，返回boolean
>
> - size方法：返回长度
>
> 
>
> - Map遍历（键找值）的三种方法
>
>   1. 将键获取出来放入单列集合（keySet），遍历单列集合使用get方法获取值
>
>      <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260616205823533.png" alt="image-20260616205823533" style="zoom:50%;" /> keySet方法，将键放入Set集合，返回值为Set
>
>   2. 依次获取键值对对象（entrySet方法），再通过getKey获取键，getValue获取值
>
>      - 注意：此处返回的键值对对象是一个整体，所以entrySet方法返回的同样是一个Set对象 —> Set< Entry<E,E> >  “泛型的嵌套”
>
>      <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260616210847819.png" alt="image-20260616210847819" style="zoom:50%;" /> 
>
>   3. 直接使用Lambda表达式遍历 — foreach
>
>      <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260616211213466.png" alt="image-20260616211213466" style="zoom: 43%;" /> 底层仍是由方法2实现



### HashMap

> 1. HashMap是Map的一个实现类
> 2. 无额外需学习的方法，继承了Map里的方法：put   get   remove….
> 3. 特点由键决定：无序、不重复、无索引
> 4. HashMap和HashSet的底层都是**哈希表**，其中HashSet是通过HashMap创造出来的
>
> tip：HashMap底层为**哈希表**，所以也要**重写equals和hashCode**方法
>
> 
>
> - 底层源码
>
>   1. 键值对实际上是一个**Node（链表结点）**对象，原因：处理哈希冲突需要使用链表
>
>      <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260617091645949.png" alt="image-20260617091645949" style="zoom:50%;" />
>
>      由图1可见，该类为HashMap内部类
>   
>      <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260617125841559.png" alt="image-20260617125841559" style="zoom:50%;" />
>   
>      由图2可见，HashMap的数组存储的数据类型即为Node
>   
>      
>   
>   2. 红黑树的树节点实际上也是HashMap的内部类
>   
>      <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260617125717922.png" alt="image-20260617125717922" style="zoom:50%;" />
>   
>    
>   
>   3. 一些常量
>   
>      <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260617130450950.png" alt="image-20260617130450950" style="zoom: 40%;" /> 
>   
>      从上到下分别为：数组默认初始化容量、数组最大容量、扩容因子、转为红黑树时数组最小长度、解除红黑树数组最小长度、转为红黑树时链表最小长度
>   
>    
>   
>   4. 构造方法
>   
>      <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260617130749515.png" alt="image-20260617130749515" style="zoom:50%;" />
>   
>      空参构造只对扩容因子进行赋值，数组的构造在put时进行
>   
>   
>   
>   剩余源码讲解详见： [视频1](https://www.bilibili.com/video/BV1yW4y1Y7Ms?spm_id_from=333.788.videopod.episodes&vd_source=d6f1919e59f384773719ad5aa3d3a0a9&p=15)     [视频2](https://www.bilibili.com/video/BV1yW4y1Y7Ms?spm_id_from=333.788.videopod.episodes&vd_source=d6f1919e59f384773719ad5aa3d3a0a9&p=16)    [视频3](https://www.bilibili.com/video/BV1yW4y1Y7Ms?spm_id_from=333.788.videopod.episodes&vd_source=d6f1919e59f384773719ad5aa3d3a0a9&p=17)



### LinkedHashMap

> - **有序**、不重复、无索引
>
>   通过双向链表把存入的键值对对象按顺序串起来，遍历时遍历该有序的链表



### TreeMap

> - 不重复、无索引、可排序
>
>   排序顺序规则：
>
>   1. 类实现Comparable接口
>   2. 传递Comparator实现类/Lambda表达式
>
>   具体排序规则实现：见[TreeSet](#TreeSet)
>   
>   
>   
> - 底层源码
>
>   1. TreeMap底层为红黑树，其键值对对象即为一个树节点
>
>      <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260617133952374.png" alt="image-20260617133952374" style="zoom:50%;" />
>
>      
>
>   2. 一些成员变量
>
>       <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260617134319309.png" alt="image-20260617134319309" style="zoom:50%;" />
>
>      从上到下依次为：比较器、红黑树根结点、红黑树大小
>
>       
>
>   3. 构造函数
>
>      <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260617134459314.png" alt="image-20260617134459314" style="zoom:50%;" />
>
>      构造函数实则传递comparator对象，空参默认为null
>
>    剩余源码详解见： [视频1](https://www.bilibili.com/video/BV1yW4y1Y7Ms?spm_id_from=333.788.videopod.episodes&vd_source=d6f1919e59f384773719ad5aa3d3a0a9&p=18)  [视频2](https://www.bilibili.com/video/BV1yW4y1Y7Ms?spm_id_from=333.788.player.switch&vd_source=d6f1919e59f384773719ad5aa3d3a0a9&p=19)

---



## 拓展



### 可变参数

> - 当方法形参不知道传递几个时，可用可变参数，如此方法形参可接收任意个
>
> 
>
> - 格式
>
>   ```java
>   数据类型...形参名
>       //如
>       public int getSum(int ... nums){
>           int sum = 0;
>           for (int num : nums) {
>               sum+=num;
>           }
>           return sum;
>       }
>   ```
>
>   
>
> - 底层
>
>   底层为：自动创建了一个**数组**  如上例中数组名即为nums，所以**当成数组处理**即可
>
> 
>
> - 细节：
>   1. 方法的形参中最多定义一个可变参数 —— 若定义多个，当传入多个数据时会不知道放入哪个里面
>   2. 在方法当中，若除了可变参数还有其他的形参，可变参数需要放到最后面  —— 原因：可变参数可以接收任意个数据，若写在第一个其他的形参都接受不到数据了



###  集合工具类

> - Collections
>
>   类似Arrays，同样定义在java.util包下，不同于Arrays操作的时数组，Collections操作的是单列集合
>
>  
>
> - 常用API
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260617141407020.png" alt="image-20260617141407020" style="zoom:50%;" />
>
>    
>
>   除此之外还有其他API
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260617141548029.png" alt="image-20260617141548029" style="zoom:50%;" />

---

## 不可变集合

> - 当某个数据不能被修改，将其放入不可变集合是个很好的选择/ 当集合对象被不可信的库调用时，不可变的形式是安全的    简而言之：就是把集合变为**只读形式**
>
>  
>
> - 格式
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260617161729004.png" alt="image-20260617161729004" style="zoom:50%;" />
>
>   ```java
>   List/Set/Map.of
>       //下面<E> 以<String>为例
>           List<String> list = List.of("1","2","3");
>           Set<String> set = Set.of("1","2","3");
>   //Map.of中两两一组匹配  下面1，2为一组  3，4为一组
>           Map<String,String> map = Map.of("1","2","3","4");
>   ```
>
>   - 细节1：Set集合是不可重复的，当创建不可变的不可变集合时，初始化数据时元素不能有重复（**若有重复 –> 删除重复 –> 报错**）
>
>   
>
>   - 细节2：Map同理，也不能有重复的键，且Map.of里面传递的**形参个数最多为20个** 
>
>     原因
>
>     List和Set都是单个形参就可创建对象，所以可以用可变参数接收任意个对象    
>
>     但是Map至少需要两个形参才能创建对象，而形参列表里最多只能有一个可变参数，
>
>     所以Map的不可变集合在底层只实现了Map.of(k1，v1) 一直到Map.of(k1,v1 ……… k10,v10 )
>
>     
>
> - 解决方法：将entry作为一个整体 使用entry作为可变参数类型
>
>   对应方法： **Map.ofEntries**
>
> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260617163501312.png" alt="image-20260617163501312" style="zoom:100%;" />
>
>     

---

## Stream流

### 简介及使用步骤

> - 流：流水线作业，在一条流上根据不同需求对数据进行处理
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260617173656254.png" alt="image-20260617173656254" style="zoom:50%;" />
>
>  
>
> - Stream流的作用：结合Lambda表达式，**简化集合、数组的操作**
>
>  
>
> - 使用步骤
>
>   1. 获取Stream流，并把数据放上去
>
>   2. 利用Stream流中的API对数据进行各种操作
>
>      API分为：中间方法和终结方法。 中间方法：链式编程思想，当方法调用完毕后仍然可以调用其他方法



### Stream流的获取方法

> - 方法
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260617174052498.png" alt="image-20260617174052498" style="zoom:50%;" />
>
>  
>
> - 示例
>
>   ```java
>   //单列集合的stream
>   		ArrayList<String> list = new ArrayList<>();
>           Collections.addAll(list, "a", "b", "c","d","e","f");
>                                           
>   //        //获取一条流水线，并把集合数据放入
>   //        Stream<String> stream1 = list.stream();
>   //        //使用终结方法打印
>   //        stream1.forEach(s->{
>   //            System.out.println(s);
>   //        });
>                                           
>           //简化写法
>           list.stream().forEach(s->System.out.println(s));
>   
>   
>   //双列集合无法直接调用stream，可以先把双列集合转成单列集合再使用
>   hm.keySet().stream().forEach(s->System.out.println(s));
>   //hm为HashMap
>   //或可以使用valueSet()或entrySet()
>   
>   
>   //数组：使用Arrays工具类调用stream()
>           int[] arr = {1,2,3,4,5,6,7,8,9};
>           Arrays.stream(arr).forEach(s->System.out.println(s));
>   
>   
>   //零碎的数据：直接调用Stream接口
>   Stream.of(1,2,3,4,5).forEach(s->System.out.println(s));
>   //注意：数据类型需一致
>   ```
>
>   Stream接口中的静态of：接收的类型是Object的可变参数



### Stream流的中间方法

> - 常见的中间方法
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260617175716618.png" alt="image-20260617175716618" style="zoom:50%;" />
>
>   tip：自定义类使用distinct方法时，需要重写equals和hashCode
>
>   修改Stream流中的数据不会对原集合/数组中的数据产生影响
>
> 
>
> - filter过滤：需传递一个函数接口的实现类 — 匿名内部类/Lambda表达式
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260617175952235.png" alt="image-20260617175952235" style="zoom: 80%;" /> 
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260617180402235.png" alt="image-20260617180402235" style="zoom:200%;" />
>
> 
>
> - limit(n)获取前n个
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260617180620504.png" alt="image-20260617180620504" style="zoom:50%;" />
>
> 
>
> - distinct
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260617180820974.png" alt="image-20260617180820974" style="zoom:50%;" />
>
> 
>
> - concat:流的合并，注意：合并的两个流中装的数据类型需要一致
>
> 
>
> - map()：**自定义函数处理**流中数据，数据转换说法不确切    map中需要传递函数接口实现类  — 匿名类/Lambda表达式
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260617181207922.png" alt="image-20260617181207922" style="zoom: 80%;" />
>
>    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260617181311239.png" alt="image-20260617181311239" style="zoom:100%;" />
>   
>   以此代码为例
>   
>   ```java
>   list.stream().map(s->Integer.parseInt(s.split("-")[1]).forEach(s->System.out.println(s)));
>   //map里面是处理数据流中数据的自定义函数，其执行流程为
>                                         
>   //1.s.split("-")[1] ：按正则表达式切割，"-" 即为"[-]"的简化，意为在 "-"处切割字符串，返回一个字符串数组 [0]为 - 的前半部分 [1]后半部分
>                                         
>   //2.将从split返回数组中取出的字符串交给Integer的字符串转换函数处理
>                                         
>   //3.处理完后调用Stream流中的终结方法forEach遍历，打印出结果
>   ```
>   
>   



### Stream流的终结方法

> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260617202249035.png" alt="image-20260617202249035" style="zoom:50%;" /> 
>
> tip：后两种方法同时也被称为收集方法
>
>  
>
> - toArray
>
>   toArray有两种实现方法，一种（空参）的返回类型为**Object[]**,还有一种（**传参**）是**自己定义的返回类型** 
>
>   ```java
>           String[] name = {"张aa","张aa","张aa","张aa","张bbb","王cccc"};
>                                         
>           Object[] arr1 = Arrays.stream(name).toArray();
>                                         
>           String[] arr2 = Arrays.stream(name).toArray(size -> new String[size]);
>   ```
>
>   可见传参确定数组类型的那个方法实则就是**new一个指定类型数组返回** ，此处的size即为**流中数据个数**
>
>  
>
> - collect
>
>   放入集合(Set、List、Map)中
>
>   - 放入List中：  **collect(Collectors.toList());**  
>
>   - 放入Set中：	**collect(Collectors.toSet());**        tip：会去重
>
>   - 放入Map中： **collect(Collectors.toMap(键的规则,值的规则));**  其中键的规则和值的规则需要传入一个函数式接口的实现类  —  **匿名类/Lambda表达式 **           tip:键不能重复
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260617205516932.png" alt="image-20260617205516932" style="zoom:50%;" />
>
>   注意第三个toMap的collect，里面的第一个Lambda表达式是把键切割出来并返回，第二个Lambda表达式是将值切割出来并返回

---

## 方法引用

### 简介

> - 将已有方法拿过来用，当作**函数式接口**中抽象方法的方法体
>
>  
>
> - 与匿名内部类和Lambda表达式的比较
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260618205034376.png" alt="image-20260618205034376" style="zoom: 43%;" /> 
>
>   其中Test::substraction  表示引用； Test类下的substraction方法，::为方法引用符



### 方法引用分类

> 1. 引用静态方法
>
>    - 格式
>
>      ```java
>      类名：静态方法
>          Integer::parseInt
>      ```
>
>      
>
>      
>
>    - 示例
>
>      ```java
>         		ArrayList<String> list = new ArrayList<>();
>                                                                                                
>              Collections.addAll(list,"1","2","3","4","5");
>                                                                                                
>              list.stream().map(Integer::parseInt).forEach(System.out::println);
>      ```
>
>    
>
> 2. 引用成员方法
>
>    - 格式
>
>      ```java
>      对象::成员方法
>          1.其他类：  其他类对象::方法名
>          2.本类：   this::方法名
>          3.父类：   super::方法名
>      ```
>
>     
>
>    - 示例
>
>      ```java
>              ArrayList<String> list = new ArrayList<>();
>                                                                                                
>              Collections.addAll(list,"张无忌","周芷若","赵成","张强","张三丰");
>                                                                                                
>              //原写法
>              list.stream().filter(name->name.length()==3).filter(name->name.startsWith("张")).forEach(s->System.out.println(s));
>                                                                                                
>              //方法引用写法
>           list.stream().filter(new StringOperator()::Stringjudge).forEach(System.out::println);
>                                                                                                
>      //下面为定义在StringOperator类里的Stringjudge代码
>      package XinJa.Improve.Learn;
>      public class StringOperator {
>          public  boolean Stringjudge(String name){
>              return name.length()==3&&name.startsWith("张");
>          }
>      }
>      ```
>
>      上例中的Stringjudge方法定义在其他类中。
>
>      若定义在本类    **new StringOperator()::** 换为 **this::** 注意：**静态方法中无this**，所以这个this无法在**public static main**里面调用
>
>      若定义在父类中可改为 super::     同样无法在静态方法中调用
>
>  
>
> 3. 引用构造方法：  目的：为了创建对象
>
>    - 格式
>
>      ```java
>      类名::new
>          Student::new
>      ```
>
>     
>
>    - 示例
>
>      <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260618215714027.png" alt="image-20260618215714027" style="zoom:50%;" />
>
>      <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260618215735207.png" alt="image-20260618215735207" style="zoom:50%;" />
>
>      注意：参数**个数、类型**需和流中给出的数据相同    注意：给出的方法需要能完成流中创建对象的**需求**
>
> 4. 其他引用方法
>
>    - 使用类名引用成员方法
>
>      - 格式
>
>        ```java
>        类名::成员方法
>            String::substring
>        ```
>
>       
>
>      - 示例
>                                                                        
>        ```java
>                ArrayList<String> list = new ArrayList<>();
>                                                                                
>                Collections.addAll(list,"aaa","bbb","ccc","ddd");
>                                                                                
>                //转大写
>                list.stream().map(String::toUpperCase).forEach(System.out::println);
>        ```
>
>       
>
>      - 特殊使用条件
>        1. 类名::成员方法，函数式接口所需传递的方法的**第一个参数**决定了**类名**，二者需一致。简而言之就是类名必须与流中数据对应
>        2. 调用的方法的参数需要与函数式接口所需传递的方法的**第二个形参开始对齐**，若所需方法只有一个形参，则类名::成员方法的**成员方法**必须是无参
>
>    
>
>    - 引用数组的构造方法
>
>      - 格式
>
>        ```java
>        数据类型[]::new
>            int[]::new
>        ```
>
>       
>
>      - 示例
>                                                                        
>        ```java
>                ArrayList<Integer> list = new ArrayList<>();
>                                                                                
>                Collections.addAll(list,1,2,3,4,5);
>                                                                                
>                //Lambda表达式
>                list.stream().toArray(size -> new Integer[size]);
>                                                                                        
>                //方法引用
>                list.stream().toArray(Integer[]::new);
>        ```
>
>        

---

## 异常



### 异常体系

> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260618223845246.png" alt="image-20260618223845246" style="zoom:40%;" />
>
> - Error：系统级别错误（严重）
>
> - Exception：异常
>
>   RuntimeException及其子类：编译阶段不出现提醒，运行时出错（如数组越界）
>
>   其他异常：编译阶段出现提醒  
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260618224244981.png" alt="image-20260618224244981" style="zoom:40%;" />
>
>   - 编译阶段
>
>     Java不会运行代码，只会检查语法是否错误，或做一些性能优化



### 异常作用

> 1. 查询bug参考信息
>
> 2. 作为方法内部一种特殊返回值，以便通知调用者底层执行情况
>
>    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260618225154656.png" alt="image-20260618225154656" style="zoom:100%;" /> 
>
>    如上图，当数据不在范围内时，使用**throw**一个RuntimeException对象去报错  通知调用者



### 异常处理方式

#### JVM虚拟机默认处理方式

> - 将异常的名称、原因、信息、出现位置等信息打印在控制台 并 停止虚拟机运行



#### 捕获异常（自己处理）

> - 格式
>
>   ```java
>   try{
>       可能出现异常的代码
>   } catch(异常类名 变量名){
>       异常的处理代码
>   }
>   ```
>
>  目的：使得代码出现异常时，程序可以继续运行
>
> - 示例
>
>   ```java
>           int[] arr = {1,2,3,4,5,6};
>                                               
>           try{
>               //可能出现异常的代码
>               System.out.println(arr[10]);
>           }catch(ArrayIndexOutOfBoundsException e){
>               //当出现ArrayIndexOutOfBoundsException异常时的处理代码
>               System.out.println("数组越界");
>           }
>   ```
>
>   - tip1：try中可能会遇到多个异常，对此可以写多个catch进行解决
>
>   
>
>   - tip2：catch中的异常，父类一定要放在下面 
>
>     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260618230503634.png" alt="image-20260618230503634" style="zoom:50%;" />   
>
>     如图Exception是其它的父类，放在最下面，否则会报错。**原因：若父类放在前面，当接收到子类异常时会形成多态，导致后面的子类异常永远接收不到**
>
>   
>
>   - tip3：catch()中的异常可以用 | 连接表示出现多个异常中的一个时**（或）**
>
>    
>
>   - tip4:若try中出现的异常没在catch中，则会交由JVM处理



### 异常中常见解决方法

> 1. 打印异常信息
>
>    
>
>    - Throwable成员方法
>
>      <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260618231316532.png" alt="image-20260618231316532" style="zoom:50%;" />
>
>      最后一个最常用
>
>      ```java
>              int[] arr = {1,2,3,4,5,6};
>                                                                                                
>              try{
>                  //可能出现异常的代码
>                  System.out.println(arr[10]);
>              }catch(ArrayIndexOutOfBoundsException e){
>                  System.out.println(e.getMessage());//Index 10 out of bounds for length 6
>                  System.out.println(e.toString());//java.lang.ArrayIndexOutOfBoundsException: Index 10 out of bounds for length 6
>                  e.printStackTrace();//打印的最完整，输出结果同JVM的自动报错，但是不会停止虚拟机运行
>              }
>                                                                                                
>      ```
>
>  
>
> 2. 抛出处理
>
>    - throws
>
>      写在**方法定义**处，表示**声明一个异常**，告诉调用者使用本方法可能会出现哪些异常
>
>      编译时异常：必须写     运行时异常：可不写
>
>    - throw
>
>      写在方法内，结束方法，手动抛出异常给调用者



### 自定义异常

> - 目的：为了让异常更加具体，更符合报错原因
> - 步骤
>   1. 定义异常类
>   2. 写继承关系
>   3. 空参构造
>   4. 带参构造

---

## File

### 概述和构造方法

> - 概述
>
>   存储数据时首先需要知道文件路径（File），再通过IO流进行传输。 **File对象就表示路径**
>
>  
>
> - 构造方法
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260619081222194.png" alt="image-20260619081222194" style="zoom:50%;" />
>
>   其中第二、三个方法自动对路径进行了**拼接**，对于不同操作系统会使用不同的拼接方法
>
>   创建File可用绝对路径/相对路径
>
>   



### 常见成员方法

#### 判断获取方法

> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260619081735642.png" alt="image-20260619081735642" style="zoom:50%;" />
>
> 1. length()方法无法直接获取文件夹大小，若需获取文件夹大小需要对其所有文件大小进行累加
>
> 2. getPath返回的是定义文件时使用的路径，即：new File()时括号中写的路径
>
> 3. lastModified获取的时间可以采取以下两种方式进行格式化
>
>    ```java
>            File f = new File("src/XinJa/Improve/Learn/Actor.java");
>            long time = f.lastModified();
>                                                       
>    		//JDK8
>            DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");//设定格式
>            Instant t =  Instant.ofEpochMilli(time);//获取时间戳
>            ZonedDateTime zdt = ZonedDateTime.ofInstant(t, ZoneId.systemDefault());//化为时间对象
>            System.out.println(dtf.format(zdt));//格式化
>                                                       
>            //JDK7
>            DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置格式
>            Date d = new Date(time);//创建时间对象
>            System.out.println(df.format(d));//格式化
>    ```



#### 创建删除File对象方法

> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260619084353684.png" alt="image-20260619084353684" style="zoom:50%;" />
>
> 注意：
>
> 1. delete方法默认只能删除文件和空文件夹，且删除后不进回收站，直接删除
> 2. **createNewFile方法（创建的一定是文件）**，可能会有路径不存在的异常，所以需要在类名后加上throws抛出异常。且此方法在文件已存在的情况下会返回false表示创建失败
>
> 3. mkdir：创建单极文件夹，若路径已存在，报错
> 4. mkdirs：创建多级文件夹，若路径已存在，报错
> 5. delete：若删除的是有内容的文件，则会删除失败



#### 获取/遍历File中的内容

> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260619085152889.png" alt="image-20260619085152889" style="zoom:100%;" />
>
> - 返回的数组，存储了某文件夹下所有文件，可以用增强for遍历
>
> 注意：
>
> 1. 当File路径不存在时返回null
> 2. 当File路径是文件时返回null
> 3. 当File路径是空文件夹时，返回长度为0的数组
> 4. 当File路径是有内容的文件夹/隐藏文件夹时，返回其中所有文件
> 5. 当File路径是需要权限才可进入文件夹时，返回null

---

## IO流

#### IO流的分类和体系

> 读写文件数据或网络中的数据
>
> - 分类
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260619093802106.png" alt="image-20260619093802106" style="zoom:50%;" />
>
> - 体系
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260619093948804.png" alt="image-20260619093948804" style="zoom:50%;" />
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260619094028812.png" alt="image-20260619094028812" style="zoom:50%;" />
>



#### 字节流

##### FileOutPutStream

> - 创建流程
>
>   1. 创建对象
>   2. 写出数据
>   3. 释放资源
>
>   ```java
>   import java.io.FileOutputStream;
>   import java.io.IOException;
>   public static void main(String[] args) throws IOException {
>           FileOutputStream fos = new FileOutputStream("C:\\Users\\Xinja\\Desktop\\workspace\\Java\\JavaSE\\Java_Learn_Improve\\test.txt");
>           fos.write('t');
>           fos.write('e');
>           fos.write('s');
>           fos.write('t');
>           fos.close();	
>   }
>   ```
>
> - 创建对象时若文件不存在，则会创建文件，若文件存在则会清空数据
>
>  
>
> - 写数据的三种方法
>
>   > <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260619095137992.png" alt="image-20260619095137992" style="zoom:50%;" />
>   >
>   > ```java
>   >         FileOutputStream fos = new FileOutputStream("C:\\Users\\Xinja\\Desktop\\workspace\\Java\\JavaSE\\Java_Learn_Improve\\test.txt");
>   >         byte[] bytes = {'t','e','s','t'};
>   >         fos.write(bytes);
>   >         byte[] bytes2 = {'h','e','l','l','o','w','o','r','l','d'};
>   >         fos.write(bytes2, 0, 5);
>   >         fos.close();
>   > ```
>
>  
>
> - 换行和续写
>
>   - 换行：输出一个换行符
>
>     Windows：\r\n  Linux:\n  Mac:\r
>
>     tip：Windows不写全Java底层也会补全
>
>     ```java
>             FileOutputStream fos = new FileOutputStream("C:\\Users\\Xinja\\Desktop\\workspace\\Java\\JavaSE\\Java_Learn_Improve\\test.txt");
>             String str = "abcdefghijklmnop";
>             fos.write(str.getBytes());
>             String warp = "\r\n";
>             fos.write(warp.getBytes());
>             String str2 = "aaabbbcccddd";
>             fos.write(str2.getBytes());
>             fos.close();
>     ```
>
>   - 续写：设置续写模式：在new FileOutputStream时，第**二个参数传递true**表示打开续写模式，默认是关闭的
>
>     ```java
>     FileOutputStream fos = new FileOutputStream("C:\\Users\\Xinja\\Desktop\\workspace\\Java\\JavaSE\\Java_Learn_Improve\\test.txt",true);
>     ```



##### FileInputStream

> - 创建流程
>
>   ```java
>           FileInputStream fis = new FileInputStream("C:\\Users\\Xinja\\Desktop\\workspace\\Java\\JavaSE\\Java_Learn_Improve\\test.txt");
>           int b = fis.read();
>           System.out.println((char)b);
>           fis.close();
>   ```
>
>   - 读取到文件末尾返回-1
>   - 若文件不存在则报错
>   - fis每read一次指针就向前一个位置
>
>  
>
> - 循环读取
>
>   ```java
>           FileInputStream fis = new FileInputStream("C:\\Users\\Xinja\\Desktop\\workspace\\Java\\JavaSE\\Java_Learn_Improve\\test.txt");
>           int input = 0;
>           while((input=fis.read())!=-1){
>               System.out.print((char) input);
>           }
>           fis.close();
>   ```



##### 文件拷贝

> - 小文件拷贝：边读边写
>
>   ```java
>   int input = 0;
>   while((input = fis.read())!=-1){
>       fos.wirte(input);
>   }
>   fis.close;
>   fos.close;
>   ```
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260619101703303.png" alt="image-20260619101703303" style="zoom:33%;" />
>
> - 大文件拷贝：一次读取多个字节
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260619101743425.png" alt="image-20260619101743425" style="zoom:50%;" />
>
>   一般创建数组时会创建长度为1024整数倍的数组
>
>   这种重载的方法会返回读取到的数据总长度。当数据没有读完的时候返回长度就为数组长度，当最后一次读取时，返回长度<数组长度时，说明读完了，所以需要对最后一次读取数据的拷贝进行特殊处理
>
>   ```java
>   byte buffer[] = new buffer[1024*1024*5];//5M
>   int len = 0；
>   while((len=fis.read(buffer)) != -1){
>       fos.wirte(buffer,0,len);
>   }
>   fis.close();
>   fos.close();//tip:释放资源时，先开的后关
>   ```
>
>   



#### IO流中不同JDK版本捕获异常方式

> - 捕获异常完整形态
>
>   ```java
>   try{
>                                     
>   }catch(){
>                                     
>   }finally{
>       //finally控制的语句一定会执行，除非虚拟机停止
>       //所以适合将close()方法放在里面
>   }
>   ```
>
>  
>
> - 简化方案：接口AutoCloseable
>
>   在特定情况下可自动释放资源
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260619103408779.png" alt="image-20260619103408779" style="zoom:50%;" />
>
>   tip：这个类要是AutoCloseable的实现类



#### 字符集

> - 字节流读取数据时不能有中文，不然会乱码
>
> - 存储英文（ASCII编码）时一个字节就可以，但中文不行
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260619103918972.png" alt="image-20260619103918972" style="zoom:33%;" /> 
>
> 
>
> - 存储中文的表（GB2312/GBK）
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260619104751349.png" alt="image-20260619104751349" style="zoom:33%;" />
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260619104020888.png" alt="image-20260619104020888" style="zoom:50%;" />
>
>   - GBK存储英文：同ASCII编码
>
>   - GBK存储中文：**一个汉字用2个字节**存储功能存储2^16^个汉字
>
>     两个字节：高位字节、低位字节
>
>     高位字节二进制一定以1开头，转成十进制后一定是个负数 — 原因：**区分ASCII编码中的补零机制**，ASCII码的最高位一定是0    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260619104630577.png" alt="image-20260619104630577" style="zoom:50%;" /> 如此一来就可以**通过最高位区分编码方式**
>
>  
>
> - Unicode字符集：万国码
>
>   以统一的方式存储不同国家的字符集
>
>   - UTF-16编码
>
>     用2~4个字节存储
>
>   - UTF-32编码
>
>     固定用4个字节存储
>
>   - UTF-8编码
>
>     可变长度字符编码，用1~4个字节保存，目前最常用
>
>     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260619110420802.png" alt="image-20260619110420802" style="zoom:33%;" /> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260619110458411.png" alt="image-20260619110458411" style="zoom:50%;" />
>
>     图二的前缀用于区分
>
>     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260619110634731.png" alt="image-20260619110634731" style="zoom:50%;" />



#### Java中的编码和解码

> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260619111106195.png" alt="image-20260619111106195" style="zoom:50%;" />
>
> tip：解码采用的是构造方法

 

#### 字符流

> 字符流 = 字节流 + 字符集；  因为字节流是一个一个字节读取的，读取后若不是英文会出现乱码的现象，字符流就很好的避免了这一点
>
> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260619111848080.png" alt="image-20260619111848080" style="zoom:33%;" />

##### FileReader

> - 创建
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260619112121029.png" alt="image-20260619112121029" style="zoom:50%;" />
>
> - 读取
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260619112142599.png" alt="image-20260619112142599" style="zoom:50%;" />
>
>   注意
>
>   1. 读取多个数据返回的是char数组
>   2. 底层按字节读取，遇到中文一次读多个字节，读取后解码**返回一个整数**   若想要看到中文汉字还需要进行(char)强转
>
> 
>
> - 多个读取示例
>
>   ```java
>   FileReader fr = new FileReader("xxxx");
>   char[] res = new char[10];//一次读十个字符
>   int len;
>   while((len=fr.read(res))!=-1){//有参数的read方法会在读取到数据后进行解码   放入char数组时会进行强转
>       System.out.println(new String(res,0,len));//转字符串并输出
>   }
>   fr.close();
>   ```



##### FileWriter

> - 构造方法
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260619113738367.png" alt="image-20260619113738367" style="zoom:50%;" />
>
> - 成员方法
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260619113810586.png" alt="image-20260619113810586" style="zoom:50%;" />





### 高级IO流

#### 缓冲流

> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260619123403338.png" alt="image-20260619123403338" style="zoom:50%;" />
>
> 加了长度为8192的缓冲区，节约了内存与硬盘的IO时间，使得读写更加高效
>
> ​                                                 <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260619124414238.png" alt="image-20260619124414238" style="zoom:50%;" /> 
>
> ​											左边为读取缓冲区，右边是写入缓冲区
>
> 
>
> - 字节缓冲流的构造方法
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260619123509084.png" alt="image-20260619123509084" style="zoom:50%;" />
>
>   创建缓冲流时要关联其相对应的基本流
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260619123955977.png" alt="image-20260619123955977" style="zoom:50%;" />
>
>  
>
> - 字符缓冲流的构造方法
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260619124631045.png" alt="image-20260619124631045" style="zoom:50%;" />
>
> - 字符缓冲流中特有的好用成员方法
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260619124714815.png" alt="image-20260619124714815" style="zoom:40%;" />
>
> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260619125427605.png" alt="image-20260619125427605" style="zoom:50%;" />



#### 转换流

> - **字符流**的高级流
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260620081849426.png" alt="image-20260620081849426" style="zoom:50%;" />
>
>   是字符流和字节流间的桥梁
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260620082016049.png" alt="image-20260620082016049" style="zoom:50%;" />
>
>   Input/Output Stream表示字节流   Reader/Writer表示字符流。
>
>  
>
> - 作用
>
>   想对字节流使用字符流中的方法时，可以进行转换后再对其使用
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260620090045813.png" alt="image-20260620090045813" style="zoom: 33%;" /> 
>
>   字符流转换为字节流再转换为缓冲流BufferedReader再使用readLine方法
>
>  
>
> - tip：JDK11后，FileReader和FileWriter支持指定编码格式读取/写入,所以对于 **字节流—字符流转换读取/写入的功能**通常使用FileReader和FileWriter，只有在需要使用字符流方法处理字节流时我们才用转换流



#### 序列化流

> - **字节流**的高级流    
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260620090604216.png" alt="image-20260620090604216" style="zoom:50%;" /> 
>
>  
>
> - 作用：将Java中的**对象**写入本地文件   — 又名对象操作流
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260620090820913.png" alt="image-20260620090820913" style="zoom:50%;" />
>
> - 问题：将对象保存到文件时会出现NotSerializableException
>
>   解决：让被写入的JavaBean类实现**Serializable接口（标记式接口）**
>
> 
>
> - 反序列化流成员方法
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260620091548422.png" alt="image-20260620091548422" style="zoom:50%;" />
>
>  
>
> - 示例
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260620091806963.png" alt="image-20260620091806963" style="zoom:50%;" />

###### 扩展

> - 序列化底层
>
>   Java会根据对象的成员变量进行计算，计算出一个**序列号**。此序列号也会被存入本地文件      
>
>   
>
>   当存入后修改JavaBean里的内容会导致序列号发生变化，使得本地文件序列号与JavaBean的序列号对不上
>
>  
>
> - 固定序列号：
>
>   ```java
>   private static long serialVersionUID = 1L;
>   //写在JavaBean的成员变量中
>   //可以在IDEA中设置，并用快捷键自动生成
>   ```
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260620092757227.png" alt="image-20260620092757227" style="zoom:50%;" />
>
> - 瞬态关键字：transient   可以使被修饰的变量不参与序列化，即：被此关键字修饰的变量不会存入本地文件
>
>  
>
> - 读取多个对象
>
>   由于反序列化流返回的不是boolean用以判断是否读完，所以我们一般在序列化的时候将所有需要存入的对象**放入ArrayList中，**(ArratList是实现了serializable接口的)，如此一来,读取时只需要将ArrayList读取出来，再遍历即可



#### 打印流

> - 只能写不能读  属于Writer的实现类
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260620093647992.png" alt="image-20260620093647992" style="zoom:50%;" /> 
>
>   
>
> - 字节打印流PrintStream
>
>   
>
>   - 构造方法
>
>     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260620093741489.png" alt="image-20260620093741489" style="zoom:50%;" />
>
>    
>
>   - 成员方法
>
>     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260620093835185.png" alt="image-20260620093835185" style="zoom:50%;" />
>
>    
>
> - 字符打印流PrintWriter
>
>   多了一个**缓冲区**，想要自动刷新需手动开启
>
>   其余的与字节打印流相同



#### 压缩流和解压缩流

> - 属于字节流的高级流
>
>  
>
> - 解压缩流
>
>   java中只能识别zip类的压缩文件，解压缩流的本质就是根据压缩文件的层级（Java中每个文件（夹）都被视为一个**ZipEntry对象**）把所有文件**拷贝**到另一个文件夹
>
>   [视频](https://www.bilibili.com/video/BV1yW4y1Y7Ms?spm_id_from=333.788.player.switch&vd_source=d6f1919e59f384773719ad5aa3d3a0a9&p=113)
>
>  
>
> - 压缩流
>
>   本质：把每个文件视为ZipEntry对象放入压缩包
>
>   [视频1](https://www.bilibili.com/video/BV1yW4y1Y7Ms?spm_id_from=333.788.player.switch&vd_source=d6f1919e59f384773719ad5aa3d3a0a9&p=114)
>
>   [视频2](https://www.bilibili.com/video/BV1yW4y1Y7Ms?spm_id_from=333.788.player.switch&vd_source=d6f1919e59f384773719ad5aa3d3a0a9&p=115)



### Commons-io

> 由apache提供的有关IO操作的开源**工具包**
>
>  
>
> - 常见方法
>
>   - File Jtils
>
>     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260620101052094.png" alt="image-20260620101052094" style="zoom:50%;" />
>
>   - IO Utils
>
>     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260620101427255.png" alt="image-20260620101427255" style="zoom:50%;" />



### Hutool工具包

> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260620102219101.png" alt="image-20260620102219101" style="zoom: 25%;" />
>
> - IO工具类
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260620102259710.png" alt="image-20260620102259710" style="zoom: 25%;" /> 
>
>   圈出来的两个和Java IO包中的重名了，注意导包

---

## 网络爬虫

> 1. 定义变量记录网址
> 2. 爬取数据
>
>  [随机姓名的获取.md](随机姓名的获取.md) 

---

## properties

> - properties为配置文件之一
>
>   文件后缀名为properties，文件中的数据以键值对存储
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260620134231335.png" alt="image-20260620134231335" style="zoom:33%;" /> 
>
>   properties和IO流结合
>
>   
>
> - properties中特有的写入/读取
>
>   写入：store(输出流，注释)
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260620135208012.png" alt="image-20260620135208012" style="zoom: 33%;" /> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260620135220203.png" alt="image-20260620135220203" style="zoom:50%;" />
>
>   读取：load(输入流)
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260620135458986.png" alt="image-20260620135458986" style="zoom:50%;" />
>
> - 作用
>
>   把程序里经常修改的参数抽离到外部文件，不用改代码、不用重新编译就能修改配置。
>
>   常见配置：端口号、数据库账号密码、文件路径、开关、阈值、常量参数等。

---

## 多线程&&JUC



### 线程与进程

> - 进程
>
>   **程序**的基本执行实体
>
> - 线程
>
>   操作系统中可调度的最小单位，**包含在进程之中**
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260624181057354.png" alt="image-20260624181057354" style="zoom:50%;" />  多线程最大特点就是将等待时间利用



### 并发和并行

> 并发：同一时刻，多个指令在CPU上**交替**执行
>
> 并行：同一时刻，多个指令在多个CPU上同时执行
>
> - 并发并行有可能同时发生：当线程数超过了CPU的线程数时，就会产生并发，如：2核4线程的CPU遇到8线程的程序时，那四个CPU线程会交替执行不同的程序线程



### 线程栈

> **每个线程**在运行时都会有自己的一个**栈空间**，如:main线程就有自己的main栈空间，在栈空间中的变量是**互相独立的**





### Java中多线程的实现方式

> 1. **继承**Thread类
>
>    ```java
>         class PrimeThread extends Thread {
>             //这一块是成员变量与构造方法
>             long minPrime;
>             PrimeThread(long minPrime) {
>                 this.minPrime = minPrime;
>             }
>                            
>             //重写run方法，run方法中书写线程需要执行的代码
>             public void run() {
>                 // compute primes larger than minPrime
>                  . . .
>             }
>         }
>       //创建线程
>           PrimeThread p = new PrimeThread(143);
>           p.start();//调用后会去找run方法
>    ```
>    
>    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260624182522661.png" alt="image-20260624182522661" style="zoom: 43%;" /> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260624182532511.png" alt="image-20260624182532511" style="zoom:50%;" />
>    
>    可用getName()和setName()为线程取名，从输出结果来看，**线程是交替执行的**
>
> 
>
> 2. 实现Runnable**接口**
>
>     ```java
>       class PrimeRun implements Runnable {
>                                
>              long minPrime;
>              PrimeRun(long minPrime) {
>                  this.minPrime = minPrime;
>              }
>                                   
>        //实现Runnable接口并重写run
>              public void run() {
>                  // compute primes larger than minPrime
>                   . . .
>              }
>          }
>                              
>     //不同于法1   法2在创建对象后需要将对象传给Thread对象
>          PrimeRun p = new PrimeRun(143);
>          new Thread(p).start();
>     ```
>
>    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260624183539493.png" alt="image-20260624183539493" style="zoom40%;" />
>
>    
>
>    上图两步可用链式编程简化为
>
>    ```java
>    System.out.println(Thread.currentThread().getName()+"HelloWorld");
>    ```
>
>    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260624183830352.png" alt="image-20260624183830352" style="zoom:50%;" /> 
>
>    创建出来的MyThread类并不是线程，所以需要用其创造出一个**Thread类**
>
>    
>
> 重写的Runnable实现类只是为线程提供了**工作图纸**（Run方法），创建Thread时传入图纸
>
> 
>
> 3. 利用Callable结合和Future接口
>
>    对前两种方法的补充：法1法2的run是**无返回值**的。法3可以使得其有返回值
>
>    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260624184423775.png" alt="image-20260624184423775" style="zoom: 80%;" />
>
>    
>
>    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260624184843957.png" alt="image-20260624184843957" style="zoom:33%;" /> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260624184857046.png" alt="image-20260624184857046" style="zoom: 40%;" />
>
>  
>
> - 三种方法的比较
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260624185019781.png" alt="image-20260624185019781" style="zoom:50%;" />
>
>   tip:Java中是单继承，所以用法1就无法继承其他类



### Thread中常见成员方法与构造方法

> - 成员方法
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260624185224099.png" alt="image-20260624185224099" style="zoom:50%;" />
>
>   - 线程优先级：1~10，默认为5，优先级越大，抢占CPU的概率越高
>
>   
>
>   - 线程默认名： Thread - x   x从0开始自增
>
>    
>
>   - sleep（long time）单位：毫秒
>
>    
>
>   - setDaemon:守护线程   当其他非守护线程执行完毕后，守护线程也会陆续结束
>
>     守护线程应用：<img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260624190706284.png" alt="image-20260624190706284" style="zoom:50%;" />
>
>     传输文件为守护进程
>
>    
>
>   - 礼让线程：当某线程执行到yield静态方法时，会让出当前CPU的执行权，重新回到就绪状态重新争抢CPU执行权。
>
>     tip：只会对同优先级的线程礼让
>
>    
>
>   - 插队线程：
>
>     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260624191358438.png" alt="image-20260624191358438" style="zoom: 80%;" /> 
>
>     此例中“土豆”线程和“main”线程在抢用CPU使用权，使用join将土豆插在当前线程前
>
> - 构造方法
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260624185736275.png" alt="image-20260624185736275" style="zoom:33%;" />
>
>   可见 Runnable 就类似给线程分配的工作。  构造时可以空参、传入Runnable“图纸”/Name



### 线程的生命周期和安全问题

> - 生命周期
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260624191705115.png" alt="image-20260624191705115" style="zoom: 40%;" />
>
>  
>
> - 安全问题
>
>   多个线程**同时操作**同一个共享资源（共享变量：用static修饰），最终出现**数据错乱、结果不符合预期。**
>
>   ```java
>   //例子：多线程买票
>   class Ticket implements Runnable{
>       private int ticket = 100; // 共享变量
>       @Override
>       public void run() {
>           while(ticket > 0){
>               // 模拟出票耗时
>               try { Thread.sleep(100); } catch (Exception e){}
>               System.out.println(Thread.currentThread().getName()+"卖出第"+ticket+"张");
>               ticket--;
>           }
>       }
>   }
>   ```
>
>   可能会出现的问题：同一张票被卖多次、卖出的票>100等



### 同步代码块

> - 格式
>
>   ```java
>   synchronized (锁对象){//锁对象需要是静态的
>       操作共享数据的代码
>   }
>   ```
>
>   锁默认打开，当有线程进去时会自动上锁，代码执行完毕，锁自动打开
>
>  
>
> - 示例
>
>   ```java
>   public class MyThread extends Thread {
>       static int ticket = 0;
>       //锁对象可以是任意类的对象，但是一定要是唯一的（static）
>       static Object lock = new Object();
>       @Override
>       public void run() {
>           while(ticket < 100){
>               //不能锁在外面，若所在外面，一个线程进来之后会卖完一百张票再出去
>               synchronized (lock){
>                   try {
>                       Thread.sleep(1);
>                   } catch (InterruptedException e) {
>                       throw new RuntimeException(e);
>                   }
>                   
>                   ticket++;
>                   System.out.println(getName()+"正在卖第"+ticket+"张票");
>               }
>           }
>       }
>                   
>   ```



### 同步方法

> 直接用sunchronized修饰方法
>
> - 格式
>
>   ```java
>   修饰符 synchronized 返回值类型 方法名 (参数) {...}
>   ```
>
>  
>
> - 特点
>
>   1. 同步方法锁住的是方法里的所有代码
>
>   2. 锁对象不能自己指定，是规定好的。
>
>      非静态方法：this  (当前方法调用者)
>
>      静态方法：当前类的字节码文件 （.class）
>
>  
>
> - 示例
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260624194610432.png" alt="image-20260624194610432" style="zoom: 50%;" /> 
>
> tip：StringBuffer与StringBuilder类两者方法功能一致，但是StringBuffer中的所有方法都加了synchronized修饰，使得StringBuffer可以同步字符串，所以多线程时建议使用StringBuffer



### lock锁

> - 为了更清晰的表达如何上锁和释放锁，JDK5后增加了，相较于sunchronized，Lock增加了获得锁和释放锁的方法，**让我们可以手动地上锁、释放锁**。      Lock是一个**接口**，这里采用他的实现类ReentrantLock演示
>
>  
>
> - 示例
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260624200006220.png" alt="image-20260624200006220" style="zoom: 43%;" />
>
>   若使用继承Thread的方法，创建多线程时会创建多个Lock对象，所以用static修饰确保锁的唯一
>
>    
>
>   finally配合unlock详解：[视频](https://www.bilibili.com/video/BV1yW4y1Y7Ms?spm_id_from=333.788.player.switch&vd_source=d6f1919e59f384773719ad5aa3d3a0a9&p=150)



### 死锁

> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260624200848752.png" alt="image-20260624200848752" style="zoom:33%;" /> 死锁出现于**锁的嵌套**中，是一个错误，导致线程被锁死
>
> 
>
> - 例子：
>
>   线程 1 持有 `lock1`，想要 `lock2`，但 `lock2` 在线程 2 手里
>
>   线程 2 持有 `lock2`，想要 `lock1`，但 `lock1` 在线程 1 手里
>
>   两个线程都不释放自己手上的锁，互相无限等待
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260624201555922.png" alt="image-20260624201555922" style="zoom:60%;" />
>
>   如上图，线程A要先拿A锁再拿B锁，线程B先拿B锁再拿A锁，当A持有A锁且B持有B锁时就会陷入死锁



### 等待唤醒机制

#### 中间类的实现

> - 使得线程交替轮流、有规律的执行
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260624201952757.png" alt="image-20260624201952757" style="zoom:50%;" />
>
>  
>
> - 生产者和消费者
>
>   生产者作用是生产数据，消费者消费数据
>
>   - 消费者等待
>
>     当数据未被生产时，消费者进入等待状态(wait)，等到生产者生产好数据后唤醒（notify）消费者
>
>   - 生产者等待
>
>     当数据未被消费时，生产者进入等待状态(wait)，等到消费者消费完数据后唤醒（notify）生产者
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260624202511592.png" alt="image-20260624202511592" style="zoom: 50%;" />
>
>   tip：桌子为中间类，记录了一些变量,用于控制生产者与消费者
>
>  
>
> - 相关方法
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260624202535024.png" alt="image-20260624202535024" style="zoom:50%;" />
>
>   这些方法都需要用锁对象调用——— 线程与锁进行绑定，用锁调用就会对相应线程进行等待唤醒
>
>    
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260624204926737.png" alt="image-20260624204926737" style="zoom:30%;" /> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260624204942388.png" alt="image-20260624204942388" style="zoom: 30%;" />
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260624205017494.png" alt="image-20260624205017494" style="zoom:50%;" />



#### 阻塞队列的实现

> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260624205220980.png" alt="image-20260624205220980" style="zoom:50%;" />
>
>  
>
> - 阻塞队列的继承结构
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260624205317649.png" alt="image-20260624205317649" style="zoom: 40%;" />
>
>  
>
> - 示例
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260624210608422.png" alt="image-20260624210608422" style="zoom: 33%;" /> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260624210616750.png" alt="image-20260624210616750" style="zoom: 33%;" />
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260624210708483.png" alt="image-20260624210708483" style="zoom:50%;" />



### 线程的六种状态

> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260624210803135.png" alt="image-20260624210803135" style="zoom:50%;" />
>
> tip：运行状态实际不存在，为了方便理解加上的



### 线程池

> - 原先的多线程弊端
>
>   1. 用到线程时就创建
>   2. 用完之后线程就释放
>
>   如此一次次的创建和释放的过程太浪费操作系统的资源了
>
>  
>
> - 线程池概念
>
>   创建一个容器用于存放线程，实现**线程的复用**
>
>   
>
> - **线程池核心逻辑**
>
>   1. 创建一个池子，初始状态为空
>   2. 提交任务时池子创建线程对象去执行任务，任务执行完毕，线程归还给池子。下回再提交任务时可以直接复用
>   3. 池子可以设置线程上限，当提交任务池子中无空闲线程时。
>      1. 若线程未达上限则创建线程执行任务
>      2. 若达上限，则任务进入排队等待
>
>  
>
> - Java实现
>
>   在Java中有现成的**线程池服务**对象。直接使用即可
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260625091942783.png" alt="image-20260625091942783" style="zoom:100%;" />
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260625092733051.png" alt="image-20260625092733051" style="zoom:50%;" /> 



#### 自定义线程池

> - 上述方法是已经封装好的服务，若想要更灵活地使用线程池，可以自己写
>
>  
>
> - ThreadPoolExecutor — 线程池
>
>   创建线程池对象需要传递**7个参数**
>
>    ```java
>    ThreadPoolExecutor(int corePoolSize, int maximumPoolSize, long keepAliveTime, TimeUnit unit, BlockingQueue<Runnable> workQueue, ThreadFactory threadFactory, RejectedExecutionHandler handler)
>    ```
>
>   
>
>   1. int corePoolSize：核心线程数量
>
>      
>
>   2. int maximumPoolSize：池子最大容量
>
>      
>
>   3. long keepAliveTime：空闲时间（值）。tip：核心线程不能被销毁，但是**临时线程**可以。此参数用于控制临时线程销毁时机。当池子空闲到一定时间时，就会**销毁临时线程**
>
>      
>
>   4. TimeUnit unit：空闲时间（单位），配合3使用，ms、s
>
>      
>
>   5. BlockingQueue<Runnable> workQueue：阻塞队列，将任务放入队列中进行排队
>
>      
>
>   6. ThreadFactory threadFactory：线程工厂  ———  创建线程的方式
>
>      
>
>   7. RejectedExecutionHandler handler：排队任务过多时的**拒绝策略**
>
>   
>
>   - 补充：临时线程的创建时机与拒绝策略触发时机
>
>     假设核心线程数=3  、 临时线程数=3  、 阻塞队列长度=3
>
>     1. 提交5个任务
>
>        3个被核心线程处理，2个进入排队，不创建临时线程
>
>     
>
> 2. 提交8个任务
>                
>    3个被核心线程处理，3个进入排队，由于**任务队列满了**，所以再**创建2个临时线程**处理剩下的两个任务
>
>      
>
> 3. 提交10个任务
>                
>    3个核心、3个排队、3个临时， 剩下1个触发拒绝策略
>                
>    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260625094711782.png" alt="image-20260625094711782" style="zoom:100%;" />
>
>  
>
> - 实现
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260625095859937.png" alt="image-20260625095859937" style="zoom: 33%;" />
>
>  
>
> - 线程池多大合适？
>   - CPU密集型运算：最大并行数+1
>   - I/O密集型运算：最大并行数 * 期望CPU利用率 * ((CPU计算时间+等待时间)/等待时间)

---

## 网络编程

### 概念

> - 在网络通信协议下，不同计算机上运行的程序，进行数据传输。涉及到Java中的java.net包
>
>  
>
> - 软件架构
>   - BS：Browser/Server  浏览器/服务器
>     - 优：不需要开发客户端，只需页面+服务端    用户无需下载
>     - 缺：若应用过大，用户体验受影响
>   - CS：Client/Server  客户端/服务器
>     - 优：画面精美、用户体验好
>     - 缺：需要开发客户端和服务端，用户下载更新太麻烦
>
>  
>
> - 三要素
>   1. IP:设备的标识
>   2. 端口号：应用程序的标识
>   3. 传输协议：数据传输协议  UDP\TCP\http\https\ftp



### InetAddress

> - Java中表示IP的类
>
>   有两个直接子类 一个为IPV4、一个为IPV6。不对外提供构造方法，需要使用静态方法getByName()、getHostName()获取，调用此静态方法时会自动识别设备是IPV4还是6并返回对应子类
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260625102757007.png" alt="image-20260625102757007" style="zoom:100%;" />



### 协议

> - UDP
>
>   面向**无连接**的协议，速度快，有大小限制（一次最多64KB），数据不安全，易丢失
>
> - TCP
>
>   面向**连接**的协议，速度慢，无大小限制，数据安全

#### UDP通信程序

##### 单播

> - UDP发送数据
>
>   1. 创建DatagramSocket对象用于发送UDP协议
>
>      空参构造：从可用端口号中随机一个可用的使用
>
>      有参构造：指定端口号
>
>   2. 数据打包（DatagramPacket）
>
>    
>
>   3. 发送数据
>
>    
>
>   4. 释放资源
>
>   ```java
>   import java.io.IOException;
>   import java.net.*;
>   
>   public class Mysocketnet {
>       static void main(String[] args) throws IOException {
>   
>           DatagramSocket ds = new DatagramSocket();
>   
>           String data = "Hello World!";
>           byte[] buf = data.getBytes();
>           //打包数据，填写需要发送的数据，以及需要发送至哪台主机的哪个端口
>           DatagramPacket dp = new DatagramPacket(buf, buf.length, InetAddress.getByName("127.0.0.1"), 65535);
>   
>           //发送
>           ds.send(dp);
>   
>           //释放资源
>           ds.close();
>       }
>   }
>   ```
>
>  
>
> - UDP接收数据
>
>   1. 创建DatagramSocket对象用于接收
>
>    
>
>   2. 接收打包好的数据(DatagramPacket)
>
>    
>
>   3. 解析数据包
>
>    
>
>   4. 释放资源
>
> ```java
> import java.io.IOException;
> import java.net.DatagramPacket;
> import java.net.DatagramSocket;
> 
> public class Mysocketnet_receive {
>     static void main(String[] args) throws IOException {
>         //接收时一定要绑定端口号，且要和发送端口号一致
>         DatagramSocket ds = new DatagramSocket(65535);
> 
>         //接收数据包
>         byte[] buf = new byte[1024];
>         DatagramPacket dp = new DatagramPacket(buf, buf.length);
>         //该方法是阻塞的，即：运行到receive时会一直等数据
>         ds.receive(dp);
> 
>         //解析数据包
>         byte[] data = dp.getData();
>         System.out.println(new String(data, 0, dp.getLength()));
>         System.out.println(dp.getAddress());
> 
>         //释放资源
>         ds.close();
> 
> 
>     }
> }
> 
> ```
>
> 



##### 组播

> - 组播地址：224.0.0.0~239.255.255.255  
>
>    其中224.0.0.0~224.0.0.255为预留组播地址
>
>  
>
> - 组播对象：**MulticastSocket**
>
>  
>
> - 发送端
>
>   ```java
>   import java.io.IOException;
>   import java.net.*;
>   import java.util.Scanner;
>               
>   public class Mysocketnet_send {
>       static void main(String[] args) throws IOException {
>           MulticastSocket socket = new MulticastSocket();
>               
>           String s = "Hello World";
>           byte[] buf = s.getBytes();
>           DatagramPacket packet = new DatagramPacket(buf,buf.length,InetAddress.getByName("239.0.0.10"), 10086);
>               
>           socket.send(packet);
>           socket.close();
>       }
>   }
>   ```
>
>  
>
> - 接收端
>
>   ```java
>   import java.io.IOException;
>   import java.net.DatagramPacket;
>   import java.net.DatagramSocket;
>   import java.net.InetAddress;
>   import java.net.MulticastSocket;
>               
>   public class Mysocketnet_receive {
>       static void main(String[] args) throws IOException {
>               
>           MulticastSocket socket = new MulticastSocket(10086);
>           //需要将接收端加入该组
>           socket.joinGroup(InetAddress.getByName("239.0.0.10"));
>               
>           DatagramPacket packet = new DatagramPacket(new byte[1024], 1024);
>           socket.receive(packet);
>           byte[] data = packet.getData();
>           String message = new String(data, 0, packet.getLength());
>           System.out.println(message);
>               
>           socket.close();
>               
>       }
>   }
>   ```
>
>   



##### 广播

> - 广播地址：255.255.255.255
>
> 广播的代码与单播一致，只不过地址改为了255.255.255.255



#### TCP通信程序

> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260625112002713.png" alt="image-20260625112002713" style="zoom:50%;" />
>
>  
>
> - 步骤
>
>   - 客户端
>
>     1. 创建**Socket对象**与指定服务器连接
>
>        Socket(String  host,int port)
>
>     2. 获取输出流，写数据
>
>        OutputStream getOutputStream()
>
>     3. 释放资源
>
>     ```java
>     import java.io.IOException;
>     import java.io.OutputStream;
>     import java.net.Socket;
>     
>     
>     public class Mysocketnet_client {
>         static void main(String[] args) throws IOException {
>             Socket socket = new Socket("127.0.0.1", 10000);
>                             
>             OutputStream os = socket.getOutputStream();
>             os.write("Hello World".getBytes());
>                             
>             os.close();
>             socket.close();
>                             
>         }
>     }
>     ```
>
>     
>
>   - 服务器
>
>     1. 创建**服务端Socket对象** （ServerSocket）
>
>        ServerSoket(int port)
>
>     2. 监听客户端连接，返回一个Socket对象
>
>        Socket accept()
>
>     3. 获取输入流，读数据
>
>        InputStream getInputStream()
>
>     4. 释放资源
>
>     ```java
>     import java.io.IOException;
>     import java.io.InputStream;
>     import java.net.ServerSocket;
>     import java.net.Socket;
>                             
>     public class Mysocketnet_server {
>         static void main(String[] args) throws IOException {
>             ServerSocket ss = new ServerSocket(10000);
>             Socket socket = ss.accept();
>                             
>             InputStream is = socket.getInputStream();
>             //此处可以使用转换流防止中文乱码
>             int b;
>             while ((b = is.read()) != -1) {
>                 System.out.print((char) b);
>             }
>             is.close();
>             socket.close();
>             ss.close();
>                             
>         }
>     }
>     ```

###### 三握四挥

> - 三次握手
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260625113817335.png" alt="image-20260625113817335" style="zoom: 50%;" /> 
>
> - 四次挥手
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260625113836967.png" alt="image-20260625113836967" style="zoom:50%;" /> 

---

## 反射

### 概念

> - 反射允许对封装类的成员变量、成员方法、构造方法的信息进行编程访问
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260625122710396.png" alt="image-20260625122710396" style="zoom:50%;" />



### 获取

#### 获取class对象 

> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260625122855852.png" alt="image-20260625122855852" style="zoom:50%;" />
>
> 1. Class.forName(“全类名”);   源代码阶段
>
>    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260625123335858.png" alt="image-20260625123335858" style="zoom:50%;" />
>
> 2. 类名.class   加载阶段
>
>    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260625123529162.png" alt="image-20260625123529162" style="zoom:100%;" />
>
> 3. 对象.getClass();   运行阶段
>
>    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260625123536376.png" alt="image-20260625123536376" style="zoom:100%;" />
>
> 三者完全一致
>
> 



#### 构造方法反射

> - 用**Constructor进行接收**
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260625123728970.png" alt="image-20260625123728970" style="zoom:50%;" />
>
>  
>
> - 获取构造方法
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260625124310792.png" alt="image-20260625124310792" style="zoom:50%;" />
>
>  
>
> - 利用反射获取到的构造方法创建对象
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260625124846908.png" alt="image-20260625124846908" style="zoom:100%;" />
>
>   若获取到了private修饰的构造方法，可以使用setAccessible(true);强制使其可以被访问 ———  暴力反射



#### 成员变量反射

> - **用Field进行接收**
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260625125011756.png" alt="image-20260625125011756" style="zoom:50%;" /> 
>
> 
>
> - 获取成员变量
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260625125219576.png" alt="image-20260625125219576" style="zoom:50%;" /> 
>
>  
>
> - 利用反射修改变量记录的值
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260625125559464.png" alt="image-20260625125559464" style="zoom:50%;" />



#### 成员方法的反射

> - **用method进行接收**
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260625125648513.png" alt="image-20260625125648513" style="zoom:50%;" /> 
>
>  
>
> - 获取成员方法
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260625125850340.png" alt="image-20260625125850340" style="zoom:50%;" /> 
>
>  
>
> - 利用反射运行成员方法
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260625130421550.png" alt="image-20260625130421550" style="zoom:50%;" />



### 作用

> 1. 获取一个类中所有的信息后再执行其他业务逻辑
> 2. 结合配置文件，动态创建对象并调用其中的方法

---

## 动态代理

#### 概念

> - 需要修改某个方法时，原先都是直接在方法体中进行修改，这样的修改被称为侵入式修改。 而**动态代理**可以**无侵入式地**为代码**增加功能** 
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260625152424656.png" alt="image-20260625152424656" style="zoom:50%;" />
>
>  
>
> - 为什么需要代理？
>
>   对象如果嫌身上干的事太多，可以通过代理转义部分职责。对象有什么方法想要被代理，代理就一定要有相应方法。



#### 实现

> - 对象与代理需要实现同一个接口，接口中写着被代理的所有方法（抽象方法）
>
>  
>
> - 在reflect包下有一个Proxy类：提供了为对象产生代理对象的方法
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260625153048427.png" alt="image-20260625153048427" style="zoom:100%;" />
>
>   ​			参数一类加载器用于加载类，一般会写`当前类.class.getClassLoader()`,作用是：找到当前类的类加载器作为此方法的第一个参数，传入后会**调用该加载器去加载当前创建的代理类**
>
>   
>
>   ​			参数二传递接口，接口中存放着需要代理的方法
>
>   
>
>   ​			参数三用匿名内部类实现，里面需要写入代理类需要干的事情，即：为被代理类新增的功能+调用被代理对象的相应方法（反射实现）
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260625154012198.png" alt="image-20260625154012198" style="zoom:50%;" />
>
>  
>
> - 实现代理后只需用代理去调用被代理对象的方法即可。
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260625154202931.png" alt="image-20260625154202931" style="zoom: 80%;" /> 





