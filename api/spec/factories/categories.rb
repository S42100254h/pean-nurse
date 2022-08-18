FactoryBot.define do
  factory :category do
    sequence(:name) {|n| "#{n}_#{Faker::Lorem.word}" }
    image { Rack::Test::UploadedFile.new Rails.root.join "app/assets/images/pig.png" }
    caption { Faker::Lorem.sentence }
    uid { Faker::Lorem.word }
  end
end
