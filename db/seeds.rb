30.times do |n|
  Quiz.create!(
    title: Faker::Lorem.question,
  )
  4.times do |n|
    Choice.create!(
      choice: Faker::Lorem.word,
      is_right: Faker::Boolean.boolean,
      quiz_id: Quiz.last.id,
    )
  end
end
