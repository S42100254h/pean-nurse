class AddIndexQuiz < ActiveRecord::Migration[6.1]
  def change
    add_index :quizzes, :title, unique: true
  end
end
