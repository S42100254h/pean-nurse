FactoryBot.define do
  factory :category do
    sequence(:name) { |n| "#{n}_#{Faker::Lorem.word}" }
  end
end
