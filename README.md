# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## membersテーブル  <!-- users,groupの中間テーブル -->

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


## usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, unique: true, primary_key: true|
|name|string|index: true, null: false, foreign_key: true|
|mail|string|null: false, foreign_key: true|

### Association
- has_many :groups
- has_many :messages
- has_many :members


## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|group_id|integer|null: false, foreign_key: true|
|group_name|integer|null: false, foreign_key: true|

### Association
- has_many :uesrs
- has_many :messages
- has_many :members


## commentsテーブル  <!-- users,messagesの中間テーブル -->

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|message_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :message
- belongs_to :user


## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|message_id|integer|null: false, foreign_key: true|
|body|text|null: false|
|image|string||

### Association
- has_many :users
- has_many :groups
- has_many :members
