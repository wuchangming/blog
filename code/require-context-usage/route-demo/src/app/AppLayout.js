import React from 'react';

export default function({ children }) {
    return (
        <div>
            {children
                ? <div>
                      <a href="#">回到首页</a>
                      {children}
                  </div>
                : <ul>
                      <li><a href="#shop">跳转购买页</a></li>
                      <li><a href="#service">跳转服务中心</a></li>
                      <li><a href="#order">跳转订单页</a></li>
                      <li><a href="#login">跳转登录注册页</a></li>
                  </ul>}
        </div>
    );
}
