FactoryBot.define do
  factory :category_profile do
    title { Faker::Lorem.word }
    image { Rack::Test::UploadedFile.new Rails.root.join "front/src/assets/img/cat.png" }
    caption { Faker::Lorem.sentence }
    uid { Faker::Lorem.word }
    category
  end
end
