FactoryBot.define do
  factory :badge do
    index { 1 }
    color { "MyString" }
    user { nil }
    category { nil }
  end
end
