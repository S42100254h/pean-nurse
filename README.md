# 看護師国家試験アプリ PeAN
「勉強を続けるのが苦手」「楽しみながら国家試験に臨みたい」
そんな看護学生に向けた国家試験対策アプリです。

## 技術スタック概略（詳細後述）
- Backend: Rails (API mode / Rspec / rubocop)
- Frontend: React( create-react-app / Redux / Material-UI / eslint)
- infra: AWS, Docker, CircleCI

## 技術スタック詳細
### Backend: Rails
#### 主要gem
- devise_token_auth: トークン認証
- active_model_serializer: Rails APIからのresponseを制御
- aws-fog/carrierwave: アバター画像をAWS S3に保存
- rspec: modelやrequestのテストに利用
- rubocop: Rubyの静的コード解析

### Frontend: React
#### 主要ライブラリ
- Redux: global stateの管理
- Material-UI: Googleが提供するUIコンポーネントライブラリ
- eslint: JavaScriptの静的コード解析
- jest: JavaScriptのテストに利用
- connected-react-router: routingに利用
- react-transition-group: template file間のトランジションを追加

### Infra
- Docker/docker-compose: 開発環境でDBをコンテナで管理
- AWS S3: 静的ホスティングサービス。アバター画像を保存
- CircleCI: Rspec, rubocop, jest, eslintを自動化