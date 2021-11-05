FactoryBot.define do
  factory :choice do
    choice { Faker::Lorem.word }
    is_right { Faker::Boolean.boolean }
    quiz
  end
end
