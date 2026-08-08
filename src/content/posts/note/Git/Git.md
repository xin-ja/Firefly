\---

title: Git

published: 2026-08-08

description: Git学习

tags: [后端, Git]

category: Git

draft: false

\---

# Git

## 简介

> 开源分布式版本控制系统



## 配置

> git config

1. 配置用户名称和电子邮箱

   git config –global user.name “xxx”

   git config –global user.email xxxx@xxxx

   使用global后，以后所有的项目都会默认使用这个配置信息

2. 配置文本编辑器

   git config –global core.editor “xxxx”

3. 配置差异分析工具（合并冲突时使用的）

   git config –global merge.tool xxx

4. 查看配置信息

    git config –list

   <img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/git/image-20260711160520907.png" alt="image-20260711160520907" style="zoom:50%;" /> 

   如图可见有 core.editor  user.name  user.email  还有之前配置的代理端口等

## Git的工作流程

> 1. 工作区（Working Diretory）
> 2. 暂存区（Staging Area）
> 3. 本地仓库（Local Repository）
> 4. 远程仓库（Remote）

<img src="https://www.runoob.com/wp-content/uploads/2015/02/git-workflow-runoob-1770781044589.svg" alt="img"  />

<img src="https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/git/image-20260712113512167.png" alt="image-20260712113512167" style="zoom:50%;" />

1. 工作区

   实际修改文件的地方

2. 暂存区

   - 关键指令：git add
   - 意义：告诉Git这些改动我要确认提交了，先帮我记着

3. 本地仓库

   - 关键指令：git commit
   - 意义：改动正式成为了项目历史的一部分，即便后面改乱了也可以从仓库中找回来

4. 远程仓库

   - 关键指令：git push
   - 意义：备份代码，与团队共享进度

- 补充
  1. git stash（贮藏）：代码并未完工，不想直接add并commit，可以先放入贮藏区
  2. git pull（拉取）：git pull后面跟一个远程仓库的URL，会拉取远程仓库中有而本地仓库没有的文件
  3. git fetch  &  merge：先看看远程有无更新（fetch），确认没问题后再合并（merge）到自己的代码中



## 项目的搭建及克隆

### 搭建

1. git init 创建git仓库
2. git add 将文件加入暂存区    — **git add . 表示将所有[新]文件放入暂存区**
3. git commit 将暂存区的文件加入本地仓库
4. git push传输至远程仓库

### 克隆

```
git clone [URL] # 克隆整个仓库
git clone [URL] <directory> #克隆仓库中某个文件夹
git clone [URL] name #克隆某个仓库并进行重命名
```





## 文件控制

> 文件有四种状态

1. untracked：未跟踪，文件没有加入到仓库中不参与版本控制
2. unmodify：文件已经进入仓库但未被修改。 可以用`git rm`   指令将其变回untracked状态
3. modified：文件已经修改，可通过`git add` 指令将其放入暂存区；也可以通过`git checkout`  指令将其变回unmodify状态
4. staged：暂存状态，可通过`git commit` 加入本地仓库；也可通过 `git reset HEAD filename` 指令回到modified状态。   

tip：HEAD是一个指向master主支的**游标**



## 常用命令

- 暂存区

  > ```git
  > git add filename       # 将单个文件添加到暂存区
  > git add .              # 将工作区中的所有修改添加到暂存区
  > git status             # 查看哪些文件在暂存区中
  > ```

- 本地仓库

  > ```git
  > git commit -m "Commit message"   # 将暂存区的更改提交到本地版本库
  > git log                          # 查看提交历史
  > git diff                         # 查看工作区和暂存区之间的差异
  > git diff --cached                # 查看暂存区和最后一次提交之间的差异
  > ```
  >
  > 

**1、工作区 -> 暂存区**

使用 git add 命令将工作区中的修改添加到暂存区。

```
git add filename
```

**2、暂存区 -> 版本库**

使用 git commit 命令将暂存区中的修改提交到版本库。

```
git commit -m "Commit message"
```

**注：** 在 Linux 系统中，commit 信息使用单引号 **'**，Windows 系统，commit 信息使用双引号 **"**。

所以在 git bash 中 **git commit -m '提交说明'** 这样是可以的，在 Windows 命令行中就要使用双引号 **git commit -m "提交说明"**。

**3、版本库 -> 远程仓库**

使用 git push 命令将本地版本库的提交推送到远程仓库。

```
git push origin branch-name
```

**4、远程仓库 -> 本地版本库**

使用 git pull 或 git fetch 命令从远程仓库获取更新。

```
git pull origin branch-name
# 或者
git fetch origin branch-name
git merge origin/branch-name
```



## .gitignore

> 忽略文件，写入里面的内容不会被上传至仓库

1. #为注释
2. 可以使用Linux通配符  — *代表任意多个字符     ？代表任意一个字符    [abc] 表示abc中的一个字符     {string1,string2…}表示多个字符串中的一个
3.  ! filename  表示该文件不被忽略
4.  / direcrory   表示忽略directory目录下的文件（不包括其子目录）
5. directory / 表示忽略directory子目录下的所有文件（包括子目录）



## git的分支

![img](https://xin-note-pic.oss-cn-hangzhou.aliyuncs.com/git/git-brance.svg)

git的分支实际上是指向更改快照的指针



### 创建分支

- 新建一个分支但不切换

  ```
  git branch <branchname>
  ```

  

- 创建新分支并切换到该分支

  ```
  git checkout -b <branchname>
  # git checkout用于切换分支  -b表示先创建某分支再进行切换
  ```



- 查看分支

  ```
  git branch # 查看所有本地分支
  git branch -r #查看远程分支
  git branch -a #查看所有本地和远程分支
  ```

  

### 合并分支

- 将其他分支合并到当前分支

  ```
  git merge <branchname>
  ```

- 解决合并冲突

  合并过程中若出现冲突，git会标记冲突文件，需要手动解决

  打开冲突文件，按照标记解决冲突



### 删除分支

- 删除本地分支

  ```
  git branch -d <branchname>
  ```

- 强制删除未合并分支

  ```
  git branch -D <branchname>
  ```

- 删除远程分支

  ```
  git push origin --delete <branchname>
  ```

  
