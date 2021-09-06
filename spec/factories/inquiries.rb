FactoryBot.define do
  factory :inquiry do
    sequence(:email) {|n| "#{n}_#{Faker::Internet.email}" }
    select { ["コース内容について", "お支払いについて", "エラー、トラブルについて", "その他"].sample }
    text { Faker::Lorem.question }
    image { Faker::LoremFlickr.image }
  end
end
