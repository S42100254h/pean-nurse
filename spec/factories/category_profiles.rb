FactoryBot.define do
  factory :category_profile do
    title { Faker::Lorem.word }
    image { Faker::Avatar.image }
    caption { Faker::Lorem.sentence }
    uid { Faker::Lorem.word }
    category
  end
end
