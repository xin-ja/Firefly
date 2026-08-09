---

title: MySQL

published: 2026-08-08

description:  MySQL

tags: [ MySQL]

category:  MySQL

draft: false

---

# DataBase_Learn (基础)

---



## 一、数据库相关知识

---

### 1.数据库（**DB**）、数据库管理系统（**DBMS**）、与**SQL**语言

> 数据库（DataBase）即存放数据的仓库 ，数据库管理系统（DataBase Management System）是一种管理数据库的大型软件（==MySQL、Oracle等==） SQL语言是用于操作==关系型数据库==的编程语言。 
>
> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260311154639782.png" alt="image-20260311154639782" style="zoom:100%;" />

### 2.关系型数据库和非关系型数据库（离散数据库）

> - ==**关系型数据库**==：建立在关系模型基础上，由多张相互连接的二维表组成的数据库。
> - ==**非关系型数据库**==：非关系型数据库是离散存储的  （如redis） 
>
> **<u>==*关系型数据库的架构：*==</u>**
>
> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260311155945724.png" alt="image-20260311155945724"  />



### 3.MySQL 数据库的相关指令

> - MySQL服务的启动与关闭（需以管理员身份运行cmd）
>
> ​			启动：net start mysql80
>
> ​			关闭：net stop mysql80
>
> - MySQL客户端的连接
>
> ​			mysql -u root -p (以**root 身份**通过**密码**登录)

---



## 二、SQL语言基础

### 1.语法规范

> - SQL语法本身不分大小写，大写小写都可以识别。但为了区分关键词（包括指令、数据类型等）与字段（类似变量名称），**<u>关键词大写</u>**，**<u>字段小写</u>***
> - SQL语句可以单行或多行书写，**但必须要以 ； 结尾**（类似C/Cpp）
> - SQL语句的注释：
>   - 单行注释：–（两个减号）或 #（MySQL独有）
>   - 多行注释：/**/ （同C/Cpp） 

### 2.SQL语句的分类 

|    分类     |            全称            |                             说明                             |
| :---------: | :------------------------: | :----------------------------------------------------------: |
| [DDL](#DDL) |  Data Definition Language  |     数据定义语言，用来定义数据库对象（数据库，表，字段）     |
| [DML](#DML) | Data Manipulation Language | 数据操作语言，用来对数据库表中的数据进行增删改(用于操作表内数据) |
| [DQL](#DQL) |    Data Query Language     |            数据查询语言，用来查询数据库中表的记录            |
| [DCL](#DCL) |   Data Control Language    |    数据控制语言，用来创建数据库用户、控制数据库的访问权限    |

### 3.四类语法的基础学习

#### DDL

---



##### 	数据库相关的定义操作

- 查询所有数据库信息

  ```sql
  SHOW DATABASES; #tip：由于是所有数据库信息，所以有s
  ```

- 使用（进入）某个数据库

  ```sql
  USE 数据库名;
  ```

- 查询当前所在数据库

  ```sql
  SELECT DATABASE();#tip:DATABASE()是一个函数
  ```

  

- 创建数据库

  ```sql
  CREATE DATABASE [IF NOT EXISTS] 数据库名 [DEFAULT CHARSET 字符集（如：utf8mb4）] [COLLATE 排序规则] 
  
  #tip：[]所框起来的内容都是选写的  
  #IF NOT EXISTS:当不存在这个名称的数据库时再创建一个这个名称的数据库，可防止因重名而报错
  #DEFAULT CHARSET ... 可设定该数据库中所存储的字符集
  #COLLATE ...可设置数据的排序规则
  ```

- 删除数据库

  ```sql
  DROP DATABASE [IF EXISTS] 数据库名; 
  ```



##### 表相关的定义操作

> 注意：表存储于数据库之中，所以所有有关表的操作都要先 **USE** 进入数据库
- 创建表

  ```sql
  CREATE TABLE 表名(
  	字段1 字段1类型 COMMENT 注释, #tip：COMMENT为注释，可加可不加
  	字段2 字段2类型 COMMENT 注释,
      ....
      字段n 字段n类型 COMMENT 注释  #tip:每一项之间需要有‘，’（逗号），最后一项不用
  )COMMENT 表的注释 ;
  ```

- 查询表操作

  - 查询当前数据库中的所有表

    ```sql
    SHOW TABLES;
    ```

  - 查询表结构

    ```sql
    DESC 表名;
    ```

  - 查询某表的建表语句

    ```sql
    SHOW CREATE TABLE 表名;
    ```

- 修改表

  - 增加字段

    ```sql
    ALTER TABLE 表名 ADD 字段名 类型 COMMENT...;
    ```

  - 修改某字段的数据类型

    ```sql
    ALTER TABLE 表名 MODIFY 字段名 新的数据类型 ;
    ```

  - 彻底修改某个字段

    ```sql
    ALTER TABLE 表名 CHANGE 字段名 新字段名 新数据类型 COMMENT ... ;
    ```

  - 删除某字段

    ```sql
    ALTER TABLE 表名 DROP 字段名;
    ```

  - 修改表名

    ```sql
    ALTER TABLE 表名 RENAME TO 新表名;
    ```

    

- 删除表

  - 彻底删除表

    ```sql
    DROP TABLE [IF EXISTS]表名;
    ```

  - 删除指定表，并重新创建该表 — 即删除表中数据

    ```sql
    TRUNCATE TABLE 表名;
    ```

###### （附）表中数据类型的分类

1. 数值类

   | 类型                        | 大小     |
   | :-------------------------- | :------- |
   | （UNSIGNED）TINYINT         | 1byte    |
   | （UNSIGNED）SMALLINT        | 2byte    |
   | (UNSIGNED)MEDIUMINT         | 3byte    |
   | (UNSIGNED)INT               | 4byte    |
   | (UNSIGNED)BIGINT[^int]      | 8byte    |
   | (UNSIGNED)FLOAT             | 4byte    |
   | (UNSIGNED)DOUBLE            | 8byte    |
   | (UNSIGNED)DESIMAL[^desimal] | 依据精度 |

   > 注释：
   >
   > [^int]:类似long/longlong
   > [^desimal]:DESIMAL在使用时需要跟上精度 如DESIMAL（3,1）代表这个浮点型有三位有效数字，且保留一位小数

2. 字符（串）类

   | 类型         | 描述                        |
   | ------------ | --------------------------- |
   | CHAR（n）    | 定长字符串                  |
   | VARCHAR（n） | 变长字符串                  |
   | TINUYBLOB    | 不超过255个字符的二进制数据 |
   | TINYTEXT     | 短文本字符串                |
   | BLOB         | 二进制长文本数据            |
   | TEXT         | 长文本数据                  |
   | MEDIUMBLOB   | 二进制中等长度文本数据      |
   | MEDIUMTEXT   | 中等长度文本数据            |
   | LONGBLOB     | 二进制极大文本数据          |
   | LONGTEXT     | 极大文本数据                |

   > 注意：
   >
   > 1. MySQL8.0 服务创建的数据库的默认编码格式是**utf8mb4**，其中每个空间可以存一个字符，CHAR(n) 或 VARCHAR(n) 用于存放字符串时，n代表n个字符，其中**汉字**也只占据**1个字符**，而若在其他编码格式下 CHAR（n）则可能代表n个字节
   > 2. CHAR(n)固定开辟n个字符空间【存储速度快】，VARCHAR(n)根据传入的数据开辟相应的空间【存储速度较慢】，最大开辟n个字符空间，所以CHAR(n)适合存储确定长度的数据 如：性别  VARCHAR适合存储不确定长度的数据 如：姓名

3. 日期类

   | 类型                            | 大小  | 格式                |
   | ------------------------------- | ----- | ------------------- |
   | DATE                            | 3byte | YYYY-MM-DD          |
   | TIME                            | 3byte | HH:MM:SS            |
   | YEAR                            | 1byte | YYYY                |
   | DATATIME                        | 8byte | YYYY-MM-DD HH:MM:SS |
   | TIMESTAMP（时间戳）[^timestamp] | 4byte | YYYY-MM-DD HH:MM:SS |

   > 注释
   >
   > [^timestamp]:  虽然时间戳存储和DATATIME存储格式相同，但时间戳的存储范围是1970-01-01 00：00：01至 2038-01-19 03：14：07  而  DATATIME存储范围是1000-01-01 00：00：00 至9999-12-31 23：59：59



---

#### DML

---



##### 向表中插入数据(INSERT)

- 单行添加
  - 给单行中指定字段添加数据

    ```sql
    INSERT INTO 表名 (字段1，字段2....)VALUES(值1，值2...);
    ```

  - 给单行全部字段添加数据（即添加一整行的数据）

    ```sql
    INSERT INTO 表名 VALUES(值1，值2....);
    ```

- 多行添加（批量添加数据）

  - 给多行的指定字段添加数据

    ```sql
    INSERT INTO 表名 (字段1，字段2...) VALUES(值1，值2...),(值1，值2...)...;
    ```

  - 给多行的全部字段添加数据

    ```sql
    INSERT INTO 表名 VALUES(值1，值2...),(值1，值2...)...;
    ```

> 注意：
>
> 1. 插入数据时，字段和对应的值要一一匹配
> 2. **字符串和日期的数据需要用‘ ’引起来**
> 3. 插入数据的大小应该在该项的数据类型的范围之内

##### 修改表中数据（UPDATE）

```sql
UPDATE 表名 SET 字段1=.. ,字段2=.. , ... [WHERE 条件];#如果不加WHERE就会修改整张表的数据
```

##### 删除表中数据（DELETE）

```sql
DELETE FROM 表名 [WHERE 条件] #如果没有WHERE会删除整张表的数据
```

> 注意：DELETE不能删除某一行数据中的单个字段，只能删除一整行或者删除整张表。如果想要删除某行中某个字段的数据可以用UPDATE语句将那个字段改为NULL（置空）
>
> ```sq;
> #单个字段置空
> UPDATE 表名 SET 需要删除的字段=NULL WHERE 条件
> ```

---

#### DQL

---

##### 查询相关语法

| 语法                                                     | 说明                                                         |
| -------------------------------------------------------- | ------------------------------------------------------------ |
| [SELECT 字段列表](##基本查询（SELECT，FROM）)            | 表明我们要查询的是哪个**列**（字段）                         |
| [FROM 表明列表](##基本查询（SELECT，FROM）)              | 指定我们要在哪个**表**里查                                   |
| [WHERE 条件列表](#条件查询（WHERE）)                     | **过滤行数据**，只保留满足条件的记录。                       |
| [GROUP BY 分组字段列表](#分组查询（GROUP BY、HAVING）)   | 按照指定字段对数据进行**分组**，通常与**聚合函数**共同使用   |
| [HAVING 分组后的条件列表](#分组查询（GROUP BY、HAVING）) | 对**分组后的结果**进行过滤，和 `WHERE` 不同，它作用于分组后的聚合结果。 |
| [ORDER BY 排序字段列表](#排序查询（ORDER BY）)           | 对查询结果按照指定字段**排序**，默认升序（`ASC`），也可指定降序（`DESC`）。 |
| [LIMIT 分页参数](#分页查询（LIMIT）)                     | 限制返回结果的**行数**，实现分页查询。                       |

> 1. 上述的7种语法**可以搭配使用**
> 2. `上述七种语句的编写顺序就是从上至下，如：LIMIT必须在最后`[详见图片](#编写顺序)

###### #基本查询（SELECT，FROM）

- 基本查询

  - 查询多个字段

    ```sql
    SELECT 字段1,字段2... FROM 表名; 
    SELECT * FROM 表名;# *代表返回所有字段，此查询可以用于显示某表中的所有内容
    ```

  - 查询过程中对字段设置别名（*查询结果的表头名称会变为别名*）

    ```sql
    SELECT 字段1 AS 别名1, 字段2 AS 别名2 ... FROM 表名; # AS 可省略
    ```

  - 查询过程中去除重复记录

    ```sql
    SELECT DISTINCT 字段1,字段2,... FROM 表名;
    ```

###### 条件查询（WHERE）

- 条件查询

  - 语法

    ```sql
    SELECT 字段列表 FROM 表名 WHERE 条件列表;
    ```

  - 条件附表

    - 比较运算符

      | 运算符              | 功能描述                                      |
      | ------------------- | --------------------------------------------- |
      | \>                  | 大于                                          |
      | \>=                 | 大于等于                                      |
      | <                   | 小于                                          |
      | <=                  | 小于等于                                      |
      | =                   | 等于                                          |
      | <>` 或 `!=          | 不等于                                        |
      | BETWEEN ... AND ... | 在某个范围之内 (含最小、最大值)               |
      | IN(...)             | 在 in 之后的列表中的值，多选一                |
      | LIKE 占位符         | 模糊匹配 (`_`匹配单个字符，`%`匹配任意个字符) |
      | IS (NOT) NULL       | (不)是 NULL                                   |

      > like的样例
      >
      > ```sql
      > SELECT 字段列表 FROM 表名 WHERE name LIKE'___'#意为从某表中查询名字是三个字的用户相关字段数据
      > 
      > SELECT 字段列表 FROM 表名 WHERE id LIKE'%X' # 这行意为查询id最后一位是X的用户相关字段数据  tip：%代表匹配了最后一位前所有字符
      > 
      > SELECT 字段列表 FROM 表名 WHERE phone_number LIKE'%2%' #这段表示查询手机号中有2的用户  tip：前后各一个%匹配了2前后的字符
      > ```

    - 逻辑运算符（`用于组装多个条件`）

      | 运算符       | 功能描述                    |
      | ------------ | --------------------------- |
      | AND` 或 `&&  | 并且 (多个条件同时成立)     |
      | OR` 或` \|\| | 或者 (多个条件任意一个成立) |
      | NOT `或` !   | 非，不是                    |



###### 分组查询（GROUP BY、HAVING）

- 分组查询

  - 聚合函数

    - 定义：将一列数据作为一个整体，进行纵向计算，`常与分组查询一起使用`

    - 常见的聚合函数

      | 函数  | 功能               |
      | ----- | ------------------ |
      | count | 计算某列有几个数据 |
      | max   | 求某列中的最大值   |
      | min   | 求某列中的最小值   |
      | avg   | 求某列的数据平均数 |
      | sum   | 求某列数据之和     |

      > 注意：所有的 `NULL` 是不参与聚合函数的计算的，所以若要统计表中用户数量可以用COUNT（*）  tip：如果COUNT那一列有NULL会漏数

    - 聚合函数语法

      ```sql
      SELECT 聚合函数（字段列表） FROM 表名;
      ```

  - 分组查询

    - 语法

      ```sql
      SELECT 字段列表 聚合函数 FROM 表名 [WHERE 条件] GROUP BY 分组字段名 [HAVING 分组后的过滤条件]
      ```

      > 注意：
      >
      > 1.SELECT后出现的字段**要么是在GROUP BY内**，**要么是被聚合函数所包裹**，不然会报错
      >
      > 2.先执行GROUP BY将数据按照你的预期分组，分好组后再交由聚合函数进行运算，最后显示聚合函数的计算结果
      >
      > 3.**WHERE**是在分组前进行过滤，**HAVING**是在**分组后**进行过滤，且**WHERE后不能跟聚合函数**，而**HAVING可以**

    - 样例

        <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260316200821027.png" alt="image-20260316200821027" style="zoom:100%;" />

       //上图为根据性别分组，并展示各个性别的人数以及其年龄平均数

         <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260316201051602.png" alt="image-20260316201051602" style="zoom:100%;" />

      //在原先基础上再用HAVING进行筛选，把平均年龄>=27的那个组筛选出来

       <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260316201323197.png" alt="image-20260316201323197" style="zoom:100%;" />

      //在原先基础上先用WHERE筛选掉年龄<=19的用户，再进行分组求个数、平均数以及HAVING筛选

###### 排序查询（ORDER BY）

- 排序查询

  - 语法

    ```sql
    SELECT 字段列表 FROM 表名 ORDER BY 字段1 排序方法1 字段2 排序方法2...;
    #优先按照字段1的排序方式1进行排序 若字段1的值相同则根据字段2的排序方式2排序...
    ```

  - 排序方式

    | 排序方式            | 排序顺序 |
    | ------------------- | -------- |
    | ASC（默认，可省略） | 升序     |
    | DESC                | 降序     |

###### 分页查询（LIMIT）

- 分页查询

  - 语法

    ```sql
    SELECT 字段列表 FROM 表名 LIMIT 起始索引，查询记录数;
    ```

    > 注意：
    >
    > 1. 起始索引的下标从0开始 如：LIMIT 0，10表示从第1条数据开始，查询十条
    > 2. MySQL的分页查询是LIMIT 其他数据库不一定
    > 3. 如果查询的是第一页的数据（从第一条开始），起始索引可以省略，如;LIMIT 0，10可以写为LIMIT 10

##### DQL语句的编写顺序与执行顺序

###### 编写顺序

<img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260316205350686.png" alt="image-20260316205350686" style="zoom: 80%;" />

###### 执行顺序

<img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260316205732246.png" alt="image-20260316205732246" style="zoom:100%;" />

> 执行顺序：^1^先找到表、^2^再对表进行筛选、分组（WHERE、GROUP BY、HAVING）^3^分组筛选后再查询要展示的字段列表 ^4^查找到要展示的字段列表后再进行排序（ORDER BY、LIMIT） ^5^排序后展示

#### DCL

##### DCL用户管理

- DCL用户管理语句

  - 查询用户

    ```sql
    USE mysql;
    SELECT * FROM user;
    ```

    > 用户相关信息放在了mysql数据库下的user表中

  - 创建用户

    ```sql
    CREATE USER '用户名'@‘主机名’ IDENTIFIED BY '密码';
    ```

    > MySQL需要通过用户名和主机名二者共同确认一个用户，其中主机名通常为某一IP地址。
    >
    > `tip：` 
    >
    > 1. 主机名可以用**‘%’**来表示任何主机都可以访问`或`**‘192.168.1.%‘** 限制某一网段可访问
    > 2. 本地的主机名可以直接用**‘localhost’**来表示

  - 修改用户密码

    ```sql
    ALTER USER '用户名'@'主机名' IDENTIFIED [WITH mysql_native_password] BY '新密码'
    ```

    > MySQL中设置密码时是需要选择一种密码加密方式的（可以用IDENTIFIED WITH … 选择）在MySQL8.0中**默认**的加密方式是`caching_sha2_password`,**而**`mysql_native_password`是老版本中兼容性比较强的一种加密方式。
    >
    > 所以改密码其实可以直接使用（默认是`caching_sha2_password`加密）
    >
    > ```sql
    > ALTER USER '用户名@'主机名' IDENTIFIED BY ‘新密码’;
    > ```

  - 删除用户

    ```sql
    DROP USER '用户名'@'主机名';
    ```

##### DCL用户权限管理

- 常用用户权限

  > MySQL中有四五十种用户权限，每种权限对应着一种操作，但常用的就下表中的几种

  | 权限                | 说明                   |
  | ------------------- | ---------------------- |
  | ALL, ALL PRIVILEGES | 所有权限               |
  | SELECT              | 查询数据               |
  | INSERT              | 插入数据               |
  | UPDATE              | 修改数据               |
  | DELETE              | 删除数据               |
  | ALTER               | 修改表                 |
  | DROP                | 删除数据库 / 表 / 视图 |
  | CREATE              | 创建数据库 / 表        |

- 权限控制相关语句

  - 查询某用户权限

    ```sql
    SHOW GRANTS FOR '用户名'@'主机名';
    ```

  - 授予权限

    ```sql
    GRANT 权限列表 ON 数据库名.表名 TO '用户名'@‘主机名’; #注意数据库和表名之间是点，而不是逗号
    ```

    > 授予某用户**某个数据库某张表中的权限**
    >
    > tip（**撤销操作同理**）
    >
    > 1. 若想授予某个数据库下所有表的某个权限可以用  `数据库名.* `
    > 2. 若想授予全部数据库的全部表的某个权限可以用  `*.*`

  - 撤销权限

    ```sql
    REVOKE 权限列表 ON 数据库名.表名 FROM '用户名'@‘主机名’;#注意数据库和表名之间是点，而不是逗号
    ```

---

## 三、函数

### 1.字符串函数

#### 常用的字符串函数表

| 函数                     | 功能                                                         |
| ------------------------ | ------------------------------------------------------------ |
| CONCAT(S1,S2,...Sn)      | 字符串拼接，将 S1，S2，...Sn 拼接成一个字符串                |
| LOWER(str)               | 将字符串 str 全部转为小写                                    |
| UPPER(str)               | 将字符串 str 全部转为大写                                    |
| LPAD(str,n,pad)          | **左**填充，用字符串 pad 对 str 的左边进行填充，达到 n 个字符串长度 |
| RPAD(str,n,pad)          | **右**填充，用字符串 pad 对 str 的右边进行填充，达到 n 个字符串长度 |
| TRIM(str)                | 去掉字符串头部和尾部的空格                                   |
| SUBSTRING(str,start,len) | 返回从字符串 str 从 start 位置起的 len 个长度的字符串（截取字符串） |

#### 常用字符串函数的使用

> 为了可以看到函数调用的效果，**使用SELECT（显示/查询输出）以查看调用效果**
>
> - 语句：直接   `SELECT  函数;` 	即可，不做过多赘述

### 2.数值函数

#### 常用的数值函数表

| 函数       | 功能                                   |
| ---------- | -------------------------------------- |
| CEIL(x)    | 向上取整                               |
| FLOOR(x)   | 向下取整                               |
| MOD(x,y)   | 返回 x/y 的模                          |
| RAND()     | 返回 0~1 内的随机数                    |
| ROUND(x,y) | 求参数 x 的四舍五入的值，保留 y 位小数 |

#### 常用数值函数的使用

> [详见](#常用字符串函数的使用)

### 3.日期函数

#### 常用的日期函数表

| 函数                                          | 功能                                                        |
| --------------------------------------------- | ----------------------------------------------------------- |
| CURDATE()                                     | 返回当前日期                                                |
| CURTIME()                                     | 返回当前时间                                                |
| NOW()                                         | 返回当前日期和时间                                          |
| YEAR(date)                                    | 获取指定 date 的年份                                        |
| MONTH(date)                                   | 获取指定 date 的月份                                        |
| DAY(date)                                     | 获取指定 date 的日期                                        |
| DATE_ADD(date, INTERVAL expr type)[^date_add] | 返回一个日期 / 时间值**加上一个时间间隔**` expr `后的时间值 |
| DATEDIFF(date1,date2)[^datediff]              | 返回起始时间 date1 和 结束时间 date2 之间的天数**(天数差)** |

#### 常用日期函数的使用

> [详见](#常用字符串函数的使用)
>
> :star:`特别说明`:star:
>
> [^date_add]: DATE_ADD函数中的 ***INTERVAL不可以省略** , **expr为一个间隔数值** ，**type为DAY，MONTH或YEAR***
>
> DATE_ADD样例:   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260318193630562.png" alt="image-20260318193630562" style="zoom:100%;" />
>
> [^datediff]:DATEDIFF函数的***返回值是date1-date2***

### 4.流程控制函数

> 流程控制函数在SQL语句中可以实现条件筛选，从而提高语句效率

#### 常用的流程控制函数

| 函数                                                         | 功能                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| IF(value , t , f)                                            | 如果 value 为 true，则返回 t，否则返回 f                     |
| IFNULL(value1 , value2)                                      | 如果 value1 不为空，返回 value1，否则返回 value2             |
| CASE WHEN [val1] THEN [res1] ... ELSE [default] END[^case1]  | 如果 val1 为 true，返回 res1，… 否则返回 default 默认值      |
| CASE [expr] WHEN [val1] THEN [res1] ... ELSE [default] END[^case2] | 如果 expr 的值等于 val1，返回 res1，… 否则返回 default 默认值 |

> :star:**两个CASE的应用场景**:star:
>
> [^case1]:**适用场景**：需要进行**范围判断**或**多字段逻辑判断**时，灵活度高。
> [^case2]:**适用场景**：***仅***用于**等值判断**，逻辑较简单时。
>
> CASE1样例
>
> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260318202240481.png" alt="image-20260318202240481" style="zoom: 50%;" />

---

## 四、约束

### 约束概念、目的及其分类

#### 1.概念

> **约束**是作用于**表中字段**上的**规则**，用于**限制存储在表中的数据**

#### 2.目的

> 保证数据库中数据的正确、有效和完整性**（增强数据的健壮性）**

#### 3.常见约束

| 约束                       | 描述                                                         | 关键字         |
| -------------------------- | ------------------------------------------------------------ | -------------- |
| 非空约束                   | 限制该字段的数据**不能为 null**                              | NOT NULL       |
| 唯一约束                   | 保证该字段的所有数据都是**唯一、不重复**的                   | UNIQUE         |
| 主键约束                   | 主键是**一行数据的唯一标识**，要求**非空且唯一**             | PRIMARY KEY    |
| 默认约束                   | 保存数据时，如果**未指定该字段的值，则采用默认值**           | DEFAULT        |
| 检查约束 (8.0.16 版本之后) | 保证字段值**满足某一个条件**                                 | CHECK          |
| 外键约束                   | 用来让**两张表**的数据之间**建立连接**，保证数据的一致性和完整性 | FOREIGN KEY    |
| 自增约束                   | 用来保证某个字段的值**随数据插入自增**                       | AUTO_INCREMENT |

> 注意：约束施加于表中字段上，所以应在**创建/修改表**的时候对某表的某一字段添加约束

### 约束样例

#### 条件

 <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260320141751955.png" alt="image-20260320141751955"  />

#### SQL展示

<img src="../../../AppData/Roaming/Typora/typora-user-images/image-20260320142909699.png" alt="image-20260320142909699" style="zoom: 49%;" />    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260320143016737.png" alt="image-20260320143016737" style="zoom: 40%;" />

> 上图可见
>
> 1. 主键id字段在插入时并未写入，由于其为自增字段，完全由MySQL自行维护	
> 2. status字段在没有指定其数值时默认为1
>
> tip
>
> 1. 由于name的UNIQUE与NOT NULL以及age的CHECK会报错便不再展示
> 2. :star:由于执行INSERT后MySQL的计数器会**立马自增**，所以**就算插入失败也会自增**，如：在插入了两条数据后（ID=1，ID=2），在**插入第三条数据的时候失败了**，那么在修改并插入成功后，这第三条数据的ID为**4**

### 外键约束

#### 示意图

<img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260320144516340.png" alt="image-20260320144516340"  />

> :star:当添加了外键关联后，在删除/更新数据时，可以保证数据完整性   [详见](#外键的更新行为)

#### 建立外键约束的方法

1. 创建表的时候添加

   ```sql
   CREATE TABLE 表名(
   	字段名 数据类型
       .....
     	[CONSTRAINT 外键名称] FOREIGN KEY (外键字段名) REFRENCES 主表(主表列名)
   );
   ```

2. 修改表的时候添加

   ```sql
   ALTER TABLE 表名 ADD [CONSTRAINT 外键名称] FOREIGN KEY (外键字段名) REFRENCES 主表(主表列名);
   ```

   > :star:注意:star:
   >
   > 1. CONSTRAINT（约束）可加可不加，**加上是为了给你的外键自定义名称**，若是不加则会由MySQL自动生成乱码的名称
   > 2. FOREIGN KEY的( )里面写的是外键创建于该表的哪个字段上，REFENCES（引用、参照）需要指定外键指向的是哪个表中的哪个字段 对应着 REFRENCES 父表(外键指向的字段)
   > 3. **外键字段以及外键所指字段的类型必须是一致的** 不然会报错

3. 示意

      <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260320153159514.png" alt="image-20260320153159514" style="zoom:100%;" />

   > 1. ALTER TABLE确定要操作的表
   > 2. ADD操作添加外键    CONSTRAINT 为添加的外键自定义名称为fk_emp_dept_id
   > 3. FOREIGN KEY(dept_id) 表明外键创建在 dept_id上
   > 4. REFRENCES dept(id)   表明外键指向dept表中的id字段 

     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260320153511200.png" alt="image-20260320153511200" style="zoom:100%;" />    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260320153647978.png" alt="image-20260320153647978" style="zoom:100%;" /><img src="../../../AppData/Roaming/Typora/typora-user-images/image-20260321123000615.png" alt="image-20260321123000615" style="zoom: 50%;" />        

   > dept_id上的蓝色小钥匙就代表有外键  id上的黄色小钥匙代表此字段是该表的主键[^补充]
   >
   > [^补充]: 为了保证数据的一致性，外键所指向的字段一定要是另一个表的主键（唯一且确定，不会产生二义性）

#### 外键的更新行为

| 行为                    | 说明                                                         |
| ----------------------- | ------------------------------------------------------------ |
| NO ACTION               | 当在父表中删除 / 更新对应记录时，首先检查该记录是否有对应外键，如果有则不允许删除 / 更新。(与 RESTRICT 一致) |
| RESTRICT                | 当在父表中删除 / 更新对应记录时，首先检查该记录是否有对应外键，如果有则不允许删除 / 更新。(与 NO ACTION 一致) |
| CASCADE**（级联操作）** | 当在父表中删除 / 更新对应记录时，首先检查该记录是否有对应外键，**如果有，则也删除 / 更新外键在子表中的记录** `(子表与父表同步更改)` |
| SET NULL                | 当在父表中删除对应记录时，首先检查该记录是否有对应外键，如果有则设置子表中该外键值为 null（这就要求该外键允许取 null） |
| SET DEFAULT             | 父表有变更时，子表将外键列设置成一个默认的值 (Innodb 不支持) |

> **行为需在建立外键时确立**，若不写则默认为NO ACTION/RESTRICT
>
> 若想更改外键约束的行为，需先[删除外键](#删除外键)后再重新确立外键

- 行为的确立

  ```sql
  ALTER TABLE 表名
  ADD CONSTRAINT 外键名
  FOREIGN KEY(外键字段)  REFRENCES 父表名(外键所指字段)
  ON UPDATE CASCADE ON DELETE CASCADE;
  #此处为示例，行为的确立为第四行，CASCADE可以改为上表中的任意一个
  ```

#### 删除外键

```sql
ALTER TABLE 表名 DROP FOREIGN KEY 外键名;
```

---

## 五、多表查询

### 多表关系

> 项目开发之中，进行数据库表结构设计时，会根据业务需求及业务模块之间的关系，分析设计表结构，由于业务之间相互关联，所以各个表结构之间也存在着各种练习，具体可以分为以下三类
>
> 1. [一对多（多对一）](#一对多 )
> 2. [多对多](#多对多)
> 3. [一对一](#一对一)

#### 一对多

- 案例：部门与员工的关系
- 关系：一个部门对应多个员工，一个员工对应多个部门
- 实现：在**‘多’**的一方（`子表`）建立外键，指向‘一’的一方（`父表`）的主键
- 一对多样例：一对多样例就是最普通的外键操作，[详见](#外键约束)

#### 多对多

- 案例：学生与课程的关系
- 关系：一个学生可以选择多门课程，一门课程也可以被多个学生选择

- 实现：**建立第三张表作为中间表，中间表中至少有两个外键关联双方主键**[^多对多解释]

> [^多对多解释]:多对多实际上还是在一对多的基础上实现，通过一张中间表实现 多对一对多（多 – 一 –多）的结构

- 多对多样例

  - 代码

    ```sql
    # 多表关系 多对多演示
    CREATE TABLE student(
        id TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(10) NOT NULL,
        no VARCHAR(10) COMMENT '学号'
    );
    
    INSERT INTO student (id, name, no)
    VALUES
    (1, '黛绮丝', '2000100101'),
    (2, '谢逊', '2000100102'),
    (3, '殷天正', '2000100103'),
    (4, '韦一笑', '2000100104');
    
    CREATE TABLE courses(
        id TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(10) NOT NULL
    );
    INSERT INTO courses (name) VALUES ('Java') ,('PHP') ,('MySQL'),('Hadoop');
    
    CREATE TABLE student_courses(
        id TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        student_id TINYINT UNSIGNED,
        courses_id TINYINT UNSIGNED,
        CONSTRAINT fk_student_id FOREIGN KEY(student_id) REFERENCES student(id),
        CONSTRAINT fk_cources_id FOREIGN KEY(courses_id) REFERENCES courses(id)
    )COMMENT '学生_课程中间表';
    INSERT INTO
        student_courses (student_id,courses_id)
    VALUES
        (1,1) ,
        (1,2),
        (1,3),
        (2,2),
        (2,3),
        (3,4)
    ```

  - 可视化演示

       <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260321120330001.png" alt="image-20260321120330001" style="zoom:100%;" />

#### 一对一

- 案例：用户与用户详情关系
- 关系：一对一的关系，用于单表的拆分，将一张表的基础字段放在一张表中，其他详情字段放在另外一张表中，以提升操作效率

- 实现：在任意一方加入外键关联另一方的主键，**并且外键是唯一的（UNIQUE）**

> 详解
>
> 一对一关系本质上是单表，但为了提高操作效率我们将其拆分成两个表，并用外键将两个表关联，普通的外键维持的是一对多的关系，而若是**子表中约束外键也是唯一的就可以维持一对一的关系**
>
> 如下表所示，我们只需要为**userid字段加上UNIQUE约束**，用以**保证一个userid字段只对应着一个父表主键id字段**，就可以实现一对一的关联
>
> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260321121110344.png" alt="image-20260321121110344" style="zoom:100%;" />
>
> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260321121550231.png" alt="image-20260321121550231" style="zoom:100%;" />

- 一对一样例

  - 代码

    ```sql
    #多表查询 一对一演示
    CREATE TABLE tb_user(
        id TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(10) NOT NULL,
        age TINYINT UNSIGNED,
        gender CHAR(1),
        phone CHAR(11)
    )COMMENT '用户基本信息表';
    
    CREATE TABLE tb_user_edu(
        id TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        degree VARCHAR(20),
        major VARCHAR(50),
        primaryschool VARCHAR(50),
        middleschool VARCHAR(50),
        university VARCHAR(50),
        userid TINYINT UNSIGNED UNIQUE,
        CONSTRAINT fk_userid FOREIGN KEY (userid) REFERENCES tb_user(id)
    )COMMENT '用户教育信息表';
    
    -- 插入用户基础数据到 tb_user 表
    insert into tb_user(id, name, age, gender, phone) values
    (null,'黄渤',45,'1','18800001111'),
    (null,'冰冰',35,'2','18800002222'),
    (null,'码云',55,'1','18800008888'),
    (null,'李彦宏',50,'1','18800009999');
    
    -- 插入用户教育经历到 tb_user_edu 表（userid 关联 tb_user 的 id）
    insert into tb_user_edu(id, degree, major, primaryschool, middleschool, university, userid) values
    (null,'本科','舞蹈','静安区第一小学','静安区第一中学','北京舞蹈学院',1),
    (null,'硕士','表演','朝阳区第一小学','朝阳区第一中学','北京电影学院',2),
    (null,'本科','英语','杭州市第一小学','杭州市第一中学','杭州师范大学',3),
    (null,'本科','应用数学','阳泉第一小学','阳泉区第一中学','清华大学',4);
    
    ```

  - 可视化演示

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260321123240716.png" alt="image-20260321123240716" style="zoom: 80%;" />  

    > 可见一对一的可视化界面与一对多基本完全一致，只不过我们为一对一的外键添加了UNIQUE限制

### 多表查询操作

#### 笛卡尔积

> :star2: 笛卡尔积指的是集合A与集合B的所有组合情况，在多表查询时我们也会遇到这个问题，如：表1有4行数据，表2有5行数据，当我们使用SELECT * FROM 表1，表2; 时查询出来的结果是4*5=20条,其中有非常多的冗余数据  **所以在多表查询中我们需要消除无用的笛卡尔积**

- 笛卡尔积示例

      <img src="../../../AppData/Roaming/Typora/typora-user-images/image-20260321124147847.png" alt="image-20260321124147847" style="zoom:100%;" />

  > 如图所示有多处重复，无法精准定位每个人所属部门

- 消除笛卡尔积

  > 只需为SELECT函数加上WHERE限制，将外键值与其关联主键值对应即可

  ```sql
  SELECT 字段列表 FROM 表1,表2 WHERE 表1.外键字段名=表2.外键所指字段名
  ```

     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260321130326830.png" alt="image-20260321130326830" style="zoom:100%;" />

#### 多表查询分类

> **tip：多表查询和外键没有关系，外键只是用来保证数据的完整性和一致性以及构建多表结构的，而多表查询和两个表之间有无外键无关**

##### 连接查询

###### 内连接

- 内连接查询范围

  > **内连接的查询范围是表1和表2相匹配的内容**

- 隐式内连接

  ```sql
  SELECT 字段列表 FROM 表1，表2 WHERE 条件;
  ```

  > 隐式内连接查询即[笛卡尔积](#笛卡尔积)处展示的查询方法
  
- 显示内连接

  ```sql
  SELECT 字段列表 FROM 表1 [INNER] JOIN 表2 ON 连接条件;
  ```

  > [INNER] JOIN ON即为内连接的关键词（INNER可省略）
  >
  > **表1 [INNER] JOIN 表2 表示将表1，表2内连接 内连接后只显示能够匹配上ON后面的条件的值**

  ​                   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260321163444919.png" alt="image-20260321163444919" style="zoom: 40%;" />

> 上面两种查询方式的效果完全相同，但是显示内连接的方式更加直观，更加健壮

###### 外连接

- 查询范围

  > **外连接所查询的范围是主表的全部内容和附表中能够匹配主表的内容**
  >
  > `外连接分为左外连接与右外连接，二者的区别在于主、附的相对位置不同，左外连接的主表位于左边，右外连接的主表位于右边`

- 左外连接

  ```sql
  SELECT 字段列表 FROM 表1 LEFT [OUTER] JOIN 表2 ON 条件; #表1为主表 表2为附表
  ```

  

- 右外连接

  ```sql
  SELECT 字段列表 FROM 表1 RIGHT [OUTER] JOIN 表2 ON 条件; #表2为主表 表1为附表
  ```

- 效果

  ​            <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260321165328266.png" alt="image-20260321165328266" style="zoom: 50%;" />

  > 可见左外连接会显示第十七个人陈友谅，而内连接不会，**原因在于：内连接只会保留两表都满足，能匹配地上的数据，而外连接会保留主表所有的数据与附表中能匹配主表的数据，若是附表中没有能够匹配的数据那么则为主表的那行数据匹配null**
  
   ​             <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260321170454484.png" alt="image-20260321170454484" style="zoom:50%;" />
  
  > 右外同理，只不过主表变为了dept，由于人事部并没有匹配的员工所以匹配null

###### 自连接

- 自连接

  ```sql
  SELECT 字段列表 FROM 表A 别名A [INNER/LEFT/RIGHT] JOIN 表A 别名B ON 条件;
  ```

  > :star2:**自连接实际上是把一张表看成了两张表，然后再对这两张表进行内连接、外连接查询**

- 效果

  ​         <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260321171608883.png" alt="image-20260321171608883" style="zoom:50%;" />

  > **这个案例相当于将emp表分为staff表和boss表，:star:内连接:star:两表查找员工和领导的关系**

  ​         <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260321172204870.png" alt="image-20260321172204870" style="zoom:50%;" />

  > **这个案例就是自连接的:star:外连接:star:查询**

##### 联合查询

- 联合查询

  ```sql
  SELECT 字段列表 FROM 表A...
  UNION(ALL)
  SELECT 字段列表 FROM 表B...; #union合并的两个SELECT结果的字段列表的个数及类型需要一致
  ```

  > UNION:去重+排序 –> 严谨，结果干净，满
  >
  > UNION ALL：不处理重复，不排序 –> 快

##### **子查询**

> 子查询：又称嵌套查询，**在SQL语句中嵌套SELECT语句**

- 基础语法

  ```sql
  SELECT * FROM 表1 WHERE column1=(SELECT column1 FROM 表2)
  ```

  > 子查询外部的语句可以是INSERT/UPDATE/DELETE/SELECT的任意一个

###### 子查询的分类

| 按照子查询结果分类 （注意是子查询返回的结果） | 按照子查询位置分类 |
| --------------------------------------------- | ------------------ |
| 标量子查询（**子查询结果**为单个值）          | WHERE之后          |
| 列子查询（**子查询结果**为一列）              | FROM之后           |
| 行子查询（**子查询结果**是一行）              | SELECT之后         |
| 表子查询（**子查询结果**是多行多列）          |                    |

- 标量子查询

  - 常用操作符： = != > >= < <=

  - 示例

    ​    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260321204855996.png" alt="image-20260321204855996" style="zoom:100%;" />

       <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260321205208435.png" alt="image-20260321205208435" style="zoom:100%;" />

- 列子查询

  - 常用的操作符

    | 操作符 | 描述                                        |
    | ------ | ------------------------------------------- |
    | IN     | 在指定的集合范围之内，多选一                |
    | NOT IN | 不在指定的集合范围之内                      |
    | ANY    | 子查询返回列表中，有任意一个满足即可        |
    | SOME   | 与 ANY 等同，使用 SOME 的地方都可以使用 ANY |
    | ALL    | 子查询返回列表的所有值都必须满足            |

  - 示例

    ​      <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260321210152294.png" alt="image-20260321210152294" style="zoom:50%;" />

    ​		

    ​	   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260321210731366.png" alt="image-20260321210731366" style="zoom: 45%;" />

     

    ​     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260321211424334.png" alt="image-20260321211424334" style="zoom:45%;" />

- 行子查询

  - 常用操作符：= != IN NOT IN

  - 示例

    ​    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260321211917782.png" alt="image-20260321211917782" style="zoom:100%;" />

    > :star:注意:star:：可以使用（字段1,字段2,…）来表示一行的数据  行与行的数据可以用=来判断是否完全相同

- 表子查询

  - 常用操作符 IN

  - 示例

       <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260321212540224.png" alt="image-20260321212540224" style="zoom:100%;" />

      <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260321213027772.png" alt="image-20260321213027772" style="zoom:100%;" />

      <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260321213211178.png" alt="image-20260321213211178" style="zoom:100%;" />

---

## 六、事务

- 事务概念 ： 是一组操作的**集合**，它是一个不可分割的工作单位，事务会把所有的操作作为一个整体一起向系统提交或撤销操作请求，**即这些操作要么同时成功要么同时失败**

- 事务真实案例：转账  如：张三向李四转账1000元，具体分为三步 

  1. 查询张三余额是否大于等于1000
  2. 若满足则减去张三账户里的1000元
  3. 将李四的账户加1000元

  这三步操作为一个整体，当其中一个环节出现问题后所有操作都会失败

   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260322145721659.png" alt="image-20260322145721659" style="zoom:100%;" /> 

  如上图所示，若在张三账户余额-1000后异常导致转账无法完成应当回滚事务加回张三账户的1000元

> 注意：默认MySQL的事务是自动提交的，也就是说，每一条语句都是一个事务，当语句执行后就会被立即提交，而我们想要的效果是将好几条语句作为一个整体事务

### 事务操作

#### 1.改变MySQL的事务提交方式

> MySQL默认是自动提交，即执行完一句就马上提交，我们可以将其设置为手动提交

- 查看/设置MySQL事务提交方式的语法

  ```sql
  SELECT @@autocommit;
  SET @@ autocommit=0;
  ```

- 改变后的操作

  - 提交事务

    ```sql
    COMMIT;
    ```

  - 回滚事务

    ```sql
    ROLLBACK;
    ```

> :star:设置为手动提交后，当执行完SQL语句后，数据库中的数据不会立即改变，需要执行COMMIT指令才能使事务提交，数据库数据改变。若是在SQL语句执行过程中发现程序异常就使用ROLLBACK回滚事务。

#### 2.临时开启事务

- 开启事务语法

  ```sql
  START TRANSACTION; 
  #或者
  BEGIN;  #两种写法均可
  ```

- 开启后操作

  - 提交事务

    ```sql
    COMMIT;
    ```

  - 回滚事务

    ```sql
    ROLLBACK;
    ```
  

> :star:上述两种情况本质上是一致的，第二种方法在开启事务后会改变@@autocommit=0 并且在执行了COMMIT或者ROLLBACK后将autocommit重新变为1
>
> :star:不论是哪种方式都要在执行事务确保成功后再COMMIT，若执行不成功就ROLLBACK

### 事务的四大特性（ACID）

| 特性                  | 核心定义                                                     |
| --------------------- | ------------------------------------------------------------ |
| 原子性（Atomicity）   | 事务是不可分割的最小操作单元，要么全部成功，要么全部失败。   |
| 一致性（Consistency） | 事务完成时，必须使所有的数据都保持一致状态。                 |
| 隔离性（Isolation）   | 数据库系统提供的隔离机制，保证事务在不受外部并发操作影响的独立环境下运行。 |
| 持久性（Durability）  | 事务一旦提交或回滚，它对数据库中的数据的改变就是永久的。     |

### 并发事务问题

- 并发事务

  > A，B等多个事务同时操作同一个数据库

- 并发事务问题

  | 问题       | 描述                                                         |
  | ---------- | ------------------------------------------------------------ |
  | 脏读       | 一个事务读到另外一个事务还没有提交的数据。[^脏读例子]        |
  | 不可重复读 | 一个事务先后读取同一条记录，但两次读取的数据不同，称之为不可重复读。[^不可重复读例子] |
  | 幻读       | 一个事务按照条件查询数据时，没有对应的数据行，但是在插入数据时，又发现这行数据已经存在，好像出现了 “幻影”。[^幻读例子] |

  > [^脏读例子]: 事务A对某数据进行更改后并**未提交**，后该数据被事务B所读取，但由于数据没有被提交，所以数据的**有效性存疑**
  > [^不可重复读例子]:事务A要对同一条数据先后读取两次，但在**第一次读取之后数据被其他事务修改并提交**，导致两次读取到的数据不同
  > [^幻读例子]:事务A在查询数据不存在后准备插入数据，但在**插入数据前此数据已经被其他的事务所插入**，导致A在后续插入数据时报错

### 事务的隔离级别 — 并发事务问题的解决

- 事务的隔离级别

  | 隔离级别                                       | 脏读        | 不可重复读  | 幻读                             |
  | ---------------------------------------------- | ----------- | ----------- | -------------------------------- |
  | Read uncommitted（读未提交）                   | √（存在）   | √（存在）   | √（存在）                        |
  | Read committed（读已提交）                     | ×（不存在） | √（存在）   | √（存在）                        |
  | Repeatable Read（可重复读，MySQL InnoDB 默认） | ×（不存在） | ×（不存在） | √（存在，InnoDB 特殊优化可规避） |
  | Serializable（串行化）                         | ×（不存在） | ×（不存在） | ×（不存在）                      |

  > **从上到下效率变低，安全性变高**
  >
  > :star2::star2::star2:
  >
  > 1. read uncommitted可以读取到未提交的内容，所以会发生脏读
  > 2. read committed限制了只允许读取提交内容，所以不会发生脏读
  > 3. repeatable read加入了锁的机制，相当于保留了一份表的快照，在此模式下去SELECT所查询的都是备份的那一份表的内容，不受其他事务更改表内容的影响，所以不会发生不可重复读。但是由于查询的是备份表，当用另一个事务去插入的时候数据并不能同步到备份表中，而使用INSERT INTO插入时插入的是真实的表，所以会发生幻读现象
  > 4. serializable模式下，当用其他插入时SQL语句不会执行成功，进程会被锁住，要等到当前事务提交后才会执行其他事务的插入，所以不会发生幻读

- 查看事务隔离级别

  ```sql
  SELECT @@TRANSACTION_ISOLATION;
  ```

- 设置事务隔离级别

  ```sql
  SET [SESSION/GLOBAL] TRANSACTION ISOLATION LEVEL [READ UNCOMMITTED / READ COMMITED / REPEATABLE READ / SERIALIZABLE]
  ```

  > SESSION表示针对**当前**客户端窗口有效
  >
  > GLOBAL表示针对**所有**客户端窗口有效

---

# DataBase_Learn（进阶）

## 一、MySQL的存储引擎

### 1.MySQL体系结构

#### 示意图

<img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260325141254135.png" alt="image-20260325141254135" style="zoom:100%;" />

#### 说明

> ### 连接层
>
> 最上层是一些客户端和链接服务，主要完成一些类似于**连接处理、授权认证、及相关的安全方案**。服务器也会为安全接入的每个客户端**验证它所具有的操作权限。**
>
> ------
>
> ### 服务层
>
> 第二层架构主要完成大多数的**核心服务功能**，如 SQL 接口，并完成缓存的查询，SQL 的分析和优化，部分内置函数的执行。所有跨存储引擎的功能也在这一层实现，如过程、函数等。
>
> ------
>
> ### 引擎层
>
> 存储引擎**真正的负责了 MySQL 中数据的存储和提取**，服务器**通过 API** 和存储引擎进行**通信**。`不同的存储引擎具有不同的功能，这样我们可以根据自己的需要，来选取合适的存储引擎。`(可插拔式引擎)
>
> ------
>
> ### 存储层
>
> 主要是将数据**存储**在文件系统之上，并**完成与存储引擎的交互。**

### 2.存储引擎简介

> 存储引擎就是**存储数据、建立索引、更新/查询**等`技术实现方式`。存储引擎是基于表的，而不是基于库的，所以存储引擎也可以称为表类型。

> MySQL 5.5版本后选择了InnoDB为默认存储引擎
>
> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260325142332609.png" alt="image-20260325142332609" style="zoom:50%;" />

#### 相关语法

- 创建表时，指定存储引擎

  ```sql
  CREATE TABLE 表名(
  字段1 类型,
      ...
  )ENGINE=InnoDB;#InnoDB可以换成其他引擎
  ```

- 查询当前数据库支持的存储引擎

  ```sql
  SHOW ENGINES;
  ```

### 3.InnoDB简介

#### 介绍

> InnoDB是一种兼顾高可靠性和高性能的通用存储引擎，在MySQL5.5后，InnoDB是默认的MySQL存储引擎

#### 特点

> 1. DML操作遵循ACID模型，支持**事务**
> 2. **行级锁** ，提高并发访问性能
> 3. 支持**外键**FOREIGN KEY约束，保证数据完整性和正确性

#### 相应磁盘文件

> XXX.ibd: XXX代表表名，InnoDB引擎的每张表都会对应一个表空间文件，存储该表的表结构（frm，sdi）、数据和索引
>
> 参数：innodb_file_per_table;(每一张表都有独立的表空间文件【ibd】)
>
> ​                <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260325144220822.png" alt="image-20260325144220822" style="zoom:33%;" />
>
> > **可见，对于InnoDB引擎的每张表都对应一个ibd文件，且没有对应的sdi（表结构）文件，说明了InnoDB存储表时，表文件被包含在了ibd文件中**
>
> ​       <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260325144805323.png" alt="image-20260325144805323" style="zoom: 33%;" />
>
> > 可以**cd到对应数据库下**，并**执行ibd2sdi指令（从ibd文件中提取表结构文件）**查看某表的sdi文件
> >
> > `tip：sdi是文本文件，由于InnoDB将sdi存储到了ibd文件（二进制文件）内，所以需要提取`

#### InnoDB的逻辑存储结构

- 示意图

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260325145124260.png" alt="image-20260325145124260" style="zoom:100%;" />

- 补充说明

  > 1. InnoDB中Extent（区）的空间是固定的1M，Page（页）的空间也是固定的16K，所以一个区可以包括64页
  > 2. Row中包含的数据为：Trx id（最后一次操作的事务的id） ， Roll pointer（回滚指针）  ， col（字段）

### 4.MyISAM和MEMORY

#### MyISAM

- 介绍

  > MyISAM是MySQL早期的默认存储引擎

- 特点

  > 1. 不支持事务，不支持外键
  > 2. 支持表锁，不支持行锁
  > 3. 访问速度快

- 磁盘文件

  > xxx.sdi：存储表结构
  >
  > xxx.MYD：存储数据
  >
  > xxx.MYI：存储索引
  >
  > <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260325150025160.png" alt="image-20260325150025160" style="zoom:100%;" />

#### MEMORY

- 介绍

  > MEMORY引擎的表数据**存储在内存**中，受硬件、断电等问题的影响，所以只能将这种表作为**临时表或缓存使用**

- 特点

  > 内存存放
  >
  > hash索引（默认）
  >
  > 读取速度快

- 磁盘文件

  > xxx.sdi：存储表结构
  >
  > tip：MEMORY的数据和索引都直接存放在内存里，而不是磁盘里
  >
  > <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260325150619285.png" alt="image-20260325150619285" style="zoom:100%;" />

### 5.（附表）三种存储引擎的对比及选择

#### 三种引擎的对比

<img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260325150815990.png" alt="image-20260325150815990" style="zoom:100%;" />

> 重点在于InnoDB和MyISAM的区别

#### 存储引擎的选择

> 在选择存储引擎时，应该根据应用系统的特点选择合适的存储引擎。对于复杂的应用系统，还可以根据实际情况选择多种存储引擎进行组合。

- InnoDB：是 Mysql 的默认存储引擎，支持事务、外键。如果**应用对事务的完整性有比较高的要求**，**在并发条件下要求数据的一致性**，数据操作除了插入和查询之外，还**包含很多的更新、删除操作**，那么 InnoDB 存储引擎是比较合适的选择。
- MyISAM：如果应用是**以读操作和插入操作为主**，只有**很少的更新和删除操作**，并且**对事务的完整性、并发性要求不是很高**，那么选择这个存储引擎是非常合适的。
- MEMORY：将所有数据保存在内存中，访问速度快，通常用于**临时表及缓存**。MEMORY 的`缺陷`就是**对表的大小有限制，太大的表无法缓存在内存中，而且无法保障数据的安全性。**



---

## 二 、索引

### 1.索引概述

> **索引**（index）是帮助MySQL高效获取数据的**数据结构**（查找树）。在数据外，数据库系统还维护着满足特定查找算法的数据结构，这些数据结构以某种方式指向数据 

- 索引优缺点

  - 优

    1. 提高数据检索的效率，降低数据库的 IO 成本

    2. 通过索引列对数据进行排序，降低数据排序的成本，降低 CPU 的消耗

  - 缺  （相对于优点，缺点影响较小）

    1. 索引列也是要占用空间的
    2. 索引**大大提高了查询效率，同时却也降低更新表的速度**，如对表进行 INSERT、UPDATE、DELETE 时，效率降低

### 2.索引结构

> MySQL的索引在存储引擎层实现，不同的存储引擎有不同的结构

- 常见的索引种类

  | 索引结构                 | 描述                                                         |
  | ------------------------ | ------------------------------------------------------------ |
  | [B+Tree 索引]()          | **最常见**的索引类型，大部分引擎都支持 B+ 树索引             |
  | [Hash 索引](#Hash index) | 底层数据结构是**用哈希表实现的**，`性能高，但是只有精确匹配索引列的查询才有效，不支持范围查询` |
  | R-tree (空间索引)        | 空间索引是 MyISAM 引擎的一个特殊索引类型，主要用于地理空间数据类型，通常使用较少 |
  | Full-text (全文索引)     | 是一种通过建立倒排索引，快速匹配文档的方式。类似于 Lucene, Solr, ES |

- 常见存储引擎对上述索引的支持情况

  | 索引        | InnoDB           | MyISAM   | Memory   |
  | ----------- | ---------------- | -------- | -------- |
  | B+tree 索引 | **支持**         | **支持** | **支持** |
  | Hash 索引   | 不支持           | 不支持   | **支持** |
  | R-tree 索引 | 不支持           | 支持     | 不支持   |
  | Full-text   | 5.6 版本之后支持 | 支持     | 不支持   |



#### B+ tree index

> 对于 **二叉树型的查找树**（红黑树等），当在**大数据量的情况下，层级深，检索速度慢**
>
- :star:解决方法： B树（多路平衡查找树）。

  > <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260326145843472.png" alt="image-20260326145843472" style="zoom:100%;" />
  >
  > :star2:**B树在插入数据时，当一个结点没有可存放的空间了，该结点最中间的那个数据会向上分裂变成其左右部分的父结点,在成为父结点后其在子结点中会被删除，不再出现**




- B+树

  > **B+树是B树的变种**
  >
  > <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260326151101053.png" alt="image-20260326151101053" style="zoom:100%;" />
  >
  > :star2: 不同于B树
  >
  > 1. B+树中的所有数据都存放在叶子结点中，非叶子结点只充当索引的作用
  > 2. B+树中的所有的叶子结点被串成了单链表的形式
  >
  > :star2:在向B+树插入数据时，**同B树**，当一个结点存满了后，中间的数据会向上分裂变为其左右的父结点。**但不同于B树的是**，在其成为父结点后，在子结点中它并不会被删去，而是被保存了下来，并用链表的形式将其左右子结点串了起来



- MySQL中的B+树

  > MySQL中对经典的B+树进行了优化，将叶子结点中的单链表改为了双向循环链表，**便于范围搜索和排序**
  >
  > <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260326153204740.png" alt="image-20260326153204740" style="zoom:100%;" />
  >
  > tip：MySQL中的B+树的结点均存放于 页/块 中  [详见](#InnoDB的逻辑存储结构)



- :star:思考:为什么InnoDB引擎使用了B+树索引？

  > 1. 不使用二叉自平衡树的原因：B+树相较于二叉树的**树高更矮**，在大数据的情况下查询效率更快
  >
  > 2. 不使用B树的原因：
  >
  >    B树所有节点（包括非叶子节点）都存储数据，**这会让单个页能容纳的键值和指针变少，树的高度更高**，查询时磁盘 IO 次数更多，性能下降。
  >
  >    而B+树只有叶子节点存储数据，**非叶子节点只存键和指针**，能在一页中容纳更多键值，树更矮胖，范围查询和顺序访问效率更高，因此成为 MySQL InnoDB 的默认索引结构。
  >
  >    tip：如一张表
  >
  >    | id (索引) | name | age  | address |      |
  >    | --------- | ---- | ---- | ------- | ---- |
  >    | 1         | 张三 | 20   | 北京    |      |
  >
  >    其中id为索引，其他的为数据，（数据占用空间>索引）B树存的话非叶子节点也要存放数据，会占据很多空间，导致存放相同数据的情况下，B树所需空间更大、树高会更高



#### Hash index

- Hash

  > 根据hash函数将键值转换为新的hash值，映射到对应的槽位上，存储在hash表中

- Hash conflict(哈希冲突)

  > 发生哈希冲突时可以通过链表解决，详见数据结构

- Hash索引的特点
  1. Hash 索引只能用于对等比较 (=, in)，不支持范围查询（between, >, <, ...）
  2. 无法利用索引完成排序操作
  3. 查询效率高，通常只需要一次检索就可以了，效率通常要高于 B+tree 索引

- 存储引擎支持

  在 MySQL 中，支持显式 Hash 索引的是**Memory 存储引擎**；而 InnoDB 存储引擎则提供**自适应 Hash 索引**功能，其 Hash 索引会在满足特定条件时，由存储引擎基于 B+Tree 索引自动构建，无需手动创建。

  > **补充**
  >
  > 自适应 Hash 索引是内部优化机制，会**对频繁访问的 B+Tree 索引页自动构建 Hash 索引**，以**加速等值查询**，但对范围查询无帮助。详见：[内存结构](#内存结构)中的自适应哈希索引（Adaptive Hash Index）



### 3.索引分类

| 分类     | 含义                                                 | 特点                     | 关键字   |
| -------- | ---------------------------------------------------- | ------------------------ | -------- |
| 主键索引 | 针对于表中主键创建的索引                             | 默认自动创建，只能有一个 | PRIMARY  |
| 唯一索引 | 避免同一个表中某数据列中的值重复                     | 可以有多个               | UNIQUE   |
| 常规索引 | 快速定位特定数据                                     | 可以有多个               | —        |
| 全文索引 | 全文索引查找的是文本中的关键词，而不是比较索引中的值 | 可以有多个               | FULLTEXT |

> 在一张表中，你只能给一个字段添加PRIMARY KEY约束，所以主键索引只有一个，但是像UNIQUE约束是可以给多个字段添加的



- 在InnoDB中，根据索引的存储形式又可分为以下两种

  | 分类                       | 含义                                                       | 特点                                 |
  | -------------------------- | ---------------------------------------------------------- | ------------------------------------ |
  | 聚集索引 (Clustered Index) | 将数据存储与索引放到了一块，索引结构的叶子节点保存了行数据 | **:star:必须有:star:，而且只有一个** |
  | 二级索引 (Secondary Index) | 将数据与索引分开存储，索引结构的叶子节点关联的是对应的主键 | 可以存在多个                         |

  > 上面学到了B+树的数据全部存放于叶子结点中（[详见](#B+ tree index)），
  >
  > 此处的聚集索引指的是：叶子结点中**将索引于数据存放在一块**
  >
  > 此处的二级索引指的是：叶子结点中**只存放了主键ID**，需要`拿着这个主键ID找到聚集索引存放的叶子节点查询数据`

  - 聚集索引选取规则

    1. 如果存在主键，主键索引就是聚集索引。
    2. 如果不存在主键，将使用第一个唯一（UNIQUE）索引作为聚集索引。【将UNIQUE视为主键】
    3. 如果表没有主键，或没有合适的唯一索引，则 InnoDB 会自动生成一个 rowid 作为隐藏的聚集索引。【将row_id视为主键】

    

  - :star2:示意图:star2:

     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260326163921627.png" alt="image-20260326163921627" style="zoom:100%;" />

    > 此处id是主键，为聚合索引，其叶子结点存放着整行的数据
    >
    > name不是主键，为二级索引，其叶子结点存放着其对应的主键id，当查询到id后再到聚集索引中再找一遍，最终找到数据。**[回表查询]**
    >
    > tip：此处的id是主键，会直接被InnoDB引擎设置为聚合索引，而name需要手动设置为索引（详见：[索引语法](#4.索引语法)中的创建索引）



### 4.索引语法

- 创建索引

  ```sql
  CREATE [UNIQUE | FULLTEXT] INDEX 索引名 ON 表名 (字段1，字段2...);
  #索引名命名规范一般为： idx_表名_字段名
  ```

  > 1. 一个索引可以关联多个字段，若一个索引只关联一个字段，则被称为单列字段。若关联多个字段，被称为联合索引`(组合索引先按照字段1排序，若字段1相同按照字段2排序，以此类推)`
  >
  >    :star:联合索引的使用：[详见](#最左前缀法则)   :star:联合索引的补充：[详见](#单列索引和联合索引补充)
  >
  > 2. 此处CREATE的索引的对象是普通的字段（引擎不会自动对普通字段设置索引），而像主键早已被引擎自动设置为了聚集索引（详见：[索引分类](#3.索引分类)中的聚集索引选取规则）

  

- 查看索引

  ```sql
  SHOW INDEX FROM 表名;
  ```

   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260328115405108.png" alt="image-20260328115405108" style="zoom:100%;" />

  > 可见主键被自动设置为了聚集索引，索引类型是BTREE（实则是b+树，但b+树也是b树的一种）

- 删除索引

  ```sql
  DROP INDEX 索引名 ON 表名;
  ```



### 5. SQL性能分析

> 为了优化SQL语句，我们需要对SQL进行性能分析。由于查询操作所需性能较高，**所以我们需要着重优化查询的SQL语句**，对一个数据库进行分析，若其需要频繁地进行查询，则我们对其进行优化。

#### 各SQL语句的执行频率查询

``` sql
SHOW [SESSION | GLOBAL] STATUS LIKE 'Com_______'; #查询某数据库增、删、改、查的频率  tip:like模糊匹配，后有七个_
```

​             <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260328121508140.png" alt="image-20260328121508140" style="zoom:50%;" />

> **若查询占据了当前数据库的绝大部分，则需要对当前数据库的SQL语句（SELECT）进行优化**

#### 慢查询日志

> 1. 慢查询日志记录了所有执行时间超过指定参数（long_query_time 单位秒，默认10秒）的所有SQL语句的日志，**我们可以通过查询该日志确认该数据库的哪句SQL语句性能不够好**
>
> 2. 慢查询日志默认没有开启，在linux中可以通过修改/etc/mysql/mysql.conf.d/mysqld.cnf（Ubuntu的文件位置）配置文件开启该日志
>
>      <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260328123154504.png" alt="image-20260328123154504" style="zoom:100%;" />
>
>    开启后的日志位置：var/log/mysql/mysql-slow.log(Ubuntu)

#### profile详情



> show profiles能够在做SQL优化时帮我们了解事件都耗费到哪里去了。
>
> 通过@@have_profiling参数可以直到当前MySQL是否支持profile操作，一般而言都是支持的，虽然支持profiling，但一般默认profiling操作都是关闭的，需要手动开启
>
> ```sql
> SET [GLOBAL| SESSION] PROFILING=1;#开启profiling操作
> ```

- 查看每一条指令的耗时情况

  ```sql
  SHOW PROFILES;
  ```

  ​     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260328125246780.png" alt="image-20260328125246780" style="zoom: 67%;" />

- 查看指定query_id的SQL语句各个阶段的耗时情况

  ```sql
  SHOW PROFILES FOR query id(如：query 1);
  ```

  ​             <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260328130741374.png" alt="image-20260328130741374" style="zoom: 33%;" />

- 查看指定query_id的SQL语句的CPU使用情况

  ```sql
  SHOW PROFILE CPU FRO query id(如：query 1);
  ```

  

#### :star:explain执行计划

> EXPLAIN或DESC命令获取MySQL如何执行SELECT语句的信息，包括SELECT语句执行过程中如何连接和连接的顺序

- 语法

  （直接在SELECT前加上EXPLAIN/DESC）

  ```sql
  EXPLAIN/DESC SELECT ...;
  ```

   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260328134809915.png" alt="image-20260328134809915" style="zoom:100%;" />

  > **Id**
  >
  > select 查询的序列号，表示查询中执行 select 子句或者是操作表的顺序 (**id 相同，执行顺序从上到下；id 不同，值越大，越先执行**)。
  >
  > ---
  >
  > 
  >
  > **select_type**
  >
  > 表示 SELECT 的类型，常见的取值有 **SIMPLE**（简单表，即不使用表连接或者子查询）、**PRIMARY**（主查询，即外层的查询）、**UNION**（UNION 中的第二个或者后面的查询语句）、**SUBQUERY**（SELECT/WHERE 之后包含了子查询）等
  >
  > ---
  >
  > 
  >
  > **:star2:type**
  >
  > 表示连接类型，性能**由好到差**的连接类型为` NULL、system、const、eq_ref、ref、range、 index、all。` 
  >
  > :star:type的说明
  >
  > 一般而言**不太可能出现NULL**，只有不访问任何表时才是**NULL**
  >
  > 根据**主键或唯一索引**进行访问会出现**const**
  >
  > 用**非唯一性的索引**进行查询会出现**ref**
  >
  > 当**查询字段建立了索引，但是查询的时候扫描了全部索引才找到**会出现**index**
  >
  > 全表扫描时（**一般是查询的那个字段没有建立索引**）会出现**all**
  >
  > ---
  >
  > 
  >
  > **:star2:possible_key**
  >
  > 显示可能应用在这张表上的索引，一个或多个。
  >
  > ---
  >
  > :star2:**Key**
  >
  > 实际使用的索引，如果为 NULL，则没有使用索引。
  >
  > ---
  >
  > 
  >
  > **:star2:Key_len**
  >
  > 表示索引中使用的字节数，该值为索引字段最大可能长度，并非实际使用长度，在不损失精确性的前提下，长度越短越好。
  >
  > :star2:补充
  >
  > **key_len 可以直接反映「联合索引的利用率」**
  >
  > - `key_len 越大 → 用到的索引列越多 → 过滤越精准 → 查得越快`
  >
  > - `key_len 越小 → 只用了前面几列 → 过滤弱 → 回表 / 扫描更多`
  >
  > - `key_len = NULL → 索引完全没用 → 全表扫描（ALL）`
  >
  > ---
  >
  > **rows**
  >
  > MySQL 认为必须要执行查询的行数，在 innodb 引擎的表中，是一个估计值，可能并不总是准确的。
  >
  > ---
  >
  > **filtered**
  >
  > 表示返回结果的行数占需读取行数的百分比，filtered 的值越大越好。

### 6.索引使用

#### 最左前缀法则

> 最左前缀法则针对的是联合索引（详见：[索引语法](#4.索引语法)的创建索引），其指的是查询从索引最左列开始，并且不跳过索引中的列。若跳过了某一列，或在某一列使用了范围查询（> , <）**索引将部分失效（后面字段索引失效）**

> - 示例说明
>
>   ​         <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260329114355753.png" alt="image-20260329114355753" style="zoom:50%;" />
>
>   > :star2::star2::star2:如上图的idx_user_profession_age_status联合索引，其中profession为最左索引记为**a**，age为中间索引记为**b**，status为最右索引记为**c**。
>   >
>   > **首先要明确用where语句查询时，b=？ c=？ a=？ 、a=？ b=？ c=？是等效的 无关顺序**
>   >
>   > 其次如果想要走索引就必须满足最左前缀法则，即：
>   >
>   > **1.** 如果用了a=？ b=？ c=?那没问题直接走索引。
>   >
>   > **2.** 如果用了 a=? c=? 那么**会走索**引找到所有符合**a=？的结果**，而中间断了b，**那么c=？**的结果会从**a查出来的结果里扫描**  
>   >
>   > **3.** 如果没用a 如b=? c=? 那么就不会走索引，直接**全表扫描**
>   >
>   > **4.**如果使用了**范围查询**，如 a=？ b>？ c=？，那么c就走不了索引，会被b的范围查询断掉
>   >
>   > **4补充：**如何规避范围查询中断索引的情况？ –> 可以使用 **>= 或 <= 这样索引就不会断了**

#### 索引失效的情况

##### 索引列运算

> **在索引上进行运算，索引会失效**
>
> - 示意
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260329122516460.png" alt="image-20260329122516460" style="zoom: 43%;" />
>
>   上表在phone索引上用了substr运算，使得查找方式从const变为了all（全表扫描）

##### 字符串类型的数据不加‘’

> **虽然加不加单引号对查询结果并无影响，但是若不加单引号会使索引失效**
>
> - 示意
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260329122340826.png" alt="image-20260329122340826" style="zoom: 40%;" />
>
>   不加单引号会发生隐式类型转换

##### 模糊查询

> **如果仅仅是尾部模糊匹配，索引不会失效，如果是头部模糊匹配，索引失效**
>
> - 示意
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260329122828446.png" alt="image-20260329122828446" style="zoom:40%;" />
>
>   第一条为尾部模糊匹配，第二条为头部模糊匹配

##### or连接条件

> **用or分割开的条件，如果or的一侧有索引而另一侧没有索引，那么涉及到的索引都会失效**
>
> - 示意
>
>     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260329123350325.png" alt="image-20260329123350325" style="zoom:100%;" />
>
>   上图中的id是主键索引，而age是联合索引其最左索引是profession所以age索引失效，而两者又是用or连接的索引整条索引失效。
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260329123738812.png" alt="image-20260329123738812" style="zoom: 43%;" />
>
>   对age单独建立一个索引就可以解决这个问题



##### 数据分布情况

> **如果MySQL评估使用索引比全表扫描慢，则不会使用索引（一般在小数据量时出现）**
>
> - 示例
>
>     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260329124306612.png" alt="image-20260329124306612" style="zoom:100%;" />
>
>   上图示例数据量较小，且所有数据都要>=‘17799990000’ 所以第二句走的是全表扫描



#### SQL提示

> SQL提示，优化数据库的一个重要手段，简单来说就是在SQL语句中加入一些人为的提示来达到优化操作的目的

> - 示意
>
>    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260329125500444.png" alt="image-20260329125500444" style="zoom:100%;" />
>
>   从上表可见，profession有两个索引（一个为联合索引，一个为单列索引），最终MySQL自动选择了联合索引作为查询过程中使用的索引
>
> - SQL提示语法 (以上图为例)
>
>   - use index （建议使用某个索引）
>
>     ```sql
>     SELECT * FROM tb_user USE INDEX(idx_user_profession) WHERE profession='软件工程';
>     ```
>
>     
>
>   - ignore index （忽略某个索引）
>
>     ```sql
>     SELECT * FROM tb_user IGNORE INDEX(idx_user_profession_age_status) WHERE profession='软件工程';
>     ```
>
>     
>
>   - force index （强制使用某个索引）
>
>     ```sql
>     SELECT * FROM tb_user FORCE INDEX(idx_user_profession) WHERE profession='软件工程';
>     ```
>
>     

#### 覆盖索引

> **尽量使用覆盖索引（查询使用了索引，并且需要返回的列在该索引中已经全部能够找到） 减少SELECT ***

> - 例子：比如说有一个联合索引 idx（a,b,c）  当`select 主键列 a，b，c …where a=？ b=？ c=？`时，a,b,c联合索引构成的b+树的叶子节点处挂的就是**主键值，a，b，c的值**，所以不再需要[回表查询](#3.索引分类)了，**而**若是还要select一个d，由于d的数据并没有在a b c构成的b+树上，所以要回到[聚集索引](#3.索引分类)处查询d的数据
>
> - 示意图
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260329132354781.png" alt="image-20260329132354781" style="zoom: 60%;" />

#### 前缀索引

> 当**字段类型为字符串**（varchar, text等）时，有时候**需要索引很长的字符串**，这会**让索引变得很大**，查询时，**浪费大量的磁盘IO，影响查询效率**。此时可以**只将字符串的一部分前缀，建立索引，**这样可以大大节约索引空间，从而提高索引效率。

> - 语法
>
>   ```sql
>   CREATE INDEX idx_xxx ON 表名(字段名(n));#n即为前缀长度
>   ```
>
>   -  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260329134821429.png" alt="image-20260329134821429" style="zoom:100%;" />
>
>      <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260329135154556.png" alt="image-20260329135154556" style="zoom:100%;" />
>
>     > :star2:上面这个查询案例的email是有重复的，当用idx_user_eamil_5索引查询时会查询到两个结果，查询到两个结果后再回表查询找到唯一符合的那一个
>
> - 如何选择前缀长度？
>
>   - 方法
>
>     可以根据**索引的选择性**（取值0到1）来决定，选择性是指**不重复的索引值（基数）和数据表的记录总数的比值**，索引选择性越高则查询效率越高，唯一索引的选择性是 1，这是最好的索引选择性，性能也是最好的。
>
>   - 求取选择性的语法
>
>     ```sql
>     SELECT COUNT(*) FROM 表名; #求总记录数
>     SELECT COUNT(DISTINCT 字段名) FROM 表名; #求所需要建立索引的字段的非空且不重复的记录数
>     
>     SELECT COUNT(DISTINCT 字段名)/COUNT(*)  FROM 表名; 
>     #将上面两个相除即可得到选择性
>     ```
>
>     上述代码算的是整个字符串的选择性，而若是要求前缀的选择性就要对字符串进行截取
>
>     ```sql
>     SELECT COUNT(DISTINCT SUBSTR(字段名,1,n))/COUNT(*)  FROM 表名;
>     #可以不断地去试n 直到找到合适的前缀长度
>     ```
>
>     > 原理：distinct配合count会把重复的结果去掉，而刚好重复的结果是无法做出区分的，用这个数除以记录总数就可以得知这个前缀长度的区分度好不好
>
>   - 示意
>
>     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260329134705696.png" alt="image-20260329134705696" style="zoom:33%;" />



#### 单列索引和联合索引补充

> 在业务中，如果存在多个查询条件，考虑针对查询字段建立索引时，建议建立联合索引而非单列索引。
>
> 而在多条件联合查询时，MySQL会评估哪个字段索引效率更高并选择该索引完成查询，由于有单列索引的干扰，其可能不会选择联合索引，此时我们就可以用SQL提示选择联合索引
>
> -  示意<img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260329140440663.png" alt="image-20260329140440663" style="zoom:80%;" />
>
>   上图中name和phone都有单列索引，但是查询时只用到了phone的索引，这就不可避免地会出现name的回表查询 [详见](#覆盖索引)
>
>    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260329140800763.png" alt="image-20260329140800763" style="zoom:50%;" />
>
>   创建联合索引之后MySQL仍是选择phone的单列索引，所以我们可以用[SQL提示](#SQL提示)优化选择如下图
>
>    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260329141013774.png" alt="image-20260329141013774" style="zoom:100%;" />
>
> - 联合索引示意图
>
>    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260329141800386.png" alt="image-20260329141800386" style="zoom: 80%;" />



### 7.索引的设计原则

| 序号 | 核心要点                              | 原理补充                                                     |
| ---- | ------------------------------------- | ------------------------------------------------------------ |
| 1    | 大表（数据百万级别） + 高频查询建索引 | 小表全表扫描成本极低，建索引反而增加维护开销；大表全表扫描 IO 成本极高，索引能大幅加速查询 |
| 2    | where/order by/group by 字段建索引    | 索引天然有序，可直接用于排序 / 分组，避免`filesort`；where 条件可通过索引快速过滤数据 |
| 3    | 高区分度 + 唯一索引优先               | 区分度 = 不重复值 / 总记录数，越接近 1 索引**过滤性越强**；唯一索引强制唯一性，选择性为 1，性能最优 |
| 4    | 长字符串建前缀索引                    | 减少索引空间占用，提升查询效率，但需平衡前缀长度与选择性，避免回表过多 |
| 5    | 优先联合索引，减少单列索引            | 联合索引可实现覆盖索引，避免回表；遵循最左前缀原则，一个索引可覆盖多个查询场景，减少冗余 |
| 6    | 控制索引数量                          | 索引会增加`INSERT/UPDATE/DELETE`的维护成本，每写操作需同步更新所有相关索引树 |
| 7    | 索引列加 NOT NULL 约束                | NULL 值会影响优化器索引选择，且 InnoDB 中 NULL 需要额外存储，降低索引效率 |

---

## 三、SQL优化

### 1.插入优化

#### 批量操作

> 每一次insert都需要都需要与数据库建立联系，建议使用批量插入，**但注意**，一次插入的数据最好不要超过一千行
>
> ```sql
> INSERT INTO 表名 VALUES (...),(...) ... ;
> ```

#### 手动提交事务

> 由于建议不要一次插入超过一千行，所以当多次插入大量数据时**若使用自动提交**每执行一条insert就提交一次事务会与数据库频繁建立连接。 **综上建议手动开启事务并一次性提交**
>
> ```sql
> START TRANSACTION / BEGIN;
> INSERT INTO ... VALUES ...;
> INSERT INTO ... VALUES ...;
> INSERT INTO ... VALUES ...;
> COMMIT;
> ```

#### 主键顺序插入

> **主键顺序插入的效率高于乱序插入** （详见：[页分裂](#页分裂) ）

#### 极大的数据插入 — load

> 如果一次性需要插入极大批量的数据，使用insert语句的性能较低，此时可以使用**MySQL数据库提供的load指令**进行插入 （如：100w行数据 insert要10m load要16s）
>
> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260330204955366.png" alt="image-20260330204955366" style="zoom:100%;" />
>
> 本地文件的数据用符号（， ：等都行）分割开，与表头一一对应，即可用load读取到表中
>
> - load使用步骤
>
>   1. 客户端连接时要加上 –local-infile (表示客户端连接时需要加载本地文件)
>
>      ```sql
>      mysql --local-infile -u root -p 
>      ```
>
>       <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260330210140831.png" alt="image-20260330210140831" style="zoom:100%;" />
>
>   2. 设置全局参数local_infile=1
>
>      ```sql
>      SET GLOBAL local_infile=1;
>      ```
>
>         <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260330210232010.png" alt="image-20260330210232010" style="zoom:50%;" />
>
>   3. 执行load指令将准备好的数据导入表中
>
>      ```sql
>      LOAD DATA local infile '文件名' INTO TABLE ‘表名’ fields terminated by',' lines terminated by'\n';
>      ```
>
>      > **上述指令表示要将数据从‘文件名’插入到‘表名’ 中，文件中的数据 每列以‘，’分隔，每行以‘\n’分隔**

### 2.主键优化

> InnoDB存储引擎中，表数据是根据**主键顺序组织存放的**，这种存储方式被称为**索引组织表**（index organized table **IOT**）
>
> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260330212032915.png" alt="image-20260330212032915" style="zoom:100%;" />
>
> 主键顺序存放就是叶子节点（存放行数据） 是根据主键顺序排好的

#### 页分裂

> 1. 上图中的所有结点都是存储在 ‘页’（Page） 里面的  （详见：[InnoDB的逻辑存储结构](#InnoDB的逻辑存储结构)）
>
> 2. 在InnoDB中 页可以为空，若页不为空，那么页会包含**2-N**行的数据**（充分利用空间，增快IO速度）**，根据主键排列  
>
> 3.  根据前面两条，由于页中的数据是根据主键排列的，**所以当主键顺序插入时正好顺着主键由小到大插入进去。**（图1）    **而当乱序插入时，页中的数据需要调整结构状态再进行插入（该现象就被称为:star:页分裂:star:），所以乱序插入会浪费更多的时间，效率更低** （图2、3）<img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260330212754499.png" alt="image-20260330212754499" style="zoom:100%;" />
>
>      <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260330213140448.png" alt="image-20260330213140448" style="zoom: 67%;" />
>
>      <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260330213220030.png" alt="image-20260330213220030" style="zoom:100%;" />

#### 页合并

> 当删除一行记录时，**实际上记录并没有被物理删除**，只是被标记为删除并允许该空间允许被其他数据锁覆盖。  **当删除的记录达到了MERGE_THRESHOLD（默认为页的50%），InnoDB会开始寻找相邻的页并尝试合并页，以达到优化空间的效果**
>
> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260330213644435.png" alt="image-20260330213644435" style="zoom:100%;" />
>
> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260330213707716.png" alt="image-20260330213707716" style="zoom:100%;" />
>
> tip：merge_threshold参数是可以更改的

#### 主键设计原则

> **1. 满足业务的情况下，尽量降低主键的长度**
>
> :star2:原因：二级指针的叶子结点处存放的是主键的索引，用以回表查找。**若主键长度过长会占用大量磁盘空间且浪费大量磁盘IO**
>
> **2. 插入数据时尽量选择顺序插入，选择`AUTO_INCREMENT`自增主键,防止页分裂的发生**
>
> **3. 尽量不要使用UUID（不重复的随机字符串）或其他自然主键（如：身份证号）  原因：此类主键是无序的**
>
> **4.业务操作时尽量不要对主键进行修改（修改主键需要动聚集索引，代价大）**

### 3.order by 优化

> MySQL中排序方式分为以下两种
>
> ①. **Using filesort**：通过**表的索引或全表扫描**，读取满足条件的数据行，然后**在排序缓冲区sort buffer中完成排序操作**，所有不是通过索引直接返回排序结果的排序都叫 FileSort 排序。 
>
> ②. **Using index**：通过有序**索引顺序扫描直接返回有序数据**，这种情况即为 using index，不需要额外排序，操作效率**高**。

#### 优化情况

> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260401181612922.png" alt="image-20260401181612922" style="zoom:50%;" /> 
>
> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260401181743998.png" alt="image-20260401181743998" style="zoom:100%;" />
>
> 由图一可知，**表中并没有age和phone的索引，所以此处采用filesort的排序方式**
>
> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260401181910291.png" alt="image-20260401181910291" style="zoom:100%;" />
>
> 当创建了age和phone的**联合索引**后，就采用**using_index的排序方式，效率高**
>
> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260401182241135.png" alt="image-20260401182241135" style="zoom:100%;" />
>
> 由于联合索引建立时**age为最左的索引**，**此处使用phone违背了最左前缀法则，所以会出现using filesort**
>
> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260401182622708.png" alt="image-20260401182622708" style="zoom:100%;" />
>
> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260401182637120.png" alt="image-20260401182637120" style="zoom:100%;" />
>
> :star:上面两图对比可得出：若**age和phone的排序方式不同**也会用到using filesort
>
> :star2::star2:原因：idx_user_age_phone这个索引的**子结点数据是按照age升序排列**，**当age相同时按照phone升序排列** ，当我们order by时age和phone的排序方式是相同时，就直接走一遍索引（如果是逆序就逆着扫描 【Backward index scan】）， **而当不同时，会优先按照最左前缀的排序方式扫描一遍索引，当扫描完后再把扫描后的结果再filesort一遍** 
>
> :star2:结论：当联合索引order by后的排序方式和创建索引时排序方式**全部相同或全部相反时**直接扫一遍索引即可，若**部分不同**则会出现filesort
>
> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260401182846239.png" alt="image-20260401182846239" style="zoom:100%;" />
>
> > 创建时指定 升/降序
> >
> > <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260401183732661.png" alt="image-20260401183732661" style="zoom:100%;" />
> >
> > <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260401183748429.png" alt="image-20260401183748429" style="zoom:100%;" />
>
> 
>
> :star2::star2::star2:索引排序(using index) 前提: SELECT需要[覆盖索引](#覆盖索引)
>
> ​        :star2:原因：用覆盖索引时不需要回表查询，直接扫描索引就可以得到数据。

#### 总结及注意事项

> 1. 根据排序字段建立合适的索引，多字段排序时，也遵循[最左前缀法则](#最左前缀法则)。
>
> 2. 尽量使用[覆盖索引](#覆盖索引)。
>
> 3. 多字段排序，一个升序一个降序，此时需要**注意联合索引在创建时的规则（ASC/DESC）。**
>
> 4. 如果不可避免的出现 filesort，**大数据量排序时，可以适当增大排序缓冲区大小 sort_buffer_size (默认 256k)。** 原因：如果缓冲区不够大会用到磁盘空间 影响性能



### 4.group by 优化

#### 优化情况

> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260401185218393.png" alt="image-20260401185218393" style="zoom:100%;" />
>
> 在没有索引时使用group by 会有**using temporary**（使用临时表） 效率低
>
> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260401185423582.png" alt="image-20260401185423582" style="zoom:100%;" />
>
> 创建联合索引后会**using index**
>
> :star:原因：索引的叶子节点数据本就排好序，已经相当于分好组了（相同组的都排在一起），**如果没有索引就需要全表扫描去分组**
>
> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260401185722916.png" alt="image-20260401185722916" style="zoom:100%;" />
>
> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260401185808734.png" alt="image-20260401185808734" style="zoom:100%;" />
>
> 同样需要满足**最左前缀法则**
>
> tip：在group by之前的where处出现profession也同样满足最左前缀法则
>
> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260401190049210.png" alt="image-20260401190049210" style="zoom:100%;" />
>
> :star:原因：where中出现**最左前缀并筛选后的结果仍是有序的** 既然有序那就是分好组的



### 5.limit 优化

#### 需要优化的原因

> 当数量极大时，如：limit 100000.10 ，MySQL需要找到从100000条记录开始的后十条，遍历前100000条记录的时间开销极大

#### 优化方法

> [覆盖索引](#覆盖索引)+[子查询](#子查询)的方式优化
>
> 不要扫描无用行，只定位目标行的位置，再回表取数据
>
> 即：**先用索引快速找到起始主键 → 再 JOIN 取完整行**
>
> - 示例
>
>   ```sql
>   SELECT t.* 
>   FROM t
>   JOIN (SELECT id FROM t ORDER BY id LIMIT 100000,10) AS tmp
>   ON t.id = tmp.id;
>   ```
>
>   > `SELECT id FROM t ORDER BY id LIMIT 100000,10`作为子查询，运用了覆盖索引 不需要每条都回表查询。
>   >
>   > 在用了覆盖索引后，返回的结果为一张表，再用多表查询查询相应的数据。



### 6.count 优化

> InnoDB引擎在执行count（*）时会把数据一行一行的读出来然后累计计数，当数据量大了后影响效率

#### 优化思路

> 目前没有特别好的优化方法，优化思路为**自己计数**

#### count的几种用法

> count () 是一个聚合函数，对于返回的结果集，一行行地判断，如果 count 函数的参数**不是 NULL**，累计值就加 1，否则不加，最后返回累计值。
>
> 用法：count（*）、count（主键）、count（字段）、count（1）
>
> | 写法             | 底层执行动作（InnoDB + 服务层）                              | 是否取值      | 是否判空            | 性能等级               |
> | ---------------- | ------------------------------------------------------------ | ------------- | ------------------- | ---------------------- |
> | **COUNT(\*)**    | **优化器特殊优化**：InnoDB 只遍历索引 / 表，不读取任何字段数据，直接向服务层反馈 “行存在”。服务层直接累计。 | ❌ 不取值      | ❌ 不判空            | **最快 (S 级)**        |
> | **COUNT(1)**     | InnoDB 遍历整张表，但**不读取字段值**，只返回 “行存在” 的信号给服务层。服务层手动填充 1 并累计。（count（0/-1…）效果一致） | ❌ 不取值      | ❌ 不判空            | **次快 (A 级)**        |
> | **COUNT (主键)** | InnoDB 遍历整张表，**读取主键 ID**（因为主键索引包含主键，只需读索引即可），返回给服务层。服务层确认非空后累加。 | ✅ 取值 (主键) | ❌ 不判空 (主键非空) | **中等 (B 级)**        |
> | **COUNT (字段)** | **分两种情况**：1. **有 NOT NULL**：InnoDB 读字段值，直接累加，无需判空。2. **无 NOT NULL**：InnoDB 读字段值，服务层必须判断是否为 NULL 再累加。 | ✅ 取值 (字段) | ⚠️ 需判空            | **较慢 (C 级 / B 级)** |

### 7.update的优化（避免行锁升级为表锁）

> 在开启事务后进行update，事务提交前数据都不会变更（update的那一行会被行锁锁住）。
>
> 但是注意：当update的字段没有索引时，行锁会被升级为表锁
>
> :star2:原因：update某一行某一字段数据时需要先找到那一行的数据，**当有索引时**，直接根据索引就可以找到那一行的那一字段，找到后用行锁锁住即可   **但是没有索引时**，**想要查找到需要修改的行就需要全表查找**，InnoDB 无法提前知道哪行符合条件，所以要**把整张表给锁住**， 当整张表锁住后，在其他的事务想要修改某一行某一字段的数据时就无法成功，这样**事务并发的访问性就降低了 **  [详见](#行级锁)



## 四、视图/存储过程/触发器

### 1.视图

> 视图是一种**虚拟存在的表**。视图中的**数据并不在数据库中实际存在**，行和列的**数据**来自定义视图的查询中的表，并且是在**使用视图时动态生成的**
>
> :star:简单而言，**视图不存储任何数据，仅仅是一条 SELECT 语句的别名。当我们对某个视图进行操作时，会执行其对应的select语句动态生成数据。若向视图中插入数据，实际上是插入到了视图对应的表中**

#### 视图的操作语法

> - 创建
>
>   ```sql
>   CREATE [OR REPLACE] VIEW 视图名称[(列名列表)] AS SELECT 语句 [WITH [CASCADED | LOCAL] CHECK OPTION ];
>   ```
>
> - 查询(查询语句和表的查询一致)
>
>   ```sql
>   SHOW CREATE VIEW; 视图名称 #查询创建视图语句
>   SELECT * FROM ;视图名称 #查看视图数据
>   ```
>
> - 修改
>
>   - 方式一
>
>     ```sql
>     CREATE [OR REPLACE] VIEW 视图名称[(列名列表)] AS SELECT ... [WITH[CASCADED | LOACAL ] CHECK OPTION] ;#同创建，但注意 修改视图时主要依靠 or replce 所以一般不省略 or replace
>     ```
>
>   - 方式二
>
>     ```sql
>     ALTER VIEW 视图名称[(列明列表)] AS SELECT ... [WITH[CASCADED | LOACAL ] CHECK OPTION];
>     ```
>
> - 插入数据 （同表）
>
>   ```sql
>   INSERT INTO 视图名称[(列名列表)] VALUES ...;
>   ```
>
>   
>
> - 删除
>
>   ```sql
>   DROP VIEW [IF EXISTS] 视图名称1 ，视图名称2 ...;
>   ```
>
>   

#### 检查选项（cascaded、local）

##### 例子

> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260403191617986.png" alt="image-20260403191617986" style="zoom:100%;" />
>
> **如上图，由于视图只是select的一个别名，所以该视图只会显示id<=10的数据，当我们向视图中插入id为20的Tom时，Tom成功被插入了student表中，但是视图中并不会显示这一行**
>
> 如何解决这种问题，以保证一致性？ —》  检查选项 
>
> ```sql
> CREATE [OR REPLACE] VIEW 视图名称[(列名列表)] AS SELECT ... [WITH[CASCADED | LOACAL ] CHECK OPTION]  # with后面的casecaded check option即为cascaded检查
> ```
>
> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260403192210862.png" alt="image-20260403192210862" style="zoom:100%;" />
>
> 当加入cascaded check option后当插入数据不符合视图对应的select语句时就会报错

##### 概念

> 当使用**WITH CHECK OPTION子句创建视图时**，MySQL会通过视图**检查正在更改的每个行**，例如 插入，更新，删除，以使其符合视图的定义。 MySQL允许基于另一个视图创建视图，（当检查模式为cascaded【级联】时）它还会检查依赖视图中的规则以**保持一致性。**为了确定检查的范围，mysql提供了两个选项： CASCADED 和 LOCAL ，**默认值为 CASCADED 。**
>
> - ###### :star2::star2::star2:cascaded和local的区别
>
>   ###### cascaded
>
>   ```sql
>   CREATE VIEW V1 AS SELECT ... 表A  WHERE id<=20;
>   CREATE VIEW V2 AS SELECT ... FROM V1 WHERE id>=10 WITH CASCADED CHECK OPTION;
>   ```
>
>   上面的例子中创立了视图v1映射表a的select语句但并未对v1做cascaded检查，但是创建了视图v2映射v1的select语句加上了cascaded检查。  **此时MySQL会自动为视图v1加上cascaded检查，也就是说当你插入一行数据时，MySQL会检查这个数据的id是否大于等于10且小于等于20**
>
>    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260403193826173.png" alt="image-20260403193826173" style="zoom:100%;" />
>
>    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260403194311820.png" alt="image-20260403194311820" style="zoom:100%;" />
>
>   由上面两图可见，v2依赖于v1，所以检查完v2的条件还会检查v1的条件
>
>    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260403194816740.png" alt="image-20260403194816740" style="zoom:100%;" />
>
>   当再创建一个依赖于v2的v3（不含检查选项），插入>15的数据是可行的。
>
>   **由此说明MySQL的检查是从后向前的  :star: v3（没有检查选项，所以不检查） –> v2(有检查选项，检查) –> v1(由于v2有检查选项，所以也检查)  :star2:以此类推：比如有n张视图每一张都依赖于前一张，只要第n张加了cascaded检查 前面的n-1张就都要检查**
>
>   ###### local
>
>   有了上述cascaded的详解，local的特性就很简单了，local只会检查当前视图的约束条件，**并不会强制为其依赖的视图加上检查选项。**若是其依赖的视图有限制，那就检查；无限制就不检查。

#### 更新及作用

##### 更新

> 要使视图可更新（插入数据），视图中的行与基础表中的行之间**必须存在一对一的关系**。如果视图包含以下任何一项，则该视图不可更新：
>
> 1. 聚合函数或窗口函数（SUM ()、MIN ()、MAX ()、COUNT () 等）
> 2. DISTINCT
> 3. GROUP BY
> 4. HAVING
> 5. UNION 或者 UNION ALL
>
> 除了以上五种还有其他情况，**总而言之就是视图中不可以出现所依赖的表中没有出现的字段（列）**

##### 作用

> ➤ **简单** 视图不仅可以简化用户对数据的理解，也可以简化他们的操作。那些被经常使用的查询可以被定义为视图，从而使得用户不必为以后的操作每次指定全部的条件。 
>
> ➤ **安全** 数据库只能授权用户能否读取某张表，不能更具体地授权用户能否读取某张表中的某个字段，通过视图我们可以把我们想让用户看到的字段映射成一张表，再授权用户读取视图的权利用以实现更细致的权限分配
>
> ➤ **数据独立** 视图可帮助用户屏蔽真实表结构变化带来的影响，当底层基表的结构发生变化（比如列名修改、表拆分、字段新增 / 删除）时，只需要**修改视图的定义**，应用程序的代码完全不需要改动



### 2.存储过程

> 存储过程是事先经过编译并存储在数据库中的**一段 SQL 语句的集合**，调用存储过程可以简化应用开发人员的很多工作，减少数据在数据库和应用服务器之间的传输，对于提高数据处理的效率是有好处的。 
>
> 存储过程思想上很简单，**就是数据库 SQL 语言层面的代码封装与重用。**
>
> 特点
>
> - 封装，复用
>
> - 可以接收参数，也可以返回数据
>
> - 减少网络交互，效率提升
>
> **:star:存储过程类似自定义函数；类似于linux的shell脚本**



#### 存储过程操作语法

> - 创建
>
>   ```sql
>   CREATE PROCEDURE 存储过程名称([参数列表])
>   BEGIN
>      ...
>      ... (SQL语句)
>   END;
>   ```
>
> - 调用
>
>   ```sql
>   CALL 存储过程名称([参数]);
>   ```
>
> - 查看
>
>   - 查询指定数据库的全部存储过程及其状态信息
>
>     ```sql
>     SELECT * FROM INFORMATION_SCHEMA.ROUTINE WHERE ROUTINE_SCHEMA='数据库名称';
>     ```
>
>   - 查询某个存储过程的定义
>
>     ```sql
>     SHOW CREATE PROCEDURE 存储过程名;
>     ```
>
>     
>
> - 删除
>
>   ```sql
>   DROP PROCEDURE 存储过程名称;
>   ```
>
> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260406102055659.png" alt="image-20260406102055659" style="zoom:100%;" />
>
> **注意：**在终端界面创建存储过程时，由于SQL语句结尾的‘；’会被直接识别为结束 所以**无法读取到end；**
>
> **解决方法：**通过关键词 **‘delimiter’**重新定义结束符
>
> ```sql
> dilimiter $$   #重新定义结束符为 $$ 这样当读取到$$才会结束，而不是‘;’
> CREATE PROCEDURE P1()
> SELECT COUNT(*) FROM student ;
> end$$
> ```

#### 变量

##### 系统变量

> 系统变量是由MySQL服务器提供的，不是用户自定义的，属于服务器层面。分为全局变量（GLOBAL）、会话变量（SESSION）

> - 查看系统变量
>
>   ```sql
>   SHOW [SESSION / GLOBAL] VARIABLES; #查看所有系统变量
>   SHOW [SESSION / GLOBAL] VARIABLES LIKE '...'; #模糊匹配
>   SELECT @@[SESSION / GLOBAL].系统变量名; #准确查找
>   ```
>
>   以上三种方式的**默认查询范围是session**
>
> - 设置系统变量
>
>   ```sql
>   SET [SESSION / GLOBAL] 系统变量名=值;
>   SET @@[SESSION / GLOBAL]系统变量名=值;
>   ```
>
>   TIP:MySQL服务重启之后，所有设置的全局参数都会变回默认值，想要永久修改需要修改linux中相应的配置文件

##### 用户自定义变量

> 用户定义变量 是用户根据需要自己定义的变量，用户变量不用提前声明，在用的时候直接用 **"@变量名"** 使用就可以，其作用域为当前连接（session）。

> - 赋值
>
>   - set赋值
>
>     ```sql
>     SET @变量名1[:]=值1,@变量名2[:]=值2 ...; #推荐使用 := 赋值 区分比较的=
>     ```
>
>   - select赋值
>
>     ```sql
>     SELECT @变量名1[:]=值1,@变量名2[:]=值2 ...;
>     #或
>     SELECT ... INTO 变量名 FROM 表名; #将某表的查询结果设为变量
>     ```
>
>     
>
> - 使用
>
>   ```sql
>   SELECT @变量名;
>   ```
>
> tip:用户自定义的变量是不需要声明的，直接赋值即可。若使用时没有进行赋值 拿到的值为NULL

##### 局部变量

> 局部变量是根据需要定义的在局部生效的变量，访问之前，需要**DECLARE声明**。可用作**存储过程内的局部变量和输入参数**，**局部变量的范围是在其内声明的BEGIN ... END块**。

> - 声明
>
>   ```sql
>   DECLARE 变量名 变量类型[DEFAULT...]; #default表示默认值(初始值)
>   ```
>
>   变量类型：详见[（附）表中数据类型的分类](#（附）表中数据类型的分类)
>
> - 赋值
>
>   ```sql
>   SET 变量名[:]=值;
>   #或
>   SELECT ... INTO 变量名 FROM 表名;
>   ```
>
> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260406110644296.png" alt="image-20260406110644296" style="zoom:50%;" />

#### 参数

| 类型  | 含义                                                         | 备注 |
| ----- | ------------------------------------------------------------ | ---- |
| IN    | 该类参数作为输入，也就是需要调用时传入值                     | 默认 |
| OUT   | 该类参数作为输出，也就是该参数可以作为返回值  **tip：out参数初始值为NULL** |      |
| INOUT | 既可以作为输入参数，也可以作为输出参数                       |      |

> - 语法
>
>   ```sql
>   CREATE PROCEDURE 存储过程名([IN/OUT/INOUT] 参数名 参数类型)
>   BEGIN
>   ...
>   END;
>   ```
>
>     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260406124049564.png" alt="image-20260406124049564" style="zoom: 45%;" />

#### 条件判断

##### if

> ```sql
> IF 条件1 THEN
> ...
> ELSEIF 条件2 THEN
> ...
> ELSE
> ...
> END IF;
> ```
>
> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260406123708553.png" alt="image-20260406123708553" style="zoom: 50%;" />


##### case

> 详见：[流程控制函数](#4.流程控制函数)
>
> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260406130308837.png" alt="image-20260406130308837" style="zoom:67%;" />

#### 循环

##### while

> ```sql
> WHILE 条件 
> DO
> ...
> END WHILE
> ```
>
> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260406132047383.png" alt="image-20260406132047383" style="zoom:50%;" />
>
> > **out的初始值为NULL**  如果此处的inout sum改为 out sum 那么最终的输出结果为NULL 因为NULL加任何数都为NULL。

##### repeat

> ```sql
> REPEAT
>  ...
>  UNTIL 条件
> END REPEAT;
> ```
>
> 不同于while满足某条件时一直循环 repeat是当不满足某条件时退出循环
>
> :star:repeat类似于C/Cpp中的do while循环 都至少会执行一次

##### loop

> - LEAVE（类似C/Cpp中的break）
> - ITERATE(类似C/Cpp的continue)
>
> - 语法
>
>   ```sql
>   [begin_lable:] LOOP
>   ...
>   END LOOP[end_lable];
>   ```
>
>   在loop循环中需要借助leave和iterate去控制循环的满足条件和结束条件
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260406134054809.png" alt="image-20260406134054809" style="zoom:50%;" />
>
>   为loop取名 在使用leave 和 iterate的时候用这个名字跳转

#### 游标 – cursor

> 游标（CURSOR）是用来**存储查询结果集的数据类型**，在存储过程和函数中可以使用游标对结果集进行循环的处理。游标的使用包括**游标的声明、OPEN、FETCH 和 CLOSE**

> - 游标语法
>
>   - 声明游标
>
>     ```sql
>     DECLARE 游标名称 CURSOR FRO 查询语句;
>     ```
>
>   - 打开游标
>
>     ```sql
>     OPEN 游标名称;
>     ```
>
>   - 获取游标记录
>
>     ```sql
>     FETCH 游标名称 INTO 变量1，变量2...;
>     ```
>
>   - 关闭游标
>
>     ```sql
>     CLOSE 游标名称;
>     ```
>
> - 案例
>
>    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260406134900934.png" alt="image-20260406134900934" style="zoom:100%;" />
>
>     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260406141345177.png" alt="image-20260406141345177" style="zoom:100%;" />
>
>   > :star2:注意:star2:
>   >
>   > 1. 游标的声明需要在普通变量的后面  
>   >
>   > 2. 所有的声明语句需要在存储过程的最前面的部分
>   >
>   > 3. 若没有handler程序会报错（while true死循环），上图中的handler含义为：**当MySQL抛出的状态码满足‘02000’开头时就exit（退出）并close test（关闭游标）**
>   >
>   > 4. ```sql
>   >    declare exit handler for SQLSTATE '02000' close test;
>   >    #除了这种写法 还可以写为
>   >    declare exit handler for NOT FOUND close test;
>   >    ```
>   >
>   >    详见：[条件处理程序](#条件处理程序)

#### 条件处理程序

> **条件处理程序**用于定义在流程控制执行过程中，遇到特定错误、警告或 “未找到数据” 等情况时的响应逻辑。最典型的应用场景是**游标（Cursor）遍历结束**时，触发 `NOT FOUND` 来终止循环。

> - 语法
>
>   ```sql
>   DECLARE handler_action HANDLER FOR condition_value1,condition_value2... statement;
>   ```
>
>    :star2:<img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260406140734145.png" alt="image-20260406140734145" style="zoom:100%;" />
>
>   **当MySQL抛出的状态码满足某个条件时就执行exit/continue**

#### 存储函数

> 存储函数更加类似于C/Cpp中的自定义函数
>
> 1. 存储函数是有返回值的
> 2. 存储函数的参数列表是只能传入的（只有in，没有out）

> - 语法
>
>   ```sql
>   CREATE FUNCTION 存储函数名([参数列表])
>   RETURNS type [characteristic] #声明返回值的类型信息 characteristic是额外的信息
>   BEGIN
>   	... # SQL语句
>   	RETURN...;
>   END;
>   ```
>
>     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260406142541057.png" alt="image-20260406142541057" style="zoom:100%;" />
>
>      <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260406143618503.png" alt="image-20260406143618503" style="zoom:50%;" />



### 3.触发器

> 触发器是**与表有关的数据库对象**，指在 **insert/update/delete 之前或之后**，**触发并执行触发器中定义的SQL语句集合。**触发器的这种特性可以协助应用在数据库端**确保数据的完整性，日志记录，数据校验等操作 。** 使用**别名 OLD 和 NEW 来引用触发器中发生变化的记录内容**，这与其他的数据库是相似的。现在MySQL中触发器还只支持行级触发，不支持语句级触发。
>
> > 行级触发和语句级触发：如执行了一条update语句影响了表中5行数据，若是行级触发器，触发器就会被触发五次。若是语句级触发器，触发器只会被触发一次
>
> > :star:触发器作用:star:当你对一张表做 **新增 (INSERT)、修改 (UPDATE)、删除 (DELETE)** 时，**自动触发**提前写好的 SQL 代码，帮你完成额外操作。

| 触发器类型      | NEW 和 OLD                                             |
| --------------- | ------------------------------------------------------ |
| INSERT 型触发器 | NEW 表示将要或者已经新增的数据                         |
| UPDATE 型触发器 | OLD 表示修改之前的数据，NEW 表示将要或已经修改后的数据 |
| DELETE 型触发器 | OLD 表示将要或者已经删除的数据                         |

#### 语法

> - 创建
>
>   ```sql
>   CREATE TRIGGER 触发器名 
>   	BEFORE/AFTER INSERT/UPDATE/DELETE ON 表名 FOR EACH ROW --行级触发器
>   BEGIN
>   	触发器中的具体逻辑实现
>   END;
>   ```
>
> - 查看
>
>   ```sql
>   SHOW TRIGGER;
>   ```
>
> - 删除
>
>   ```sql
>   DROP TRIGGER 数据库名 触发器名 --删除某数据库下的触发器，若没写数据库名默认为当前数据库
>   ```
>
>   

### 案例

> 通过触发器记录tb_user表的数据**变更日志**，将变更日志插入到**日志表user_logs**中，包含增加、修改、删除
>
> - 日志表的创建
>
>     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260408162512847.png" alt="image-20260408162512847" style="zoom:100%;" />
>
> - insert触发器
>
>    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260408162611549.png" alt="image-20260408162611549" style="zoom:100%;" />
>
>   > :star2:日志更新的触发器，上图为insert触发器 即：当向tb_user表中插入数据时 自动触发begin与end之间的SQL语句   
>   >
>   > tip：向logs表中插入时
>   >
>   > 1. now()为函数，作用是获取现在的时间
>   > 2. :star:**new代表插入的那一行数据 所以用 new.某字段 就可以取到刚插入的内容**
>   > 3. concat是字符串拼接函数
>
>    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260408163500408.png" alt="image-20260408163500408" style="zoom:100%;" />
>
>    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260408163551019.png" alt="image-20260408163551019" style="zoom:100%;" />
>
>   看上两图可知触发器成功触发并向logs表中记录了插入日志
>
> - update触发器
>
>    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260408164411750.png" alt="image-20260408164411750" style="zoom:100%;" />
>
>    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260408164529921.png" alt="image-20260408164529921" style="zoom:100%;" />
>
>    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260408164737327.png" alt="image-20260408164737327" style="zoom:100%;" />
>
> - delete触发器
>
>    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260408165443730.png" alt="image-20260408165443730" style="zoom:100%;" />
>
>    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260408165502127.png" alt="image-20260408165502127" style="zoom:100%;" />



### 触发器的用途

> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260408162306981.png" alt="image-20260408162306981" style="zoom:50%;" />



## 五、锁

> 锁是计算机**协调多个进程或线程并发访问某一资源的机制。**在数据库中，除传统的计算资源（CPU、RAM、I/O）的争用以外，数据也是一种供许多用户共享的资源。如何**保证数据并发访问的一致性、有效性**是所有数据库必须解决的一个问题，**锁冲突**也是影响数据库**并发访问性能**的一个重要因素。从这个角度来说，锁对数据库而言显得尤其重要，也更加复杂。

### 1.全局锁

#### 概念

> 全局锁就是**对整个数据库实例加锁**，加锁后整个实例就处于只读状态，后续的 DML 的写语句，DDL 语句，以及更新操作的事务提交语句**都将被阻塞**。

#### 案例

> 其**典型的使用场景**是做**全库的逻辑备份**，对所有的表进行锁定，从而**获取一致性视图，保证数据的完整性。**
>
> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260411125507415.png" alt="image-20260411125507415" style="zoom:100%;" />
>
> > 如上图所示：当我们在备份数据库数据时，是一张一张表备份的，若在备份过程中有业务运行，向表中插入了数据，就会导致各个表中的数据不一致。
>
> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260411125920766.png" alt="image-20260411125920766" style="zoom: 80%;" />
>
> > 如上图所示：加入了全局锁后，对数据库进行**DML和DDL语句会被阻塞，只有DQL语句可以正常执行**。当我们用mysqldump工具完成备份并生成备份文件（xxx.sql）后就可以把锁解开
>

#### 语法

> - 施加全局锁语法
>
>   ```sql
>   flush tables with read lock;
>   ```
>
> - 利用mysqldump进行数据备份（mysqldump不是SQL语句，是一个MySQL的工具，**需要在系统命令行窗口执行**）
>
>   ```cmd
>   mysqldump -u 用户 -p  数据库名 > 数据库名.sql #(最后一个参数写的是存放地址) 
>   ```
>
> - 解开全局锁
>
>   ```sql
>   unlock tables;
>   ```
>
> 1. 登陆至linux虚拟机上的MySQL数据库 此处的xin为超级权限用户（root被设置为只可在本地登陆）<img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260411132044769.png" alt="image-20260411132044769" style="zoom:100%;" />
>
>    **（-h为远程登陆，后跟远程登陆主机ip地址）**
>
> 2. 加全局锁
>
>     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260411132227369.png" alt="image-20260411132227369" style="zoom:100%;" />
>
> 3. 在命令行界面用mysqldump做数据备份<img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260411132654296.png" alt="image-20260411132654296" style="zoom:100%;" />
>
>    **（-h为远程登陆，后跟远程登陆主机ip地址）**
>
> 4. 解除锁
>
>     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260411132813374.png" alt="image-20260411132813374" style="zoom:100%;" />
>
> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260411133055140.png" alt="image-20260411133055140" style="zoom:100%;" />

#### 弊端

> 数据库中加全局锁，是一个比较重的操作，存在以下问题：
>
> 1. 如果在主库上备份，那么在备份期间都不能执行更新，业务基本上就得停摆。 
>
> 2. 如果在从库上备份，那么在备份期间从库不能执行主库同步过来的二进制日志（binlog），会导致主从延迟。
>
> :star2:在InnoDB引擎中，我们可以在备份时附上参数 –single-transaction 参数来完成不加锁的一致性数据备份  **（此方法通过快照的形式实现）**
>
> ```cmd
> mysqldump --single-transaction -u 用户 -p 数据库名 > 数据库名.sql
> ```
>
> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260411134140148.png" alt="image-20260411134140148" style="zoom:100%;" />
>
> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260411134200678.png" alt="image-20260411134200678" style="zoom:100%;" />

### 2.表级锁

> 表级锁，**每次操作锁住整张表。锁定粒度大，发生锁冲突的概率最高，并发度最低。**应用在MyISAM、InnoDB、BDB等存储引擎中。

#### 表锁

> - 加锁
>
>   ```sql
>   lock tables 表名1,表名2... read/write;
>   ```
>
> - 解锁
>
>   1. ```sql
>      unlock tables;
>      ```
>
>   2. 断开客户端

##### 表共享读锁(read lock)/表独占写锁(write lock)

> 二者区别
>
> 读锁(共享锁):**所有客户端**都只可读取,不能写入
>
> 写锁(排他锁):**当前客户端**既可读也可写,**其他客户端**不能读也不能写

#### 元数据锁(meta data lock , MDL)

##### 概述

> MDL 锁（元数据锁）是数据库里**自动生效、不用手动操作**的一种保护机制：
>
> 只要你在访问一张表（比如查数据、改数据），数据库就会自动给这张表加上 MDL 锁。
>
> 它的核心作用就是**保护表的 “结构信息”（比如表名、字段、索引这些元数据）不被乱改**：
>
> 只要还**有事务在操作这张表**（哪怕只是在查数据），就绝对**不允许别人修改表结构**（比如加字段、删索引、改表名），必须等所有正在运行的事务都结束，才能改表结构，避免出现 “查着表呢，表突然没了 / 字段变了” 的混乱情况。

##### 案例

> 在MySQL5.5后引入了MDL,当对一张表进行增删改查时,加入MDL读锁(共享锁);当对一张表的表结构进行变更的时候,加入MDL写锁(排他锁) 
>
> | 对应 SQL                                              | 锁类型                                    | 说明                                                   |
> | ----------------------------------------------------- | ----------------------------------------- | ------------------------------------------------------ |
> | `lock tables xxx read / write`                        | `SHARED_READ_ONLY / SHARED_NO_READ_WRITE` |                                                        |
> | `select`、`select ... lock in share mode`             | `SHARED_READ`                             | 与`SHARED_READ`、`SHARED_WRITE`兼容，与`EXCLUSIVE`互斥 |
> | `insert`、`update`、`delete`、`select ... for update` | `SHARED_WRITE`                            | 与`SHARED_READ`、`SHARED_WRITE`兼容，与`EXCLUSIVE`互斥 |
> | `alter table ...`                                     | `EXCLUSIVE`                               | 与其他的 MDL 都互斥                                    |
>
> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260411142720318.png" alt="image-20260411142720318" style="zoom:100%;" />
>
> > 如上图,在两个客户端的两个事务中,一个进行select查询 一个进行update更新 并不会引发阻塞.原因:select的锁是`SHARED_READ`(共享读) update的锁是`SHARED_WRITE`(共享写) 二者是兼容的
>
> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260411143012638.png" alt="image-20260411143012638" style="zoom:100%;" />
>
> > 上图可见 若是一个事务select 一个事务alter 就会被阻塞
> >
> > 原因:alter对应的是MDL锁中的`EXCLUSIVE`(排他锁)和所有锁都不兼容,所以会被阻塞
>
> <img src="../../../AppData/Roaming/Typora/typora-user-images/image-20260411143201620.png" alt="image-20260411143201620" style="zoom:50%;" /><img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260411143216156.png" alt="image-20260411143216156" style="zoom: 50%;" />
>
> > 可见当其他事务提交后,alter才执行成功(被锁了1分52秒)

> - 查看元数据锁
>
>   ```sql
>   select object_type,object_schema,object_name,lock_type,lock_duration from performance_schema.metadata_locks;
>   ```
>
> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260411143944644.png" alt="image-20260411143944644" style="zoom:100%;" />
>
> > 可见MDL锁是自动动态生成的

#### 意向锁

##### 概述

> 当我们对某一行数据进行更改时,InnoDB会自动给这一行加上行锁. 若线程A正在操作某张表某行的数据的时候,线程B想要把这张表锁起来,就会引发冲突(**行锁和表锁冲突**). 为了避免发生冲突 就需要在施加表锁前**检查每一行是否加了行锁,但这样效率过低.** 为了解决这种情况 引入了**意向锁**

##### 工作原理

> 核心原理:事务在**加行锁前，先在表上声明 “加锁意图”**，让表锁申请时能快速判断冲突，**避免逐行扫描。**
>
> - 加锁意图的分类
>
>   1. 意向共享锁(IS):事务打算对某些行加 **共享锁（S）**
>
>      触发的 SQL 操作:`SELECT ... LOCK IN SHARE MODE`（共享读）
>
>   2. 意向排他锁(IX):事务打算对某些行加 **排他锁（X）**
>
>      触发的 SQL 操作:`INSERT` / `UPDATE` / `DELETE` / `SELECT ... FOR UPDATE`（写操作 / 排他读）
>
> - 意向锁和表锁间的兼容情况
>
>   1. 意向共享锁（IS）：**与表锁共享锁（read）兼容**，与表锁排他锁（write）互斥。 
>   2. 意向排他锁（IX）：与表锁共享锁（read）及排他锁（write）**都互斥**。意向锁之间不会互斥。
>
>   :star:意向锁2种情况 表锁2种情况 组合起来共四种情况. 只有当二者都是read(共享)锁的情况下才会兼容

##### 案例

> - tip:查看意向锁添加情况语句
>
>   ```sql
>   select object_schema, object_name, index_name, lock_type, lock_mode, lock_data from performance_schema.data_locks;
>   ```
>
> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260411150757123.png" alt="image-20260411150757123" style="zoom:100%;" />
>
> > 上图可见,在事务A中使用了select … `lock in share mode` 使得意向锁的类型为IS 并在事务B中以read(共享锁)的方式锁住同一张表 此时是不会发生阻塞的
>
> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260411151016454.png" alt="image-20260411151016454" style="zoom:100%;" />
>
> > 若是以write(排他锁)的方式锁同一张表就会被阻塞
>
> tip:IX意向锁与所有表锁不兼容,演示省略

### 3.行级锁

> 行级锁，每次操作**锁住对应的行数据**。**锁定粒度最小，发生锁冲突的概率最低，并发度最高。**应用在InnoDB存储引擎中。
>
> InnoDB 的数据是**基于索引**组织的，即：InnoDB 的行锁不是直接锁数据行，而是锁**索引项**。当没有索引时，需要**全表扫描** 所以会把所有数据都锁起来 这时行级锁会退化为类表级锁。例子：[详见](#7.update的优化（避免行锁升级为表锁）)

#### 行锁（记录锁）

> 锁定单个行记录的锁，防止其他事务对此进行update和delete。在RC、RR[隔离级别](#事务的隔离级别 — 并发事务问题的解决)下都支持

##### 共享锁（S）/排他锁（X）

- 共享锁

> 多个事务可以同时给同一行加 S 锁，一起读数据，互不干扰
>
> 只要有事务加了 S 锁，其他事务就**不能加 X 锁（不能修改）**，必须等所有 S 锁释放后才能修改

- 排他锁

> 一个事务给某行加了 X 锁，其他事务**既不能读（加 S 锁），也不能写（加 X 锁）**，必须等 X 锁释放

| SQL                           | 行锁类型   | 说明                                            |
| ----------------------------- | ---------- | ----------------------------------------------- |
| INSERT ...                    | 排他锁     | **自动加锁**                                    |
| UPDATE ...                    | 排他锁     | **自动加锁**                                    |
| DELETE ...                    | 排他锁     | **自动加锁**                                    |
| SELECT（正常）                | 不加任何锁 | -                                               |
| SELECT ... LOCK IN SHARE MODE | 共享锁     | 需要手动在 SELECT 之后加 **LOCK IN SHARE MODE** |
| SELECT ... FOR UPDATE         | 排他锁     | 需要手动在 SELECT 之后加 **FOR UPDATE**         |

> 默认情况下, InnoDB在 REPEATABLE READ事务隔离级别运行, InnoDB**使用 临键锁进行搜索和索引扫描, 以防止幻读。** 
>
>  针对唯一索引进行检索时, 对已存在的记录进行**等值匹配时, 将会把临键锁自动优化为行锁。** 

###### 案例

> - tip：查询行锁sql语句
>
>   ```sql
>   SELECT object_schema, object_name, index_name, lock_type, lock_mode, lock_data FROM performance_schema.data_locks;
>   ```
>
> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260411161644819.png" alt="image-20260411161644819" style="zoom: 33%;" />
>
> > 上图可见普通的select并不会加锁，lock in share mode会加共享锁
>
> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260411162251080.png" alt="image-20260411162251080" style="zoom:100%;" />
>
> > 上图可见，当我们查询student表id为1的数据时给该行**上了一个共享锁**，上了共享锁后再对该行进行update时（**update会自动上排他锁**），就会冲突，所以会**阻塞**
>
> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260411163023696.png" alt="image-20260411163023696" style="zoom:100%;" />
>
> > 上图可见，当我们以name字段搜索数据并修改时，由于name字段并没有设立索引，所以行锁会被升级为表锁。升级为表锁后我们在另一个事务中去操作其他行的时候也会被阻塞。  （这解释了[update优化](7.update的优化（避免行锁升级为表锁）)）

#### 间隙锁

> 锁定索引记录间隙（不包含该记录），确保记录间隙不变，**防止其他事务在这个间隙进行insert。**产生**幻读**，在RR[隔离级别](#事务的隔离级别 — 并发事务问题的解决)下支持

> 默认情况下，InnoDB在 REPEATABLE READ事务隔离级别运行，InnoDB使用 临键锁进行搜索和索引扫描，以防止幻读。 
>
> 1. 索引上的等值查询(**唯一索引**)，给**不存在的记录加锁时**，优化为**间隙锁**。
> 2. 索引上的等值查询(**普通索引**)，**向右遍历时最后一个值不满足查询需求时**，临键锁退化为**间隙锁**。 [^2补充]
> 3. 索引上的范围查询(**唯一索引**)，会**访问到不满足条件的第一个值为止。**
>
> > [^2补充]: 因为普通索引不唯一，所以当找到符合条件的索引时需向右找到不符合的值，并在中间的间隙加上间隙锁，防止再次插入相同数据导致幻读。 例子：5，10，10，20 就会在第二个10和20之间加上间隙锁

##### 案例

> 1. 
>
>    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260411164336939.png" alt="image-20260411164336939" style="zoom: 33%;" />
>
>    > 上图可见，1. 是通过id字段（唯一字段）等值查询的  2.所查询的id并不存在。
>    >
>    > **结果加了一个间隙锁**
>
>     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260411164732063.png" alt="image-20260411164732063" style="zoom:100%;" />
>
>    > 上图**说明了间隙锁加在id=4和id=15之间**（向这个间隙内插入数据 被阻塞）
>
> 2.   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260411170459173.png" alt="image-20260411170459173" style="zoom:100%;" />
>
>    > 上图可见，no是一个可重复的普通索引，当我们用no查询数据时，不仅会对查询到的数据本身加上共享锁，**还会对该条数据与下一个不同数据的间隙之间加上间隙锁**
>
> 3.  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260411171101096.png" alt="image-20260411171101096" style="zoom:100%;" />
>
>    > tip：supremum意为正无穷
>    >
>    > 由上图可见，当我们用唯一索引进行范围查询时，会给范围查询**第一个满足的值加上行锁**（即：id=4） **随后对其他满足条件的值加上临键锁**（即：4，15之间、 15，17之间 、 17，正无穷之间）

#### 临键锁

> 行锁和间隙锁的组合，会同时锁住记录与**记录前**的间隙。在RR[隔离级别](#事务的隔离级别 — 并发事务问题的解决)下支持
>
> tip：由于临键锁时行锁和间隙锁的组合，所以临键锁的作用主要是在这两个锁之间进行切换。有关临键锁的示例详见上两种锁



## 六、InnoDB引擎

### 1.逻辑存储结构

> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260325145124260.png" alt="image-20260325145124260" style="zoom:100%;" />
>
> 详见：[InnoDB的逻辑存储结构](#InnoDB的逻辑存储结构)
>
> > 1. 表空间（[ibd文件](#相应磁盘文件)），一个mysql实例可以对应多个表空间，用于存储记录、索引等数据
> > 2. 段，分为数据段（Leaf node segment）、索引段（Non-leaf node segment）、回滚段（Rollback segment），InnoDB是索引组织表，**数据段就是 B + 树的叶子节点**，**索引段即为 B + 树的非叶子节点。**段用来管理多个 Extent（区）。
> > 3. 区，表空间的单元结构，每个区的**大小为1M**。默认情况下，InnoDB存储引擎大小 为**16K**，即一个区中一共有**64个连续的页**。
> > 4. 页，是**InnoDB存储引擎磁盘管理的最小单元**，每个页的大小默认为 16KB，为了保证页的连续性，InnoDB存储 磁盘申请4-5个区。 **（索引存储在页当中）**
> > 5. 行，InnoDB存储引擎数据是按行进行存放的。

### 2.架构

<img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260412151500676.png" alt="image-20260412151500676" style="zoom:100%;" />

#### 内存结构

> 见上图，内存结构中有**buffer pool、change buffer、adaptive hash index、log buffer**
>
> - buffer pool（缓冲池）
>
>   - 作为主内存中的一个区域，里面可以**缓存磁盘上经常操作的真实数据**，在执行增删改查操作时，**优先操作缓冲池中的数据**（若缓冲池没有再**从磁盘中加载并缓存**），**先在缓冲池中修改数据**，修改后的**页**留在缓冲池，**暂时不写磁盘**，当满足某种条件（缓冲池满了/刷新周期到了）再以一定频率**将数据从缓冲池刷新到磁盘**，从而**减少磁盘IO，加快处理速度**
>   - **缓冲池是以page（页）作为单位**，底层采用链表管理page。根据状态可以将page分为三种
>     - free page：空闲页，**未被使用**
>     - clean page：干净页，**被使用过**，但**数据未被修改**
>     - dirty page：脏页，**被使用过**，且**数据被修改过**
>
> - change buffer（更改缓冲区）
>
>   - 针对于**非唯一的二级索引页**，在执行DML语句时，如果**要修改的二级索引页，不在 Buffer Pool 里，**InnoDB 就**不立刻去磁盘读它**，而是把这次**修改先记在 Change Buffer 里。**等后面有人**读取这个索引页时，再把记录的变更合并进去，一次性改好。**
>   - change buffer的意义：由于**二级索引是非唯一的**，且二级索引插入多是**无序插入**，加之插入后可能会**牵连其他页的数据也发生变更（B+树自平衡）**，若是每次修改二级索引的值都去刷入磁盘的话，就会造成大量的IO。:star:所以使用change buffer暂存就可以实现通过**延迟修改、批量合并**，把大量随机磁盘 IO 变成顺序 IO，从根本上提升数据库的写入速度。
>
> - Adaptive Hash Index（自适应哈希索引）
>
>   - 用于优化buffer pool数据查询。InnoDB会监控表上各索引页的查询，如果某一个等值查询经常被用到，InnoDB就会为其创建哈希值，这样就可以增快查询速度
>   - 自适应哈希**无需人工干预，系统根据情况自动完成**  参数：innodb_adaptive_hash_index<img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260412155557029.png" alt="image-20260412155557029" style="zoom:100%;" />
>
> - log buffer（日志缓冲区）
>
>   - 用来**保存要写到磁盘中的log日志的数据（redo log，undo log）**，默认大小为16MB，日志缓冲区的日志会定期刷新到磁盘中。如果有需更新、插入、删除多行的事务，增加日志缓冲区大小可节省磁盘IO
>
>   - 参数
>
>     - innodb_log_buffer_size :缓冲区大小
>
>     - innodb_flush_log_at_trx_commit：日志刷新到磁盘的时机
>
>         <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260412160516662.png" alt="image-20260412160516662" style="zoom:150%;" />

#### 磁盘结构

> - System Tablespace（系统表空间）
>
>   - 系统表空间是**change buffer（更改缓冲区）的存储区域**。如果表是在系统表空间而不是每个表文件或通用表空间中创建的，它也可能包含表和索引数据。(在 MySQL5.x 版本中还包含 InnoDB 数据字典、undo log 等)
>   - 参数：innodb_data_file_path (系统表空间文件存储路径)
>
> - File-Per-Table Tablespace（独立表空间）
>
>   - InnoDB 最主流的表空间模式，核心规则是：**每张表拥有一个独立的 .ibd 数据文件**。
>
>   - 参数：innodb_file_per_table
>
>      <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260412161945360.png" alt="image-20260412161945360" style="zoom:100%;" />
>
> - General Tablespaces（通用表空间）
>
>   - 通用表空间需要通过` CREATE TABLESPACE `语法创建，在创建表时，可以指定该表空间
>
>     - 创建表空间
>
>       ```sql
>       CREATE TABLESPACE 表空间名 ADD DATAFILE'XXX.ibd' ENGINE=innodb;
>       ```
>
>     - 创建表，并指定该表存储于通用表空间中
>
>       ```sql
>       CREATE TABLE ... TABLESPACE 表空间名;
>       #若不指定就会创建一个独立表空间
>       ```
>
> - Undo Tablespaces（撤销/回滚表空间）
>
>   - MySQL实例在初始化时会自动创建两个默认的undo表空间（初始大小为16MB），用于存储undo log日志
>
> - Temporary Tablespaces（临时表空间）
>
>   - innodb使用会话临时表空间和全局临时表空间**存储用户创建的临时表等数据**
>
> - Doublewrite Buffer Files（双写缓冲区）
>
>   - innodb引擎在将数据从buffer pool刷新到磁盘前会先将数据写入双写缓冲区文件中，便于系统异常时恢复数据
>
> - Redo log（重做日志）
>
>   - 用于实现事务的持久性。该日志文件由两部分组成：**重做日志缓冲（redo log buffer）**以及**重做日志文件（redo log）**，前者是在**内存中**，后者在**磁盘中**。当事务提交之后会**把所有修改信息都会存到该日志中**，用于在刷新脏页到磁盘时发生错误时，**进行数据恢复使用**。
>   - redo log以循环的方式写入重做日志文件，涉及到两个文件<img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260412163911907.png" alt="image-20260412163911907" style="zoom:100%;" />当其中一个满了之后就写入到另一个里面，覆盖老数据

#### 后台线程

> 作用：**将内存中缓冲池中的数据在合适的时机刷新到磁盘文件中**
>
> 1. Master Thread
>
>    **核心后台线程**，负责**调度其他线程**，还负责**将缓冲池中的数据异步刷新到磁盘中，保持数据的一致性**，还包括**脏页的刷新、合并插入缓存、undo 页的回收。**
>    
> 2. IO Thread
>
>    在 InnoDB 存储引擎中大量使用了 AIO 来处理 IO 请求，这样可以极大地提高数据库的性能，而 IO Thread 主要负责这些 IO 请求的回调。
>
>    | 线程类型             | 默认个数 | 职责                                           |
>    | -------------------- | -------- | ---------------------------------------------- |
>    | Read thread          | 4        | 负责读操作                                     |
>    | Write thread         | 4        | 负责写操作                                     |
>    | Log thread           | 1        | 负责将日志缓冲区刷新到磁盘                     |
>    | Insert buffer thread | 1        | 负责将 Change Buffer中的修改合并刷入磁盘索引页 |
>
> 3. Purge Thread
>
>    用于**回收事务已经提交了的undo log**。（事务提交后，undo log可能不用了【即：不需要回滚】）
>
> 4. Page Cleaner Thread
>
>    协助Master Thread刷新脏页到磁盘的线程，可以减轻Master Thread的工作压力



### 3.事务原理

<img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260413183450507.png" alt="image-20260413183450507" style="zoom:100%;" />

#### redo log（重做日志）

> 重做日志，记录的是**事务提交时数据页的物理修改**，是用来实现事务的**持久性**。 该日志文件由两部分组成：**重做日志缓冲**（redo log buffer）以及**重做日志文件**（redo log file），前者是在**内存**中，后者在**磁盘**中。当**事务提交之后**会把所有修改信息都存到该日志文件中，用于在**刷新脏页到磁盘，发生错误时，进行数据恢复使用。**

> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260413184344233.png" alt="image-20260413184344233" style="zoom:100%;" />
>
> :star2:在我们操作数据时会先操作buffer pool中的缓存数据，操作完之后，被操作的页就被称为脏页。为了提升效率 节省磁盘IO 不会立即将修改后的脏页刷入磁盘 （详见：[内存结构](#内存结构)中的buffer pool）
>
>  :star2::star2:在我们**提交事务后**，脏页不会被立即刷入磁盘，但是**redo log buffer中记录的数据变化情况会被立即刷入磁盘中的redo log file（日志是一条一条写的，刷入磁盘时是顺序IO性能耗费不大）— WAL**，这样若是脏页刷入磁盘时出现意外导致刷入失败，就可以用redo log日志去恢复，以保持事务持久性
>
> tip：redo log是两个文件交替写入的

#### undo log（回滚日志）

> 回滚日志，用于记录数据被修改前的信息，**作用**包含两个：**提供回滚和MVCC(多版本并发控制)**。 **undo log**和`redo log记录物理日志`不一样，它**是逻辑日志**。可以认为当delete一条记录时，undo log中会记录一条对应的insert记录，反之亦然，当update一条记录时，它记录一条对应相反的update记录。当执行**rollback**时，就可以从undo log中的**逻辑记录读取到相应的内容并进行回滚**。
>
>  Undo log销毁：undo log在事务执行时产生，事务提交时，**并不会立即删除undo log，因为这些日志可能还用于MVCC。** 详见：[MVCC实现原理](#实现原理)中的undo log版本链
>
> Undo log存储：undo log采用**段的方式进行管理和记录**，存放在前面介绍的rollback segment**回滚段**中，内部包含1024个undo log segment。

### 4.MVCC

#### 基本概念

> - 当前读
>
>   读取的是记录的**最新版本**，读取时还要**保证其他并发事务不能修改当前记录**，会对读取的记录进行加锁。对于我们日常的操作，如：select ... lock in share mode**(共享锁)**，select ... for update、update、insert、delete**(排他锁)**都是一种当前读。
>
> - 快照读
>
>   简单的select（**不加锁**）就是快照读，快照读，读取的是记录数据的可见版本，**有可能是历史数据，不加锁，是非阻塞读。**
>
>   - Read Committed：**每次**select，**都生成一个**快照读。 
>   - Repeatable Read：开启事务后**第一个select语句后生成一个快照**，后面读取的都是这个快照
>   - Serializable：快照读会退化为**当前读**。
>
> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260413191205322.png" alt="image-20260413191205322" style="zoom: 33%;" />
>
> > 上图中，MySQL默认为Repeatable Read，当在左边事务中**第一次进行select时**会**保存一张快照**，所以在**右图update**了id=15的名字时在左图用普通select时**读出来的是保存快照里的内容**
> >
> > 而当我们用**加共享锁的select**读时，**起先会被阻塞**（右图update上了一个排他锁），当右图提交后我们可以看到**查到的数据就是当前读（更新后的内容）**
>
> - MVCC 
>
>   全称 Multi-Version Concurrency Control，多版本并发控制。**指维护一个数据的多个版本，使得读写操作没有冲突**，**快照读**为 MySQL 实现 MVCC 提供了一个**非阻塞读功能**。MVCC 的具体实现，还需要依赖于数据库记录中的**三个隐式字段、undo log 日志、readView。**

#### 实现原理

> - 记录中的三个隐藏字段
>
>    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260413191913488.png" alt="image-20260413191913488" style="zoom:100%;" />
>
>   | 隐藏字段    | 含义                                                         |
>   | ----------- | ------------------------------------------------------------ |
>   | DB_TRX_ID   | 最近修改事务 ID，**记录**插入这条记录或最后一次**修改该记录**的**事务 ID**。 |
>   | DB_ROLL_PTR | 回滚**指针**，**指向这条记录的上个版本**，用于**配合 undo log（记录的各版本记在undo log中）** |
>   | DB_ROW_ID   | 隐藏主键，**如果表结构没有指定主键**，将会生成该隐藏字段。   |
>
>    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260413192504041.png" alt="image-20260413192504041" style="zoom:100%;" />
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260413192543973.png" alt="image-20260413192543973" style="zoom:80%;" /> 
>
>   通过ibd2sdi指令查看表结构可见前两个隐藏字段（该表有主键所以没有 DB_ROW_ID）
>
> - undo log版本链
>
>   回滚日志，在insert、update、delete的时候产生的便于数据回滚的日志。 
>
>   当**insert的时候**，产生的undo log日志只在回滚时需要，**在事务提交后，可被立即删除。** 
>
>   而**update、delete的时候**，产生的undo log日志不仅在回滚时需要，在**快照读时也需要**，**不会立即被删除。**
>
>    :star2::star2::star2:示意图<img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260413194015677.png" alt="image-20260413194015677" style="zoom:100%;" />
>
>   由上图就可知，undo log通过**链表串联起了多个历史版本的数据**，相当于**MVCC 的 “历史版本仓库”。**MVCC的**快照读**便是**基于此实现的**
>
> - readview（读视图）
>
>   readview是**快照读**SQL执行时MVCC**提供数据的依据**，记录并维护系统当前活跃事务（未提交）的id
>
>   - readview包含以下四个核心字段
>
>     | 字段             | 含义                                                         |
>     | ---------------- | ------------------------------------------------------------ |
>     | `m_ids`          | **当前**活跃的事务 **ID** 集合                               |
>     | `min_trx_id`     | **最小**活跃事务 **ID**                                      |
>     | `max_trx_id`     | **预分配**事务 ID，**当前最大事务 ID+1**（因为事务 ID 是自增的） |
>     | `creator_trx_id` | ReadView **创建者的事务 ID**                                 |
>
>   - readview快照读规则
>
>       <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260413195600345.png" alt="image-20260413195600345" style="zoom:100%;" />
>
>     **tip：**
>
>     **1.  黄字为trx_id,trx_id是表中的隐藏字段，同时也会被记录在undo log日志的历史版本中**
>
>     2.当trx_id>max_trx_id时 代表这个版本在**生成 ReadView 之后**才产生，**属于未来的数据，所以不可见**。
>
>     :star:对于trx_id<max_trx_id的情况，**只要trx_id这个版本已经提交，即：不在m_ids里面，就可以访问，**此处还分了两种情况（<min /  min< <max）是为了更高效的区分
>
>     :star2::star2:总结​：**这个算法本质上就是找距离此readiVew最近的已提交的版本**
>
>   - 不同隔离级别中readview生成时机不同
>
>     RC中每查询一次就生成一次（**每次的readView不一样，导致每次读取的时候读到的快照不一定一样，所以就无法保证一致性，造成了不可重复读问题**）
>
>     RR中只在第一次查询后生成（**由于每次用的readView是一样的 所以每次读到的快照是一样的，这就是可重复读的底层原理**）



## 七、MySQL管理

### 1.系统数据库

> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260415182219137.png" alt="image-20260415182219137" style="zoom:100%;" />
>
> | 数据库             | 含义                                                         |
> | ------------------ | ------------------------------------------------------------ |
> | mysql              | 存储 MySQL 服务器正常运行所需要的各种信息（时区、主从、用户、权限等） |
> | information_schema | 提供了访问数据库元数据的各种表和视图，包含数据库、表、字段类型及访问权限等 |
> | performance_schema | 为 MySQL 服务器运行时状态提供了一个底层监控功能，主要用于收集数据库服务器性能参数 |
> | sys                | 包含了一系列方便 DBA 和开发人员利用 performance_schema 性能数据库进行性能调优和诊断的视图 |

### 2.常用工具

> - mysql客户端工具
>
>   ```bash
>   mysql [选项] [数据库名];
>   ```
>
>   > 选项：
>   >
>   > 1. -u 指定用户
>   > 2. -p 指定密码
>   > 3. -h 指定服务器ip
>   > 4. -P 指定链接端口
>   > 5. -e 执行SQL语句并退出（通常用于脚本中）
>   >
>   > <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260415183527314.png" alt="image-20260415183527314" style="zoom:100%;" />
>   >
>   > 上图表名 通过**3306端口号**远程连接这台虚拟机上的mysql 以**密码cxy06908**（**注意，密码和-p需要紧挨着**） 登陆到root用户的**xin_db数据库** 并执行 **select * from student 执行后退出** 
>
> - mysqladmin
>
>   mysqladmin是一个**执行管理操作的客户端程序**，可以用来**检查服务器当前配置和状态，创建并删除数据库等**
>
>   >    - 选项
>   >
>   >    -  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260415184045234.png" alt="image-20260415184045234" style="zoom: 33%;" />
>   >
>   >    - 演示
>   >
>   >      <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260415184332975.png" alt="image-20260415184332975" style="zoom: 33%;" /> 查看版本
>   >
>   >      <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260415184503695.png" alt="image-20260415184503695" style="zoom: 33%;" /> 查看变量
>   >
>   >       <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260415184553856.png" alt="image-20260415184553856" style="zoom:100%;" /> 创建数据库
>   >
>   >       <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260415184753800.png" alt="image-20260415184753800" style="zoom:100%;" />删除数据库
>
> - mysqlbinlog
>
>   以文本格式显示二进制日志的工具
>
>   > ```bash
>   > mysqlbinlog [选项] 日志1 , 日志2 ...
>   > ```
>   >
>   > 选项
>   >
>   > 1. -d 指定数据库名称，这时会只列出日志中和指定数据库相关的操作
>   > 2. -o 忽略日志中前n行命令
>   > 3. -r 将文本格式日志输出到指定文件中
>   > 4. -s 显示简单格式，忽略一些信息
>   > 5. – start datetime=date1 – stop datetime=date2  显示指定时间间隔所有日志
>   > 6. – start position=pos1 –stop position=pos2  显示指定位置间隔的所有日志
>
> - mysqlshow
>
>   客户端对象查找工具 可以快速查找存在哪些数据库，数据库中的表，表中的列或索引
>
>   ```bash
>   mysqlshow [选项] [数据库名[表名[字段名]]] 
>   ```
>
>   选项
>
>   1. – count 显示**数据库或表**的统计信息
>   2. -i 显示数据库或指定表的状态信息
>
>    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260415191121867.png" alt="image-20260415191121867" style="zoom:33%;" />
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260415191224647.png" alt="image-20260415191224647" style="zoom:33%;" />
>
>    
>
> - mysqldump
>
>   数据备份工具 详见： [全局锁](#1.全局锁)中的语法
>
>   - 额外内容
>
>     | 参数                   | 含义                                                         |
>     | ---------------------- | ------------------------------------------------------------ |
>     | `--add-drop-database`  | 在每个数据库创建语句前加上 `drop database` 语句              |
>     | `--add-drop-table`     | 在每个表创建语句前加上 `drop table` 语句，默认开启；不开启需使用 `--skip-add-drop-table` |
>     | `-n, --no-create-db`   | 不包含数据库的创建语句                                       |
>     | `-t, --no-create-info` | 不包含数据表的创建语句                                       |
>     | `-d, --no-data`        | 不包含数据（仅导出表结构）                                   |
>     | `-T, --tab=name`       | 自动生成两个文件：一个 `.sql` 文件（备份表结构）；一个 `.txt` 文件（备份表数据） |
>
> - mysqlimport/source
>
>   - mysqlimport 专门用于导入 mysqldump -T 导出的txt文件
>
>     ```bash
>     mysqlimport -u用户名 -p密码 数据库名 txt文件路径
>     ```
>
>   - source（mysql内置指令 用于导入 .sql文件）
>
>     ```sql
>     SCOURCE SQL文件路径;
>     ```
>
>     



# DataBase_Learn（运维）

## 一、日志

### 1.错误日志

> 错误日志记录了**mysqld启动和停止时**，以及**服务器运行过程中发生的严重错误**的相关信息。当数据库出现任何故障导致无法使用时优先查看此日志

> ```sql
> show variables like '%log_error%'; #查看文件位置
> ```
>
> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260418131128896.png" alt="image-20260418131128896" style="zoom:100%;" />
>
> - 演示
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260418131506084.png" alt="image-20260418131506084" style="zoom:50%;" />  修改mysql uuid
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260418132213148.png" alt="image-20260418132213148" style="zoom: 80%;" /><img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260418132324574.png" alt="image-20260418132324574" style="zoom:100%;" />
>
>   可见error.log中写入了 无法获取uuid

### 2.二进制日志

> 二进制日志（binlog）记录了**所有的DDL（创建）语句和DML（修改）语句**，但不包括数据查询语句
>
> 作用：
>
> 1. 灾难时数据恢复
> 2. MySQL主从复制

> ```sql
> show variables like '%log_bin%';
> ```
>
> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260418132954171.png" alt="image-20260418132954171" style="zoom: 50%;" />
>
> - binlog格式分类
>
>   | 日志格式  | 含义                                                         |
>   | --------- | ------------------------------------------------------------ |
>   | STATEMENT | 基于 SQL 语句的日志记录，**记录的是 SQL 语句**，对数据进行修改的 SQL 都会记录在日志文件中。 |
>   | ROW       | 基于行的日志记录，**记录的是每一行的数据变更**。（默认）     |
>   | MIXED     | 混合了 STATEMENT 和 ROW 两种格式，默认采用 STATEMENT，在某些特殊情况下会自动切换为 ROW 进行记录。 |
>
>   ```sql
>   show variables like '%binlog_format%';#查看当前格式
>   ```
>
>    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260418133404251.png" alt="image-20260418133404251" style="zoom:100%;" />
>
>   - 修改格式类型
>
>     在 `/etc/mysql/my.cnf` 配置文件的最后一行加上 `binlog_format=STATEMENT/MIXED`后重启mysql服务
>
> - binlog的查询
>
>   需要用mysqlbinlog工具将二进制日志转为文本格式 详见：MySQL管理[常用工具](#2.常用工具)中的mysqlbinlog
>
>    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260418135141380.png" alt="image-20260418135141380" style="zoom:100%;" /><img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260418135227887.png" alt="image-20260418135227887" style="zoom:100%;" />
>
>    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260418135306670.png" alt="image-20260418135306670" style="zoom:100%;" />
>
>   > 当我们修改student中的内容后，去查看最新的那个binlog日志（binlog000060）【**-v**表示将日志中记录的**行数据变更重构为SQL语句**  tip：**-w会在重构的基础上输出注释信息**】
>
> - binlog的删除
>
>   对于比较繁忙的业务系统，每天生成的binlog数据很多，需要经常清理
>
>   - 手动删除
>
>     | 指令                                               | 含义                                                         |
>     | -------------------------------------------------- | ------------------------------------------------------------ |
>     | `reset master`                                     | 删除全部 binlog 日志，删除之后，日志编号，将从 binlog.000001 重新开始 |
>     | `purge master logs to 'binlog.*******'`            | 删除 ****** 编号之前的所有日志                               |
>     | `purge master logs before 'yyyy-mm-dd hh24:mi:ss'` | 删除日志为 "yyyy-mm-dd hh24:mi:ss" 之前产生的所有日志        |
>
>   - 自动删除 （在MySQL中配置二进制日志的过期时间）
>
>     ```sql
>     show variables like '%binlog_expire%';
>     ```
>
>      <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260418140743205.png" alt="image-20260418140743205" style="zoom:100%;" />可见默认存放30天
>
>     ```sql
>     set @@binlog_expire_logs_seconds=xxx;#注意单位是秒
>     ```
>
>     



### 3.查询日志

> 查询日志中记录了所有的操作语句（增删改查）。 默认情况下查询日志是**不开启的（产生数据过多）**
>
> - ```sql
>   show variables like '%general%';
>   ```
>
>    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260418141105273.png" alt="image-20260418141105273" style="zoom:100%;" />
>
>   如需开启，在`etc/mysql/my.cnf`配置文件中添加 `general_log=1`(开启查询日志) `general_log_file=xxx.log` （设置查询日志日志文件名，若不设定，默认文件名如上图所示）<img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260418141952221.png" alt="image-20260418141952221" style="zoom:100%;" /> 
>
>   ubuntu中要添加**[mysql]** 以明确这个是在mysql段下的

### 4.慢查询日志

> [详见](#慢查询日志)
>
> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260418142808869.png" alt="image-20260418142808869" style="zoom: 50%;" />
>
> 已开启，不过多赘述
>
> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260418143105883.png" alt="image-20260418143105883" style="zoom:100%;" />



## 二、主从复制

### 1.概述

> 主从复制是指将**主数据库**的DDL和DML操作通过**二进制日志传到从库服务器中**，然后在从库上对这些日志**重新执行**（也就是重做），使得从库和主库的数据保持同步。
>
> 一台主库可以同时向多台从库进行复制，从库也可以作为其他库的主库，实现链状复制
>
> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260419170755004.png" alt="image-20260419170755004" style="zoom:100%;" />

### 2.底层原理

> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260419171358185.png" alt="image-20260419171358185" style="zoom:100%;" />
>
> 1. Master 主库在**事务提交**时，会把数据变更记录在二进制日志文件 **Binlog** 中。 
> 2. 从库通过**IOthread**（IO线程）**读取主库**的二进制日志文件 **Binlog**，**写入**到从库的**中继日志 Relay Log** 中。 
> 3. slave通过**SQLthread**（SQL线程）**重做**中继日志中的事件（即：读取日志内容并转换成相应的SQL语句并执行）

### 3.搭建

> #### 主库配置
>
> - 数据库服务器的准备<img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260419171959276.png" alt="image-20260419171959276" style="zoom:100%;" />
>
> - 修改配置文件<img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260419172607453.png" alt="image-20260419172607453" style="zoom:100%;" />
>
> - 创建远程连接账号，授予主从复制权限<img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260419172853405.png" alt="image-20260419172853405" style="zoom:100%;" />
>
> - 通过指令，查看二进制日志坐标<img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260419173439808.png" alt="image-20260419173439808" style="zoom:100%;" />
>
>   **获取主库当前二进制日志关键定位信息**，复制时从库依靠这组坐标，知道从哪个日志文件、哪个位置开始同步数据，**保证主从数据起点一致。**
>
> #### 从库配置
>
> - 修改配置文件<img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260419173558229.png" alt="image-20260419173558229" style="zoom:100%;" />
>
>   主从复制进行**读写分离**，其中**从库是进行只读操作**的所以将read-only=1   若想要超级管理员也只读 可以super-read-only=1
>
> - 登陆MySQL设置主库配置<img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260419173827764.png" alt="image-20260419173827764" style="zoom:100%;" />
>
>   上图指令在从库当中执行，旨在连接主库并登录超级用户进行复制
>
> - 启动主从复制
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260625213920653.png" alt="image-20260625213920653" style="zoom:100%;" /> 
>
> - 查看主从复制状态
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260625213958478.png" alt="image-20260625213958478" style="zoom:100%;" /> 



### 注意

> 主从复制实现后，正常情况下，只要主库中的数据发生了变动，从库都会**立马对其进行复制**，**保持主库从库数据的一致性**





## 三、分库分表

### 1.介绍

> - 问题
>
>   当数据很多并持续增长时，若一直将所有数据都存入同一数据库的同一张表中，会使得查询效率**（CPU瓶颈）**大幅下降，并且会产生大量磁盘IO**（IO瓶颈）**
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260625215008410.png" alt="image-20260625215008410" style="zoom:100%;" />
>
>   1. IO瓶颈：InnoDB引擎中，大部分的内存都分配给了缓冲区，用于减少IO次数。当热点数据过多时，使得内存被大量占用，缓冲区（缓存）分配到的内存就少了，从而IO次数增多
>
>   2. CPU瓶颈：当表过于庞大时，进行查询、排序、统计次数等SQL操作就会消耗大量的CPU资源
>
>    
>
> - 解决方法 — 分库分表
>
>   将数据分散存储，使得单一数据库/表中的数据量变小，由此解决上述问题，提升性能



### 2.拆分策略

> 1. 垂直拆分
>
>    垂直拆分**不会对数据本身进行切割**，而是根据表/字段进行整体切割
>
>    1. 垂直分库
>
>        <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260626092323514.png" alt="image-20260626092323514" style="zoom:50%;" /> 
>
>    2. 垂直分表
>
>       <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260626092411806.png" alt="image-20260626092411806" style="zoom:50%;" /> 
>
> 2. 水平拆分
>
>    水平拆分即**对数据本身进行切割**，同一张表/同一个字段的数据，切割后存储在不同的表中
>
>    1. 水平分库
>
>       <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260626092652093.png" alt="image-20260626092652093" style="zoom:50%;" /> 
>
>    2. 水平分表
>
>       <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260626092811051.png" alt="image-20260626092811051" style="zoom:50%;" /> 
>
>  
>
> - 实现技术
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260626093024585.png" alt="image-20260626093024585" style="zoom: 40%;" /> 



### 3.Mycat

> - 介绍
>
>   数据库中间件，可以像使用MySQL一样使用Mycat。  Java编写，依赖于JDK运行
>
>  
>
> - 目录结构
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260626093600524.png" alt="image-20260626093600524" style="zoom:50%;" /> 
>
>  
>
> - Mycat结构图
>
>    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260626093833675.png" alt="image-20260626093833675" style="zoom: 50%;" />
>
>   Mycat中并不存储具体数据，只是在逻辑上对数据进行分片处理
>
>  
>
> - schema.xml配置
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260626094708449.png" alt="image-20260626094708449" style="zoom:100%;" />
>
>   可见，schema.xml配置即根据右图去**搭建起我们的逻辑结构**
>
>   三组标签
>
>   1. schema标签：配置逻辑库、逻辑表相关信息
>
>      <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260626100225144.png" alt="image-20260626100225144" style="zoom: 50%;" />
>
>      <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260626100528038.png" alt="image-20260626100528038" style="zoom: 50%;" />
>
>   2. datanode标签：数据节点相关信息
>
>      <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260626100720307.png" alt="image-20260626100720307" style="zoom:50%;" />
>
>   3. datahost标签：结点主机相关信息
>
>      <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260626100753923.png" alt="image-20260626100753923" style="zoom:50%;" />
>
>   详解：见[视频](https://www.bilibili.com/video/BV1Kr4y1i7ru?spm_id_from=333.788.player.switch&vd_source=d6f1919e59f384773719ad5aa3d3a0a9&p=169)
>
> - rule.xml
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260626100958639.png" alt="image-20260626100958639" style="zoom:50%;" />
>
>   两组标签
>
>   1. tableRule：表的分片规则
>   2. Function：分片规则所涉及到的Java类以及属性配置
>
> - server.xml配置
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260626094957438.png" alt="image-20260626094957438" style="zoom:50%;" /> 
>
>   两组标签
>
>   1. system：配置系统运行环境信息
>   2. user：配置当前Mycat服务可以被哪些用户访问，以及用户的访问权限等
>
>  
>
> - 启动服务
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260626095125031.png" alt="image-20260626095125031" style="zoom:50%;" /> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260626095208310.png" alt="image-20260626095208310" style="zoom: 67%;" />
>
>   在成功启动后与原先操作MySQL一样操作即可，Mycat会根据schema.xml中配置的分片规则自动对数据进行分片存储

#### Mycat的分片操作

> - 垂直拆分
>
>   - 场景
>
>     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260626102742941.png" alt="image-20260626102742941" style="zoom:100%;" />
>
>    
>
>   - 准备
>
>     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260626102811270.png" alt="image-20260626102811270" style="zoom:50%;" /> 一台Mycat三台MySQL
>
>    
>
>   - 配置
>
>     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260626102956750.png" alt="image-20260626102956750" style="zoom:50%;" />
>
>    
>
>   - 全局表配置
>
>     Mycat可以实现分库分表，但不能实现跨数据库查询，所以我们可以将一些**通用**的、在很多业务中都会用到的表设置为**全局表**，使得查询时都可以查到
>
>     设置方法：配置schema.xml时在逻辑表的末尾加上**type = “global”**
>
>  
>
> - 水平拆分
>
>   - 场景
>
>     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260626104719475.png" alt="image-20260626104719475" style="zoom:50%;" />
>
>    
>
>   - 准备
>
>     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260626104737837.png" alt="image-20260626104737837" style="zoom:50%;" />
>
>    
>
>   - 配置
>
>     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260626105012112.png" alt="image-20260626105012112" style="zoom:100%;" />
>
>     不同于垂直分片，水平分片需要指定分片规则



#### 常见的分片规则

> 1. 范围分片**auto-sharding-long**：根据指定字段及配置范围与数据节点的对应情况，来决定该数据属于哪个分片
>
>  
>
> 2. 取模**mod-long**：根据指定字段与节点数量进行求模运算
>
>  
>
> 3. 一致性哈希**sharding-by-murmur**：计算指定字段哈希值，相同的哈希值划分到相同的分片中
>
>  
>
> 4. 枚举分片**sharding-by-infile**：通过在配置文件中配置可能的枚举值，指定数据的分布。本规则适用于按照省份、性别、状态拆分数据等业务
>
>  
>
> 5. 应用指定**sharding-by-substring**：运行阶段由应用自主决定路由到哪个分片，直接根据**字符子串**（必须是**数字**）计算分片号
>
>  
>
> 6. 固定分片哈希算法**sharding-by-long-hash**：取id的二进制后10位与1111111111进行与（&）运算  — 与运算后的数字范围在0~1023  根据范围对0~1023划分
>
>  
>
> 7. 字符串哈希解析算法**sharding-by-stringhash**：截取指定位置的子串，进行hash算法，算出hash值后进行分片
>
>  
>
> 8. 按天分片：指定一个时间范围，如：start=2022-01-01 end=2022-01-31，周期为10天，那么日期为2022-01-01 ~ 2022-01-10的数据就会存入第一个数据库，后面同理。  到达结束时间后会循环
>
>  
>
> 9. 按月分片：同上，需要指定一个时间范围，周期默认为1个月，超过end月就循环



#### Mycat的管理及监控

> - Mycat原理
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260626112811179.png" alt="image-20260626112811179" style="zoom:50%;" />
>
>   详解：[视频](https://www.bilibili.com/video/BV1Kr4y1i7ru?spm_id_from=333.788.videopod.episodes&vd_source=d6f1919e59f384773719ad5aa3d3a0a9&p=183)
>
>   
>
> - Mycay管理
>
>   - 命令行
>
>     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260626113130399.png" alt="image-20260626113130399" style="zoom:50%;" /> 
>
>     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260626113153222.png" alt="image-20260626113153222" style="zoom: 67%;" /> 
>
>    
>
>   - Mycat-eye
>
>     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260626113544816.png" alt="image-20260626113544816" style="zoom:100%;" />
>
>     详见：[视频1](https://www.bilibili.com/video/BV1Kr4y1i7ru?spm_id_from=333.788.videopod.episodes&vd_source=d6f1919e59f384773719ad5aa3d3a0a9&p=185)   [视频2](https://www.bilibili.com/video/BV1Kr4y1i7ru?spm_id_from=333.788.videopod.episodes&vd_source=d6f1919e59f384773719ad5aa3d3a0a9&p=186)
>
> 



## 四、读写分离

### 1.概述

> 读写分离基于主从复制，在实现了主从复制后，应用程序**直接连接Mycat** ， 由Mycat对SQL语句进行分类路由，其中**增删改**走主节点（**主库**），**查询**走从节点（**从库**）



### 2.一主一从

> - 原理及搭建
>
>   详见：[主从复制](#二、主从复制)
>
>  
>
> - 一主一从的读写分离
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260626152057811.png" alt="image-20260626152057811" style="zoom:50%;" />
>
>   见上图，通过<writeHost 和 <readHost区分读写的服务器
>
>   - balance（负载均衡）参数
>
>     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260626152209502.png" alt="image-20260626152209502" style="zoom:100%;" />
>
>     其中1、2都可实现读写分离
>
> - 问题：主库master宕机后，业务系统就只能读了，如此无法保证高可用   ———  解决：双主双从



### 3.双主双从

> - 结构
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260626153247456.png" alt="image-20260626153247456" style="zoom:50%;" /> 
>
>   四台服务器的数据同步  master1和master2中的一台负责写入操作，另一台备用。slave1/2都可读取
>
>  
>
> - 搭建
>
>   - 主库
>
>     - 主库1配置
>
>       1. 修改配置文件
>
>          <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260626153659220.png" alt="image-20260626153659220" style="zoom:100%;" />
>
>       2. 重启MySQL
>
>          <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260626153727123.png" alt="image-20260626153727123" style="zoom:100%;" /> 
>
>     - 主库2配置
>
>       与主库1基本上全部相同，只有server-id不同
>
>     
>
> <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260626154135042.png" alt="image-20260626154135042" style="zoom:50%;" /> 
>
> 对两台主库都创建超级用户
>
>      
>
> - 两台主库之间相互复制
>
>   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260626154624697.png" alt="image-20260626154624697" style="zoom:100%;" />
>
>    
>
>   - 从库
>
>     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260626154244929.png" alt="image-20260626154244929" style="zoom:50%;" />  
>
>     tip：server-id唯一
>
>     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260626154357698.png" alt="image-20260626154357698" style="zoom:50%;" />
>
>  
>
> - 双主双从的读写分离
>
>   1. 对两对主从分别配置writeHost和readHost
>
>      <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260626155034909.png" alt="image-20260626155034909" style="zoom:50%;" />
>
>   2. 配置balance参数及writeType和switch Type
>
>      <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/mysql/image-20260626155504908.png" alt="image-20260626155504908" style="zoom:100%;" />
>
>      writeType和switchType配合使用，实现当写入的主库挂了后自动切换至备用主库

