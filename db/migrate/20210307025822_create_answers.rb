class CreateAnswers < ActiveRecord::Migration[6.1]
  def change
    create_table :answers do |t|
      t.string :answer1
      t.string :answer2
      t.string :answer3
      t.string :answer4
      t.integer :correct_answer_no
      t.string :commentary
      t.references :quiz, null: false, foreign_key: true

      t.timestamps
    end
  end
end
