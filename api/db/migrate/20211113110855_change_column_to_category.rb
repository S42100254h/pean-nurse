class ChangeColumnToCategory < ActiveRecord::Migration[6.1]
  def change
    remove_reference :categories, :quiz, index: true
  end
end
