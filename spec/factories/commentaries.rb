FactoryBot.define do
  factory :commentary do
    text { Faker::Lorem.sentence }
    quiz
  end
end
