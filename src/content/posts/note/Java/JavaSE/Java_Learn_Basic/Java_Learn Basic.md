---

title: JavaSE_Basic

published: 2026-08-08

description: JavaSE

tags: [JavaSE]

category: JavaSE

draft: false

---

# Java_Learn Basic

## JDK JRE JVM

### JDK 是什么？有哪些内容组成？

> JDK 是 Java **开发工具包**  包含以下三部分
>
> 1. **JVM 虚拟机：Java 程序运行的地方（Java程序跨平台的关键）** 
>
> 2. 核心类库：Java 已经写好的东西，我们可以直接用。 
>
> 3. 开发工具：javac、java、jdb、jhat…  

### JRE 是什么？有哪些内容组成？ 

> JRE 是 Java **运行环境** 
>
> - 包含了：JVM、核心类库、运行工具  
>- 其中只是把开发工具中供程序运行的部分挑出来了 其他并无变动

---



## 基础语法

### 琐碎知识

#### main方法

> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260605200024062.png" alt="image-20260605200024062" style="zoom:100%;" />

#### 关键字

> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260605202023737.png" alt="image-20260605202023737" style="zoom:50%;" />

##### class关键字

> class:用于创建一个类，类是Java面向对象的基本组成单元



#### 字面量

> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260605203251376.png" alt="image-20260605203251376" style="zoom:50%;" />
>
> 除此之外还有一些**转义字符**
>
> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260605203415029.png" alt="image-20260605203415029" style="zoom:50%;" /> 字符串可直接拼接



#### 变量

> - 变量定义
>
>   数据类型  变量名  =  数值
>
> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260605203803815.png" alt="image-20260605203803815" style="zoom:50%;" />
>
> 不同于C的随机初始值  Java的变量**必须要赋值才可使用**



#### 数据存储

> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260605204337362.png" alt="image-20260605204337362" style="zoom:50%;" />
>
> - 整型存储：二进制存储
>
> - 字符存储
>
>   - 英文：ASCII码表
>   - 汉字：<img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260605210429838.png" alt="image-20260605210429838" style="zoom:50%;" />
>
> - 浮点数存储
>
>   IEEE发布的存储规则，划定不同位的存储内容 详见C语言
>
> - 图片存储
>
>   像素存储，其中
>
>   - 黑白图可视为0/1
>   - 灰度图以0~255表示颜色由黑到灰到白
>   - 彩图以R/G/B三原色表示，其中每个原色的范围是0~255
>
> - 声音存储
>
>   离散采样声波波形图，同样以二进制表示
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260605211039040.png" alt="image-20260605211039040" style="zoom:50%;" />



#### 数据类型、标识符、键盘录入

##### 数据类型

> | 数据类型   | 关键字      | 取值范围                                              | 内存占用 (字节) |
> | ---------- | ----------- | ----------------------------------------------------- | --------------- |
> | **整数**   | **byte**    | -128~127                                              | 1               |
> |            | short       | -32768~32767                                          | 2               |
> |            | int         | -2147483648~2147483647（10 位数）                     | 4               |
> |            | long        | -9223372036854775808 ~ 9223372036854775807（19 位数） | 8               |
> | **浮点数** | float       | -3.401298e-38 到 3.402823e+38                         | 4               |
> |            | double      | -4.9000000e-324 到 1.797693e+308                      | 8               |
> | **字符**   | char        | 0~65535                                               | 2               |
> | **布尔**   | **boolean** | true，false                                           | 1               |
>
> - 注意1：**byte与boolean**（C中没有）
>
> - 注意2：**byte**的空间占用与**C中的char一样**为1字节，且Java中的char占用的是**两字节** 且是**无符号的（非负）**
>
> - 注意3：Java中的long等同于C中long long，**但是在Java中定义long类型的数据强制在数据后加上L用以标识。否则默认为int**   tip：C中规范写法也应标识，但一般不用  原因：C中的long变量不加L也默认为int  **但若超过范围会自动进行类型转换，但Java中不行**
>
>    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260605212444407.png" alt="image-20260605212444407"  />
>
>   **相似的浮点型float赋值后必须加F  不然默认为double**
>
>    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260605212609050.png" alt="image-20260605212609050" />
>
> - 注意4：Java中**没有unsigned关键字**用以定义无符号的数据类型
>
> - 注意5：Java中封装有String类型存储字符串
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260605212935845.png" alt="image-20260605212935845" style="zoom:80%;" />



##### 标识符起名规范

> - 硬性规定：同C
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260605213352455.png" alt="image-20260605213352455" style="zoom:50%;" />
>
> - 软性建议
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260605213504126.png" alt="image-20260605213504126" style="zoom:50%;" />



##### 键盘录入

> - Scanner类
>
>   1. 导包(引入头文件) — Scanner类在哪
>
>      ```java
>      import java.util.Scanner
>      ```
>
>   2. 创建对象
>
>      ```java
>      Scanner sc = new Scanner(System.in);
>      //Scanner是一个类，以这个类创建一个对象用于接收
>      ```
>
>   3. 接收数据
>
>      ```java
>      int i = sc.nextInt;//next后的数据类型根据创建的数据类型而定
>      ```
>
>   ​         <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260605214343470.png" alt="image-20260605214343470" style="zoom:50%;" />
>   
> - 键盘录入:
>
>   - 第一套体系:
>
>     nextInt ();
>
>     nextDouble ();
>
>     next ();
>
>     遇到空格，制表符，回车就停止接受。这些符号后面的数据就不会接受了
>
>   - 第二套体系:
>
>     nextLine ();  一整行录入



#### Random类

> ```java
> import java.util.Random //导包
> Random r = new Random();//创建对象
> int num = r.nextInt(随机数的范围);//使用	//例如： int num = r.nextInt(101); 表示0~100随机数
> ```
>
> 

#### IDEA

> - 项目格式
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260606103922549.png" alt="image-20260606103922549" style="zoom: 80%;" />
>
> - IDEA的自动补全
>
>   ```java
>   psvma  --> public static void main(String[] args){}
>   ```
>
>   ```java
>   sout --> System.out.println("");
>   ```
>
> - 格式化代码格式快捷键
>
>   ctrl+alt+l

---



### 运算符

#### 算术

> 加、减、乘、除、取模
>
> - 注意1：**小数**的的运算会因为存储规则而导致**不精确**
>
> - 注意2：运算时注意数据类型**类型转换**
>
>   Java中对类型有着**严格要求**，除了要遵守隐式类型转换外，运算后的结果也需赋值给相应类型。
>
>   Java中的**byte、shrot、char** 在进行运算时会**自动转换为int**
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260606105940462.png" alt="image-20260606105940462" style="zoom: 80%;" />  <img src="../../../../AppData/Roaming/Typora/typora-user-images/image-20260606105957175.png" alt="image-20260606105957175" style="zoom: 80%;" />
>
>   **如上图所示，两个byte相加会进行类型转换，必须以int类型接收**
>
>   如需**以byte类型接收** 则需**强制类型转换**
>
> - 注意3：Java中支持字符串的拼接
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260606110440062.png" alt="image-20260606110440062" style="zoom:80%;" />
>
>   注意：多个+出现时从左到右依次计算



#### 自增自减

> 注意**前置后置**的区别



#### 赋值

> = += /= *= %= -=



#### 关系运算符

> ==  !=  >  <  >=  <=



#### 逻辑运算符

> | 符号 | 作用         | 说明                         |
> | ---- | ------------ | ---------------------------- |
> | &    | 逻辑与（且） | 并且，两边都为真，结果才是真 |
> | \|   | 逻辑或       | 或者，两边都为假，结果才是假 |
> | ^    | 逻辑异或     | 相同为 false，不同为 true    |
> | !    | 逻辑非       | 取反                         |
>
> - 其实Java的上述四个运算符同样具有**位运算**的功能，但是不同于C，Java中的这四个位运算符**同时具有逻辑判断的功能**
>
>   & 与 &&的区别 （|同样适用）
>
>   &为非短路与 而 &&为短路与
>
>   ```java
>   false & (++i>0);  //非短路与，最终结果仍为false ， 但是 ++i>0仍会执行
>   false && (++i>0);  //短路与，识别到有false后 后面的都不执行 ++i>0不执行
>   ```
>
>   相对之下**短路运算符**效率高 tip：短路关系运算符和C中一样



#### 三元运算符

> 表达式1?表达式1：表达式2
>
> 同C  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260606113254966.png" alt="image-20260606113254966" style="zoom:50%;" />



#### 位运算符

> & | ^ ! >> <<

---

### 流程控制

##### 分支结构

###### if

> 同C

###### switch

> - 用法同C
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260606115943418.png" alt="image-20260606115943418" style="zoom:50%;" />
>
> - 特殊之处
>
>   - C中的case后的值只支持int、char
>
>     而Java中<img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260606120139300.png" alt="image-20260606120139300" style="zoom:50%;" />
>
>   - Java中可以用case x ->{}简化
>
>     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260606120539579.png" alt="image-20260606120539579" style="zoom:50%;" />
>
>     如此写的效果与原版break效果一致



#### 循环结构

##### for循环

> 同C
>
> - 特殊之处
>
>   独有for-each遍历
>
>   ```java
>   int[] arr={1,2,3};
>   for(int x:arr){
>       //语句体；
>   }
>   ```
>
>   

##### while循环

> 同C

##### do while 循环

> 同C

---

### 数组

#### 数组的定义

> 1. 数据类型 [] 数组名  **更加规范**
>
>    如：int [] arr
>
> 2. 数据类型 数组名[]
>
>    如：int arr[]

#### 初始化

> - 静态初始化
>
>   - 完整格式
>
>     数据类型[] 数组名 = new 数据类型[]{元素1，元素2…}
>
>   - 简化格式
>
>     数据类型[] 数组名 = {元素1，元素2…};
>
>   ```java
>   int [] arr = new int[] {1,2,3,4};
>   ```
>
>   - 数组的地址
>
>     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260606125240472.png" alt="image-20260606125240472" style="zoom:50%;" />
>
>     ’[‘表示是一个数组  D表示数据类型是double  @是一个间隔符号  @后为地址的十六进制表示
>
> - 动态初始化
>
>   数据类型[] 数组名 = new 数据类型[数组长度]；
>
>   ```java
>   int[] arr = new int[3];
>   ```
>
> - 各数据类型数组的默认初始值 （由**虚拟机JVM给出**）
>
>   整数类型：默认初始化值0 
>
>   小数类型：默认初始化值0.0 
>
>   字符类型：默认初始化值'\u0000' 空格 
>
>   布尔类型：默认初始化值 false 
>
>   引用数据类型：默认初始化值 null



#### 引用和赋值

> 数组名[i]  同C



#### 数组遍历的一些新颖形式

> 1. ```java
>    for(int i = 0;i<arr.length;i++){
>                                                                                
>    }
>    ```
>
>    在IDEA中同样有快捷方式
>
>    ```java
>    数组名.fori
>        //如
>        arr.fori
>    ```
>
>    
>
> 2. ```java
>    for(数据类型 i:arr){
>        System.out.println(i);
>    }//i的数据类型需要和arr中类型一致
>    ```
>
>    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260606130024289.png" alt="image-20260606130024289" style="zoom: 50%;" />



#### 数组内存图

> - Java内存分配
>
>   - 栈
>
>     方法运行时使用的内存，比如main方法运行，进入方法栈中执行
>
>   - 堆
>
>     存储对象或数组，new来创建，都存储在堆内存
>
>   - 方法区
>
>     存储可运行的class文件
>
>     - TIP：JDK7及以前方法区和堆是连在一起的，是一块连续的内存空间   JDK8开始取消了方法区，新增了元空间。将方法区的功能进行拆分，有的在元空间中 有的在堆中
>
>   - 本地方法栈
>
>     JVM在使用操作系统功能时使用，与开发无关
>
>   - 寄存器
>
>     给CPU使用，与开发无关
>
> - 数组内存
>
>   不同于C中数组在堆栈中均可开辟空间，**Java中的数组都存储在堆空间中**（所以Java数组初始化的语法一定会有**new**）
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260606131949278.png" alt="image-20260606131949278" style="zoom:50%;" />
>
>   如上图，在栈空间中定义arr 其值为数组在堆空间中的**地址** 引用数组元素时用地址找



#### 二位数组

> - 初始化
>
>   ```java
>   int [][]arr = new int[][]{{11.22},{33,44}};
>   int [][]arr = new int[m][n];//第一个m必须写 n可以不写 和C刚好相反   扩展到多位数组，Java中依旧是只写第一个即可
>   ```
>
>   TIP：虽然动态初始化必须写第一个[]内的内容  但是当多维数组**在方法中传递时一个[]都不用写**
>
> - 内存图
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260607122425215.png" alt="image-20260607122425215" style="zoom:50%;" />

---

### 方法

#### 概念

> 程序中最小的执行单元，类似C/Cpp中的函数。
>
> 用于提高代码的复用性和可维护性


#### 格式

##### 方法定义与调用

> - 定义
>
>   ```java
>   public static 返回值类型 方法名(参数){
>       ...//方法体
>       return 返回值
>   }
>   ```
>
> - 调用
>
>   ```java
>   返回值类型 返回值变量 = 方法名(参数);
>   ```
>
> - 示例
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260607112322176.png" alt="image-20260607112322176" style="zoom:50%;" />![ima<img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260607112747165.png" alt="image-20260607112747165" /><img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260607112747165.png" alt="image-20260607112747165" />
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260607112803370.png" alt="image-20260607112803370" style="zoom:50%;" />



 ##### 方法的重载

> 同Cpp中的重载，**即：同一个类中可以定义多个同名方法，但是每个方法要具有不同的参数类型或参数个数**
>
> - 注意1：方法的重载与返回值无关
> - 注意2：参数不同：个数不同、类型不同、顺序不同



##### 方法的内存

> - 方法基本内存原理
>
>   方法被调用后会**入栈**，调用结束后**出栈**
>
> - 方法的基本数据类型和引用数据类型
>
>   与C中的值传递和址传递相同。引用数据类型传输的是地址，基本数据类型是值传递，只是复制了一份数据本体传入方法

---

## 面向对象_基础

### 设计对象并使用

#### 类和对象

> - 类：对象共同特征（设计图）的描述
>
>   - 类的定义
>
>     ```java
>     public class 类名{
>         1.成员变量
>         2.成员方法
>         3.构造器
>         4.代码块
>         5.内部类
>     }
>     ```
>
>     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260607125238110.png" alt="image-20260607125238110" style="zoom:50%;" />
>
>     成员变量的完整定义格式是：修饰符 数据类型 变量名 = 初始值； 一般无需指定初始值，存在默认值
>
> - 对象：真实存在的具体的对象
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260607125437207.png" alt="image-20260607125437207" style="zoom:50%;" />
>
> - Java中 必须先设计类，才能获得对象
>
> - 用来描述一类事物的类，专业叫做：**Javabean 类**。
>
>   在 Javabean 类中，是不写 main 方法的。
>
> - 在以前，编写 main 方法的类，叫做**测试类**。
>
>   我们可以在测试类中创建 javabean 类的对象并进行赋值调用。
>
> - 一个代码文件中可以定义多个类，但只有一个是pubic修饰的，且public修饰的要与文件名相同，实际开发中建议一个Java文件中定义一个class类



##### 开发中的类

> - 类中的成员变量可以视为名词**属性**。成员方法可以视为动词**行为**
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260607130327864.png" alt="image-20260607130327864" style="zoom:50%;" />
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260607130422047.png" alt="image-20260607130422047" style="zoom:50%;" />



### 封装

> 面向对象的**三大特征之一**，告诉我们**如何正确设计对象的属性和方法**
>
> - **对象代表什么。就得封装对应的数据，并提供数据对应的行为**
>
>   如：人画圆，画圆这个行为应当封装到圆这个类之中，而不是封装到人中。原因：画圆要知道圆的半径等有关圆的属性，所以要封装到圆类中

#### private关键词

> - private修饰的成员只能在类中被访问
>
>   可以对private修饰的成员变量构建一个成员方法接口对外提供，在方法中对数据范围进行判断
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260607131827552.png" alt="image-20260607131827552" style="zoom:50%;" />
>
>   如此可以确保数据的安全性，防止非法数据传入



### 就近原则和this指针

> - 主要用于解决类中成员变量和方法的局部变量重名问题
>
>   - 就近原则
>
>     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260607132230659.png" alt="image-20260607132230659" style="zoom:50%;" />
>
>   - this指针
>
>     <img src="../../../../AppData/Roaming/Typora/typora-user-images/image-20260607132349722.png" alt="image-20260607132349722" style="zoom: 50%;" />   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260607133534625.png" alt="image-20260607133534625" style="zoom:50%;" />
>
>     用this.作为前缀
>
>   - this指针的本质：this指向**方法调用者**的地址
>
>     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260607141256978.png" alt="image-20260607141256978" style="zoom:50%;" />



### 构造方法

> - 也称构造器、构造函数，**用于创建对象时给成员变量赋初始值**   类似Cpp中的构造函数
>
> - 格式
>
>   ```jva
>   修饰符 类名(参数){
>   	方法体;
>   }
>   ```
>
>   - 注意1：构造方法名即为类名
>
>   - 注意2：构造方法无返回值也无返回类型
>
>   - 注意3：同Cpp，Java中JVM虚拟机会自动提供一个空参构造方法，有参构造需要自己写。而当我们写了有参构造后JVM不会再提供空参构造  **所以实际开发中一般两个都写**   有时不知道初始值先使用空参构造，后续再用上述提供接口赋值成员变量
>
>        <img src="../../../../AppData/Roaming/Typora/typora-user-images/image-20260607132953577.png" alt="image-20260607132953577" style="zoom: 80%;"   /><img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260607133603019.png" alt="image-20260607133603019" style="zoom:50%;" />



### :star:标准的Javabean类书写规范

> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260607133912048.png" alt="image-20260607133912048" style="zoom:80%;" />
>
> - 示例
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260607134847720.png" alt="image-20260607134847720" style="zoom:33%;" /> 
>
>   :star:IDEA中可以用 ALT+insert快捷键直接生成标准JavaBean  或使用ptg插件直接生成



### 对象内存图

> - 一个对象的内存图
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260607140051455.png" alt="image-20260607140051455" style="zoom:50%;" />  创建对象的七步
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260607140304583.png" alt="image-20260607140304583" style="zoom:50%;" />
>
> - 两个对象的内存图
>
>   同一个对象的流程，唯一不同的是由于创建第一个对象时方法区已经加载了class文件，所以第二次不用再加载

---

## API和API帮助文档

>  **API** (**A**pplication **P**rogramming **I**nterface)：应用程序编程接口   **简单理解**：API就是别人已经写好的东西，我们不需要自己编写，直接使用即可。
>
> - API帮助文档
>
>   https://www.runoob.com/manual/jdk11api/index.html

---

## 字符串

### String

#### 概述

> - Java定义好的类，定义在java.lang包中，所以使用时不需要导包
>
> - Java中所有字符串文字都被视为此类的对象
>
> - 字符串不可变，它们的值在创建后不可更改
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260607181922729.png" alt="image-20260607181922729" style="zoom:50%;" />



#### String的创建

> 1. 直接赋值
>
>    ```java
>    String name = "abc"
>    ```
>
> 2. new
>
>    | 构造方法                         | 说明                             |
>    | -------------------------------- | -------------------------------- |
>    | `public String()`                | 创建空白字符串，不含任何内容     |
>    | `public String(String original)` | 根据传入的字符串，创建字符串对象 |
>    | `public String(char[] chs)`      | 根据字符数组，创建字符串对象     |
>    | `public String(byte[] chs)`      | 根据字节数组，创建字符串对象     |
>
>    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260607183123974.png" alt="image-20260607183123974" style="zoom:50%;" />



#### String内存分析

> - String Table 串池
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260607183313241.png" alt="image-20260607183313241" style="zoom:50%;" />
>
> 1. 直接赋值创建String
>
>    直接赋值的字符串会创建在串池中
>
>    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260607183441132.png" alt="image-20260607183441132" style="zoom:50%;" />
>
>    此时的String作为**字符串常量**，若已经存在不会创建新的，String对象所存储的是其**地址值**
>
> 2. new创建String
>
>    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260607183631266.png" alt="image-20260607183631266" style="zoom:50%;" />
>
>    这种情况的字符串**不会复用**



#### String比较

> 1. ==比较
>
>    这种比较方式比较的是**地址的值（字符串对象存储的都是地址值）**。可以用于直接赋值法创建的字符串，因为串池中的**字符串常量地址是唯一的**、可复用。但是对于new出来的字符串，就算其内容相同，其地址也不相同
>
>    - **Scanner录入的字符串也是通过new出来的**
>
>      <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260607184659636.png" alt="image-20260607184659636" style="zoom:50%;" /> 输入abc结果为false
>
>      **next源码阅读（IDEA鼠标置于next 快捷键ctrl+b）**
>
> 2. 利用API比较
>
>    1. boolean equals（完全一致）
>    2. boolean equalsIgnoreCase(忽略大小写)
>
>    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260607184251652.png" alt="image-20260607184251652" style="zoom:50%;" />



#### charAt API

> - public char **charAt**(int index)
>
>   可根据索引返回字符串中对应字符
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260608095954202.png" alt="image-20260608095954202" style="zoom:50%;" />



#### 一些练习

> - 数组转字符串方法
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260608101808005.png" alt="image-20260608101808005" style="zoom: 43%;" />
>
> - 金额转换
>
>   - 效果
>
>     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260608102312960.png" alt="image-20260608102312960" style="zoom:50%;" />
>
>   - 思路
>
>     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260608102351382.png" alt="image-20260608102351382" style="zoom:50%;" />
>
>   - 代码
>
>     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260608104159670.png" alt="image-20260608104159670" style="zoom:50%;" />



#### substring API

> - String substring(int beginIndex,int endIndex)  截取字符串 tip:**范围左闭右开**
>
>   - 注意：若无endIndex则截取到末尾
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260608104755224.png" alt="image-20260608104755224" style="zoom:50%;" />



#### replace API

> - String replace （旧值，新值）  字符串的替换，返回值为替换后的结果
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260608105227595.png" alt="image-20260608105227595" style="zoom:50%;" />



#### toCharArray API

> - 把字符串变成字符数组
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260608120550655.png" alt="image-20260608120550655" style="zoom:50%;" />



### StringBuilder

#### 概述

> StringBuilder可以视为一个容器，创建后**里面的内容是可变的**
>
> - 作用
>
>   提高字符串操作效率
>
> - **常用于字符串拼接和反转**



#### 构造方法与成员方法

> - 构造方法
>
>   - 空参
>
>     public StringBuilder()
>
>   - 有参
>
>     public StringBuilder(String str);
>
> - 常用成员方法
>
>   | 方法名                                  | 说明                                                      |
>   | --------------------------------------- | --------------------------------------------------------- |
>   | `public StringBuilder append(任意类型)` | 添加数据，并返回对象本身                                  |
>   | `public StringBuilder reverse()`        | 反转容器中的内容                                          |
>   | `public int length()`                   | 返回长度（字符出现的个数）                                |
>   | `public String toString()`              | 通过 toString () 就可以实现把 StringBuilder 转换为 String |
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260608110111077.png" alt="image-20260608110111077" style="zoom:50%;" />



#### 链式编程思想

> - 依赖前一个方法的返回值调用其他方法
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260608110527480.png" alt="image-20260608110527480" style="zoom:50%;" />
>
>   原因：StringBuilder中append的返回还是Stringbuilder



### StringJoiner

#### 概述

> - StringJoiner也是一个容器，内部内容是可变的
> - 作用：提高字符串操作效率，代码简洁



#### 构造方法和成员方法

> - 构造方法
>
>   1. public StringJoiner(间隔符号);
>   2. public StringJoiner(间隔符号，开始符号，结束符号);
>
> - 成员方法
>
>   | 方法名                                 | 说明                                         |
>   | -------------------------------------- | -------------------------------------------- |
>   | `public StringJoiner add (添加的内容)` | 添加数据，并返回对象本身                     |
>   | `public int length()`                  | 返回长度（字符出现的个数）                   |
>   | `public String toString()`             | 返回一个字符串（该字符串就是拼接之后的结果） |
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260608112821043.png" alt="image-20260608112821043" style="zoom:50%;" />



### 字符串相关类的底层原理

#### 拼接底层原理

> 1. 拼接时无变量参与
>
>    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260608113332121.png" alt="image-20260608113332121" style="zoom:50%;" />
>
>    由于在编译阶段就对其进行了优化，**所以无变量参与这种情况的字符串是在串池中的**
>
> 2. 拼接时有变量参与
>
>    - JDK8之前会创建StringBuilder拼接
>
>      <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260608113733957.png" alt="image-20260608113733957" style="zoom: 50%;" />
>
>      tip：toString方法是通过new把StringBuilder变成String
>
>      由此可见，直接用StringBuilder不仅可以简化代码 还可以提高运行效率
>
>    - JDK8后会先**预估**最后字符串的长度，再根据最后长度创建数组，一次性拼接。但是这样仍然效率不高，**所以我们自己拼接时最好直接用StringBuilder/StringJoiner**



#### StringBuilder源码分析

> - 原理
>
>   StringBuilder默认容量为16，当**容量不够后会扩容 新的容量=2*旧容量+2**  而若是一次性加入的字符串长度比扩容后还要长 则会创建一个长度=字符串长度的数组并存入
>
> - 具体分析
>
>   [视频](https://www.bilibili.com/video/BV17F411T7Ao?spm_id_from=333.788.videopod.episodes&vd_source=d6f1919e59f384773719ad5aa3d3a0a9&p=107) 28min开始

---

## ArrayList（集合—动态数组）

### 集合概述

> - 集合是一个**长度可变**的容器，容量不够时自动扩容
> - 集合**只能存引用数据类型**，如果想要存储基本数据类型需要将其封装为**包装类**



### 构造方法

> - 空参
>
>   ArrayList(); 默认创建初始容量为10的空列表
>
> - 有参
>
>   ArrayList(int initialCapacity); 构造具有指定初始容量的列表
>
>   - tip：还有一种构造方式与迭代器有关暂不讨论
>
> - 泛型编程思想
>
>   类似于Cpp，但泛型的书写有所不同
>
>   ``` java
>   ArrayList<String> list = new ArrayList<String> ();//String为引用型变量可以存入ArrayList中 
>   //但像  ArrayList<int> list = new ArrayList<int> () 不行 因为int不是引用型变量
>                                                   
>   //JDK7后可以简写为
>   ArrayList<String> list = new ArrayList<> ()
>   ```
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260608174126134.png" alt="image-20260608174126134" style="zoom:50%;" />



### 成员方法

> - 增
>
>   | 方法名           | 说明                             |
>   | ---------------- | -------------------------------- |
>   | boolean add(E e) | 添加元素，返回值表示是否添加成功 |
>
> - 删
>
>   | 方法名              | 说明                                 |
>   | ------------------- | ------------------------------------ |
>   | boolean remove(E e) | 删除指定元素，返回值表示是否删除成功 |
>   | E remove(int index) | 删除指定索引的元素，返回被删除元素   |
>
> - 改
>
>   | 方法名               | 说明                                 |
>   | -------------------- | ------------------------------------ |
>   | E set(int index,E e) | 修改指定索引下的元素，返回原来的元素 |
>
> - 查
>
>   | 方法名           | 说明                               |
>   | ---------------- | ---------------------------------- |
>   | E get(int index) | 获取指定索引的元素                 |
>   | int size()       | 集合的长度，也就是集合中元素的个数 |
>
> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260608174822618.png" alt="image-20260608174822618" style="zoom:50%;" />



### 集合添加基本数据类型 — 包装类

> - 各基本数据类型对应的包装类
>
>   <img src="../../../../AppData/Roaming/Typora/typora-user-images/image-20260608175627721.png" alt="image-20260608175627721" style="zoom:50%;" /><img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260608175724777.png" alt="image-20260608175724777" style="zoom:50%;" />
>
>   



### 集合添加自定义类

> - 添加自定义类后直接sout打印出来的结果会是地址值
>
>   ，但是，**如果JavaBean里面有toString的成员方法，会根据这个方法打印** — [原因](#Object)
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260608180307551.png" alt="image-20260608180307551" style="zoom:50%;" />
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260608180317445.png" alt="image-20260608180317445" style="zoom:50%;" />

---

## 面向对象_进阶

### static

#### static修饰成员变量

> - static修饰成员变量—静态变量
>
>   **静态变量被所有对象共享**，推荐使用类名调用
>
>   静态变量存放在堆空间中的静态区中（JDK8后），在包含类的class文件加载到方法取后，静态区就随之出现。 **静态变量随类的加载而出现，是先于对象出现的**  
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260608204905245.png" alt="image-20260608204905245" style="zoom:50%;" />



#### static修饰成员方法

> - static修饰成员方法—静态方法
>
>   静态方法多被用于**测试类和工具类**，Javabean类中很少用到
>
>   - 工具类：可以帮助我们做一些事情，但**不描述任何事物的类**
>
>     - 要求1：类名见名知意
>     - 要求2：**私有化构造方法** — 不让外界创建对象（无意义）
>
>     - 方法全都定义为静态 –> **直接用类名调用**
>
>     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260608210459402.png" alt="image-20260608210459402" style="zoom: 43%;" />



#### static注意事项

> 1. 静态方法中，只能访问静态变量/方法。
>
>    **静态方法是随着类的加载而出现，是先于对象出现的，此时非静态变量都没在堆中开辟空间，更别提访问了**  **静态方法若能调用非静态方法，那非静态方法中的this会不知道指向谁，所以不能访问非静态变量**
>
> 2. 非静态方法可以访问所有。 
>
> 3. 静态方法中没有this关键字
>
>    原因：this**本质是指向调用者的指针**，所有对象都可以调用静态方法，这样this指针就不知道该指向谁了。并且我们调用静态的方法一般都是用**类名去调用**，所以静态方法中用this指针的意义也不大

##### 重识main方法

> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260608212115108.png" alt="image-20260608212115108" style="zoom:50%;" />
>
> - args已被Scanner取代

---

### 继承

#### 概述

> - 当封装的Javabean类过多时，难免会有许多重复的内容，可以将重复的变量/方法封装在某个大类中，创建小类时继承这些属性即可。**提高代码复用性**
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260609112741850.png" alt="image-20260609112741850" style="zoom:50%;" />
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260609112816299.png" alt="image-20260609112816299" style="zoom:50%;" />



#### 实现

> - Java中提供了**extends关键字**
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260609112903497.png" alt="image-20260609112903497" style="zoom:50%;" />
>
> - 如何设计？
>
>   - 何时会用到继承？
>
>     当类与类之间存在相同的内容时，**并满足子类是父类中的一种**，就可以考虑使用继承



#### 继承特点

> - Java中只支持单继承，不支持多继承，但支持**多层继承**
>
>   **单继承：一个子类只能继承一个父类**
>
>   tip：相较于Cpp中的支持多继承，Java中只支持单继承更加规范
>
>   - 多层继承
>
>     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260609113601172.png" alt="image-20260609113601172" style="zoom:50%;" />
>
>     - 最大祖宗类
>
>       Java中每个类都直接或间接继承于**Object类（Java提供的默认继承）**
>
>       <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260609113719310.png" alt="image-20260609113719310" style="zoom:50%;" />



#### 子类可继承的内容

> - 子类可以继承父类哪些内容？
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260609115652817.png" alt="image-20260609115652817" style="zoom:50%;" />
>
>   注意：**继承不代表可以使用**
>
> - 构造方法
>
>   由于**构造方法的方法名必须与类名相同**，所以父类的构造方法无论如何都不能被子类继承
>
> - 成员变量
>
>   不论是私有还是共有都可以继承，只不过**私有的成员变量继承下来后不能直接使用—需要根据继承下来的对应的get/set方法使用**
>
>   :star:可以理解为：成员变量会按照父类中的成员变量**原模原样的继承下来（包括private关键词）**，若是private的变量，父类Javabean中必定会有public的成员set/get方法，这个也会被继承下来，所以可以使用set/get调用
>
> - 成员方法
>
>   - 方法的继承实际上继承的是**虚方法表**
>
>     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260609121749012.png" alt="image-20260609121749012" style="zoom:50%;" />
>
>     实际上子类会把父类中的所有方法都继承下来，除此之外还会把虚方法表继承下来
>
>     虚方法表中**存储了各个虚方法的地址**，若调用虚方法，直接查表调用虚方法  
>
>     而若想要调用非虚方法时 （即：final修饰和static修饰，private修饰无法被调用）
>     
>     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260609123947716.png" alt="image-20260609123947716" style="zoom:50%;" />



#### 子类访问继承内容

> - **成员变量访问**特点 — **就近原则**
>
>    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260609163005197.png" alt="image-20260609163005197" style="zoom:50%;" />
>
>   
>
>   - this和super关键字
>
>      <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260609163501474.png" alt="image-20260609163501474" style="zoom:50%;" />
>
>   tip：super不能链式调用
>
> - **成员方法**的**访问**特点 
>
>   - 直接调用 — 就近原则
>   - super调用 — 直接访问父类
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260609163702557.png" alt="image-20260609163702557" style="zoom:50%;" />
>
>   第一个例子中的this调用和直接调用等价
>
> - **构造方法访问**特点
>
>   - 子类中的所有构造方法都是**先访问父类中的无参构造（构造方法无法继承，但可以用super访问）**，再执行自己
>
>     原因：子类初始化时可能会用到父类中的数据
>
>     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260609165451430.png" alt="image-20260609165451430" style="zoom:50%;" />
>
>     如图所示，Tedy和Harshiky这两个Dog的子类再构造时都使用了Dog的无参构造
>
>   - 如何调用父类构造方法？
>
>     子类构造的第一句一般都为：**super()**，一般JVM虚拟机会自动加上
>
>     若子类要调用父类的带参构造直接在super()的括号中传参即可 //需要自己写
>
>     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260609171044964.png" alt="image-20260609171044964" style="zoom:50%;" />
>
>     如图所示，manager继承于emoply 当写带全部参数的构造函数时，可以用super()调用employ中的构造函数用以构造继承下来的变量



#### 方法的重写

> - 即：在子类中重写一个与父类同名的方法  适用于父类方法不能满足子类需求的情况
>
> - 重写流程
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260609164026093.png" alt="image-20260609164026093" style="zoom:50%;" />
>
> - 例子
>
>   <img src="../../../../AppData/Roaming/Typora/typora-user-images/image-20260609164158688.png" alt="image-20260609164158688" style="zoom:50%;" /><img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260609164207244.png" alt="image-20260609164207244" style="zoom: 43%;" />
>
>   其中Cat继承Animal 重写了eat方法
>
> - 重写的本质 — **虚方法表的覆盖**
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260609164336301.png" alt="image-20260609164336301" style="zoom:50%;" />
>
>   上图中B先对method2进行重写  A继承后又重写method2
>
> - 重写注意事项
>
>   1. 重写方法的名称、形参列表必须与父类方法中的一致
>   2. 重写方法的**访问权限**子类必须>=父类 
>   3. 子类重写的方法的返回值类型必须<=父类
>
>   **对于2，3的建议：重写方法尽量和父类保持一致**
>
>   4. 只有被添加到虚方法表里的方法才能重写

---

### 多态

#### 概述

> 多态即对象的多种形态
>
> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260609181541686.png" alt="image-20260609181541686" style="zoom:50%;" />
>
> - 作用
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260609181655663.png" alt="image-20260609181655663" style="zoom:50%;" />
>
>   遇到此类情况，若没有多态就要写三个接口，代码冗余
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260609181907656.png" alt="image-20260609181907656" style="zoom:50%;" />
>
>   使用多态的技术，参数写的是三者共同的父类Person，如此一来三者都可以被函数正常接收。



#### 多态的实现

> - 多态的表现形式
>
>   ```java
>   父类类型 对象名称 = 子类对象
>   ```
>
> - 多态的前提
>
>   1. 有继承关系
>   2. 有父类引用指向子类对象（子类对象赋值给父类类型）
>   3. 有方法重写



#### 多态调用成员的特点

> - 变量调用
>
>   编译看左边，运行也看左边
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260609183353861.png" alt="image-20260609183353861" style="zoom: 80%;" />
>
> - 方法调用
>
>   编译看左边，运行看右边
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260609183515653.png" alt="image-20260609183515653" style="zoom:80%;" />
>
> - 理解
>
>   以Animal a = new Dog();为例
>
>   此时a的类型是Animal，所以默认都会从Animal类中去寻找
>
>   - 成员变量
>
>     子类会继承父类的所有成员变量，调用成员变量时由于a是Animal类型的 所以会直接从Animal类（父类）中寻找
>
>   - 成员方法
>
>     子类继承成员方法本质是通过虚方法表继承的，当我们在子类中对某函数进行**重写后**虚方法表会被**覆盖**，所以用的是**子类中的方法**
>
>   - 原理图
>
>     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260609184422832.png" alt="image-20260609184422832" style="zoom:50%;" />



#### 多态的优势和弊端

> - 优势
>
>   
>
>   - 多态形势下，右边对象可以实现解耦合，便于扩展和维护
>
>     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260609184624882.png" alt="image-20260609184624882" style="zoom:50%;" />
>
>   - 定义方法时，使用父类作为参数，可以接受所有子类对象，体现多态的扩展和便利
>
>     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260609184819389.png" alt="image-20260609184819389" style="zoom: 80%;" />
>
>     如图所示，StringBuilder的append方法就是对object类中的复写，如此一来借助多态所有类的数据都可以放入append()中
>
> - 弊端
>
>   多态**无法调用子类中特有的方法**
>
>   - 例子
>
>     如：有一个Animal类其子类为Dog类，Dog类中有一个特有方法为public lookinghome(){}，当Animal a = new Dog()；时，我们无法用a去调用Dog类中的lookinghome方法
>
>   - 原因：
>
>     对于方法，编译看左边运行看右边，编译时看的是父类中有无此方法，对于父类中没有的方法会直接报错
>
>   - 解决
>
>     把父类**强制转换**成子类  如:
>
>     ```java
>     Animal a = new Dog();
>     Dog d = (Dog) a;
>     //注意：不能随便转换
>     //如：Cat c = (Cat) a;   a本身时Animal/Dog 不能转换成其他类型的 会报错
>     //为防止上述情况出现，Java中提供了instanceof关键词
>     if(a instanceof Dog){ //用instanceof先进行判断
>         Dog d = (Dog) a;
>     }
>                                                                                                     
>     //Jdk14后的新特性
>     if(a instanceof Dog d); //表示先判断，若判断正确则直接强转，转换之后变量名为d
>     ```
>
>   

---

### 包和final关键词

####  包

> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260610132716362.png" alt="image-20260610132716362" style="zoom:50%;" />
>
> 真正使用某个类时，实际上是要把包名加上的（不同包中可能会有同名类） 这被称为**全类名（全限定名）**
>
> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260610132837780.png" alt="image-20260610132837780" style="zoom:50%;" />
>
> 由于这样写过于麻烦，所以可以使用import把包导入 — **导包**
>
> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260610133033724.png" alt="image-20260610133033724" style="zoom:50%;" />



#### final

> - final可用于修饰方法、类、变量
>
>   - 修饰方法
>
>     表明该方法是最终方法，**不能被重写**
>
>   - 修饰类
>
>     表明该类为最终类，**不能被继承**
>
>   - **修饰变量**
>
>     叫做常量，**只能被赋值一次且必须初始化**。类似Cpp中的const
>
>     - 取名规范
>
>       单个单词，全部大写
>
>       多个单词，全部大写，单词之间用  **_**  隔开, **tip:下划线一般用于常量的取名中**
>
>     - 细节
>
>       final修饰基本类型数据，变量存储的数据值不可发生改变
>
>       final修饰引用数据类型，变量中存储的地址值不能发生改变，但此地址指向的对象还是可以改变的
>
> - 拓展：String类的实现
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260610135614009.png" alt="image-20260610135614009" style="zoom:50%;" />
>
>   如图可见，
>
>   1. 字符串是把字符存在一个**byte [] value数组**中的，首先对这个数组进行了**final修饰**，使得**value的指向无法发生变化**。
>   2. 但如果只有final，仍可以通过如value[x]=y对字符串内容进行改变。所以又加上**private**进行修饰，**使得外界无法访问value**，如此实现了字符串内容不可变的效果
>   3. String类本身就是final修饰的，使其无法被继承，从而杜绝了通过子类重写函数修改字符串内容的情况
>   4. String类中的所有方法都遵循了不修改字符串内容的规则，即：返回一个新字符串，而不是在原有字符串基础上修改

---

### 权限修饰符和代码块

#### 权限修饰符

> - 作用：用来控制一个成员能被访问的范围，可以用于修饰成员变量、方法、构造方法、内部类
>
> - 按作用范围排序：private<空着不写（缺省/默认）<protected<public
>
>   | 修饰符    | 同一个类中 | 同一个包中其他类 | 不同包下的子类 | 不同包下的无关类 |
>   | --------- | ---------- | ---------------- | -------------- | ---------------- |
>   | private   | √          |                  |                |                  |
>   | 空着不写  | √          | √                |                |                  |
>   | protected | √          | √                | √              |                  |
>   | public    | √          | √                | √              | √                |
>
> - 使用规则
>
>   实际开发中一般只用private和public，即Javabean类中的成员变量私有，方法公开
>
>   - 特例
>
>     如果方法中的代码是**抽取其他方法中共性代码**，这个方法一般也私有。
>
>     简而言之就是为某方法提供某功能的中间方法，是不对外界提供接口的。如：**ArrayList类中的扩容方法**，当我们添加元素检测到容量不够时会调用扩容，扩容的方法是不对外界提供接口的 用private修饰



#### 代码块

> - 局部代码块（了解）
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260610141922685.png" alt="image-20260610141922685" style="zoom:50%;" />
>
>   出了代码块后变量a会立马被回收，起到节约内存的作用，现在已经用不到了
>
> - 构造代码块
>
>   ​       <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260610142142277.png" alt="image-20260610142142277" style="zoom:40%;" />
>
>   1. 构造代码块即写在成员位置的代码块
>   2. 作用：把多个构造方法中重复的代码抽取出来
>   3. 执行时机：创建对象时，优先于构造方法执行
>
>   由于写法不够灵活，已被淘汰。现在一般将构造方法中重复的部分写为另一个构造方法，在需要调用的时候用this调用
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260610142511921.png" alt="image-20260610142511921" style="zoom:50%;" />
>
> - :star:静态代码块
>
>   在构造代码块的基础上用static修饰
>
>   - 特点：**随着类的加载而加载，自动触发，只执行一次**
>   - 使用场景：在类加载的时候，做一些数据初始化
>
>   

---

### 抽象类、接口、内部类

#### 抽象类

> - 抽象方法：将**共性的行为（方法）**抽取到父类之后。 由于每一个子类执行的内容是不一样， 所以，**在父类中不能确定具体的方法体**。 该方法就可以定义为抽象方法。 
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260610144227310.png" alt="image-20260610144227310" style="zoom:50%;" />
>
>   如图，三个动物都有 “吃” 的动作，但是吃的东西各不相同，如此就可以定义一个抽象方法，具体的方法体由各子类重写
>
> -  抽象类：如果一个**类中存在抽象方法**，那么该类就**必须**声明为抽象类
>
> - 定义格式
>
>   ```java
>   public abstract 返回值类型 方法名(参数列表);//抽象方法
>   public abstract class 类名{}//抽象类
>   ```
>
> - 注意事项
>
>   1. 抽象类不能实例化**（防止抽象方法被调用）**
>   2. 抽象类中不一定有抽象方法，有抽象方法的类一定是抽象类
>   3. 抽象类可以有构造方法**（作用：创建的子类对象可以用super调用赋值）**
>   4. 抽象类的子类
>      1. 要么也是抽象类
>      2. 要么重写抽象类中的所有抽象方法
>
> - 抽象类的意义
>
>   抽象类为其子类提供了**一个模板**，当多人一起开发时，重写的代码的调用以及返回值类型更加统一



#### 接口

> - 为什么有接口？
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260610145028802.png" alt="image-20260610145028802" style="zoom: 33%;" />          
>
>   上图中，游泳只是是**部分成员的共性**，不能直接写到其父类中。但是如果在各自子类中书写又会引起格式的不统一
>
>   所以可以定义一个抽象方法的接口使得代码格式一致
>
>   **总而言之：接口不是一类事物，接口只是行为的抽象**
>
> - 接口的定义和使用
>
>   - 定义
>
>     ```java
>     public interface 接口名{}
>     ```
>
>   - 使用
>
>     接口与类之间是实现关系，用implements关键词表示
>
>     ```java
>     public class 类名 implements 接口名1.接口名2...{}
>     //接口的实现和继承不冲突
>     public class 类名 extends 父类 implements 接口1，接口2...{}
>     ```
>
>     
>
>   - 接口的子类被称为实现类，通过重写接口中的所有抽象方法实现
>
>   - 注意：接口不能实例化
>
>   - **接口很像是没有成员变量的抽象类，里面全是抽象方法，因为接口更加侧重功能的实现**
>
> - 接口中成员的特点
>
>   - 成员变量
>
>     由于接口侧重于方法的实现，所以接口中**要么没有成员变量**，要么**成员变量都是常量(final)**
>
>   - 构造方法：没有
>
>   - 成员方法
>
>     只能是抽象方法
>
>     默认修饰符：public abstract
>
> - 接口和类之间的关系
>
>   实现关系，可以单实现，也可以多实现，还可以在继承一个类的同时实现多个接口   **若多个接口中有重名的方法，那么只需要重写一次即可**
>
> - 接口与接口之间的关系
>
>   继承关系，可以单继承，**也可以多继承**
>
>   **细节：若实现类实现了最下面的子接口，那么就需要重写所有的抽象方法（最下面的子接口继承了先前所有接口的抽象方法）**

##### 接口拓展

> - JDK8后的接口新特性
>
>   - 接口中的默认方法
>
>     - JDK8后可以在接口中定义具体的方法体 — 解决接口升级后实现类需要立马新增新接口的实现的问题
>
>     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260610152441003.png" alt="image-20260610152441003" style="zoom:50%;" />
>
>     - 默认方法的定义格式
>
>       ```java
>       public default 返回值类型 方法名(参数列表){方法体}
>       ```
>
>       
>
> - 注意事项
>
>   1. 默认方法不是抽象方法，所以不强制重写。但如果要重写，重写时需要去掉default关键词	 
>
>      <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260610152858637.png" alt="image-20260610152858637"  /> 如图所示，重写时不能有default
>
>   2. public可省略，default不可省略
>
>   3. 如果实现了多个接口，多个接口中有重名的默认方法，子类就必须对此方法进行重写
>
>   - 接口中的静态方法
>
>     - 定义格式
>
>       ```java
>       public static 返回值类型 方法名(参数列表){}
>       ```
>
>     - 注意事项
>
>       - 接口中的**静态方法只能通过接口名调用**，不能通过实现类名或对象名调用
>       - public可省略，static不能
>
> - JDK9新增特性
>
>   JDK9之后支持接口中使用private修饰方法 原因：详见 [权限修饰符](#权限修饰符)中的特例部分，**本质是为了中间方法不被外界所访问 为默认方法服务**
>
>   - 定义格式
>
>     ```java
>     private 返回类型 方法名(参数列表){方法体}
>     private static 返回类型 方法名(参数列表){方法体} //为静态方法服务的中间方法
>     ```
>
>     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260610154135813.png" alt="image-20260610154135813" style="zoom: 67%;" />
>
>  
>
> - 接口的应用
>
>   可以将接口理解为**行为的抽象**，想让某个Javabean实现某些对应的行为，那么只要让其实现对应接口即可
>
>   - 接口的多态
>
>     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260610154426419.png" alt="image-20260610154426419" style="zoom:50%;" />
>
>     当实现某项方法时传入的参数为某个接口时，就可以通过多态的技术使其可以接收接口的所有实现类
>
>     **接口类型 j = new 实现类对象();**
>
> - 适配器设计模式
>
>   - 设计模式
>
>     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260610154645155.png" alt="image-20260610154645155" style="zoom:50%;" />
>
>     适配器设计模式：解决接口和接口实现类之间的各类矛盾
>
>   - 解决的具体问题
>
>     假设一个接口里有10个抽象方法，而我现在只想要实现其中一种，那这样我去重写时不可避免地要重写10个抽象方法，如此一来其他九种抽象方法都没用了，代码冗余，阅读不方便
>
>   - 具体解决思路
>
>     先写一个实现类A，A中有着接口中所有抽象方法的空实现。再写一个实现类B，用B去继承A，这样B中只要重写需要的抽象方法即可。  这个过程中**A就被称为接口适配器（XXXAdapter）**，并且由于A中都是空实现，创建A的实例没有任何意义，所以**A可以写为抽象类**   （tip： A虽然被设为了抽象类，但是里面并没有任何抽象方法 所以B继承A后只需要写自己想要重写的部分就行了）



#### 内部类

> - 类的五大成员
>
>   属性、方法、构造方法、代码块、内部类
>
> - 内部类定义
>
>   即：在类的内部再定义一个类
>
>   ```java
>   public class outer{//外部类
>       public class inner{//内部类
>
>       }
>   }
>   ```
>
> - 应用
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260611180019362.png" alt="image-20260611180019362" style="zoom:50%;" />
>
>   内部类表示的事物是外部类的一部分
>
>   内部类单独出现是没有任何意义的
>
> - 访问特点
>
>   1. 内部类可以**直接访问外部类成员**，包括**私有成员**
>   2. 外部类要访问内部类成员就必须**创建内部类的对象**
>

##### 成员内部类

>
> 1. 成员内部类
>
>    成员内部类与外部类的成员地位一致，可以被peivate\protected\public\static 等修饰
>
>    注意：**JDK16**前成员内部类中不**能定义静态变量**
>
>    - 获取成员内部类**对象**
>
>      1. 在外部类中编写方法，对外提供内部类对象
>
>         在内部类设为**private**时，提供**set、get方法**
>
>         - 注意，这样解决时的get方法是无法被内部类对象所接收的
>
>           ```java
>           Outer o = new Outer();
>           Outer.Inner oi = o.getInner(); //此时Inner是private的 是无法用Outer.引用的
>           //1.用Inner的父类接收，形成多态
>           object ob = o.getInner();
>           //2.不用变量接受，直接使用
>           System.out.println(o.getInner());
>           ```
>
> 2. 直接创建（更常用）
>
>     格式： 外部类名.内部类名 对象名 = 外部类对象.内部类对象
>            
>     示例
>            
>     ```java
>                Outer.Inner oi = new Outer().new Inner();
>     ```
> 
>     - 理解
>            
>       即：类名 变量名 = new  类名();
>            
>       但是内部类不能脱离外部类存在，所以要在内部类名前添加外部类名.
>            
>    - 内部类获取外部类变量
>    
>      ```java
>         外部类名.this.变量名
>      ```
> 
>      <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260611191530630.png" alt="image-20260611191530630" style="zoom: 67%;" />
>    
>      this默认表示当前函数的调用者（即内部类对象），**外部类名.this**区分于前者
>    
>      <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260611193644120.png" alt="image-20260611193644120" style="zoom:50%;" />
>    
>      实际在内存当中，内部类对象中会存储一个隐藏的this指向外部类
>    

##### 静态内部类和局部内部类

>  2. 静态内部类
>
>     成员内部类前用static修饰，静态内部类只能访问外部类中的静态变量和静态方法，如果想要访问非静态的需要创建外部类的对象
>
>     - 创建静态内部类格式
>
>       ```java
>       外部类名.内部类名 对象名 = new 外部类名.内部类名();
>       ```
>
>
>
>  3. 局部内部类
>
>     将内部类定义在方法里，只有在该方法里才能使用，该类可以直接访问外部类成员，也可以访问方法内的局部变量   **局部内部类的地位等同于局部变量**
>

##### 匿名内部类

>  4. :star:匿名内部类
>
>     - 格式
>
>       ```java
>       new 类名或接口名(){
>         重写方法；
>       };
>       ```
>
>     - 理解
>
>       ```java
>       public class Student {
>           ...;
>       };  //一个完整的类
>                                                                                       
>        //将名字去掉后成为匿名类
>       {
>         ...;  
>       };
>                                                                                       
>       //完整的类可以继承父类或调用接口 并对里面的方法进行重写
>       public class Student (extends Person)/(implements Swim){
>           ...;
>       }
>       //匿名类继承父类或调用接口
>       (Person/Swim){
>           ...;
>       }
>                                                                                       
>       //直接new创建匿名类对象
>       new (Person/Swim){
>           ...;
>       }
>     
>     
>
>   - 应用场景
>
>     当某个类只需要用到一次时
>
>      <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260611201430461.png" alt="image-20260611201430461" style="zoom:80%;" />
>
>     1. 将匿名类对象放在method{ }里**表示将这个对象作为参数传给method**，此时的内部类为Animal的子类
>       2. 可以用多态的方法去将内部类赋值给一个对象
>       3. <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260611201536678.png" alt="image-20260611201536678" style="zoom:50%;" /> 还可以作为一个对象去调用方法

---

## 常用API

### Math

> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260614100848061.png" alt="image-20260614100848061" style="zoom:50%;" /> 
>
> - tip：Math里面的**所有方法都是静态方法（工具类）**，直接用类名调用即可
>
> - 常用方法
>
>   | 方法声明             | 方法名                 | 说明                                     |
>   | -------------------- | ---------------------- | ---------------------------------------- |
>   | public static int    | abs(int a)             | 获取参数绝对值                           |
>   | public static double | ceil(double a)         | 向上取整                                 |
>   | public static double | floor(double a)        | 向下取整                                 |
>   | public static int    | round(float a)         | 四舍五入                                 |
>   | public static int    | max(int a,int b)       | 获取两个 int 值中的较大值                |
>   | public static double | pow(double a,double b) | 返回 a 的 b 次幂的值                     |
>   | public static double | random()               | 返回值为 double 的随机值，范围 [0.0,1.0) |



### System

> - System也是一个工具类，提供了一些与系统相关的方法
>
>   | 方法名                                                       | 说明                         |
>   | ------------------------------------------------------------ | ---------------------------- |
>   | public static void exit(int status)                          | 终止当前运行的 Java 虚拟机   |
>   | public static long currentTimeMillis()                       | 返回当前系统的时间毫秒值形式 |
>   | public static void arraycopy (数据源数组，起始索引，目的地数组，起始索引，拷贝个数) | 数组拷贝                     |
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260614102445953.png" alt="image-20260614102445953" style="zoom:50%;" />
>
>   tip：若拷贝的数据类型是引用数据类型，那么子类可以拷贝进父类，形成一个多态数组



### Runtime

> - 表示当前虚拟机的运行环境
>
>   Runtime的对象不能直接new，需要用其提供的**getRuntime()方法**获取 —一个虚拟机只能有一个运行环境，所以Runtime是只有一个final对象的，用getRuntime可以防止Runtime对象被乱new
>
> - 常用方法
>
>   | 方法名                              | 说明                                        |
>   | ----------------------------------- | ------------------------------------------- |
>   | public static Runtime getRuntime()  | 当前系统的运行环境对象                      |
>   | public void exit(int status)        | 停止虚拟机                                  |
>   | public int availableProcessors()    | 获得 CPU 的线程数                           |
>   | public long maxMemory()             | JVM 能从系统中获取总内存大小（单位 byte）   |
>   | public long totalMemory()           | JVM 已经从系统中获取总内存大小（单位 byte） |
>   | public long freeMemory()            | JVM 剩余内存大小（单位 byte）               |
>   | public Process exec(String command) | 运行 cmd 命令                               |
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260614103939273.png" alt="image-20260614103939273" style="zoom:50%;" />



### Object和Objects

#### Object

> 所有类的顶级父类，由于所有的类是没有共同的属性的，所以Object中是没有成员变量的，所以Object只有空参构造
>
> - 常用成员方法
>
>   | 方法名                              | 说明                     |
>   | ----------------------------------- | ------------------------ |
>   | `public String toString()`          | 返回对象的字符串表示形式 |
>   | `public boolean equals(Object obj)` | 比较两个对象是否相等     |
>   | protected Object clone()            | 对象克隆                 |
>
> - toString应用
>
>   ```java
>   System.out.println();
>   ```
>
>   上面这个输出的方法在底层的逻辑为
>
>   1. 当打印一个对象时，底层会调用**对象的toString方法（重写Object中的toString）**，把对象变成字符串
>   2. 然后打印在控制台上并完成换行处理
>
> - equals
>
>   Object中的equals是比较二者地址值是否相同，所以对于某个JavaBean如果不提供equals的重写就会调用Object中的equals
>
> - clone
>
>   1. 由于clone是**protected**，只有本类、同包、子类才可以使用 
>
>      假设：有一个Student类，一个Test类，都默认继承于Object，在它们内部直接使用super.clone()是允许的。但是在Test类中创建了一个Student对象s  **s.clone();是不被允许的**
>
>      所以我们就需要在Student内部去重写clone方法，向外界提供一个clone的方法
>
>      ```java
>      @Override
>      public Object clone() throws CloneNotSupportedException {
>          return super.clone();
>      }
>      //如此返回的是Object类型 接收时需要强转
>      s1 = (Student)s.colne();
>      ```
>
>      除此之外子类还需接入一个Cloneable接口，用于标记（Cloneable接口中没有任何抽象方法，只用作标记）
>
>      ```java
>      public class Student implements Cloneable{
>          
>      } 
>      ```
>
>   2. 深浅克隆问题
>
>      - 浅克隆（Object中的默认克隆方式）
>
>        <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260614112923154.png" alt="image-20260614112923154" style="zoom:50%;" />
>
>        问题：数组指向的是同一块空间，这样当克隆体/主体改变其中内容时，另一方中的数据也会受到影响，这样就无法做到隔离性
>
>      - 深克隆
>
>        重新new一个数组并将数据拷贝过来
>
>        <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260614113121646.png" alt="image-20260614113121646" style="zoom:50%;" />
>
>        - 深克隆的实现
>
>          <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260614113300668.png" alt="image-20260614113300668" style="zoom: 67%;" /> 
>
>        - 一般会用其他人提供的第三方工具
>
>          ```java
>          //第三方的工具
>          //1.第三方写的代码导入到项目中
>          //2.编写代码
>          Gson gson = new Gson();
>          //把对象变成一个字符串
>          String s = gson.toJson(u1);
>          //再把字符串变回对象就可以了
>          User user = gson.fromJson(s, User.class);
>          //打印对象
>          System.out.println(user);
>          ```
>
>          <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260614115623048.png" alt="image-20260614115623048" style="zoom:50%;" /> 
>
>        

#### Objects

> - 一个工具类，提供了一些方法完成一些功能
>
>   | 方法名                                             | 说明                                              |
>   | -------------------------------------------------- | ------------------------------------------------- |
>   | `public static boolean equals(Object a, Object b)` | 先做非空判断，比较两个对象                        |
>   | `public static boolean isNull(Object obj)`         | 判断对象是否为 null，为 null 返回 true，反之false |
>   | `public static boolean nonNull(Object obj)`        | 判断对象是否为 null，跟 isNull 的结果相反         |



### BigInteger和BigDecimal

#### BigInteger

> - 超大整数
>
> - 构造方法
>
>   | 方法名                                     | 说明                               |
>   | ------------------------------------------ | ---------------------------------- |
>   | public BigInteger(int num, Random rnd)     | 获取随机大整数，范围：[0∼2^num^−1] |
>   | public BigInteger(String val)              | 获取指定的大整数                   |
>   | public BigInteger(String val, int radix)   | 获取指定进制的大整数               |
>   | public static BigInteger valueOf(long val) | 静态方法获取对象，内部有优化       |
>
>    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260614134408577.png" alt="image-20260614134408577" style="zoom:50%;" />
>
>   第四种方法的优化：对 -16~16范围内的数字进行了优化，即：提前创建好了-16 ~16的BigInteger对象，这样多次创建时就不会重复创建了
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260614134700421.png" alt="image-20260614134700421" style="zoom: 80%;" />
>
> - 成员方法
>
>   | 方法名                                                 | 说明                                |
>   | ------------------------------------------------------ | ----------------------------------- |
>   | public BigInteger add(BigInteger val)                  | 加法                                |
>   | public BigInteger subtract(BigInteger val)             | 减法                                |
>   | public BigInteger multiply(BigInteger val)             | 乘法                                |
>   | public BigInteger divide(BigInteger val)               | 除法，获取商                        |
>   | public BigInteger[] divideAndRemainder(BigInteger val) | 除法，获取商和余数                  |
>   | public boolean equals(Object x)                        | 比较是否相同                        |
>   | public BigInteger pow(int exponent)                    | 次幂                                |
>   | public BigInteger max/min(BigInteger val)              | 返回较大值 / 较小值                 |
>   | public int intValue(BigInteger val)                    | 转为 int 类型整数，超出范围数据有误 |
>
> - 底层原理
>
>   BigInteger的底层原理就是使用**数组**进行存储
>
>   1. 首先会将数字转换为**二进制补码**
>   2. 转为补码后以**32位为一组（int的大小）**对二进制补码进行分组
>   3. 将每组转换为十进制并存入int数组
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260614135814022.png" alt="image-20260614135814022" style="zoom:50%;" /> 



#### BigDecimal

> - 超大/**精确浮点数**
>
> - 构造方法
>
>   有许多种构造方法，但现在只需掌握以下两种
>
>   ```java
>   //1.表示的数不大，不超出double范围
>   BigDecimal bd = BigDecimal.valueof(double val/long val);
>   //这种方法同BigInteger同样有优化，对于long类型的0~10之内的数据是提前准备好的
>   
>   //2.数字超出double范围
>   BigDecimal bd = BigDecimal("xxxxxx.xxxxx");
>   ```
>
> - 成员方法
>
>   | 方法名                                                       | 说明     |
>   | ------------------------------------------------------------ | -------- |
>   | public static BigDecimal valueOf(double val)                 | 获取对象 |
>   | public BigDecimal add(BigDecimal val)                        | 加法     |
>   | public BigDecimal subtract(BigDecimal val)                   | 减法     |
>   | public BigDecimal multiply(BigDecimal val)                   | 乘法     |
>   | public BigDecimal divide(BigDecimal val)                     | 除法     |
>   | public BigDecimal divide (BigDecimal val, 精确几位，舍入模式) | 除法     |
>
>   对于除不尽的运算需要使用最后一种除法
>
>   例：<img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260614142216244.png" alt="image-20260614142216244" style="zoom:50%;" />
>
>   Java把舍入方式单独定义在了RoundingMode（枚举类型）里面
>
>   RoundingMode里面还有许多其他舍入方法如：UP，DOWN，CEILING，FLOOR,HALF_DOWN
>
> - 底层存储
>
>   遍历字符串，存储每一位对应的ASCII码
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260614143847650.png" alt="image-20260614143847650" style="zoom:50%;" />
>
>   若是负数，会把负号也存储进来



### 正则表达式

> - 作用一：检验字符串是否满足规则
>
> - 作用二：在一段文本中查找满足要求的内容
>
> - String类型中有一个matches方法用于匹配正则表达式
>
>   ```java
>   String str = "xxxxx";
>   boolean res = str.mathces("正则表达式");
>   ```
>
> 
>
> - 规则
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260614144515342.png" alt="image-20260614144515342" style="zoom: 80%;" />
>
>   [ ]：表示一个范围，且只**匹配一个字符**
>
>   ^：取反
>
>   &&：取交集
>
>   tip：由于转义字符的存在 “\d”需要被写为**“\\\d”** 其他同理
>
>   注意：上图中所匹配的都为1个字符，多个字符的匹配还需配合后面的数量词
>
> 
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260614145551103.png" alt="image-20260614145551103" style="zoom:50%;" />
>
>   补充：“(?i)abcde” 代表**忽略acbde的大小写**
>
>  
>
> - 正则表达式在字符串处理中的应用
>
>   | 方法名                                               | 说明                               |
>   | ---------------------------------------------------- | ---------------------------------- |
>   | public String[] matches(String regex)                | 判断字符串是否满足正则表达式的规则 |
>   | public String replaceAll(String regex,String newStr) | 按照正则表达式的规则进行替换       |
>   | public String[] split(String regex)                  | 按照正则表达式的规则切割字符串     |





#### 爬虫

> - 爬虫所实现的功能就是从一段文本中爬取所需信息，即实现了正则表达式的作用二
>
>   - 分类
>
>     爬虫分为本地爬虫和网络爬虫 
>
> - Pattern类：正则表达式对象（java.util.regex.Pattern）
>
>   不能直接new，需要用compile方法获取
>
> - Matcher类：文本匹配器，按照正则表达式的规则读取字符串（从头开始读取）
>
> - 实现步骤
>
>   1. 用compile方法创建一个Pattern对象并赋予其正则表达式
>   2. 调用Pattern中的matcher方法，其返回值为matcher
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260614160735005.png" alt="image-20260614160735005" style="zoom:50%;" /> 本地爬虫
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260614160859971.png" alt="image-20260614160859971" style="zoom: 50%;" /> 网络爬虫，以URL为入口

##### 带条件爬取

> 即只需要爬取到数据的一部分
>
> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260614161652278.png" alt="image-20260614161652278" style="zoom:50%;" />
>
> - 需求1
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260614161932697.png" alt="image-20260614161932697" style="zoom:50%;" />
>
> - 需求2
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260614162055959.png" alt="image-20260614162055959" style="zoom:67%;" />
>
> - 需求3
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260614162409383.png" alt="image-20260614162409383" style="zoom:50%;" />

##### （非）贪婪爬取

> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260614162523192.png" alt="image-20260614162523192" style="zoom:50%;" />
>
> - 贪婪爬取
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260614162730179.png" alt="image-20260614162730179" />
>
> - 非贪婪爬取
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260614162759475.png" alt="image-20260614162759475" />



#### （非）捕获分组

> - 正则的分组
>
>   即：用()进行表达式的分组，分组编号规则如下
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260614163823327.png" alt="image-20260614163823327" style="zoom:50%;" />
>
> - 捕获分组：将规定组的数据捕获出来再用一次
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260614163951513.png" alt="image-20260614163951513" style="zoom:50%;" />
>
>   以a123a为例，为了判断第一个字符和最后一个字符是否一致，其正则表达式为：**“(.).+\\\1”** 其中\\\1即为分组1
>
>   - 需求1
>
>     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260614164353050.png" alt="image-20260614164353050" style="zoom:50%;" />
>
>   - 需求2
>
>     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260614164454811.png" alt="image-20260614164454811" style="zoom:50%;" />
>
>   - 需求3
>
>     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260614164938421.png" alt="image-20260614164938421" style="zoom:50%;" />
>
>     需求3中**((.)\\\2*)** 这一整个整体为组1，里面的(.)为组2  则：**(.)和\\\2是一样的**  \\\2*的 * 作用于\\\2表示其在后面重复出现0或多次，  所以**((.)\\\2*)**就可以表示多个重复的字母  将其看为一整个整体\\\1就可以用到后面了
>
>   - 案例
>
>     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260614165758162.png" alt="image-20260614165758162" style="zoom:50%;" />
>
> - 非捕获分组
>
>   分组后不需要再用本组数据，仅仅只是把数据括起来，非捕获分组不占用组号
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260614170007391.png" alt="image-20260614170007391" style="zoom:50%;" />



### JDK7前的时间相关类

> - Date
>
>   JDK写好的JavaBean类，用于描述时间，可精确到毫秒
>
>   - 构造方法
>
>     空参构造：当前系统时间
>
>     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260614175130000.png" alt="image-20260614175130000"  />  空参即将系统时间传递给有参构造
>
>     有参构造：设定时间
>
>     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260614175144215.png" alt="image-20260614175144215" /> 
>
>   - 成员方法
>
>     setTime(long time) 设置/修改毫秒值
>
>     getTime 获取事件对象的毫秒值
>
>   传参初始化/改变毫秒值时，会在源时间基础上加上这个毫秒值
>
> - SimpleDateFormat  格式化时间
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260614174801181.png" alt="image-20260614174801181" style="zoom:50%;" /> 方便阅读
>
>   - 构造方法
>
>     空参构造：使用默认格式
>
>     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260614180209693.png" alt="image-20260614180209693" style="zoom:50%;" />
>
>     有参构造：使用指定格式，将指定格式用字符串形式传入
>
>     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260614180238910.png" alt="image-20260614180238910" style="zoom:50%;" />
>
>     其中统一以y作为年的占位 M月占位 d日占位 H小时占位 m分钟占位 s秒占位 **E表示星期几的占位**
>
>   - 成员方法
>
>     format(Date date); 将传入的date格式化，返回值为String
>
>     parse(String source)；将传入的字符串解析为Date类型 – 用处：转为Date类型再通过getTime获取毫秒值就可以对时间进行运算
>
> - Calendar 日历
>
>   利用这个对象我们可以单独修改、获取时间中的年月日
>
>   - tip：Calendar是一个抽象类，不能直接创建对象
>
>     需要使用其getInstance()方法获取对象
>
>     调用getInstance后会**根据不同时区获取不同的日历对象**并返回。会把时间中的**年月日时分秒等信息放入一个数组中**
>
>   - 常用方法
>
>     | 方法名                                   | 说明                          |
>     | ---------------------------------------- | ----------------------------- |
>     | public final Date getTime()              | 获取日期对象                  |
>     | public final setTime(Date date)          | 给日历设置日期对象            |
>     | public long getTimeInMillis()            | 拿到时间毫秒值                |
>     | public void setTimeInMillis(long millis) | 给日历设置时间毫秒值          |
>     | public int get(int field)                | 取日历中的某个字段信息        |
>     | public void set(int field,int value)     | 修改日历的某个字段信息        |
>     | public void add(int field,int amount)    | 为某个字段增加 / 减少指定的值 |
>
>     tip：用get方法取出来的数字，月份：0 ~ 11表示1 ~ 12月   周几：周日为1



### JDK8新增的时间相关类

> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260614183559400.png" alt="image-20260614183559400" style="zoom:50%;" />
>
> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260614183631561.png" alt="image-20260614183631561" style="zoom:43%;" />
>
> - Date类
>
>   1. ZoneId
>
>      <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260614183800640.png" alt="image-20260614183800640" style="zoom: 50%;" /> 
>
>      <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260614184435811.png" alt="image-20260614184435811" style="zoom: 50%;" /> 
>
>   2. Instant
>
>      <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260614184500789.png" alt="image-20260614184500789" style="zoom: 50%;" /> 
>
>   3. ZoneDateTime
>
>      <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260614185521811.png" alt="image-20260614185521811" style="zoom:50%;" /> 
>
> - DateTimeFormatter
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260614185857058.png" alt="image-20260614185857058" style="zoom:50%;" />
>
> - Calendar类
>
>   Local Date     Local Time  Local DateTime
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260614190322320.png" alt="image-20260614190322320" style="zoom:50%;" /> 
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260614190357807.png" alt="image-20260614190357807" style="zoom:43%;" /> 
>
> - 工具类
>
>   - Duration：计算两个时间间隔（秒，纳秒）
>
>   - Period：计算两个日期间隔（年月日）
>
>   - ChronoUnit：计算两个日期间隔（所有单位）  最常用、范围最大
>
>     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260614191935965.png" alt="image-20260614191935965" style="zoom: 80%;" /> 



### 包装类

> 即：将基本数据类型变为一个对象
>
> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260614192227047.png" alt="image-20260614192227047" style="zoom:50%;" /> 
>
> [各包装类名](#集合添加基本数据类型 — 包装类)
>
> - 获取包装类对象方法
>
>   1. new(JDK5前)
>
>      ```java
>      Integer i1 = new Integer(1);
>      ```
>
>   2. valueOf  -128~127是提前创建好的，若在这个范围内是直接指向已经创建好的
>
>      ```java
>      Integer i1 = Integer.valueOf(1);
>      Integer i2 = Integer.valueOf("123",8);//表示8进制的123
>      ```
>
>   3. JDK5后（自动拆箱和自动装箱）
>
>      ```java
>      Integer i = 10;//自动装箱
>      int i1 = i;//自动拆箱
>      ```
>
>      
>
> - 包装类对象运算
>
>   - 原先
>
>     ```java
>     //先拆成基本数据类型，运算后再封装为包装类
>     ```
>
>   - JDK5后
>
>     ```java
>     Integer i1 = 10;
>     Integer i2 = 100;
>     Integer i3 = i1+i2;
>     ```
>
> - Integer成员方法
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260614193518485.png" alt="image-20260614193518485" style="zoom:50%;" />
>
>   返回值设为String的原因：二进制可能有很多位，超出int承受范围
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260614193833206.png" alt="image-20260614193833206" style="zoom:50%;" /> 
>
>   tip:除了Character包装类 其他包装类都有 parseXXX的方法进行转换



## Arrays 与 Lambda表达式

### Arrays  – 常用算法API

> 工具类，用于操作数组
>
> - 常用方法
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260615163716341.png" alt="image-20260615163716341" style="zoom:50%;" /> 
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260615165416215.png" alt="image-20260615165416215" style="zoom: 43%;" /> 着重注意重载的那个sort的



### Lambda表达式

> - 作用：简化匿名内部类的缩写
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/javase/image-20260615165835663.png" alt="image-20260615165835663" style="zoom:67%;" />
>
> - 函数式编程
>
>   一种思想特点，不同于面向对象的先找对象再让对象做事情。函数式编程可以忽略面向对象的复杂语法，简化书写
>
> - 解析
>
>   ```java
>   Arrays.sort(arr,(Integer x,Integer y)->{return x-y;});
>   ```
>
>   - （）：对应方法形参
>   - -> : 固定格式
>   - {}：方法体
>
> - 注意
>
>   Lambda表达式只能简化**函数式接口**的匿名内部类写法
>
>   函数式接口：**有且仅有一个抽象方法的接口**，可以用**@FunctionalInterface**标记
>
> - Lambda表达式的省略写法  — 可推导，可省略
>
>   1. 参数类型可省略不写
>
>      ```java
>      Arrays.sort(arr,(x,y)->{return x-y;});
>      ```
>
>      
>
>   2. 若方法只有一个参数，则参数类型可省略，同时()也可省略
>
>   3. 如果Lambda表达式的方法体只有一行，大括号，分号，return都可省略不写
>
>      ```java
>      Arrays.sort(arr,(x,y)->x-y);
>      ```





