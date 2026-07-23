# 抖音创作者中心 · 纯 HTTP 发视频

通过抓包还原的接口，用 Python `requests` 上传并发布视频（不依赖 Playwright / Selenium）。

## 目录结构

```
douyin_publish_interface/
├── publish.py                 # 主程序：上传 + 发布（推荐直接用）
├── publish_options.py         # 发布可配置参数
├── sign_params.py             # 风控参数（ticket-guard / msToken / a_bogus）
├── sign_a_bogus/              # Node：跑 bdms.min.js 生成 a_bogus
│   ├── env.js
│   └── sign.js
├── requirements.txt
├── cookies.example.txt        # Cookie 模板
├── cookies.txt                # 你的登录 Cookie（勿提交）
├── security_sdk.example.json  # 密钥导出模板
├── security_sdk.json          # EC 私钥 + ticket（勿提交）
├── cover.jpg                  # 封面图（JPEG）
├── response.mp4               # 待发布视频示例
└── _reverse/                  # 逆向分析产物（bdms 等）
```

> **说明：** 日常用 `python publish.py ...`。`a_bogus` 由本机 Node 调用 `sign_a_bogus/` 生成。

## 环境要求

- Python 3.10+
- Node.js 18+（用于生成 `a_bogus`，调用 `_reverse/bdms.min.js`）
- 已登录的抖音创作者账号（浏览器 Cookie）

```bash
pip install -r requirements.txt
# 确认 node 可用
node -v
```

依赖：`requests`、`cryptography`；`a_bogus` 额外需要系统已安装 Node（无需 npm 包）。

## 快速开始

### 1. 导出 Cookie

1. 浏览器打开并登录：  
   https://creator.douyin.com/creator-micro/content/upload?enter_from=dou_web
2. F12 → Network → 任意请求 → Request Headers → 复制整段 `Cookie`
3. 写入项目根目录 `cookies.txt`（单行即可）

必含字段示例：`sessionid`、`sid_tt`、`uid_tt`、`ttwid`、`csrf_session_id`。

可参考 `cookies.example.txt`。

### 2. 导出 security_sdk（推荐，用于发布风控头）

在已登录的创作者中心页面，打开控制台执行：

```javascript
JSON.stringify({
  ...JSON.parse(JSON.parse(localStorage.getItem('security-sdk/s_sdk_crypt_sdk')).data),
  ...JSON.parse(JSON.parse(localStorage.getItem('security-sdk/s_sdk_sign_data_key/web_protect')).data),
}, null, 2)
```

将输出保存为 `security_sdk.json`，需包含：

| 字段 | 说明 |
|------|------|
| `ec_privateKey` | EC P-256 私钥 PEM |
| `ec_publicKey` | 公钥 PEM（可选） |
| `ticket` | 形如 `hash.xxx` |
| `ts_sign` | 形如 `ts.2.xxx` |
| `client_cert` | 形如 `pub.xxx` |

也可对照 Application → Local Storage 手动拼装，格式见 `security_sdk.example.json`。

自检签名是否正常：

```bash
python sign_params.py --sdk security_sdk.json
```

### 3. 准备视频与封面

- 视频：任意 mp4（建议 ≤16G，时长 ≤60 分钟）
- 封面：JPEG；可用 `--cover cover.jpg`，或不传则自动找「视频同路径同名 `.jpg`」

### 4. 发布

```bash
python publish.py ^
  --video response.mp4 ^
  --title Test ^
  --cover cover.jpg ^
  --cookie-file cookies.txt ^
  --security-sdk security_sdk.json ^
  --user-id 你的uid
```

Linux / macOS：

```bash
python publish.py \
  --video response.mp4 \
  --title Test \
  --cover cover.jpg \
  --cookie-file cookies.txt \
  --security-sdk security_sdk.json \
  --user-id 你的uid
```

成功时终端会打印 `item_id`，例如：

```text
[publish] ok item_id=7664856313289100587
```

带更多发布选项：

```bash
python publish.py ^
  --video response.mp4 ^
  --title Test ^
  --caption "简介内容" ^
  --hashtags 旅行,美食 ^
  --visibility 0 ^
  --download 1 ^
  --timing 0 ^
  --cover cover.jpg
```

## 命令行参数

| 参数 | 必填 | 默认 | 说明 |
|------|------|------|------|
| `--video` | 是 | — | 视频文件路径 |
| `--title` | 是 | — | 作品标题 |
| `--caption` | 否 | 空 | 作品简介 |
| `--hashtags` | 否 | 空 | 话题，逗号分隔 |
| `--visibility` | 否 | 0 | 0公开 / 1好友可见 / 2仅自己可见 |
| `--download` | 否 | 1 | 1允许保存 / 0不允许 |
| `--timing` | 否 | 0 | 0立即发布，否则定时 Unix 秒 |
| `--hot-sentence` | 否 | 空 | 关联热点 |
| `--mix-id` | 否 | 空 | 合集 ID |
| `--cover` | 否 | 同名 `.jpg` | 封面 JPEG |
| `--cookie-file` | 否 | `cookies.txt` | Cookie 文件 |
| `--security-sdk` | 否 | `security_sdk.json` | ticket-guard 密钥 |
| `--user-id` | 否 | 自动探测 | 作者 uid |
| `--options-json` | 否 | 空 | 额外 PublishOptions JSON 文件 |

## 发布可配置参数（create_v2）

对应创作者中心发布页，定义见 `publish_options.py`：

| 字段 | 说明 |
|------|------|
| `title` | 作品标题 |
| `caption` | 作品简介 |
| `hashtags` | 话题列表，如 `["旅行","美食"]` |
| `mentions` | @好友 |
| `activity` | 官方活动 |
| `hot_sentence` | 关联热点词 |
| `visibility_type` | 0公开 / 1好友可见 / 2仅自己可见 |
| `download` | 1允许保存 / 0不允许 |
| `timing` | 0立即，`>0` 定时 Unix 秒 |
| `music_id` / `music_source` | 音乐 |
| `poster_delay` | 封面相关参数 |
| `mix_id` | 合集 |
| `should_sync` / `sync_to_toutiao` | 同步其他平台 |
| `chapter_abstract` / `chapter_details` / `chapter_type` | 视频章节 |
| `anchor` | 地理位置等锚点透传 |
| `is_preview` / `is_post_assistant` | 发文助手相关 |
| `extra_common` | 高级：直接合并进 `common` |

查看完整字段说明：见 `publish_options.py` 中的 `OPTIONS_SCHEMA`（或旧版 `GET /api/options`，需启动已废弃的 Flask）。


## 风控参数说明

详见 `sign_params.py` 顶部注释。摘要：

| 参数 | 是否已还原 | 用法 |
|------|------------|------|
| `bd-ticket-guard-*` | ✅ 纯 Python | 读 `security_sdk.json`，ECDSA 签 `ticket=&path=&timestamp=` |
| `msToken` | ✅ 复用 | 从响应头 `x-ms-token` 自动续用 |
| `x-secsdk-csrf-token` | ✅ 协议换取 | 请求时自动获取 |
| `a_bogus` | ✅ Node + bdms | `sign_a_bogus/sign.js` 进程池；`DOUYIN_A_BOGUS=0` 关闭；`DOUYIN_A_BOGUS_WORKERS=N` 并发数（默认 2） |
| `x-tt-session-dtrait` | 未实现 | 一般可先省略 |

## 常见问题

### Cookie / sdk 过期

表现：登录态失效、`create_v2` 报错、ticket 校验失败。  
处理：重新登录浏览器，更新 `cookies.txt` 与 `security_sdk.json`。

### 提示无法获取 user_id

加上 `--user-id`。可在抓包中搜索 `user_id=` 或 `author_id=`（例如 ApplyUploadInner 请求）。

### 缺少封面

```text
FileNotFoundError: 需要封面图 JPEG
```

提供 `--cover xxx.jpg`，或把 `视频名.jpg` 放在视频同目录。

### create_v2 风控失败

1. 确认已传 `--security-sdk` 且文件有效  
2. Cookie 与 sdk 是否同一账号、同一登录会话  
3. 确认本机有 Node：`node -v`，日志里 `a_bogus=yes`  
4. 可单独测：`node sign_a_bogus/sign.js --url "https://creator.douyin.com/web/api/media/aweme/create_v2/?aid=2906" --json`

### 安全注意

- `cookies.txt`、`security_sdk.json` 含登录态与私钥，**不要提交到 Git**（已在 `.gitignore`）
- 不要分享给他人；泄露等于账号可被代发内容

## 相关脚本

```bash
# 验证 ticket-guard + a_bogus
python sign_params.py --sdk security_sdk.json \
  --url https://creator.douyin.com/web/api/media/aweme/create_v2/

# 仅测 a_bogus（Node）
node sign_a_bogus/sign.js --url "https://creator.douyin.com/web/api/media/aweme/create_v2/?aid=2906" --json
```

## 许可与合规

仅供接口学习与个人账号自动化发布研究。请遵守抖音平台规则与当地法律法规，勿用于未授权批量或灰产用途。
