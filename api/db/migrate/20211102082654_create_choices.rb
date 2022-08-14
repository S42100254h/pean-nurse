class CreateChoices < ActiveRecord::Migration[6.1]
  def change
    create_table :choices do |t|
      t.string :choice
      t.boolean :is_right
      t.references :quiz, null: false, foreign_key: true

      t.timestamps
    end
  end
end
