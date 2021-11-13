class ChangeColumnToCategoryQuizzes < ActiveRecord::Migration[6.1]
  def change
    drop_table :category_quizzes
  end
end
