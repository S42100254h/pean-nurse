FactoryBot.define do
  factory :user do
    name { Faker::Internet.username }
    sequence(:email) { |n|"#{n}_#{ Faker::Internet.email }"}
    password { Faker::Internet.password(min_length: 6, max_length: 128) }
  end
end
