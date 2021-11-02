FactoryBot.define do
  factory :choice do
    choice { Faker::Lorem.questions(number: 1) }
    is_right { Faker::Boolean.boolean }
    quiz
  end
end
