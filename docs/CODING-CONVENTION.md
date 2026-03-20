# 命名约定规范

> 最后更新：2026-03-16

---

## 📁 文件命名

| 类型 | 规则 | 示例 |
|------|------|------|
| 项目目录 | kebab-case | `wuxing-lab`, `my-website` |
| 页面/组件 | PascalCase | `HomePage.vue`, `Header.vue` |
| 工具函数/算法 | kebab-case | `calculate-energy.js`, `date-helper.js` |
| 配置文件 | kebab-case | `.eslintrc.js`, `vite.config.js` |
| 文档 | kebab-case 或 PascalCase | `README.md`, `ARCHITECTURE.md` |

---

## 🟨 JavaScript / TypeScript

### 变量

| 类型 | 规则 | 示例 |
|------|------|------|
| 普通变量 | camelCase | `userName`, `currentEnergy` |
| 常量 | UPPER_SNAKE_CASE | `MAX_RETRY`, `API_BASE_URL` |
| 布尔变量 | is/has/can + 名词 | `isActive`, `hasEnergy`, `canUpdate` |
| 数组 | 复数名词 | `users`, `energyRecords` |
| DOM 元素 | `$` 前缀 | `$container`, `$submitBtn` |

### 函数

| 类型 | 规则 | 示例 |
|------|------|------|
| 普通函数 | camelCase，动词开头 | `getUser()`, `calculateBazi()` |
| 事件处理 | on + 事件 + 目标 | `onClickSubmit()`, `onInputChange()` |
| 业务逻辑 | 动词 + 名词 | `updateEnergy()`, `syncData()` |
| 私有函数 | `_` 前缀 | `_formatDate()`, `_validateInput()` |

### 类

| 类型 | 规则 | 示例 |
|------|------|------|
| 类名 | PascalCase | `EnergyCalculator`, `UserService` |
| 方法 | camelCase | `calculate()`, `getData()` |

---

## 🟦 数据库

| 类型 | 规则 | 示例 |
|------|------|------|
| 表名 | snake_case，复数 | `users`, `energy_records` |
| 字段名 | snake_case | `user_name`, `created_at` |
| 主键 | `id` | `id` |
| 外键 | `表名_id` | `user_id`, `order_id` |

---

## 🎨 CSS / 样式

| 类型 | 规则 | 示例 |
|------|------|------|
| 类名 | kebab-case | `.main-container`, `.energy-card` |
| BEM 规范 | `块__元素--修饰符` | `.header__nav--active` |

---

## 🌐 API 路径

| 类型 | 规则 | 示例 |
|------|------|------|
| 路径 | kebab-case | `/api/user-profile`, `/energy/calculate` |
| 方法 | RESTful | GET/POST/PUT/DELETE |

---

## 📍 算法文件存放位置

```
D:\projects\wuxing-lab\
├── apps\
│   ├── api\algorithms\          # 后端算法
│   │   ├── bazi\                # 八字相关
│   │   ├── energy\              # 能量计算
│   │   └── utils\               # 工具算法
│   └── mobile\
│       └── algorithms\          # 前端算法（如有）
├── docs\
│   └── ALGORITHM.md             # 算法文档
└── scripts\                     # 构建/运维脚本
```

### 算法文件命名示例

```
algorithms/
├── bazi/
│   ├── parse-date.js            # 解析日期
│   ├── calculate-pillar.js      # 计算柱
│   └── generate-chart.js        # 生成命盘
├── energy/
│   ├── five-elements.js         # 五行计算
│   ├── daily-energy.js          # 每日能量
│   └── sync-calendar.js        # 日历同步
└── utils/
    ├── date-helper.js           # 日期工具
    └── validate.js              # 验证工具
```

---

## 📋 约定遵守检查清单

- [ ] 变量名有意义，见名知意
- [ ] 常量单独提取，不用硬编码
- [ ] 函数名描述动作，如 `calculateXxx`
- [ ] 私以下划线开头，如 `_internalFunc`
- [ ] 数据库表用复数，如 `users` 不是 `user`
- [ ] 文件名与内容一致，如 `calculate-energy.js` 包含能量计算
