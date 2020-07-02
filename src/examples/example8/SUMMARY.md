# 微前端的又一次探索

1.npm

优点： 开发方式相对友好，宿主应用以require/import的方式加载子应用，子应用只需暴露统一接口供以调用即可，对子应用的技术栈没有限制；

缺点：编译时耦合，子应用更新发布后宿主应用需要被迫升级依赖，无法做到独立部署；由于不限定子应用的技术栈，因此一般只能简单的去渲染子应用，宿主与子应用交互难度比较高。

2.iframe

优点：方便快捷，几乎没有任何限制

缺点：只能满足很单一的需求，除了渲染子应用，交互的难度比npm方式还要高

3.mount/unmount DOM

优点：与npm方式类似，但是不需要以require/import的方式显式导入

缺点：对子应用的要求较高，子应用需要提供供多的方法让宿主对其进行管理，交互上比前两者会好一点

它的基本思路具体如下：

1.子应用(Child)有自己单独的repo,打包部署也是独立的

2.Child需要在入口处暴露自己的生命周期函数，至少需要：bootstrap, mount, unmount

3.Child打包后必须将自己的`asset-mainfest.json`暴露出来（里面包含了Child入口的bundle文件地址），里面的文件也必然是可被宿主(Host)访问的

4.Host监听路由，发现需要加载Child时动态请求Child的mainfest并且将Child挂载到一个新的dom节点上（一般此处会有缓存，防止re-mount）

这种方式其实是目前很多微前端的主流解决方案，基本上可以满足大部分的拆分和业务需求，老马之前在自己的博客里推荐的微前端的方案也如出一辙。

但如果你仔细观察第2步你会发现，这完全一个过程化的方式，再加上第3步是挂载到一个新的节点，以React作为参考，这里该怎么做呢？肯定是Child里会在mount里有如下实现：

```
export const mount = container => render(<SubAppEntry />, container);
```

如此一来，Child就和Host在逻辑和数据层面脱离了，当然了，你要是真愿意，你也可以让Child暴露更多更多的方法来让Host去管理自己（而不仅限于生命周期的钩子），倒也不是不行，可你真要是有十几个Child那工作量和维护难度可不是一般，这就是为什么我在缺点一项中说它比npm和iframe稍好，但是依然还是个缺点的原因。但还是那就话，如果你的Child真的没啥和Host交互的，此方案还是首选的（毕竟钩子函数是你自己写的呀，完全没有技术栈限制）

4.动态注入(名字待定)

优点：独立部署，独立开发，可与Host无缝交互，可满兼容上述三种方案
缺点：技术栈需要统一

注意，方案3可不是动态注入，是动态挂载，区别在于你加载的Child在逻辑和数据层面上是不是属于Host，显然方案3是独立的。所以此方案的主要是的方案3的基础上做如下调整(以React为例)：

1.子应用(Child)有自己单独的repo,打包部署也是独立的

2.~~Child需要在入口处暴露自己的生命周期函数，至少需要：bootstrap, mount, unmount~~
Child不需要提供生命周期的钩子，只需要在入口处暴露自己的配置信息，如自己的reducers/store/routers...

3.Child打包后必须将自己的`asset-mainfest.json`暴露出来（里面包含了Child入口的bundle文件地址），里面的文件也必然是可被宿主(Host)访问的

4.Host监听路由，发现需要加载Child时动态请求Child的mainfest并且将~~Child挂载到一个新的dom节点上（一般此处会有缓存，防止re-mount~~
此处就是不挂载了，而是自己请求Child暴露出来的组件，这样天然的将Child和Host融为一体，你可以把Host的store传递给Child，更可以把Child里的reducer动态的注入的全局，当然你甚至可以把它当作方案3来用（即Child有自己的store，Host注入进来就不管了，就当它是一个简单的Component而已）

读到这里，可能有一些细节需要解释，比如：

1.这怎么听起来像是我们正常的开发方式呀，即一个project下有多个业务模块的folder,每个folder的index不就是所谓的Child的入口组件么，这本来就是一个应用呀，自然技术栈也是一样的，这怎么就微前端了？

这里面最重要的差别在于这种新的方案里没有子应用的代码，真正的开发代码是在远端其他仓库，因此并不会在一起编译，Host只需要配置一下如何去访问这些子应用即可。Host只是一个容器而已，文件结构如下：

├── Host Project
│   ├── index.js
│   └── config.js

`config.js`

```
export const subAppPath = `${subAppStorageDomain}/sub-main.js`;
export const subAppModuleName = 'micro-app';
```

`subAppPath`为子应用入口的bundle文件地址，这里本应该写asset-mainfest.json的地址，请求成功后从资源信息里再找到主bundle文件的链接，这里省略了这一步。

`subAppModuleName`为子应用主bundle打包的模块名称（后面会讲到）

有了这些配置，Host就可以这样加载远程组件：

`index.js`

```
import { subAppPath, subAppModuleName } from './config';

const HostContainer = () => {
  const [routes, setRoutes] = useState(null);
  const { path: basePath } = useRouteMatch();

  const Children = useMemo(() => {
    if (routes) {
      return routes.map(({ path, component }) => (
        <div>
          <Link to={`${basePath}${path}`}>{path}</Link>
          <Route path={`${basePath}${path}`} children={component} />
        </div>
      ))
    }
    return null;
  }, [routes]);
  useEffect(() => {
    const script = document.createElement('script');
    script.src = subAppPath;
    const onload = event => {
      setRoutes(window[subAppModuleName].routes);//umd
    }
    script.onload = onload;
    document.body.appendChild(script);
  }, []);
  return Children ? Children : <div>loading the routes of sub app</div>;
};

export default HostContainer;
```

原理很简单：将请求到的子应用模块以script的方式（解决跨域）加载到执行上下文中，由于子应用设置了打包策略（子应用的打包策略如下），因此可以直接访问该模块。


2.方案3里我们可以在全局变量（如window）上注入Child的生命周期函数，以此供Host调用，那在新的方案里是如何远程请求一个组件的bundle文件并且注入到一个已经存在的React环境里呢（Host打包里的React实例必然和Child里的React实例不一致，就算版本一致也不一样）,这里有啥坑呢？

首先先看下子应用的结构：

├── Child Project
│   ├── index.js
│   ├── components
│   │    ├── AsyncDescription.js
│   │    ├── User.js
│   │    └── Product.js
│   └── webpack.config.js


`index.js`

```
import React from 'react';
import User from './components/User';
import Product from './components/Product';

export const routes = [
  {
    path: '/user',
    component: <User />
  },
  {
    path: '/product',
    component: <Product />
  }
];
```

子应用入口处只暴露自己的路由配置以及组件。

`webpack.config.js`

```
var path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'sub-main.js',
    library: 'micro-app',
    libraryTarget: 'umd',
    publicPath: 'http://domain/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  mode: 'development'
};
```

重点说明下以下四个变量：

filename: 一定程度上决定了打包后主bundle文件的名称，最好有一定规则好去管理

library/libraryTarget: 正常情况下如果不设置这两个变量，webpack会按照var的方式去打包，这也是我们最常使用（可能你没注意到）模块加载方式。但是对于Host来说，如果用var的话就没有办法加载var返回的组件了，因此采用umd+模块名称（library)，如此打包后的产物就可以以名为`micro-app`的key来注册到全局window上（如果你在browser端使用的话）。

publicPath: 默认情况下如果有代码分离的话，webpack会以根路径`/`来请求子bundle，但是由于这里我们是远程调用，所以如果子应用有代码分离的话，我们需要主bundle也能够知道远程子bundle的路径，这个变量就可以满足我们的需求。

还有一点需要强调，若子应用使用到了Hook，那么你应该会发现一个这样的错误：

`Breaking the Rules of Hooks`

[详细的解释请看官网](https://reactjs.org/warnings/invalid-hook-call-warning.html)

经过我的测试发现，子应用里的Hook是没办法在Host里使用的，最简单的解决办法就是子应用使用class component

[补充：之后发现了这个问题的根本原因](https://overreacted.io/how-does-setstate-know-what-to-do/)

最后，考虑到集成后打包大小的问题，子应用可以选择不打包一些公共依赖，让其以插件的方式在Host内引用，如react:

```
externals: {
  react: {
    root: 'React',
    umd: 'react',
    commonjs2: 'react',
    commonjs: 'react'
  }
}

```

如此只需要在Host内提供react即可:

```
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
```

这并不是必须的，是否真的需要这样，完全取决于你。

