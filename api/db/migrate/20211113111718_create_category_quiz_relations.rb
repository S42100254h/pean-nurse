class CreateCategoryQuizRelations < ActiveRecord::Migration[6.1]
  def change
    create_table :category_quiz_relations do |t|
      t.references :category, null: false, foreign_key: true
      t.references :quiz, null: false, foreign_key: true

      t.timestamps
    end
  end
end
