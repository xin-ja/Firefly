---

title: Spring

published: 2026-10-10

description: Spring

tags: [Spring]

category: Spring

draft: false

---
# Spring

## 1.容器和Bean

### 1.1BeanFactory和ApplicationContext

- 类图

  ![image-20260928151639650](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/spring/image-20260928151639650.png)

  由上图可见，$ApplicationContext$间接继承了$BeanFactory$。所以，**$BeanFactory$才是Spring的核心容器。**

  如：使用$ApplicationContext$的`getBean(String name)`方法时，内部调用的就是$BranFactory$的`getBean`方法

  ```java
  @SpringBootApplication
  public class SpringLearnApplication {
  
      public static void main(String[] args) {
          ConfigurableApplicationContext context = SpringApplication.run(SpringLearnApplication.class, args);
  
          context.getBean("aaa");//内部调用的是  return getBeanFactory().getBean(name);
      }
  
  }
  ```

  > Tip：Start类里面的start函数返回的类型就是$ConfigurableApplicationContext$

---

#### 1.1.1二者功能

- BeanFactory功能
  - 表面上只有`getBean`方法
  - 实际上**控制反转**、**基本注入**、**Bean的生命周期**等各种功能都**由其实现类提供**



- ApplicationContext功能

  ApplicationContext相较于BeanFactory而言，多出来的方法主要是继承自其父类

  

  1. MessageSource接口：为程序提供国际化语言资源

     需要实现提供`.properties`的配置文件。使用键值对的形式提供翻译结果

     ```java
     context.getMessage("hi",null, Locale.CHINA);
     ```

     可被用于多语言系统，提前准备好网站一些内容的不同语言版本，通过`getMessage()`方法读取配置

  

  2. ResourcePatternResolver接口：提供使用**通配符**完成**资源查找、加载的方法**

     可以使用`getResources(String locatonPattern)`的方法查找指定路径下的资源

     - `classpath*`扫描所有jar包的匹配文件

     - `file`扫描磁盘文件

  

  3. EnvironmentCapable接口：提供从环境中获取配置的方法

     `getEnvironment().getProperty("xxx")`

     ```java
         public static void main(String[] args) throws NoSuchFieldException, IllegalAccessException {
             ConfigurableApplicationContext context = SpringApplication.run(SpringLearnApplication.class, args);
     
             System.out.println(context.getEnvironment().getProperty("java_home"));
             System.out.println(context.getEnvironment().getProperty("server.port"));
         }
     ```

     

  4. ApplicationEventPublisher接口：提供事件发布的功能

     - 发送事件的方法`publishEvent`

       ```java
       context.publishEvent(new UserRegisterEvent(context));
       ```

       - UserRegisterEvent：事件对象，继承了$ApplicationEvent$，传入的context表示发布这个事件的源头

     - 接收事件：由监听器接收

       在Spring中，监听器对象如下定义

       ```java
       @Component
       public class UserRegisterEventListener {
       
           @EventListener//监听器注解
           public void listenRegisterEvent(UserRegisterEvent event) {//形参需要与所监听的事件一致
               //...
           }
       }
       ```

     > 事件有点**类似于消息队**列，可以用于代码的**解耦。**

---

#### 1.1.2容器的实现

##### BeanFactory实现容器

- 案例

  ```java
  public class TestBeanFactory {
  
      public static void main(String[] args) {
          //Bean工厂，用于存储Bean
          DefaultListableBeanFactory beanFactory = new DefaultListableBeanFactory();
  
          //Bean的定义（class、scope、初始化、销毁等信息）
          //用于告诉Bean工厂应当存储怎么样的Bean
          AbstractBeanDefinition beanDefinition =
                  BeanDefinitionBuilder
                          .genericBeanDefinition(Config.class)//告诉Bean工厂要收集的Bean的class
                          .setScope("singleton")//单例模式
                          .getBeanDefinition();
  
          beanFactory.registerBeanDefinition("config", beanDefinition);//将Bean的定义告诉Bean工厂
  
          //给Bean工厂添加配置类的 后处理器
          //原生的Bean工厂并不能解析配置类中的Bean信息，也就是说不用后处理器就无法将Bean1、2加入工厂
          AnnotationConfigUtils.registerAnnotationConfigProcessors(beanFactory);
  
          //拿出BeanFactoryPostProcesser（Bean工厂后处理器）对象  并逐一执行
          beanFactory.getBeansOfType(BeanFactoryPostProcessor.class).values().forEach(beanFactoryPostProcessor -> {
              beanFactoryPostProcessor.postProcessBeanFactory(beanFactory);
          });
  
          //Bean后处理器，针对Bean的生命周期的各个阶段提供增强，例如依赖注入@Autowired
          //将Bean后处理器示例从Bean工厂里拿出 并 注册到Bean工厂中
          beanFactory.getBeansOfType(BeanPostProcessor.class).values().forEach(beanFactory::addBeanPostProcessor);
  
          //在加入Bean后处理器后，Bean2就可以被注入到Bean1中了
          System.out.println(beanFactory.getBean(Bean1.class).getBean2());
  
      }
  
  
      @Configuration
      static class Config {
          @Bean
          public Bean1 bean1() {
              return new Bean1();
          }
          @Bean
          public Bean2 bean2() {
              return new Bean2();
          }
  
      }
  
      @Slf4j
      static class Bean1 {
          public Bean1() {
              log.info("构造Bean1");
          }
  
          @Autowired
          private Bean2 bean2;
  
          public Bean2 getBean2() {
              return bean2;
          }
      }
  
      @Slf4j
      static class Bean2 {
          public Bean2() {
              log.info("构造Bean2");
          }
      }
  
  }
  
  ```

  - 控制反转功能

    1. 要有一个**容器（Bean工厂）**
    2. 要准备**Bean的定义类$AbstractBeanDefinition$**，并将其存入工厂。如此一来Bean工厂就可以根据Bean的定义类创建出对应的实例对象并存入
    3. 向Bean工厂中加入**后处理器**，并取出逐一执行，可以**实现Bean工厂功能的加强**  （如上例中，使用了ConfigProcessser增强了Bean工厂解析配置类的功能）

  - 依赖注入功能

    依赖注入功能同样需要后处理器的增强，不过不同于**控制反转中对Bean工厂的后处理器**。**依赖注入的处理器是对Bean的后处理器**

    - 从Bean工厂中拿出Bean后处理器，并使用`addBeanPostProcessor`将其注册到Bean工厂中

    > 由此可看出，Bean工厂中的实例默认都是懒加载。
    >
    > 若不想要懒加载，使用`beanFactory.preInstantiateSingletons();`方法使用饿加载



- 注意

  - 由上例可以看出

    1. Bean工厂不会自动调用Bean工厂后处理器
    2. 不会自动添加Bean后处理器
    3. 不会自动加载实例（懒加载）

  - 后处理器的排序

    先调用的后处理器会被先执行。如@AutoWired后处理器排在@Resource前面。那么会执行@Autowired。执行完后单例已经被创建。如此一来@Resource就不奏效了

    > - Autowired和Resource的区别
    >
    >   假设一个接口有多个实现类。若使用@Autowired就无法区分到底应该创建哪个实现类
    >
    >   - 举例
    >
    >     Bean1、Bean2都实现了Iner接口。当我们@Autowired注入`private Iner iner`时就无法区分到底应该注入Bean1还是2。但是如果`private Iner bean1`就会注入Bean1
    >
    >   若使用Resource就可以指定Bean的名称
    >
    >   - 举例
    >
    >     `@Resource(name = "Bean1")`

    - 如何控制后处理器的调用顺序？

      使用一些比较器对后处理器进行排序

      ```java
      beanFactory.getBeansOfType(BeanPostProcessor.class).values().stream()
              .sorted(beanFactory.getDependencyComparator())
              .forEach(beanFactory::addBeanPostProcessor);
      ```

      后处理器中有`getOrder`方法，比较器会调用这个方法，**根据返回的数字大小进行排序依据**

---

##### ApplicationContext实现容器

- 基于XML配置文件实现

  1. 基于**ClassPath（类路径下）xml**配置文件实现

     ![image-20260928220623468](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/spring/image-20260928220623468.png)

     - <bean>中属性：**id**为该Bean在容器中的**唯一标识（名字）** class为全类名，Spring会**自动运行该类的无参构造创建实例**
     - <property>中的属性：**setter注入**  会自动找到**setxxx(xxx为下方的name)** 将**ref指向的标识对象注入进去**

  2. 基于FileSystem（绝对/相对路径）xml配置文件实现

     内容同上，**只是路径的写法不同了**。创建的类为`FileSystemXmlApplicationContext`需写入xml文件的绝对路径

   

  - 底层原理

    ```java
            //Bean工厂
            DefaultListableBeanFactory beanFactory = new DefaultListableBeanFactory();
    
            //XML--> Bean 的读取器，可以将XML配置文件中的内容变为 BeanDefination（Bean定义）并存入Bean工厂
            XmlBeanDefinitionReader reader = new XmlBeanDefinitionReader(beanFactory);
    
            //读取XML配置文件并转换成Bean定义存入Bean工厂
            reader.loadBeanDefinitions("b01.xml");
    ```

    可见底层仍是将Bean存入Bean工厂，只不过调用了`XmlBeanDefinitionReader`去XML配置文件中读取并将其转为Bean定义对象存入Bean工厂



- 基于**注解（Annotation）配置类（@Configuration+ @Bean）**实现

  1. 

       ```java
           private static void testAnnotationConfigApplicationContext() {
               AnnotationConfigApplicationContext context =
                       new AnnotationConfigApplicationContext(Config.class);
       
               for (String beanDefinitionName : context.getBeanDefinitionNames()) {
                   System.out.println(beanDefinitionName);
               }
               
           }
       
           @Configuration
           static class Config {
               @Bean
               public Bean1 bean1() {
                   return new Bean1();
               }
               @Bean
               public Bean2 bean2() {
                   Bean2 bean2 = new Bean2();
                   bean2.setBean1(bean1());
                   return bean2;
               }
           }
       ```

       底层就是[BeanFactory实现容器](#BeanFactory实现容器)   通过后处理器实现Bean工厂的增强

   

  2. 同样基于注解配置类实现，不过适用于Web环境

     只是**把Config里面创建的内容变为了SpringMVC一些必要的对象。**如：Tomcat服务器、服务器中的dispatcherServlet（用于分发请求）、以及Controller等等

     ```java
         private static void testAnnotationConfigServletWebServerApplicationContext() {
             AnnotationConfigServletWebServerApplicationContext context =
                     new AnnotationConfigServletWebServerApplicationContext(WebConfig.class);
         }
     
         @Configuration
         static class WebConfig{
     
             //Web服务器工厂
             @Bean
             public ServletWebServerFactory webServerFactory(){
                 return new TomcatServletWebServerFactory();
             }
     
             //前控制器（所有请求都经过它）
             @Bean
             public DispatcherServlet dispatcherServlet(){
                 return new DispatcherServlet();
             }
     
             //将前控制器注册进Tomcat服务器
             @Bean
             public DispatcherServletRegistrationBean
             dispatcherServletRegistrationBean(DispatcherServlet dispatcherServlet){
                 return new DispatcherServletRegistrationBean(dispatcherServlet,"/");//"/"表示所有请求
             }
     
             @Bean("/hello")//SpringBoot中@RequestMapping("/hello")的原理
             public Controller controller(){
                 return (request, response) -> {
                     response.getWriter().print("Hello World");
                     return null;
                 };
             }
     
         }
     
     ```

---

### 1.2Bean的生命周期

- Bean的生命周期：`构造 --> 依赖注入 --> 初始化 --> 销毁`

  容器通过**Bean后处理器**实现**各个Bean生命周期阶段的功能增强**。不同的Bean后处理器增强对应不同的生命周期阶段，如：@Autowired增强依赖注入阶段   @PreDestroy增强销毁阶段前   等等



- 设计模式：模板方法

  若我们需要对不同阶段进行不同地增强，那我们就需要实现“无侵入式”增强。模板方法就是用于实现“无侵入式”地扩展的

  ```java
      static class MyBeanFactory{
          private List<BeanPostProcessor> injectPostProcessors = new ArrayList<>();
          
          //模拟Bean的前三个生命周期
          public Object getBean(){
              Object bean = new Object();
              System.out.println("构造" + bean);
              System.out.println("依赖注入" + bean);
              for (BeanPostProcessor processor : injectPostProcessors) {
                  processor.inject(bean);//遍历集合，顺序执行后处理器
              }
              System.out.println("初始化" + bean);
              return bean;
          }
      
          //增加后处理器方法
          public void addInjectPostProcessor(BeanPostProcessor processor){
              injectPostProcessors.add(processor);
          }
      
      }
  
      //将后处理器抽象成接口，如此一来就实现了解耦。需要对功能进行增强时，直接写一个对应的实现类即可
      static interface BeanPostProcessor {
          public void inject(Object bean);//对依赖注入阶段的扩展
      }
  ```

  如上：将**需要扩展的部分抽象成接口**，需要对功能进行增强时，直接写一个对应的实现类即可。如此一来就实现了解耦

---

### 1.3常见的Bean后处理器

- 案例

  ```java
          //一个很干净的容器，里面什么后处理器都没有。便于测试
          //但是不同于BeanFactory需要手动调用后处理器，这个容器可以调用refresh方法一键调用后处理器
          GenericApplicationContext context = new GenericApplicationContext();
  
          //添加三个Bean
          context.registerBean("bean1", Bean1.class);
          context.registerBean("bean2", Bean2.class);
          context.registerBean("bean3", Bean3.class);
  
          //自动装配候选者的解析器，默认的解析器无法解析@Value() 的值注入，此处换一个
          context.getDefaultListableBeanFactory().setAutowireCandidateResolver(new ContextAnnotationAutowireCandidateResolver());
          //@Autowired后处理器
          context.registerBean(AutowiredAnnotationBeanPostProcessor.class);
  
          //@Resource  @PostConstruct  @PreDestroy后处理器
          context.registerBean(CommonAnnotationBeanPostProcessor.class);
  
          //初始化容器
          context.refresh();
  
          //销毁容器
          context.close();
  ```

  > Tip：在Bean1中使用了多种setter注入
  >
  > ```java
  >     @Autowired//@Autowired会对形参进行自动注入
  >     public void setBean2(Bean2 bean2) {
  >         this.bean2 = bean2;
  >         log.info("@Autowired  依赖注入完成.........");
  >     }
  >     
  > 	@Autowired
  > 	//对于String类型不会被@Autowired认为是一个Bean也就是说IOC容器里是没有String home这个变量的，所以搭配@Value进行值注入
  >     public void setHome(@Value("${JAVA_HOME}") String home) {
  >         log.info("@Autowired + @Value 值注入String完成.......");
  >     }
  > ```

---

#### 1.3.1@Autowried后处理器分析

```java
public class DigInAutowired {
    public static void main(String[] args) throws Throwable {
        DefaultListableBeanFactory beanFactory = new DefaultListableBeanFactory();

        //直接使用registerSingleton方法，就无需再创建Bean的定义类了
        //缺点是该方法不会执行Bean的构造、依赖注入、初始化（它认为拿过来的已经是成品Bean了）
        beanFactory.registerSingleton("bean2",new Bean2());
        beanFactory.registerSingleton("bean3",new Bean3());

        //@Value
        beanFactory.setAutowireCandidateResolver(new ContextAnnotationAutowireCandidateResolver());

        //${}解析器
        beanFactory.addEmbeddedValueResolver(new StandardEnvironment()::resolvePlaceholders);

        //后续将Autowired后处理器单拎出来手动调用，以此增强依赖注入的流程
        AutowiredAnnotationBeanPostProcessor processor = new AutowiredAnnotationBeanPostProcessor();

        //1.setBeanFactory，后续要从Bean工厂中找到依赖注入所需的Bean
        processor.setBeanFactory(beanFactory);

        //2.创建对象并进行注入
        Bean1 bean1 = new Bean1();
//        processor.postProcessProperties(null,bean1,"bean1");

        //postProcessProperties分为以下几步
        //由于里面的成员是私有的，后续采用反射调用的方法进行剖析
        Method findAutowiringMetadata = AutowiredAnnotationBeanPostProcessor.class
                .getDeclaredMethod("findAutowiringMetadata", String.class, Class.class, PropertyValues.class);
        findAutowiringMetadata.setAccessible(true);

        //1.查找bean1中哪些属性、方法加了@Autowired，这一步返回的结果为InjectionMetadata
        InjectionMetadata injectionMetadata = (InjectionMetadata) findAutowiringMetadata.invoke(processor,"bean1",Bean1.class,null);

        //2.上一步执行完后，InjectionMetadata对象中就封装了对应的注入方法。第二步直接调用inject。inject方法会依次执行注入方法（set方法）
        injectionMetadata.inject(bean1,"bean1",null);

        System.out.println(bean1);
    }
}

```

综上，Autowired注入分为以下几步

1. `setBeanFactory`：后续注入时需要去Bean工厂里面寻找注入的对象
2. 创建需要被注入的对象，调用`findAutowiringMetadata`方法。找到该对象内的哪些属性需要被注入（即加了@Autowired）。找到后返回$InjectionMetadata$
3. 执行`inject`方法完成注入，其具体流程如下
   1. 获取$InjectionMetadata$中需要被注入的属性，封装为$DependencyDescriptor$对象，拿着这个对象去Bean工厂里面找`beanFactory.doResolveDependency(DenpendencyDescriptor d)`
   2. 找到后调用$InjectionMetadata$中封装的set方法进行注入

---

### 1.4常见的BeanFactory后处理器

- 案例

  ```java
  public class TestPostBeanFactoryProcesser {
  
      public static void main(String[] args) {
          GenericApplicationContext context = new GenericApplicationContext();
  
          context.registerBean("config",Config.class);
  
          //@ComponentScan  @Configuration+@Bean  @Import   @ImportResource
          context.registerBean(ConfigurationClassPostProcessor.class);
          //@MapperScan("PostBeanFactoryProcesserPojo")  将指定包下的所有mapper接口都加进容器
          context.registerBean(MapperScannerConfigurer.class,bd->{
              bd.getPropertyValues().add("basePackage","PostBeanFactoryProcesserPojo");
          });
  
          context.refresh();
  
          for (String beanDefinitionName : context.getBeanDefinitionNames()) {
              System.out.println(beanDefinitionName);
          }
      }
  
  }
  ```



#### 1.4.1 @ComponentScan功能模拟实现

```java
public class ConponentScanPostProcesser implements BeanFactoryPostProcessor {
    @Override//调用context.refresh后的回调函数。在这里实现后处理器功能
    public void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory) throws BeansException {
        try {
            //1.调用工具类，查找Config类下有无Component注解
            ComponentScan componentScan = AnnotationUtils.findAnnotation(Config.class, ComponentScan.class);
            if (componentScan != null) {//若有，则执行ComponentScan逻辑
                //2.将Scan的目录转换出来，并查找该目录下的资源
                for (String p : componentScan.basePackages()) {
                    //拼接路径
                    String path = "classpath*:" + p.replace(".", "/") + "/**/*.class";

                    //通过路径搜寻资源，扫描出来的资源都是class文件
                    Resource[] resources = new PathMatchingResourcePatternResolver().getResources(path);

                    //用于读取字节码文件的元信息
                    CachingMetadataReaderFactory metadataReaderFactory = new CachingMetadataReaderFactory();

                    //放入IOC容器时，beanName的生成器
                    AnnotationBeanNameGenerator beanNameGenerator = new AnnotationBeanNameGenerator();
                    for (Resource resource : resources) {
                        //读取出字节码文件中的类信息
                        MetadataReader reader = metadataReaderFactory.getMetadataReader(resource);

                        //类名
                        String className = reader.getClassMetadata().getClassName();

                        //如果该类含有Component或间接含有Component注解，将其加入容器
                        if(reader.getAnnotationMetadata().hasAnnotation(Component.class.getName())
                        || reader.getAnnotationMetadata().hasMetaAnnotation(Component.class.getName())) {
                            //加入容器，先获取bean定义
                            AbstractBeanDefinition bd = BeanDefinitionBuilder
                                    .genericBeanDefinition(className)
                                    .getBeanDefinition();
                            
                            //生产bean名字
                            String name = beanNameGenerator.generateBeanName(bd, (DefaultListableBeanFactory) beanFactory);

                            //放入容器
                            ((DefaultListableBeanFactory) beanFactory).registerBeanDefinition(name, bd);
                        }

                    }
                }


            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}

```

`有无ComponentScan --> 若有则拼接其中的路径名，对指定包下的所有类进行扫描 --> 拿到class文件后利用工具取出元数据 --> 判断类中有无Component注解 --> 若有则将其加入容器`

---

#### 1.4.2@Bean模拟实现

- 首先要明晰，**@Configuration本身就是一个工厂**，**@Bean就是里面的工厂方法**，标明了要如何生产Bean。
  - 对于普通Bean的生产。我们要在BeanDefinationBuilder中传入类名，以定义该实例所属的类。最后**由IOC去自动new出一个对象**
  - 而对于@Bean而言，@Bean下的方法已经return了一个new好的对象了，也就是说**@Bean方法是无需IOC去自动new一个对象出来的**。所以当我们**使用@Bean创建时，BeanDefinationBuilder是无需传入类名的**

```java
public class MyBeanPostProcesser implements BeanFactoryPostProcessor {
    
    @Override
    public void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory) throws BeansException {

        try {
            CachingMetadataReaderFactory metadataReaderFactory = new CachingMetadataReaderFactory();

            //获取元数据
            MetadataReader reader = metadataReaderFactory.getMetadataReader(new ClassPathResource("PostBeanFactoryProcesserPojo/Config.class"));

            //获取@Bean下的工厂方法
            Set<MethodMetadata> annotatedMethods = reader.getAnnotationMetadata().getAnnotatedMethods(Bean.class.getName());

            for (MethodMetadata method : annotatedMethods) {
                //Bean定义类Builder，无需指定需要创建的实例的类名。因为此处不是由IOC容器自动new
                BeanDefinitionBuilder builder = BeanDefinitionBuilder.genericBeanDefinition();

                //传入工厂方法和工厂Bean
                builder.setFactoryMethodOnBean(method.getMethodName(),"config");

                //配置自动装配：即@Bean下面的方法中的形参需要被装配，不然是null
                builder.setAutowireMode(AbstractBeanDefinition.AUTOWIRE_CONSTRUCTOR);

                //拿到Bean的定义类
                AbstractBeanDefinition bd = builder.getBeanDefinition();

                //放入IOC容器
                ((DefaultListableBeanFactory)beanFactory).registerBeanDefinition(method.getMethodName(),bd);
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }
}
```

---

#### 1.4.3@Mapper模拟实现

- 首先要明晰的是，IOC容器中存储的都是对象，而Mapper却是接口。所以需要使用$MapperFactoryBean$将Mapper接口封装

  ```java
      @Bean
      public MapperFactoryBean<Mapper1> mapperFactoryBean(SqlSessionFactory sqlSessionFactory) {
          //使用泛型明确需要创建的Mapper类对应哪个接口
          MapperFactoryBean<Mapper1> mapperFactoryBean = new MapperFactoryBean<>();
          //添加SqlSessionFactory，原因：Mapper需要得到SqlSession与数据库建立连接
          mapperFactoryBean.setSqlSessionFactory(sqlSessionFactory);
          return mapperFactoryBean;
      }
  ```

```java
public class MapperPostProcesser implements BeanDefinitionRegistryPostProcessor {
    @Override
    public void postProcessBeanDefinitionRegistry(BeanDefinitionRegistry beanFactory) throws BeansException {
        try {
            //类似ComponentScanner，此处为方便实现，硬编码读取指定目录下的所有类
            PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
            Resource[] resources = resolver.getResources("classpath:PostBeanFactoryProcesserPojo/**/*.class");

            AnnotationBeanNameGenerator generator = new AnnotationBeanNameGenerator();

            for (Resource resource : resources) {
                //获取每个类的元信息
                CachingMetadataReaderFactory metadataReaderFactory = new CachingMetadataReaderFactory();
                MetadataReader reader = metadataReaderFactory.getMetadataReader(resource);
                //获取类信息
                ClassMetadata classMetadata = reader.getClassMetadata();

                //若类是接口，则进入if创建其对应的MapperFactoryBean类
                if(classMetadata.isInterface()){

                    //这个bd用于封装MapperFactoryBean
                    //但是由于类型写死了是MapperFactoryBean所以使用AnnotationBeanNameGenerator生成的名字也是同一个
                    AbstractBeanDefinition bd = BeanDefinitionBuilder
                            .genericBeanDefinition(MapperFactoryBean.class)
                            .addConstructorArgValue(classMetadata.getClassName())//将Mapper类型加入MapperFactoryBean的泛型中(更准确的是放入MapperFactoryBean的构造函数参数中)
                            .setAutowireMode(AbstractBeanDefinition.AUTOWIRE_BY_TYPE)//将SqlSessionFactoryBean自动装配进MapperFactoryBean
                            .getBeanDefinition();

                    //这个bd用于区分名字
                    AbstractBeanDefinition bd2 = BeanDefinitionBuilder.genericBeanDefinition(classMetadata.getClassName()).getBeanDefinition();

                    String name = generator.generateBeanName(bd2, beanFactory);

                    beanFactory.registerBeanDefinition(name, bd);
                }

            }


        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory) throws BeansException {

    }
}
```

---

### 1.5Aware和InitializingBean

- Aware接口作用

  Aware是回调标记接口，用于**拿取容器与容器中的Bean的信息**。当一个类`implements`了Aware的子接口并重写方法后，在**依赖注入完成后**就会**回调重写的方法**，并将该方法形参中需要的属性注入进去

  > 如此一来，通过对应的Aware子接口，就可以将Spring容器中的一些信息暴露给Bean

  1. BeanNameAware接口：注入Bean的名字

     ```java
     public class MyBean implements BeanNameAware {
         @Override
         public void setBeanName(String name) {
           log.info("当前Bean：{},当前Bean的名字是：{}",this,name);
         }
     }
     ```

     当我们在容器中注册MyBean时，`context.registerBean("mybean",MyBean.class);`，后续**依赖注入完成后**就会**回调**上面这个方法，将我们指定的名字注入进去

     

  2. BeanFactoryAware接口：注入BeanFactory容器

     

  3. ApplicationContextAware接口：注入ApplicationContext容器

     ```java
     public class MyBean implements ApplicationContextAware {
         @Override
         public void setApplicationContext(ApplicationContext applicationContext) 
             throws BeansException {
             log.info("MyBean所在容器是:{}",applicationContext);
         }
     }
     ```

     同上，**依赖注入完成后**回调该方法并**将当前Bean所在的容器注入**

     

  4. EmbeddeValueResolverAware接口：注入${}的解析器

  > - 与@Autowired注入的区别
  >   - @Autowired的注入通过**后处理器**实现，可以**注入容器中的任意对象**
  >   - Aware接口的注入属于**内置功能**，只能**获取容器中的特定信息**（具体信息根据子接口而定）

  

- InitializingBean接口作用

  对Bean做一些**初始化**

  ```java
  public class MyBean implements InitializingBean {
      @Override
      public void afterPropertiesSet() throws Exception {
          log.info("{}Bean正在初始化",this);
      }
  }
  ```

---

### 1.6初始化和销毁

- Spring提供了多种初始化和销毁的方法

  1. 在**@Bean时指定初始化/销毁方法**

     - `@Bean(initMethod = "init1")`
     - `@Bean(destroyMethod = "destroy1")`

     指定后在初始化时就会去该Bean的内部找`init1`方法来进行初始化

     同理销毁时也会去该Bean内部找`destroy1`进行销毁

  2. 使用**@PostConstruct**进行**初始化**、**@PreDestroy**进行**销毁**

     ```java
     @PostConstruct
     public void init(){
         //...
     }
     
     @PreDestroy
     public void destroy(){
         //...
     }
     ```

  3. 实现$InitializingBean$接口进行初始化、$DisposableBean$接口进行销毁

  上述三种方法优先级`@PostConstruct/@PreDestroy > InitializingBean/DisposableBean > @Bean`

---

### 1.7Scope

#### 1.7.1Spring中的Scope

- Scope可以用于指定Bean所在域的范围，具体分类如下
  1. sigleton：同个IOC容器中单例模式（默认）
  2. prototype：每次都new一个新的Bean
  3. request：在**同一个Heep请求中**是单例
  4. session：**同个session会话中**是单例
  5. application：**整个Web程序中**是单例



- 案例

  创建了三个Bean，每个Bean的Scope都不同

  1. ```java
     @Slf4j
     @Component
     @Scope("request")
     public class BeanForRequest {
         @PreDestroy
         public void destroy(){
             log.info("destroy");
         }
     }
     ```

  2. ```java
     @Slf4j
     @Component
     @Scope("session")
     public class BeanForSession {
         @PreDestroy
         public void destroy(){
             log.info("destroy");
         }
     }
     
     ```

  3. ```java
     @Scope("application")
     @Component
     @Slf4j
     public class BeanForApplication {
         @PreDestroy
         public void destroy(){
             log.info("destroy");
         }
     }
     ```

  将这三个Bean注入同一个Controller中，并且新增一个请求路径，每当访问这个请求路径时就打印三个Bean的信息

  ```java
  @RestController
  public class MyController {
  
      @Lazy//在singlton模式下注入其他scope模式的Bean需要加Lazy不然会失效
      @Autowired
      private BeanForApplication beanForApplication;
  
      @Lazy
      @Autowired
      private BeanForSession beanForSession;
  
      @Lazy
      @Autowired
      private BeanForRequest beanForRequest;
  
      @GetMapping("/test")
      public String test(HttpServletRequest request, HttpSession session) {
          ServletContext sc = request.getServletContext();
  
          String sb = "<ul>" +
                  "<li>" + "request scope:" + beanForRequest + "</li>" +
                  "<li>" + "session scope:" + beanForSession + "</li>" +
                  "<li>" + "application scope:" + beanForApplication + "</li>" +
                  "</ul>";
  
          return sb;
      }
  
  }
  ```

  项目启动后使用浏览器测试时发现，每刷新一次`beanForRequest`就会变。Session超时后`beanForSession`会被destroy

---

#### 1.7.2Scope失效的解决

- 在Sigleton模式下注入其他Scope模式的Bean会**导致其他Bean的模式失效（注入的都是单例即Sigleton）**

  - 原因

    对于单例对象而言，对象只会被创建一次，对象内部其他Bean的注入也只会被执行一次。所以在单例模式下注入的对象都是单例的

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/spring/image-20260930130801415.png" alt="image-20260930130801415" style="zoom:50%;" />

  - 解决方法1

    加上@Lazy注解后，不会注入一个真正的对象，而是会注入一个代理对象。后续再去调用方法时，**代理对象会去容器中拿到真正的对象**并调用对应方法

    <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/spring/image-20260930130928449.png" alt="image-20260930130928449" style="zoom:50%;" />

  - 解决方法2

    在Scope后加入参数`proxyMode = ScopedProxyMode.TARGET_CLASS`

    ```java
    @Slf4j
    @Component
    @Scope(value = "request",proxyMode = ScopedProxyMode.TARGET_CLASS)
    public class BeanForRequest {
        @PreDestroy
        public void destroy(){
            log.info("destroy");
        }
    }
    ```

    同样也会生成一个代理对象

   

  - 解决方法3

    使用`ObjectFactory`工厂去存储其他模式的对象

    ```java
        private ObjectFactory<BeanForRequest>  beanForRequestFactory;
        private BeanForRequest getBeanForRequest() {
            return beanForRequestFactory.getObject();
        }
    ```

    虽然工厂只有一个，但是从工厂中拿对象的时候，会检测到其模式，并根据其模式进行生产、拿取

   

  - 解决方法4

    直接把ApplicationContext容器注入进去，从该容器中拿取，和解决方法3类似

    ```java
        private ApplicationContext context;
        public BeanForRequest getBeanForRequest() {
            return context.getBean(BeanForRequest.class);
        }
    ```

> 上面四种解决方法本质上是一样的，就是借助一个中间媒介延迟了其他Scope模式Bean的创建。只不过在调用方法时，代理对象是自动去容器中拿到对应Bean；使用容器拿的话就要手动调用

---

## 2.AOP

### 2.1ajc增强

- 案例

  **注：该案例需要引入aspectj的依赖和插件！！！**

  ```java
  @Service
  @Slf4j
  public class MyService {
  
      public void foo(){
          log.info("foo()");
      }
  
  }
  
  //下面是对上面方法的增强，此处放在一起
  @Aspect
  @Slf4j
  @Component
  public class MyAspect {
      @Before("execution(* xinja.spring.springlearn.TestAOP.MyService.foo())")
      public void before(){
          log.info("before()");
      }
  }
  ```

  ```java
  @Slf4j
  @SpringBootApplication
  public class testAOPApplication {
  
      public static void main(String[] args) {
          ConfigurableApplicationContext context = SpringApplication.run(testAOPApplication.class, args);
  
          MyService myService = context.getBean(MyService.class);
  
          log.info("Service Class:{}", myService.getClass());
          myService.foo();
  
          context.close();
      }
  
  }
  ```

  - 现象

    运行后发现，确实实现了动态代理增强（打印出了“Before()”）。但是拿出来的myservice**并不是代理类**，而是原本的MyService类

  - 原因

    上述流程**使用的Aspectj编译器编译**的，Aspectj编译器会**直接将代理增强的内容编译到被代理类的字节码文件中**。如此一来，运行时动态代理增强就与代理类无关了。所以无需将动态代理类加入到IOC容器中也可以增强

---

### 2.2Agent增强

- 不同于直接使用Aspectj在编译阶段就进行代理的处理。Agent增强会在类加载阶段实现代理的处理

  - 实现

    在JVM虚拟机参数上加上

    ```
    -javaagent:maven仓库绝对地址/org/aspectj/aspectjweaver/1.9.7/aspectjweaver-1.9.7.jar
    ```

    如此一来，在类加载阶段，就会对字节码进行一个优化，将代理增强的功能加入被代理类的字节码

---

### 2.3代理对象（Proxy）增强

> 实际开发中流行的AOP实现方法。具体又分为两种
>
> 1. JDK代理
> 2. cglib代理

---

#### 2.3.1JDK代理

- 只能针对接口代理



- 流程

  1. 获取类加载器，用于后续代理类的加载。

     代理类不像普通类一样有着类的定义的源代码。也就是说**代理类的字节码文件是运行时生成的**，若想要运行时生成，就需要获得类加载器去加载这个类 （普通类的字节码文件在编译阶段就生成好放在磁盘中，创建类时自动触发类加载器进行加载）

  2. 生成代理类

  3. 使用代理类

  ```java
  public class JDKProxy {
  
      interface Foo{
          public void foo();
      }
  
      static class Target implements Foo{
          @Override
          public void foo() {
              System.out.println("target foo");
          }
      }
  
      public static void main(String[] args) {
  
          //目标对象
          Target target = new Target();
  
          //1.获取类加载器
          ClassLoader classLoader = JDKProxy.class.getClassLoader();
  
          //2.生成代理类
          //参数一：类加载器，用于加载代理类
          //参数二：代理类实现的接口，可以实现多个所以是数组
          //参数三：对代理对象的增强
          Foo proxy = (Foo) Proxy.newProxyInstance(classLoader,new Class[]{Foo.class},new InvocationHandler() {
              @Override
              //参数一：代理对象
              //参数二：被代理类运行的方法
              //参数三：方法的参数
              public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                  System.out.println("before.....");
                  Object res = method.invoke(target, args);//调用被代理对象的原方法
                  System.out.println("after");
                  return res;
              }
          });
  
          proxy.foo();
      }
  }
  ```

> 1. JDK动态代理中，代理对象与被代理对象都实现了同一个接口。属于同一接口的不同实现类
> 2. JDK动态代理可以对`final`对象进行代理

---

#### 2.3.2 cglib代理

- 利用**父子关系**实现代理

  ```java
  public class CglibProxy {
  
      static class Target{
          public void foo(){
              System.out.println("target foo");
          }
  
          public static void main(String[] args) {
  
              Target target = new Target();
  
              //创建代理对象
              //参数一：父类型，传入被代理类  （被代理类和代理类是父子关系）
              //参数二：对代理对象的增强
              Target proxy = (Target) Enhancer.create(Target.class, new MethodInterceptor() {
                  @Override
                  //参数1：代理类自身   参数2：被代理类运行的方法
                  //参数3：方法参数   参数4：同样为正在运行的方法，但是可以避免反射调用
                  public Object intercept(Object o, Method method, Object[] objects, MethodProxy methodProxy) throws Throwable {
                      System.out.println("before");
                      //Object res = method.invoke(target, objects);
                      //Object res = methodProxy.invoke(target, objects);//内部没有用反射，需要目标对象
                      methodProxy.invokeSuper(o,objects);//内部没有反射，需要代理对象
                      System.out.println("after");
                      return res;
                  }
              });
              
              proxy.foo();
          }
      }
  }
  ```

  > cglib是无法对`final`修饰的class进行代理的，原因：cglib代理是让代理类成为被代理类的子类。若被代理类是`final`修饰的，是不允许有子类的。   同理，被代理类中若有方法被`final`修饰，也无法被增强。因为`final`修饰的方法不会进入虚方法表被子类继承

---

#### 2.3.3JDK代理原理

##### 模拟实现

1. 初步实现

   - 创建一个$InvocationHandler$接口，只有一个`invoke`方法（函数式编程思想）。用于增强方法的回调。将$InvocationHandler$对象设为$\$Proxy0$类的成员变量。我们**在外部重写增强后的逻辑传入$\$Proxy0$对象**，并使用$\$Proxy0$对象回调我们增强的`invoke`方法即可

     ```java
     public interface InvocationHandler {
         void invoke();//invoke方法还没有返回值，也无法指定调用函数，此处先写死
     }
     ```

   - 创建一个$\$Proxy0$类（代理对象类）。内部有一个$InvocationHandler$接口的变量。用于增强函数的回调

     ```java
     public class $Proxy0 implements application.Foo {//实现目标对象的同等接口，此处先写死，后续改进
         private final InvocationHandler invocationHandler;
     
         public $Proxy0(InvocationHandler invocationHandler) {
             this.invocationHandler = invocationHandler;
         }
     
         @Override
         public void foo() {
             invocationHandler.invoke();
         }
     }
     ```

   如此一来，就可以在外部创建$\$Proxy0$对象

   ```java
   public class application {
       interface Foo{
           void foo();
       }
       static class Target implements Foo{
           @Override
           public void foo() {
               System.out.println("target foo");
           }
       }
       public static void main(String[] args) {
   
           $Proxy0 proxy0 = new $Proxy0(new InvocationHandler() {//传入回调函数
               @Override//由我们自己重写回调函数的增强逻辑
               public void invoke() {
                   System.out.println("before()");
                   new Target().foo();//此处先写死
                   System.out.println("after()");
               }
           });
           proxy0.foo();
       }
   
   }
   ```



2. 为`invoke()`方法传入`Method`对象（需要增强的方法）以及方法参数，**实现被代理对象不同方法的调用**

   ```java
   public interface InvocationHandler {
       void invoke(Method method, Object[] args) throws Throwable;
   }
   ```

   如此一来，当我们在$\$Proxy0$类中调用`invoke`时，就需要反射获得Method并传入

   ```java
   public class $Proxy0 implements application.Foo {
       private final InvocationHandler invocationHandler;
   
       public $Proxy0(InvocationHandler invocationHandler) {
           this.invocationHandler = invocationHandler;
       }
   
       @Override
       public void foo() {
           try {
               Method method = application.Foo.class.getMethod("foo");//获取调用的方法
               invocationHandler.invoke(method,new Object[0]);//将method传入，供InvocationHandler回调
           } catch (Throwable e) {
               throw new RuntimeException(e);
           }
   
       }
   }
   ```

   如此一来，外部重写增强逻辑的时候，使用参数`method`调用即可

   ```java
           $Proxy0 proxy0 = new $Proxy0(new InvocationHandler() {
               @Override
               public void invoke(Method method, Object[] args) throws InvocationTargetException, IllegalAccessException {
                   System.out.println("before()");
                   method.invoke(new Target(),args);//此处直接用参数里的method调用。method在Proxy类中会传入
                   System.out.println("after()");
               }
           });
   
   ```

3. 返回值的优化

   ```java
   public interface InvocationHandler {
       Object invoke(Method method, Object[] args) throws Throwable;
   }
   ```

   $\$Proxy0$中

   ```java
       @Override
       public int foo() {
           try {
               Method method = application.Foo.class.getMethod("foo");
               Object res = invocationHandler.invoke(method, new Object[0]);
               return (int) res;//强转返回
           } catch (Throwable e) {
               throw new RuntimeException(e);
           }
       }
   ```

   测试代码中

   ```java
           $Proxy0 proxy0 = new $Proxy0(new InvocationHandler() {
               @Override
               public Object invoke(Method method, Object[] args) throws InvocationTargetException, IllegalAccessException {
                   System.out.println("before()");
                   Object res = method.invoke(new Target(), args);
                   System.out.println("after()");
                   return res;
               }
           });
   ```

   返回结果返回的路径`InvocationHandler.invoke() -> Proxy -> 外部`

4. 在$\$Proxy0$类中，方法可以设置为静态变量；方法的初始化可以使用静态代码块进行初始化如此一来就不用频繁初始化方法了

   ```java
       private static final Method foo;
   
       static{
           try {
               foo = application.Foo.class.getMethod("foo");
           } catch (NoSuchMethodException e) {
               throw new RuntimeException(e);
           }
       }
   ```

   

5. 除此之外，JDK的$InvocationHandler$中还有个参数即：Proxy对象本身（有些业务需要用到Proxy对象自己）。这里就不继续优化了。无非是在$\$Proxy0$的每个增强方法中传入`this`

> 由上述过程可看出。JDK代理的实现和模板方法这个设计模式类似。**都是将需要增强的部分抽象成接口。后续对接口进行重写增强再调用**

---

##### JDK底层原理

- JDK底层采用$ASM$技术直接生成代理类的字节码文件。$ASM$技术可以**在运行期间动态生成字节码**
  - 由于是运行使其动态生成的字节码。所以构造代理类时我们要传入类加载器。使得在程序运行时动态构造代理类
  - JDK底层使用$ASM$生成的字节码反编译过来，对于方法的初始化与我们模拟实现的一致



- JDK底层对于反射的优化
  - 前16次调用：调用底层$Native\ \ API$，效率较慢但是不用额外生成一个类对象
  - 16次调用之后：生成一个对应的$MethodAccessor$对象，里面存有反射对象的所有方法。直接调用该对象的方法，增快效率，但是占据了额外运行空间

---

#### 2.3.4Cglib代理原理

##### 模拟实现

- Cglib的代理类基于继承实现。使用继承的方式对被代理类中的方法重写，实现增强

```java
public class Proxy extends Target {

    //类似JDK中的InvocationHandler
    //Cglib中通过MethodInterceptor实现增强函数的回调
    private final MethodInterceptor interceptor;

    private static final Method save0;
    private static final Method save1;
    private static final Method save2;

    static{
        try {
            save0 = Target.class.getMethod("save");
            save1 = Target.class.getMethod("save",int.class);
            save2 = Target.class.getMethod("save",long.class);
        } catch (NoSuchMethodException e) {
            throw new RuntimeException(e);
        }
    }

    public Proxy(MethodInterceptor interceptor) {
        this.interceptor = interceptor;
    }

    @Override
    public void save() {
        try {
            interceptor.intercept(this,save0,new Object[0],null);
        } catch (Throwable e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void save(long l) {
        try {
            interceptor.intercept(this,save2,new Object[]{l},null);
        } catch (Throwable e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void save(int i) {
        try {
            interceptor.intercept(this,save1,new Object[]{i},null);
        } catch (Throwable e) {
            throw new RuntimeException(e);
        }
    }
}
```

---

##### MethodProxy实现非反射调用

- Cglib实现代理时，$MethodInterceptor$的`intercept`方法的最后一个参数$MethodProxy$可以实现**非反射调用**
  - 原因：Cglib是基于父子继承关系实现代理的。所以使用父类对象的方法即可实现非反射调用`super.xxx`

```java
    private static final MethodProxy save0Proxy;
    private static final MethodProxy save1Proxy;
    private static final MethodProxy save2Proxy;

    static{
        try {
            save0 = Target.class.getMethod("save");
            save1 = Target.class.getMethod("save",int.class);
            save2 = Target.class.getMethod("save",long.class);

            //参数1：被代理类  参数2：代理类  参数3：对方法的参数和返回值的描述  参数4：被代理类中的方法名  参数5：代理类中的对应方法名
            save0Proxy = MethodProxy.create(Target.class, Proxy.class,"()V","save","saveSuper");
            save1Proxy = MethodProxy.create(Target.class, Proxy.class,"(I)V","save","saveSuper");
            save2Proxy = MethodProxy.create(Target.class, Proxy.class,"(J)V","save","saveSuper");
        } catch (NoSuchMethodException e) {
            throw new RuntimeException(e);
        }
    }

    public void saveSuper(){
         super.save();
    }

    public void saveSuper(int i){
        super.save(i);
    }

    public void saveSuper(long l){
        super.save(l);
    }
```

回调时将$MethodProxy$对象传入即可



- 原理

  当我们调用`MthodProxy.invoke()/invokeSuper()`时。会又生成两个代理类$TargetFastClass(被代理对象的FastClass代理)$、$ProxyFastClass（代理对象的FastClass代理）$。由这两个FastClass代理类内部的方法实现非反射调用

  ```java
  public class TargetFastClass {
  
      /**
       * ProxyFastClass只有此处与TargetFastClass不同
       * TargetFastClass是使用Target里的原生save()做方法签名
       * ProxyFastClass是使用代理类中的saveSuper()方法做签名
       * saveSuper方法内部间接调用了save
       */
      
      static Signature s0 = new Signature("save","()V");
      static Signature s1 = new Signature("save","(I)V");
      static Signature s2 = new Signature("save","(J)V");
  
      /**
       * 根据方法签名获取方法的编号
       * 编号会根据方法签名事先创建
       * 方法      编号
       * save0     0
       * save1     1
       * save2     2
       *
       * signature：方法签名，包括方法的方法名、参数信息、返回值信息。用于描述一个方法
       * save0Proxy = MethodProxy.create(Target.class, Proxy.class,"()V","save","saveSuper");
       * 第三个参数+第四个参数构成方法签名
       */
  
      public int getIndex(Signature signature){
          if(s0.equals(signature)){
              return 0;
          }
          if(s1.equals(signature)){
              return 1;
          }
          if(s2.equals(signature)){
              return 2;
          }
          return -1;
      }
  
  
      /**
       *根据方法编号去正常调用目标对象的方法方法
       *
       * index:方法编号  target：目标对象   args：方法参数
       * */
      public Object invoke(int index, Object target, Object[] args) {
          if(index == 0){
              ((Target)target).save();
              return null;//无返回值，返回null
          }
          else if(index == 1){
              ((Target)target).save((int)args[0]);
              return null;
          }
          else if(index == 2){
              ((Target)target).save((long)args[0]);
              return null;
          }
          else{
              //找不到，抛异常
              throw new RuntimeException();
          }
      }
      
  }
  ```

  - 逻辑
    1. **创建$MethodProxy$对象时**，调用`MethodProxy.creat()`方法。会**根据传入的方法签名信息为每个方法分配一个编号index**
    2. 调用`MethodProxy.invoke()/invokeSuper()`方法时，会**调用`getIndex()`方法得到编号后使用`invoke()`方法调用原生方法**

---

### 2.4 Spring中的代理技术

> Spring中对JDK的代理与Cglib代理进行了收录选择

- Spring中实际有两种切面的概念

  1. Aspect。切面类注解，**一个切面类中可以有多个通知+切点**

  2. advisor。粒度更细，只包含**一个通知和切点**

     更加底层，一个Aspect切面类中的**多个通知+切点，会被拆成一个个advisor**

     ```java
         public static void main(String[] args) {
             //1.备好切点
             //PointCut是接口，AspectJExpressionPointcut为其实现类
             AspectJExpressionPointcut pointcut = new AspectJExpressionPointcut();
             //设置切点表达式
             pointcut.setExpression("execution(* xinja.spring.springlearn.SpringAOP.MyService.foo(..))");
     
             //2.备好通知（MethodInterceptor,tip：不是Cglib的MethodInterceptor）
             //此处的MethodInterceptor是一个函数式接口
             MethodInterceptor advice = invocation -> {
                 System.out.println("before()");
                 Object ret = invocation.proceed();//调用被代理对象的原方法
                 System.out.println("after()");
                 return ret;
             };
     
             //3.备好切面
             //构造时传递一个切点和一个通知
             DefaultPointcutAdvisor advisor = new DefaultPointcutAdvisor(pointcut, advice);
     
             //4.创建代理
             //使用Spring封装的代理工厂创建，底层会根据不同的情况选择不同的代理技术（JDK/Cglib）
             ProxyFactory proxyFactory = new ProxyFactory();
             //设置目标被代理对象
             proxyFactory.setTarget(new MyService());
             //加入切面
             proxyFactory.addAdvisor(advisor);
             //创建代理
             MyService proxy = (MyService) proxyFactory.getProxy();
             
             proxy.foo();
         }
     ```



- Spring中对 JDK/Cglib 代理技术的选择

  Spring底层使用$ProxyFactory$创建代理对象。其底层使用$AopProxyFactory$，会在不同情况下选择不同的代理技术。具体规则如下

  - $ProxyFactory$中有一个`proxyTargetClass`属性，是`boolean`类型的啊。

  1. $proxyTargetClass = false$，且被代理对象实现了接口时，使用JDK的代理技术
  2. $proxyTargetClass = false$，且代理对象没有实现接口时，使用Cglib的代理技术
  3. $proxyTargetClass = true$，使用Cglib的代理技术

  > - 可以使用`setProxyTargetClass(boolean flag)`方法将proxyTargetClass设为true
  >
  > - 可以使用`setInterfaces(target.class.getInterfaces())`方法传入被代理类实现的接口
  >
  >   注意：若target有实现接口并调用此方法传入接口后，且ProxyFactory = false。则会使用JDK的代理实现方式。此时接收代理对象需要用接口类型接收（代理对象和被代理对象实现同一接口）

---

#### 2.4.1切点匹配

1. 根据方法名进行匹配

   ```java
           //1.根据方法名匹配
           //返回值+包名+类名+方法名（方法参数）
     pointcut.setExpression("execution(*xinja.spring.springlearn.SpringAOP.Myservice.foo(..));");
   ```

2. 根据注解进行匹配

   ```java
           //2.根据注解匹配（若方法上有对应注解则匹配成功）
           //@annotation(全类名)
    pointcut.setExpression("@annotation(org.springframework.transaction.annotation.Transactional)");
   ```

3. 自定义匹配规则

   需重写抽象类$StaticMethodMatcherPointcut$。现成的切点匹配类底层都是重写了这个抽象类

   ```java
           //3.自定义匹配规则
           //StaticMethodMatcherPointcut是一个抽象类
           StaticMethodMatcherPointcut pt = new StaticMethodMatcherPointcut(){
               @Override
               //重写该方法，用于切入点表达式的匹配
               public boolean matches(Method method, Class<?> targetClass) {
                   //Spring提供的工具类，用于查找 方法上、类上  有无对应注解
                   MergedAnnotations annotations = MergedAnnotations.from(method);
                   if(annotations.isPresent(Transactional.class)){//方法上有对应注解
                       return true;
                   }
   
                   //在查找类时默认采用DIRECT模式，只查找类上有无注解。TYPE_HIERARCHY模式可以查找类、类的父类、类实现的接口上有无注解
                   MergedAnnotations annotations1 = MergedAnnotations.from(targetClass,
                           MergedAnnotations.SearchStrategy.TYPE_HIERARCHY);
                   if(annotations1.isPresent(Transactional.class)){//类上有对应注解
                       return true;
                   }
   
                   return false;
               }
           };
   
           System.out.println(pt.matches(MyService.class.getMethod("foo"), MyService.class));
           System.out.println(pt.matches(MyService.class.getMethod("bar"), MyService.class));
   ```

---

#### 2.4.2@Aspect和Advisor

> @Aspect切面类可以包含多个不同的切面。而Advisor只能有一个切面。Spring处理Aspect切面类时，会将其拆成一个个Advisor。

- Aspect基本使用

  ```java
      @Aspect//声明Aspect类
      static class Aspect1{
          //增强类型+切点表达式
          @Before("execution(* xinja.spring.springlearn.SpringAOP.TestAspectAndAdvisor.*.foo())")
          public void before(){
              //增强内容
              System.out.println("aspect1 before...");
          }
  
          @After("execution(* xinja.spring.springlearn.SpringAOP.TestAspectAndAdvisor.*.foo())")
          public void after(){
              System.out.println("aspect1 after...");
          }
      }
  ```

- Advisor基本使用

  [详见](#2.4 Spring中的代理技术)



---

##### 相关后处理器

$AnnotationAwareAspectJAutoProxyCreator$。

- 作用

  在 **Bean 实例化完成之后**，判断当前 Bean 是否需要被 AOP 代理；**如果匹配切面，则创建代理对象**（JDK 动态代理 / CGLIB），**替换掉原始 Bean 放入容器**，实现 AOP。

- 对应注解

  是 Spring AOP 的**核心入口类**，**`@EnableAspectJAutoProxy` 注解就是用来注册这个 Bean。**



- 两个重要方法

  ```java
          //注册AnnotationAwareAspectJAutoProxyCreator，为了演示过程，不对容器进行refresh
          context.registerBean(AnnotationAwareAspectJAutoProxyCreator.class);
  
          AnnotationAwareAspectJAutoProxyCreator creator = context.getBean(AnnotationAwareAspectJAutoProxyCreator.class);
          //根据一个目标类型，寻找容器中所有切点表达式与之相匹配的切面（advisor）并返回；若遇到了@Aspect，会将其转换为advisor再返回
          List<Advisor> advisors = creator.findEligibleAdvisors(Target1.class, "target1");
  
          Target1 target1 = context.getBean(Target1.class);
          //wrapIfNecessary：创建对象如果有必要的话
          //这个方法内会调用findEligibleAdvisors方法找寻指定对象的匹配切面。
          //若能找到则根据切面创建代理对象；反之则没必要创建
          Object proxy = creator.wrapIfNecessary(target1, "target1", "target1");
  ```

  - Spring底层如何实现`Aspect –> Advisor`的转换？

    ```java
        public static void main(String[] args) {
    
            AspectInstanceFactory aif = new SingletonAspectInstanceFactory(new TestAspectAndAdvisor.Aspect1());
            //找到Aspect切面类，并遍历其中所有的方法
            for (Method method : TestAspectAndAdvisor.Aspect1.class.getDeclaredMethods()) {
                if(method.isAnnotationPresent(Before.class)){//此处以Before为例，其他通知类型类似
                    //获取切点
                    String pointCutExpression = method.getAnnotation(Before.class).value();
                    AspectJExpressionPointcut pointcut = new AspectJExpressionPointcut();
                    pointcut.setExpression(pointCutExpression);
    
                    //获取通知
                    AspectJMethodBeforeAdvice advice = new AspectJMethodBeforeAdvice(method,pointcut,aif);
    
                    //获得切面Advisor
                    DefaultPointcutAdvisor advisor = new DefaultPointcutAdvisor(pointcut,advice);
                }
            }
    
        }
    ```

---

#### 2.4.3静态通知调用

---

##### 不同通知统一转换为环绕通知 — 适配器模式体现

如$AspectJMethodBeforeAdvice$等没实现$MethodInterceptor$接口的通知，在执行前**都会被转换为$MethodInterceptor$环绕通知**

- 原因：在Spring底层需要调用的通知可能不止一个，很可能出现一个目标具有多个通知。如此一来，通知的调用链如下图所示

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/spring/image-20261004130826075.png" alt="image-20261004130826075" style="zoom:50%;" />

  `before1 --> before2 --> target --> after2 --> after1`

  这种嵌套式调用恰好适配环绕通知的调用方式，所以底层会将其他通知类型都转换成环绕通知

 

- 转换的过程中体现到了设计模式中的**适配器模式**

  - 适配器模式

    把一个接口转换成用户期望的另一个接口，让原本不兼容的两个类可以一起工作。类似于“翻译器”

    1. 现假设有一支付系统。我们的支付系统只认得`Payment`方法

       ```java 
       interface Payment {    void pay(double amount); }
       
       class OrderService {
           private Payment payment;
       
           OrderService(Payment payment) {
               this.payment = payment;
           }
       
           void checkout(double amount) {
               payment.pay(amount);
           }
       }
       ```

    2. 加入第三方支付方法时，我们的支付系统就不认识了

       ```java
       class AlipaySDK {
           void transfer(String money) {
               System.out.println("支付宝支付：" + money);
           }
       }
       ```

    3. 可以写一个适配器，用于”翻译“我们的支付系统与第三方支付方法的支付功能

       ```java
       class AlipayAdapter implements Payment {
       
           private AlipaySDK alipay;
       
           AlipayAdapter(AlipaySDK alipay) {
               this.alipay = alipay;
           }
       
           @Override
           public void pay(double amount) {
               alipay.transfer(String.valueOf(amount));
           }
       }
       ```

    > 由上述例子可知，适配器解决的是”兼容性“问题；**可以用于转换方法名、参数、数据格式等**，实际调用的还是转换前的那个类的方法

  - Spring中通知方法的适配体现

    提供诸如$MethodBeforeAdviceAdapter$的适配器，将如$AspectJMethodBeforeAdvice$的类适配$MethodBeforeAdviceInterceptor$(此接口实现了$MethodInterceptor$，本质上是适配$MethodInterceptor$)

    ```java
            //创建ProxyFactory
            ProxyFactory proxyFactory = new ProxyFactory();
    
            //设置被代理对象
            proxyFactory.setTarget(new TestAspectAndAdvisor.Target1());
            //设置通知
            proxyFactory.addAdvisors(advisors);
    
            //将通知转换为环绕通知
            proxyFactory.getInterceptorsAndDynamicInterceptionAdvice(TestAspectAndAdvisor.Target1.class.getMethod("foo"), TestAspectAndAdvisor.Target1.class);
    
    ```

    

---

##### 调用链执行

- **调用链由（多个）环绕通知+目标组成**

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/spring/image-20261004130826075.png" alt="image-20261004130826075" style="zoom:50%;" />

  ```java
          //设置ExposeInvocationInterceptor.INSTANCE通知
  		//用于将MethodInvocation放入当前线程的ThreadLocal,使得后续递归中其他advice可以调用
  		proxyFactory.addAdvice(ExposeInvocationInterceptor.INSTANCE);
  //调用链(环绕通知 + 目标)调用
          MethodInvocation invocation = new ReflectiveMethodInvocation(
                  null,target1,method,new Object[0], TestAspectAndAdvisor.Target1.class,
                  interceptorsAndDynamicInterceptionAdvice
          );
          invocation.proceed();
  ```



- :star:调用链底层原理

  **$MethodInterceptor$通知**实际上是一个个**拦截器**，**$MethodInvocation$将所有的拦截器全都串起来了**。再**通过`proceed()`方法去递归调用**。由于递归调用的过程中需要不断地使用到$MethodInvocation$对象的`proceed()`方法。所以在**递归的最外层**，也就是递归的第一步。需要**将$MethodInvocation$对象放入$ThreadLocal$中**，这样一来**后续递归过程中就可以去$ThreadLocal$中获取并调用`proceed()`方法了**

  ```java
  System.out.println("advice1 before");
  Object res = invocation.proceed();//根据调用链，递归调用advice2 "递" 
  System.out.println("advice1 after");//"归"
  return res;
  ```

  如此一来最后的结果就是

  `"advice1 before" --> "advice2 before" --> target --> "advice2 after" --> "advice1 after"`

  且由于`proceed()`是直接去寻找调用链上的下一个通知，如此一来“递”到下一个通知时，需**从$ThreadLocal$中再拿到同一个$MethodInvocation$对象**，再调用其`proceed()`再“递”到下一个通知。



- 模拟实现

  ```java
   static class Advice1 implements MethodInterceptor {
          public Object invoke(MethodInvocation methodInvocation) throws Throwable {
              System.out.println("Advice1 before");
              //间接递归
              Object ret = methodInvocation.proceed();
              System.out.println("Advice1 after");
              return ret;
          }
      }
      static class Advice2 implements MethodInterceptor {
          public Object invoke(MethodInvocation methodInvocation) throws Throwable {
              System.out.println("Advice2 before");
              //间接递归
              Object ret = methodInvocation.proceed();
              System.out.println("Advice2 after");
              return ret;
          }
      }
  
      static class MyMethodInvocation implements MethodInvocation {
  
          //目标及目标方法
          private Object target;
          private Method method;
          private Object[] args;
          //通知（拦截器）
          private List<MethodInterceptor> interceptors;
  
          //调用次数统计
          private int count;
  
          public MyMethodInvocation(Object target, Method method, Object[] args, List<MethodInterceptor> interceptors) {
              this.target = target;
              this.method = method;
              this.args = args;
              this.interceptors = interceptors;
          }
  
          @Override
          public Object proceed() throws Throwable {
              if(count >= interceptors.size()){//当递到目标方法时，开始归
                  return method.invoke(target, args);//调用目标方法并开始归
              }
  
              MethodInterceptor methodInterceptor = interceptors.get(count++);//获取当前通知
              return methodInterceptor.invoke(this);//间接递归
          }
          
          //....后续方法不展示了，上述即为核心逻辑
      }
  ```

  这种**方法调用链+递归间接调用**的设计模式被称为**责任链模式**

---

#### 2.4.4动态通知调用

- 原先写的Aspect类都是静态通知调用，即增强的方法中无需提供参数的。

  还有一种动态通知调用，需要为增强方法提供参数**（需要参数绑定）**

  ```java
      @Aspect
      static class Aspect2{
          @Before("execution(* foo(..))")
          public void before(){//静态通知调用，程序运行时不需要用到切点对象
              System.out.println("aspect1 before...");
          }
  
          @Before("execution(* foo(..)) && args(x)")//会匹配foo()方法并将foo中的int类型的参数值绑定给x
          public void before(int x){//动态通知调用，程序运行时仍然需要切点对象
              System.out.printf("aspect2 before...(%d)%n",x);
          }
      }
  ```

---

#### 2.4.5 Spring代理对象的创建与（静态）调用流程图

![image-20261004231431176](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/spring/image-20261004231431176.png)

---

## 3.SpringMVC

- MVC框架

  - Model

    数据层。具体包括Service、Mapper、POJO。

  - View

    视图层。即前后端分离的前端

  - Controller

    前后端请求发送接口

- ModelAndView

  JSP时代，前后端不分离。在Controller层会将数据（Model）和视图（View）封装成ModelAndView对象。里面包含了数据和视图的信息。JSP时代通过View去定位到对应的HTML文件，再将Model数据填入HTML。将整个HTML发送回客户端

- ModelAndViewContainer

  一次请求中的上下文容器。类似于IOC容器，但是只存储ModelAndView对象。虽然现在已经前后端分离了，但是**仍会将请求中的数据解析成Java对象（ModelAndView对象）存入其中**，便于后续业务中**实现面向对象的编程**。除此之外，在同一次请求中，**实现了ModelAndView对象的单例复用**

---

### 3.1DispatcherServelet初始化

- 初始化组件

  ```java
  @Configuration
  @ComponentScan
  public class WebConfig {
  
      //1.内嵌Web容器工厂
      @Bean
      public TomcatServletWebServerFactory tomcatServletWebServerFactory() {
          return new TomcatServletWebServerFactory();
      }
  
      //2.DispatcherServlet：用于分发拦截的请求到不同的控制器
      @Bean
      public DispatcherServlet dispatcherServlet() {
          return new DispatcherServlet();
      }
  
      //3.DispatcherServletRegistrationBean:用于将DispatcherServlet注册进Tomcat
      @Bean
      public DispatcherServletRegistrationBean dispatcherServletRegistrationBean(
              DispatcherServlet dispatcherServlet
      ) {
          //参数一为需要注册的DispatcherServlet对象。参数二为DispatcherServlet需要拦截的请求
          return new DispatcherServletRegistrationBean(dispatcherServlet,"/");
      }
  
  }
  ```

  `请求 --> Tomcat服务器 --> DispatcherServlet --> Controller`



- $DispatcherServlet$初始化时机

  $DispatcherServlet$的**创建由Spring完成**，但是其初始化会**在第一条请求打过去时，由Tomcat服务器初始化**

  若想要初始化随创建一同完成，可以在`DispatcherServletRegistrationBean`中设置

  ```java
      //3.DispatcherServletRegistrationBean:用于将DispatcherServlet注册进Tomcat
      @Bean
      public DispatcherServletRegistrationBean dispatcherServletRegistrationBean(
              DispatcherServlet dispatcherServlet
      ) {
          //参数一为需要注册的DispatcherServlet对象。参数二为DispatcherServlet需要拦截的请求
          DispatcherServletRegistrationBean dispatcherServletRegistrationBean = new DispatcherServletRegistrationBean(dispatcherServlet, "/");
          //设置的值>0就会在创建时就初始化
          //当有多个DispatcherServlet时，数字越小，优先级越高
          dispatcherServletRegistrationBean.setLoadOnStartup(1);
          return dispatcherServletRegistrationBean;
      }
  ```

  除此之外，还可以在配置文件中进行配置

  ```yaml
  spring:  
    mvc:
      servlet:
        load-on-startup: 1
  ```

  ```java
  //加载外部属性配置文件，把文件里的键值对放进 Spring 的环境 `Environment` 中
  @PropertySource("classpath:application.yaml")
  //开启 `@ConfigurationProperties` 绑定功能，把配置文件里的配置注入到指定的配置属性类中，并将这个类注册为 Spring Bean
  @EnableConfigurationProperties({WebMvcProperties.class, ServerProperties.class})
  ```

  1. **SpringBoot**中会**自动加载application配置文件**所以没有@PropertySource也可以
  2. WebMvcProperties、ServerProperties是Spring**提前准备好的配置类**，内部用的就是**@ConfigurationProperties将配置绑定到配置类上**

  如此一来就可以直接读取WebMvcProperties中的属性

  ```java
      @Bean
      public DispatcherServletRegistrationBean dispatcherServletRegistrationBean(
              DispatcherServlet dispatcherServlet,WebMvcProperties webMvcProperties
      ) {
          //参数一为需要注册的DispatcherServlet对象。参数二为DispatcherServlet需要拦截的请求
          DispatcherServletRegistrationBean dispatcherServletRegistrationBean = new DispatcherServletRegistrationBean(dispatcherServlet, "/");
  
          //如此就可以防止硬编码的问题
  dispatcherServletRegistrationBean.setLoadOnStartup(webMvcProperties.getServlet().getLoadOnStartup());
          return dispatcherServletRegistrationBean;
      }
  ```



- $DispatcherServlet$初始化所做的事情

  ```java
  	protected void initStrategies(ApplicationContext context) {
          //初始化文件上传解析器（文件上传会有多种格式）
  		initMultipartResolver(context);
          
          //初始化本地化信息解析器，用于从请求中解析出国家。如此一来可以返回对应的语言包
  		initLocaleResolver(context);
  		initThemeResolver(context);
          
          //初始化路径映射器。
          //HandlerMapping用于做路径映射,将请求分配到对应路径上 --- @GetMapping @PostMapping等
  		initHandlerMappings(context);
          
          //初始化Handler适配器
          //HandlerAdpter：用于适配不同形式的Handler并调用Handler
  		initHandlerAdapters(context);
          
          //初始化Handler异常解析器
  		initHandlerExceptionResolvers(context);
          
  		initRequestToViewNameTranslator(context);
  		initViewResolvers(context);
  		initFlashMapManager(context);
  	}
  ```

  - Handler：Spring会把**@GetMapping这种请求映射下的方法包装成Handler对象**

  初始化时，若容器中有就直接使用容器中的，若没有则使用默认实现放入容器

---

### 3.2RequestMappingHandlerMapping&RequestMappingHandlerAdapter

#### 3.2.1RequestMappingHandlerMapping

- 作用

  $RequestMappingHandlerMapping$实现了$HandlerMapping$接口，是Web组件之一，用于组建请求的**路径-控制器方法**映射关系。在$DispatcherServlet$中，映射关系建立好后会被用于请求的分配

  - $HandlerMapping$：用于建立请求的路径映射关系，当请求来时，可以快速根据映射找到请求的处理器$Handler$

  而$RequestMappingHandlerMapping$是**根据`@RequestMapping`的注解来实现路径-控制器方法映射的建立**

  - Tip：`@GetMapping、@PostMapping`等都是`@RequestMapping`的派生



- 工作原理

  1. 去容器中找到`@Controller`的类
  2. 从`@Controller`类中找到带有`@RequestMapping、@GetMapping`等注解的方法
  3. 将`@RequestMapping、@GetMapping`中的路径与其对应的方法做一个映射关系

  上述过程在$RequestMappingHandlerMapping$建立时就会执行



- 测试

  ```java
      @Bean
      public RequestMappingHandlerMapping requestMappingHandlerMapping() {
          return new RequestMappingHandlerMapping();
      }
  ```

  ```java
          //拿到RequestMappingHandlerMapping
          //作用：解析@RequestMapping及其派生注解，生成路径与控制器方法的映射关系
          RequestMappingHandlerMapping handlerMapping =
                  context.getBean(RequestMappingHandlerMapping.class);
  
          //获得建立好的映射关系
          //RequestMappingInfo:路径信息  HandlerMethod：控制器方法
          Map<RequestMappingInfo, HandlerMethod> handlerMethods = handlerMapping.getHandlerMethods();
  
          //请求来了，获取处理器方法
          //返回一个处理器的执行链，里面封装了HandlerMethod
          HandlerExecutionChain chain = handlerMapping.getHandler(
                  //使用Mock请求模拟请求
                  new MockHttpServletRequest("GET", "/test1")
          );
  ```

---

#### 3.2.2RequestMappingHandlerAdapter

- 作用

  根据请求路径找到对应处理方法，负责**参数解析、反射执行、返回值处理**

  - 参数解析：`@PathVariable、@RequestParam、@RequestBody`等

- 测试

  ```java
      @Bean
      public RequestMappingHandlerAdapter requestMappingHandlerAdapter() {
          return new RequestMappingHandlerAdapter();
      }
  ```

  ```java
          RequestMappingHandlerAdapter handlerAdapter =
                  context.getBean(RequestMappingHandlerAdapter.class);
  
          MockHttpServletRequest request = new MockHttpServletRequest("GET","/test1");
          MockHttpServletResponse response = new MockHttpServletResponse();
          //调用处理器方法
          //参数一：请求  参数二：回复  参数三：处理器方法
          handlerAdapter.invokeHandlerMethod(
              request,response,(HandlerMethod) chain.getHandler()
          );
  
          //获取参数解析器
          List<HandlerMethodArgumentResolver> argumentResolvers =
                  handlerAdapter.getArgumentResolvers();
          
          //返回值处理器
          List<HandlerMethodReturnValueHandler> returnValueHandlers = 
                  handlerAdapter.getReturnValueHandlers();
  ```



- 自定义参数解析器

  1. 创建注解

     ```java
     //标明类型：参数注解
     @Target(ElementType.PARAMETER)
     //标明周期：运行时都有效
     @Retention(RetentionPolicy.RUNTIME)
     
     public @interface Token {
     }
     ```

  2. 创建参数解析器

     ```java
     public class TokenArgumentResolver implements HandlerMethodArgumentResolver {
     
     
         //判断参数上有无@Token注解
         @Override
         public boolean supportsParameter(MethodParameter parameter) {
             return parameter.hasParameterAnnotation(Token.class);
         }
     
         //对参数进行解析
         @Nullable
         @Override
         public Object resolveArgument(MethodParameter parameter, @Nullable ModelAndViewContainer mavContainer,
                                       NativeWebRequest webRequest, @Nullable WebDataBinderFactory binderFactory) throws Exception {
             return webRequest.getHeader("token");
         }
     }
     ```

  3. 将解析器配置到$RequestMappingHandlerAdapter$中

     ```java
         @Bean
         public RequestMappingHandlerAdapter requestMappingHandlerAdapter() {
             RequestMappingHandlerAdapter handlerAdapter = new RequestMappingHandlerAdapter();
             handlerAdapter.setCustomArgumentResolvers(List.of(new TokenArgumentResolver()));
             return handlerAdapter;
         }
     ```

  4. 使用

     ```java
         @GetMapping("tokentest")
         public String tokentest(@Token String token) {
             log.info(token);
             return token;
         }
     ```



- 自定义返回值解析器（如：`@ResponseBody`）

  1. 创建注解

     ```java
     @Target(ElementType.METHOD)
     @Retention(RetentionPolicy.RUNTIME)
     public @interface JSON {
     }
     ```

  2. 创建返回值解析器

     ```java
     public class JSONReturnValueResolver implements HandlerMethodReturnValueHandler {
     
         //寻找带有@JSON的方法
         @Override
         public boolean supportsReturnType(MethodParameter returnType) {
             return returnType.hasMethodAnnotation(JSON.class);
         }
     
         //对返回值进行处理
         @Override
         public void handleReturnValue(@Nullable Object returnValue, MethodParameter returnType,
                                       ModelAndViewContainer mavContainer, NativeWebRequest webRequest) throws Exception {
             //转换返回结果为JSON
             String jsonStr = JSONUtil.toJsonStr(returnValue);
     
             //写入response
             HttpServletResponse response = webRequest.getNativeResponse(HttpServletResponse.class);
             response.setContentType("application/json;charset=UTF-8");
             response.getWriter().write(jsonStr);
     
             //设置请求已经处理完毕
             mavContainer.setRequestHandled(true);
         }
     }
     ```

  3. 放入Adapter中

     ```java
         @Bean
         public RequestMappingHandlerAdapter requestMappingHandlerAdapter() {
             RequestMappingHandlerAdapter handlerAdapter = new RequestMappingHandlerAdapter();
             handlerAdapter.setCustomReturnValueHandlers(List.of(new JSONReturnValueResolver()));
             return handlerAdapter;
         }
     ```

  4. 使用

     ```java
         @GetMapping("json")
         @JSON
         public Object json() {
             return new Object();
         }
     ```

---

### 3.3参数解析器

#### 3.3.1常见参数注解

1. $@RequestParam$

   ```java
           public void TestRequestParam(
                   //1.@RequestParam: 用于解析请求中的属性
                   //解析请求中username的属性，并将其与形参name1绑定(若类型不同会进行数据类型转换)
                   @RequestParam("username") String name1,
   
                   //2.若没有@RequestParam，会自动从请求中解析同名属性
                   //解析请求中name2的属性，并将其与形参name2绑定(若类型不同会进行数据类型转换)
                   String name2,
   
                   //3.当请求中没有值时，defaultValue可以设置默认值
                   //默认值支持解析${}，从环境中读取
                   @RequestParam(name = "home",defaultValue = "${JAVA_HOME}") String home1
           ){}
   ```

   参数解析器**内部封装有$bindFactory$数据绑定工厂**，可以用于**数据的类型转换**

2. $@PathVariable$

   ```java
           @GetMapping("/test/{id}")
           public void TestPathVariable(
                   //解析请求路径中的参数，即上面的{id}占位符
                   @PathVariable("id") int id
           ){}
   ```

   底层会提前解析请求中的值，放入map中。如：`/test/{id}`传入了`/test/123`，就会创建`id - 123`的映射关系。执行$@PathVariable$时会直接去map中查询`map.get(id)`

3. $@RequestHeader$

   ```java
           public void TestRequestHeader(
                   //解析请求头中指定字段
                   @RequestHeader("Content-Type") String header
           ){}
   ```

4. $@CookieValue$

   ```java
           public void TestCookieValue(
                   //解析Cookie中的字段
                   @CookieValue("token") String token
           ){}
   ```

5. $@ Value$

   ```java
           public void TestValue(
                   //值注入
                   @Value("${JAVA_HOME}") String home
           ){}
   ```

6. $@ModelAttribute$

   ```java
           public void TestModelAttribute(
                   //name="张三"&age=18
   
                   //1.@ModelAttribute会将URL请求体中的属性绑定到User对象上
                   @ModelAttribute User user1,
                   //2.不加@ModelAttribute也会绑定，二者底层用的同一个解析器
                   User user2
           ){}
   ```

7. $@RequestBody$

   ```java
           public void TestRequestBody(
                   //从请求体中绑定User对象
                   //请求体中的数据格式通常为JSON
                   @RequestBody User user
           ){}
   ```

---

#### 3.3.2参数解析器底层原理

- 参数解析器都是实现了`HandlerMethodArgumentResolver`接口，重写了`supportsParameter`和`resolveArgument`方法

  底层会**遍历参数解析器**，挨个调用参数解析器。会**首先调用`supportsParameter`方法查看该参数上是否有对应注解**，若有则**调用`resolveArgument`解析参数**



- 参数解析器的顺序问题

  $@ModelAttribute$的参数解析器有两种模式，一种是必须加了该注解才可以解析**（模式A）**、一种是不加该注解也可以解析**（模式B）**。正好对应上例中的两种情况。

  Spring底层将这两种模式的解析器都加入了解析器集合中，**且$@RequestBody$的解析器必须在模式A后，模式B前**

  - 原因

    不加注解模式B也可以解析，若**模式B在$@RequestBody$的解析器之前**，就会将$@RequestBody$的参数也解析掉。如此一来就造成了解析错误的情况。

---

#### 3.3.3对象绑定和类型转换

##### 两套底层转换接口和一套高层转换接口

- 两套底层转换接口

  1. 第一套

     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/spring/image-20261006153833243.png" alt="image-20261006153833243" style="zoom:50%;" />

     - Printer：把其他类型转换成String
     - Parser：把String转换成其他类型
     - Fromatter：综合Printer和Parser
     - Convert：把类型S转换成类型T（S、T是任意类型）

     Printer、Parser、Converter经过适配器转换成GenericConvert放入**Converters集合**。**ConversionService利用他们实现转换，FormattingConversionService是其重要实现类**

  2. 第二套（JDK自带）

     <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/spring/image-20261006154409767.png" alt="image-20261006154409767" style="zoom:50%;" />

     - PropertyEditor把String与其他类型进行互相转换
     - PropertyEditorRegistry可以注册多个PropertyEditor对象

     与第一套接口可以通过FormatterPropertyEditorAdapter进行适配



- 一套高层转换接口

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/spring/image-20261006154937046.png" alt="image-20261006154937046" style="zoom:50%;" />

  - 都实现了TyperConverter高层转换接口，在转换时，会用到**TypeConverterDelegate委派**上面两套**底层转换接口**真正执行转换

    1. 首先看是否有自定义转换类，@InitBinder注解添加的

    2. 再看有无ConversionService转换

    3. 再利用默认的PropertyEditor转换
    4. 最后有些特殊处理

  - SimpleTypeConvert：只做类型转换

  - BeanWrapperImpl：为Bean的属性赋值，当需要类型转换时，走Property（使用set方法赋值）

  - DirectFieldAccessor：为Bean的属性赋值，当需要类型转换时，走Field（直接反射成员变量赋值）

  - ServletRequestDataBinder：为Bean的属性进行绑定，当需要类型转换时，根据directFieldAccess布尔变量决定走Property还是Field。具备校验与获取校验结果的功能



- 示例

  ```java
      public static void main(String[] args) {
          //SimpleTypeConverter
          SimpleTypeConverter converter = new SimpleTypeConverter();
          Integer res = converter.convertIfNecessary("13", int.class);
          Date date = converter.convertIfNecessary("1999/03/04", Date.class);
  
          //BeanWrapperImpl
          MyBean tar1 = new MyBean();
          BeanWrapperImpl bw = new BeanWrapperImpl(tar1);
          bw.setPropertyValue("a","10");
          bw.setPropertyValue("b","hello");
          bw.setPropertyValue("c","1999/03/04");
  
          //FieldAccessor:没有set也可以赋值
          MyBean tar2 = new MyBean();
          DirectFieldAccessor dfa = new DirectFieldAccessor(tar2);
          dfa.setPropertyValue("a","11");
          dfa.setPropertyValue("b","hello1");
          dfa.setPropertyValue("c","1999/03/04");
  
          MyBean tar3 = new MyBean();
          DataBinder dataBinder = new DataBinder(tar3);
          dataBinder.initDirectFieldAccess();//通过Field赋值
          MutablePropertyValues pvs = new MutablePropertyValues();
          pvs.addPropertyValue("a","12");
          pvs.addPropertyValue("b","hello2");
          pvs.addPropertyValue("c","1999/03/04");
          dataBinder.bind(pvs);
  
      }
  ```

---

##### 绑定器工厂

- $ServletRequestDataBinder$：DataBinder的子类。具有对应的工厂类$ServletRequestDataBinderFactory$

  可以使用工厂的`createBinder()`方法生产绑定器

  ```java
  public class TestBinderFactory {
  
      public static void main(String[] args) throws Exception {
          MockHttpServletRequest request = new MockHttpServletRequest();
          request.setParameter("Birthday","2006/09/08");
          request.setParameter("address.name","台州");
  
          User user = new User();
     
          //两个参数都是自定义解析器的集合。参数一是通过@InitBinder实现的集合，参数二是通过ConversionService实现的集合
          ServletRequestDataBinderFactory dataBinderFactory = new ServletRequestDataBinderFactory(null,null);
          WebDataBinder binder = dataBinderFactory.createBinder(new ServletWebRequest(request), user, "user");
          binder.bind(new ServletRequestParameterPropertyValues(request));
  
          System.out.println(user);
      }
  
      @Data
      public static class User{
          private Date Birthday;
          private Address address;
      }
  
      @Data
      public static class Address{
          private String name;
      }
  
  }
  ```

---

### 3.4ControllerAdvice

- ControllerAdvice：对所有Controller提供一些增强功能。具体有以下三种

  1. @InitBinder：自定义类型转换器
  2. @ExceptionHandler：处理异常
  3. @ModelAttribute：加在方法上，方法的返回值会作为模型数据补充到控制器的执行过程中

  ```java
  @Configuration
  public class WebConfig {
  
      @ControllerAdvice
      static class MyControllerAdvice {
          @InitBinder
          public void initBinder(WebDataBinder binder){
              //参数中添加自定义的转换器
              //binder.addCustomFormatter();
          }
  
          @ExceptionHandler
          public String handleException(Exception ex){
              //处理报错
              return ex.getMessage();
          }
  
          //@ModelAttribute
      }
  
  }
  ```

---

#### 3.4.1@InitBinder

- 使用场景
  1. 加在**@ControllerAdvice类**内部：**全局**生效，对所有Controller都生效
  2. 加载**@Controller类**内部：**局部**生效，仅对当前Controller生效

- 流程

  @InitBinder的自定义解析类由$RequestMappingHandlerAdapter$解析。

  $RequestMappingHandlerAdapter$在开始执行控制器方法前，会先将自定义解析器解析好，解析好后放入**Map集合**中（`InitBinderCache(局部)/InitBinderAdviceCache(全局)`）。如此一来就实现了**复用**

- 创建时机
  - 全局：在$RequestMappingHandlerAdapter$初始化时创建
  - 局部：懒加载，只有在调用@InitBinder的对应方法时才会创建

---

#### 3.4.2@ModelAttribute

- 使用场景

  1. 加在方法参数上，作为方法参数解析器

     加在方法参数上后，**会调用参数对应类型的构造方法创建一个空对象，然后用binderFactory进行参数的绑定 **（中间可能会进行类型的转换）；对象创建好后，会**作为模型数据放入ModelAndViewContainer中**，默认名称是类名首字母小写的单词

  2. 加载方法上，作为方法返回值处理器

     由$RequestHandlerMapping$解析，会调用ModelFactory，将对应方法的**返回值转为ModelAndView对象放入ModelAndViewContainer中**，默认名称为返回值类型首字母小写的单词

- ModelAndViewContainer

  用于存储ModelAndView对象，是某个请求内的临时容器。相当于提前创建对象给MVC容器管理，在整个请求中，所有的控制器都共用这一个对象

  > ModelAndView对象：MVC框架对象，所有的Controller返回值都会被封装为这个对象

---

#### 3.4.3配合ResponseBodyAdvice

- ControllerAdvice类实现ResponseAdvice接口可以实现对@ResponseBody的解析增强

  ```java
      @ControllerAdvice
      static class MyControllerAdvice implements ResponseBodyAdvice<Object> {
  
          //判断满足条件
          @Override
          public boolean supports(MethodParameter returnType, Class<? extends HttpMessageConverter<?>> converterType) {
              return returnType.hasMethodAnnotation(ResponseBody.class) //方法上有无ResponseBody
                      || AnnotationUtils.findAnnotation(returnType.getContainingClass(),ResponseBody.class) != null;//类上有无ResponseBody
          }   
  
          //功能增强
          @Nullable
          @Override
          public Object beforeBodyWrite(@Nullable Object body, MethodParameter returnType, MediaType selectedContentType, Class<? extends HttpMessageConverter<?>> selectedConverterType, ServerHttpRequest request, ServerHttpResponse response) {
              return null;
          }
      }
  
  ```

  如此一来，ResponseBodyAdvice就会作用于所有Controller中加了@ResponseBody注解的方法返回值

---

#### 3.4.4@ExceptionHandler

- 用法

  1. 在Controller类中使用，只会捕获本Controller抛出的异常
  2. 在ControllerAdvice类中使用，会全局作用于所有的Controller

- 返回值类型

  1. `@RestControllerAdvice`：返回实体 / Map，自动转 JSON
  2. `@ControllerAdvice`：返回 String（视图名，跳转页面），或者 ModelAndView

  > 二者的差别在于，方法的返回值要不要被@ResponseBody处理

- 执行流程

  ```java
      public static void main(String[] args) throws NoSuchMethodException, UnsupportedEncodingException {
          //用于处理@ExceptionHandler注解，将其注解的方法作为处理异常的方法执行
          ExceptionHandlerExceptionResolver exceptionResolver =
                  new ExceptionHandlerExceptionResolver();
  
          //添加消息转换器，用于处理@ResponseBody注解
          exceptionResolver.setMessageConverters(List.of(new MappingJackson2HttpMessageConverter()));
          exceptionResolver.afterPropertiesSet();//添加一些默认的参数解析器和返回值处理器
  
          //测试JSON
          MockHttpServletRequest request = new MockHttpServletRequest();
          MockHttpServletResponse response = new MockHttpServletResponse();
          //handlerMethod对象，可以得知异常是在哪个类的哪个方法上触发的
          HandlerMethod handlerMethod = new HandlerMethod(new Controller1(),Controller1.class.getMethod("foo"));
          //发生的异常
          Exception e = new ArithmeticException("被零除");//具体的异常信息
  
          //会去对应类中寻找有无@ExceptionHandler注解标注的异常处理方法
          //若有则匹配异常类型是否符合，若符合则执行该方法
          exceptionResolver.resolveException(request,response,handlerMethod,e);
  
          //异常处理的结果会存入response中
          System.out.println(response.getContentAsString(StandardCharsets.UTF_8));
      }
  
      static class Controller1{
          public void foo(){}
  
          @ExceptionHandler
          @ResponseBody
          public Map<String,Object> handle(ArithmeticException e){
              return Map.of("error",e.getMessage());
          }
      }
  
  ```

  > @ExceptionHandler是可以处理嵌套异常的。底层会将嵌套异常全部拆开放入一个数组，匹配时轮询数组

  

---

### 3.5控制器方法执行流程

> 控制器方法由$HandlerAdapter$执行

- 结构图

  ![image-20261008184935125](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/spring/image-20261008184935125.png)

  - HandlerMethod

    - bean：Controller对象
    - method：Controller中的方法

    有了对象和对象内的成员方法，就可以进行反射调用

  - ServletInvocableHandlerMethod

    继承了HandlerMethod，在其基础上增加了以下四个属性以实现控制器方法的执行

    - WebDataBinderFactory：用于填充参数以及参数类型转换，详见：[对象绑定与类型转换](@3.3.3对象绑定和类型转换)
    - ParameterNameDiscoverer：负责参数名的解析，用于获取参数名
    - HandlerMethodArgumentResolverComposite：参数注解解析器的集合
    - HandlerMethodReturnValueHandlerComposite：方法返回值注解处理器的集合

    

- 流程图

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/spring/image-20261008185742879.png" alt="image-20261008185742879" style="zoom:50%;" />

  1. 创建**WebDataBinderFactory**，**用于后续参数的绑定与类型转换**；在此过程中还会解析**@InitBinder**注解**添加自定义参数类型转换方式**
  2. 创建ModelFactory，用于产生模型数据；在此过程中会**解析**控制器上**@ModelAttribute**标注的方法，反射调用其形参的构造方法，并通过绑定器为其赋值。**存入ModelAndViewContainer以便后续使用**

  做好参数和返回值的一些初始化后操作后，开始反射调用控制器方法

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/spring/image-20261008190441852.png" alt="image-20261008190441852" style="zoom: 50%;" />

  3. 调用HandlerMethodArgumentResolverComposite**获取参数**，在此过程中会调用参数解析器对参数进行解析。如：@RequestBody需要将数据封装为对应的对象再返回
  4. 反射调用获得返回值，并交给HandlerMethodReturnValueHandlerComposite**对返回值进行处理**。如：@ResponseBody需要将数据封装为对象再返回
  5. 最后从ModelAndViewContainer中获取一个**ModeAndView**对象，**封装数据返回前端**

---

### 3.6MessageConvertor

- 主要用于@RequestBody 、@ResponseBody解析器，**实现JSON、XML字符串与Java对象之间的互相转换。**

  会被加入returnValue的处理器当中，returnValue处理器对返回值进行处理时，会调用内部的messageConvertor

- 多个MessageConvertor的运行次序
  - 默认情况下按照添加进Processor的顺序运行，排在第一个的先运行
  - 若请求头中加入了如：`application/xml`，就会优先使用对应类型的转换器（此处为xml）
  - 若$ContentType$中加了如：`application/json`，优先级最高（此处为json）

---

### 3.7Tomcat中的异常处理

> 上述的@ExceptionHandler处理异常的范围只在Spring项目中。若是Filter等Tomcat的组件中出现异常就无法捕获。

- Tomcat错误页处理手段

  默认情况下，Tomcat捕捉到异常后会路由到默认的错误页。可以通过ErrorPageRegistrar自定义错误页

  ```java
      @Bean//自定义错误页
      public ErrorPageRegistrar errorPageRegistrar() {
          return registry -> {
              registry.addErrorPages(new ErrorPage("/error"));
          };
      }
  
      @Bean//ErrorPageRegistrar的后处理器
      public ErrorPageRegistrarBeanPostProcessor errorPageRegistrarBeanPostProcessor() {
          return new ErrorPageRegistrarBeanPostProcessor();
      }
  
      @Controller
      public static class MyController {
          @RequestMapping("/test")
          public String test() {
              int i = 1/0;
              return "test";
          }
  
          @RequestMapping("/error")
          @ResponseBody
          //出现异常后，异常信息会被存储到Request作用域中
          public Map<String,Object> error(HttpServletRequest request) {
              Throwable error = (Throwable) request.getAttribute(RequestDispatcher.ERROR_EXCEPTION);
              return Map.of("error",error.getMessage());
          }
      }
  ```

---

### 3.8MVC执行流程

当浏览器发送一个请求，如`http://localhost:8080/hello`后，请求到达服务器，其处理流程是：

1. 到达DispatcherServlet，其使用的是标准的Servlet技术
   - 路径：默认映射路径为`/`，这样一来就可以**匹配到所有的URL**，可作为请求的统一入口，也被称为**前控制器**
   - 创建：在Boot中，由DispatcherServletAutoConfiguration这个自动配置类提供DispatcherServlet
   - 初始化：DispatcherServlet初始化时会优先找到容器中已有的组件作为其成员变量，若容器中没有，采用默认组件
     - HandlerMapping：初始化时记录映射关系
     - HandlerAdapter：初始化时准备参数解析器、返回值处理器、消息转换器  用于调用控制器方法
     - HandlerExceptionResolver：初始化时准备参数解析器、返回值处理器、消息转换器 用于处理异常
     - ViewResolver
2. DispatcherServlet会利用RequestMappingHandlerMapping建立的映射关系找到对应的控制器方法
   - 控制器方法会被封装为HandlerMethod对象，并结合匹配到的拦截器一起返回（调用链）给DispathcerServlet
3. DispatcherServlet接下来会：
   1. 调用拦截器的preHandle方法（返回一个布尔值，决定是否放行）
   2. RequestMappingHandlerAdapter调用handle方法，**准备数据绑定工厂、模型工厂、将HandlerMethod完善为ServletInvocableHandlerMethod**
      - ControllerAdvice增强1：使用模型工厂补充模型数据（ModelAndView）
      - ControllerAdvice增强2：补充自定义类型转换器（@InitBinder）
      - 使用HandlerMethodArgumentResolver解析参数
      - 使用数据绑定工厂去将参数绑定给形参对象的对应成员变量
      - 反射调用ServletInvocableHandlerMethod方法
      - 使用HandlerMethodReturnValueHandler处理返回值
        - 如果返回的ModelAndView对象为null（返回的是JSON等其他类型），则不走第四步的视图解析与渲染
        - 若不为null，会走第四步的视图解析与渲染
   3. 调用postHandle方法
   4. 处理异常或视图渲染
      - 若1~3出现异常，走ExceptionHandlerExceptionResolver处理异常流程
      - 否则，走视图解析与渲染流程
   5. 调用拦截器的afterCompletion方法

---

## 4.SpringBoot

### 4.1SpringBoot执行流程

```java
@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

}
```

`run`方法中，**参数一为$BeanDefination$的主要来源**。

---

#### 4.1.1构造

1. 根据传入的参数一收集$BeanDefination$源。由于@SpringBootApplication注解包含了@ComponentScan，扫描同包及其子包下的所有Component。所以Application启动类同包及其子包下所有Component的$BeanDefination$都会被收集
2. 根据`pom.xml`中的配置，判断当前这个应用程序属于哪一类（Web/非Web/Reactive 等）
3. 准备一些ApplicationContext容器的初始化器，用于对ApplicationContext容器的扩展。后续调用`run`方法时，会创建ApplicationContext容器，并添加准备好的初始化器。添加好后调用`refresh`方法使其生效
4. 准备监听事件对象，后续`run`方法中，每一个阶段结束后都会由事件发布器发布对应事件，通知对应的下一个事件监听对象
5. 主类推断，可以得到当前main方法的所在类

---

#### 4.1.2启动

执行`run`方法后

1. 得到SpringApplicationRunListener，是一个**事件发布器**
   - 发布application starting事件
   - 从`/META-INF/spring.factories`文件中读取对应实现类并自动装配
2. 封装args启动参数，供12步的回调使用

> Tip：**3~6步**将命令行参数、系统环境变量、properties、yaml等来源综合到环境对象中，方便后续查找

3. 将命令行参数加入环境对象
4. 像环境对象中加入ConfigurationProperties，以支持后续添加环境变量时，不同的命名格式匹配
5. 通过EnviromentPostProcessorApplicationListener进行env后处理
   - application.properties由StandardConfigDataLocationResolver解析
   - SpringBoot底层依然通过读取`spring.factories`文件去加载这些后处理器到容器中，调用后处理器时将源添加到环境对象中
6. 将环境对象中与SpringApplication类有关的属性与其进行绑定
   - 类似于@ConfigurationProperties，底层都是用Binder去进行绑定
7. 输出SpringBoot的Banner信息（Spring启动后的那个图标）

8. 创建容器

   根据构造阶段第二步所得的应用程序类型创建对应的容器

9. 准备容器

   执行构造阶段获得的初始化器

10. 加载Bean

    根据构造阶段获得的$BeanDefination$源，去加载$BeanDefination$为Bean

11. refresh容器

    使得容器中的Bean、后处理器等生效

12. 执行`runner`

    在容器正式运行前的回调，可以对args进行一些操作

---

### 4.2SpringBoot整合Tomcat内嵌容器

#### 4.2.1Tomcat重要组件

- 示意图

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/spring/image-20261010101250512.png" alt="image-20261010101250512" style="zoom:50%;" />

  - Connector：连接器，需指定协议(http等)、端口
  - Context：应用程序，可为其设置虚拟路径、项目磁盘路径（文件存储路径docBase）；Context下存储静态资源与动态资源
  - index.html：静态资源
  - WEB-INF：动态资源
    - web.xml：用于配置`servlet、filter、listener`等组件的配置类。不过Spring3.0后就不用了，因为3.0后Spring支持通过编程的方式引入这些Tomcat组件
    - classes：我们自己编写的类
    - lib：第三方jar包

---

#### 4.2.2内嵌Tomcat

- 内嵌Tomcat组件的添加

  ```java
      public static void main(String[] args) throws IOException, LifecycleException {
          //1.创建Tomcat对象
          Tomcat tomcat = new Tomcat();
          //为其设置基础目录,存放Tomcat产生的临时文件
          tomcat.setBaseDir("tomcat");//相对路径
  
          //2.创建项目文件夹，即：docBase
          File docBase = Files.createTempDirectory("boot.").toFile();
          docBase.deleteOnExit();//程序结束时，删除临时目录
  
          //3.创建Tomcat项目，即：Context
          //参数一为虚拟目录，参数二为docBase的目录
          Context context = tomcat.addContext("", docBase.getAbsolutePath());
  
          //4.编程添加Servlet
          context.addServletContainerInitializer(new ServletContainerInitializer() {
              @Override
              //回调函数，在Tomcat启动时会回调该函数，加入Servlet组件
              public void onStartup(Set<Class<?>> c, ServletContext ctx) throws ServletException {
                  ctx.addServlet("hello", HelloServlet.class).addMapping("/hello");
              }
          }, Collections.emptySet());//Servletcontext初始化器
  
  
          //5.启动Tomcat
          tomcat.start();
  
          //6.创建Connector连接器，设置协议和端口
          Connector connector = new Connector(new Http11Nio2Protocol());
          connector.setPort(8080);
          tomcat.setConnector(connector);
      }
  ```



- Spring容器与内嵌Tomcat的整合

  ```java
          //获得Spring容器
          WebApplicationContext springContext = getWebApplicationContext();
          //4.编程添加Servlet
          context.addServletContainerInitializer(new ServletContainerInitializer() {
              @Override
              //回调函数，在Tomcat启动时会回调该函数，加入Servlet组件
              public void onStartup(Set<Class<?>> c, ServletContext ctx) throws ServletException {
                  ctx.addServlet("hello", HelloServlet.class).addMapping("/hello");
  
  /*                DispatcherServlet dispatcherServlet = springContext.getBean(DispatcherServlet.class);
  
                  //向Tomcat容器注册DispatcherServlet
                  ctx.addServlet("dispatcherServlet", dispatcherServlet).addMapping("/");*/
  
                  //获取Spring容器中的Servlet注册Bean，让注册Bean去Tomcat中注册Servlet组件
                  for (ServletRegistrationBean registrationBean : springContext.getBeansOfType(ServletRegistrationBean.class).values()) {
                      registrationBean.onStartup(ctx);
                  }
  
              }
          }, Collections.emptySet());//Servletcontext初始化器
  ```

  主要多了以上几步，即：`获得Spring容器 --> 使用Spring容器中的Servlet注册Bean在Tomcat中注册Servlet组件`

> SpringBoot底层初始化Tomcat容器时，与上述代码同理。`创建Spring容器 --> 在Spring容器中添加Servlet组件 --> 初始化Tomcat --> 将Spring容器中的Servlet组件注册到Tomcat中 --> 启动Tomcat`

---

### 4.3自动配置类

- 自动配置类本质上也是一个配置类，主要用于自动配置一些通用的Bean



- 原理

  ```java
      public static void main(String[] args) {
          GenericApplicationContext context = new GenericApplicationContext();
          context.registerBean("config", Config.class);
          context.registerBean(ConfigurationClassPostProcessor.class);
          context.refresh();
  
          for (String beanDefinitionName : context.getBeanDefinitionNames()) {
              System.out.println(beanDefinitionName);
          }
      }
  
  
      @Configuration
      //@Import({AutoConfiguration1.class,AutoConfiguration2.class})
      @Import(MyImportSelector.class)//通过ImportSelector解耦
      static class Config {}
  
      static class MyImportSelector implements ImportSelector {
          @Override//返回配置类类名
          public String[] selectImports(AnnotationMetadata metadata) {
              return new String[]{
                      AutoConfiguration1.class.getName(),
                      AutoConfiguration2.class.getName()
              }
          }
      }
  
      @Configuration//第三方配置类1
      static class AutoConfiguration1 {
          @Bean
          public Bean1 bean1() {
              return new Bean1();
          }
      }
  
      @Configuration////第三方配置类2
      static class AutoConfiguration2 {
          @Bean
          public Bean2 bean2() {
              return new Bean2();
          }
      }
  ```

  如上所示，@Import注解可以直接导入第三方配置类。并可以通过ImportSelector解耦。

  SpringBoot底层将所需的第三方配置类都写入了`/META-INF/spring.factories`文件中，并从该文件中读取第三方配置类通过Import自动配置到容器中去。如下所示

  <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/java/spring/image-20261010112240469.png" alt="image-20261010112240469" style="zoom:50%;" />

  `spring.factories`通过key-value形式填写，key必须为全类名，value为第三方配置类类名

  ```java
      static class MyImportSelector implements ImportSelector {
          @Override//返回配置类类名
          public String[] selectImports(AnnotationMetadata metadata) {
              //Spring工具类，可以通过对应的全类名去spring.factories寻找对应的第三方配置类
              List<String> names = SpringFactoriesLoader.loadFactoryNames(MyImportSelector.class, null);
              return names.toArray(new String[names.size()]);
          }
      }
  ```

  如此一来，可以使用Spring的工具类SpringFactoriesLoader去读取`spring.factories`中的第三方配置类并导入

  SpringFactoriesLoader**读取范围是项目的resources文件夹下以及项目所打jar包下的`/META-INF/spring.factories`**



- 同名Bean的优先级处理

  当当前项目和第三方配置类中的Bean出现同名时，SpringBoot默认是不允许覆盖Bean的，若出现同名，在SpringBoot中就会报错。解决方法有以下几种

  1. 由于`ImportSelector`接口默认**先解析第三方配置类再解析当前项目配置类。**可以使用`context.getDefaultListableBeanFactory().setAllowBeanDefinitionOverriding(true);`强制修改SpringBoot允许Bean的覆盖

  2. 使用`DeferredImportSelector`接口，其**先解析当前项目配置类，再解析第三方配置类**。再在第三方类上加上`@ConditionalOnMissingBean`注解，其作用是：**当该Bean不存在时才进行注册**

     二者配合之下，先解析当前项目配置类。若冲突了就不会注册第三方配置类中的Bean



- @Enablexxx注解

  @Enable打头的注解**本质上是对@Import的封装**，用来自动配置某一分类的Bean，可以开启对应的功能

  - @SpringBootApplication中有着@EnableAutoConfiguration注解，所以**SpringBoot可以自动装配@EnableAutoConfiguration预设好的一部分类。**

    若想要我们自定义的`spring.factories`中的配置类也被SpringBoot识别到并装配，只需要把我们自定义的`spring.factories`中的key换成与@EnableAutoConfiguration注解一样的key即可

  - 若想要开启一些其他功能，在启动类上使用@Enablexxx即可

    如：**@EnableTransactionManagement开启事务的注解功能，会装配一些事务相关的类**

---

## 5.其他

### 5.1条件装配

- 在Spring中，可以使用@Conditional注解进行条件判断。其常用于自动装配的条件判断

  ```java
  @Target({ElementType.METHOD,ElementType.TYPE})
  @Retention(RetentionPolicy.RUNTIME)
  @Conditional({Mycondition.class})
  public @interface ConditionOnClass {
      boolean exists();
  
      String className();
  }
  
  class Mycondition implements Condition{
      @Override
      public boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata) {
          Map<String, Object> attributes = metadata.getAnnotationAttributes(ConditionOnClass.class.getName());
          String className = attributes.get("className").toString();
          boolean exists = (boolean)attributes.get("exists");
          return ClassUtils.isPresent(className, null) == exists;
      }
  }
  
  //---------------------------------------------------------------------------------
      @Configuration//第三方配置类1
      @ConditionOnClass(className = "com.alibaba.druid.pool.DruidDataSource",exists =  true)
      static class AutoConfiguration1 {
          @Bean
          public Bean1 bean1() {
              return new Bean1();
          }
      }
  ```

  上述代码为自定义的@ConditionOnClass注解，里面包含了@Conditional注解。封装为了一个判断是否存在某个类的注解

  - @Conditional用法

    @Conditional(class c)里面的class需要实现Condition接口，重写mathces方法。matches方法中写了判断逻辑

---

### 5.2@Indexed

- Spring初始化扫描Bean时是在**运行时进行扫描**，若项目Bean过多会导致效率过慢。所以Spring5.0后加入了@Indexed注解

  - 使用

    所有的@Component注解中都会包含@Indexed注解，但其功能默认不开启。若想要开启其功能需要引入以下依赖

    ```java
    		<dependency>
                <groupId>org.springframework</groupId>
                <artifactId>spring-context-indexer</artifactId>
                <optional>true</optional>
            </dependency>
    ```

    引入后，只会在第一次启动项目的**编译阶段**就进行Bean的扫描。扫描后写入`target/classes/META-INF/spring.components`文件中。运行时**直接读取文件进行Bean的配置即可**

---

### 5.3@Autowired底层

- [Autowired后处理器分析](#1.3.1@Autowried后处理器分析)中有提到，Autowired会将要查找的属性、方法封装为$DependencyDescriptor$对象，拿着这个对象去Bean工厂里面找`beanFactory.doResolveDependency(DenpendencyDescriptor d)`。下面演示的是如何查找并封装

  ```java
  @Configuration
  public class TestAutowired {
  
      public static void main(String[] args) throws NoSuchFieldException, NoSuchMethodException {
          AnnotationConfigApplicationContext context =
                  new AnnotationConfigApplicationContext(TestAutowired.class);
  
          DefaultListableBeanFactory beanFactory = context.getDefaultListableBeanFactory();
  
          //1.根据成员变量类型注入
          DependencyDescriptor dd1 =
                  new DependencyDescriptor(Bean1.class.getDeclaredField("bean2"),false);
          //取出来的就是Bean2类型的，因此无需额外封装
          System.out.println(beanFactory.doResolveDependency(dd1, "bean1", null, null));
  
          //2.根据set方法进行注入
          Method setBean2 = Bean1.class.getDeclaredMethod("setBean2", Bean2.class);
          MethodParameter methodParameter = new MethodParameter(setBean2, 0);//指定查找setBean2方法上索引为0的参数
          DependencyDescriptor dd2 =
                  new DependencyDescriptor(methodParameter, false);
          System.out.println(beanFactory.doResolveDependency(dd2, "bean1", null, null));
  
          //3.结果包装为Optional<Bean2>
          DependencyDescriptor dd3 =
                  new DependencyDescriptor(Bean1.class.getDeclaredField("bean3"),false);
          //判断外层类型是否为Optional
          if(dd3.getDependencyType() == Optional.class) {
              //进入dd3的内层  即进入<>中
              dd3.increaseNestingLevel();
              Object bean2 = beanFactory.doResolveDependency(dd3, "bean1", null, null);//拿到IOC容器中的Bean2
              //包装成Optional<Bean2>
              System.out.println(Optional.ofNullable(bean2));
          }
  
          //4.结果包装为ObjectFactory<Bean2>
          DependencyDescriptor dd4 =
                  new DependencyDescriptor(Bean1.class.getDeclaredField("bean4"),false);
          //判断外层类型是否为ObjectFactory
          if(dd4.getDependencyType() == ObjectFactory.class) {
              //进入内层
              dd4.increaseNestingLevel();
              Object bean2 = beanFactory.doResolveDependency(dd4, "bean1", null, null);
              //封装到objectFactory中
              ObjectFactory objectFactory = new ObjectFactory() {
                  @Override
                  public Object getObject() throws BeansException {
                      return bean2;
                  }
              };
          }
  
  
      }
  
      static class Bean1{
          @Autowired
          private Bean2 bean2;
          @Autowired
          public void setBean2(Bean2 bean2){
              this.bean2 = bean2;
          }
          @Autowired
          private Optional<Bean2> bean3;
          @Autowired
          private ObjectFactory<Bean2> bean4;
      }
  
      @Component
      static class Bean2{}
  
  }
  ```

  `doResolveDependency`方法内部通过对传入参数的解析，得知需要注入的类型名称，并去beanFactory中寻找对应的单例并赋值注入

---

### 5.4事件监听器和发布器

- 事件可以实现业务之间的解耦。如：当主线业务执行到某个步骤时要执行一些支线任务，若是将其都写在一起，当支线业务修改时就要对整个业务的代码进行改动。

  引入事件，当需要开启支线业务时，通过主线业务去发布事件，支线业务监听事件。如此一来就实现了主线支线的解耦

---

#### 5.4.1事件监听器

1. 通过ApplicationListener接口实现事件监听器

   ```java
   @Configuration
   public class TestEvent {
   
       public static void main(String[] args) {
           AnnotationConfigApplicationContext context =
                   new AnnotationConfigApplicationContext(TestEvent.class);
           MyService myService = context.getBean(MyService.class);
           myService.doBusiness();
           context.close();
       }
   
       //事件对象
       static class MyEvent extends ApplicationEvent {
           //source为事件发送者,用于指定当前事件是由哪个发布器发布的
           public MyEvent(Object source) {
               super(source);
           }
       }
   
       @Component
       @Slf4j
       static class MyService{
           //事件发布器
           @Autowired
           private ApplicationEventPublisher publisher;
           public void doBusiness(){
               log.info("主线业务");
               //下面为支线业务
               publisher.publishEvent(new MyEvent("MyService.doBusiness()"));
   //            log.info("发短信");
   //            log.info("发邮件");
           }
       }
   
       @Component
       @Slf4j
       //监听MyEvent事件
       static class SmsApplicationEventListener implements ApplicationListener<MyEvent> {
           @Override
           public void onApplicationEvent(MyEvent event) {
               log.info("发短信");
           }
       }
   
       @Component
       @Slf4j
       static class EmailApplicationEventListener implements ApplicationListener<MyEvent> {
           @Override
           public void onApplicationEvent(MyEvent event) {
               log.info("发邮件");
           }
       }
   
   }
   ```

   

2. 通过@EventListener实现事件监听器

   ```java
   @Configuration
   public class TestEvent {
   
       public static void main(String[] args) {
           AnnotationConfigApplicationContext context =
                   new AnnotationConfigApplicationContext(TestEvent.class);
           MyService myService = context.getBean(MyService.class);
           myService.doBusiness();
           context.close();
       }
   
       //事件对象
       static class MyEvent extends ApplicationEvent {
           //source为事件发送者,用于指定当前事件是由哪个发布器发布的
           public MyEvent(Object source) {
               super(source);
           }
       }
   
       @Component
       @Slf4j
       static class MyService{
           //事件发布器
           @Autowired
           private ApplicationEventPublisher publisher;
           public void doBusiness(){
               log.info("主线业务");
               //下面为支线业务
               publisher.publishEvent(new MyEvent("MyService.doBusiness()"));
   //            log.info("发短信");
   //            log.info("发邮件");
           }
       }
   
       @Component
       @Slf4j
       static class SmsListener{
           @EventListener
           public void listen(MyEvent event){
               log.info("发短信");
           }
       }
   
       @Component
       @Slf4j
       static class EmailListener{
           @EventListener
           public void listen(MyEvent event){
               log.info("发邮件");
           }
       }
   
   }
   
   ```

---

#### 5.4.2事件发布器

- 即`ApplicationEventPublisher`

