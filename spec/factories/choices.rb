FactoryBot.define do
  factory :choice do
    choice { "MyString" }
    is_right { false }
    quiz { nil }
  end
end
