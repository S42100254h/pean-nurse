class CreateCommentaries < ActiveRecord::Migration[6.1]
  def change
    create_table :commentaries do |t|
      t.text :text
      t.references :quiz, null: false, foreign_key: true

      t.timestamps
    end
  end
end
