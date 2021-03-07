FactoryBot.define do
  factory :quiz do
    title { Faker::Lorem.question }
  end
end
