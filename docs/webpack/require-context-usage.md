# 使用webpack的`require.context`实现路由去中心化管理

> 阅读须知：示例代码以react-router V3为例。其他路由同样适用，如：vue-router。同样其他的功能模块也可以用该思路进行相应的去中心化管理改造。

### 一个项目中路由的变化过程
当你在开发一个大型单页面应用的时候，项目之初一般做法是所有的路由规则都维护在一个`route.js`的文件里。

```javascript
// rootRoute.js
const rootRoute = {
    childRoutes: [
        {
            path: '/',
            component: AppLayout,
            childRoutes: [
                {
                    path: 'shop', // 购买详情页
                    component: Shop
                },
                {
                    path: 'order', // 订单页
                    component: Order
                }
                // ...
                // 少量其他路由
                // ...
            ]
        }
    ]
};
```

**随着业务代码的增长路由很快会变成：**
```javascript
// rootRoute.js
const rootRoute = {
    childRoutes: [
        {
            path: '/',
            component: AppLayout,
            childRoutes: [
                {
                    path: 'shop', // 购买详情页
                    component: ShopLayout,
                    childRoutes: [
                        {
                            path: 'foodDetail',
                            component: FoodDetail
                        },
                        {
                            path: 'shoesDetail',
                            component: ShoesDetail
                        }
                        // 其他
                    ]
                },
                {
                    path: 'order', // 订单页
                    component: Order,
                    childRoutes: [
                        {
                            path: 'remark', //订单备注
                            component: Remark
                        },
                        {
                            path: 'invoice', //发票抬头
                            component: Invoice
                        },
                        {
                            path: 'payment', //付款页面
                            component: Payment
                        },
                        {
                            path: 'userValidation', //用户验证
                            component: UserValidation
                        },
                        {
                            path: 'chooseAddress', //选择地址
                            component: ChooseAddress,
                            childRoutes: [
                                {
                                    path: 'addAddress', //添加地址
                                    component: AddAddress,
                                    childRoutes: [
                                        {
                                            path: 'searchAddress', //搜索地址
                                            component: SearchAddress
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
                // ...
                // 大量新增路由
                // ...
            ]
        }
    ]
};
```

**当路由变的越来越大，大到已经难以维护时。我们按照[react-router提供的思路](https://github.com/ReactTraining/react-router/tree/v3/examples/huge-apps)，对路由按业务模块进行拆分。**

```javascript
// rootRoute.js
const rootRoute = {
    childRoutes: [
        {
            path: '/',
            component: AppLayout,
            childRoutes: [
                require('./modules/shop/route'), //购买详情页
                require('./modules/order/route'), // 订单页
                require('./modules/login/route'), // 登录注册页
                require('./modules/service/route'), // 服务中心
                // ...
                // 其他大量新增路由
                // ...
            ]
        }
    ]
};
```
按该方式拆分后，每个业务模块维护自身的路由配置。新增业务模块路由，只需要在总的rootRoute中引入该业务模块的路由即可（**也就是加一行代码**）。这个方案看来是已经接近完美了。**但如果想达到连一行代码都不用加？实现彻彻底底的去中心化管理**

### require.context是什么？
> webpack官方文档的介绍[require.context](https://webpack.js.org/guides/dependency-management/#require-context)

简单说就是：有了require.context，你可以通过正则匹配引入相应的模块文件。

```javascript
require.context(directory, useSubdirectories, regExp)
```
require.context有三个参数：
- directory：说明需要检索的目录
- useSubdirectories：是否检索子目录
- regExp: 匹配文件的正则表达式

改造后的rootRoute.js文件
```javascript
const rootRoute = {
    childRoutes: [
        {
            path: '/',
            component: AppLayout,
            childRoutes: (r => {
                return r.keys().map(key => r(key));
            })(require.context('./', true, /^\.\/modules\/((?!\/)[\s\S])+\/route\.js$/))
        }
    ]
};
```
优化后，新增一个业务模块，只要route按照统一的目录结构。业务模块route就能被自动关联到rootRoute里。  
[示例代码](../../code/require-context-usage/route-demo)  

### 其他应用场景
这个思路统一可应用于其他想要去中心化的功能模块。  
- 模块化管理reducer

`欢迎转载，转载请注明出处：`
