# 看護師国家試験対策アプリ PeAN

「勉強を続けるのが苦手」「楽しみながら国家試験に臨みたい」
そんな看護学生に向けた国家試験対策アプリです。

## 技術スタック概略（詳細後述）

- Backend: Rails (API mode / Rspec / rubocop)
- Frontend: React( create-react-app / Redux / Material-UI / eslint)
- infra: AWS, Docker, CircleCI

## 技術スタック詳細

### Backend: Rails

#### 主要 gem

- devise_token_auth: トークン認証
- active_model_serializer: Rails API からの response を制御
- aws-fog/carrierwave: アバター画像を AWS S3 に保存
- rspec: model や request のテストに利用
- rubocop: Ruby の静的コード解析

### Frontend: React

#### 主要ライブラリ

- Redux: global state の管理
- Material-UI: Google が提供する UI コンポーネントライブラリ
- eslint: JavaScript の静的コード解析
- jest: JavaScript のテストに利用
- connected-react-router: routing に利用
- react-transition-group: template file 間のトランジションを追加

### Infra

- Docker/docker-compose: 開発環境で DB をコンテナで管理
- AWS S3: 静的ホスティングサービス。アバター画像を保存
- CircleCI: Rspec, rubocop, jest, eslint を自動化
