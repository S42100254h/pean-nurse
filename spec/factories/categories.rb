FactoryBot.define do
  factory :category do
    name { Faker::Lorem.word }
    quiz
  end
end
