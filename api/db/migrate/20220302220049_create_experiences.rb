class CreateExperiences < ActiveRecord::Migration[6.1]
  def change
    create_table :experiences do |t|
      t.integer :level, null: false
      t.integer :experience, null: false

      t.timestamps
    end
  end
end
