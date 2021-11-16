FactoryBot.define do
  factory :quiz do
    sequence(:title) {|n| "#{n}_#{Faker::Lorem.question}" }
  end
end
