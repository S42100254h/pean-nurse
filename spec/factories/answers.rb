FactoryBot.define do
  factory :answer do
    answer_1 { "MyString" }
    answer_2 { "MyString" }
    answer_3 { "MyString" }
    answer_4 { "MyString" }
    correct_answer_no { 1 }
    commentary { "MyString" }
    quiz { nil }
  end
end
