FactoryBot.define do
  factory :answer do
    answer1 { Faker::Lorem.word }
    answer2 { Faker::Lorem.word }
    answer3 { Faker::Lorem.word }
    answer4 { Faker::Lorem.word }
    correct_answer_no { Faker::Lorem.characters(number: Random.new.rand(1..4)) }
    commentary { Faker::Lorem.sentences }
    quiz
  end
end
