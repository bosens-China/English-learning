import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';

import './index.css';
import zhCN from 'antd/locale/zh_CN';

import { Routes } from '@/router';

import 'virtual:uno.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <Routes></Routes>
    </ConfigProvider>
  </React.StrictMode>,
);
