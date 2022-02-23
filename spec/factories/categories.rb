FactoryBot.define do
  factory :category do
    sequence(:name) {|n| "#{n}_#{Faker::Lorem.word}" }

    trait :with_category_profile do
      title { Faker::Lorem.word }
      image { Rack::Test::UploadedFile.new Rails.root.join "front/src/assets/img/pig.png" }
      caption { Faker::Lorem.sentence }
      uid { Faker::Lorem.word }
    end
  end
end
