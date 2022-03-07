FactoryBot.define do
  factory :badge do
    index { Faker::Number.within(range: 1..10) }
    color { ["gold", "silver", "bronze"].sample }
    user
    category
  end
end
