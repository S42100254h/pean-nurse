class ChangeColumnToCategoryQuizReration < ActiveRecord::Migration[6.1]
  def change
    drop_table :category_quiz_relations
  end
end
