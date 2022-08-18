class AddIndexExperience < ActiveRecord::Migration[6.1]
  def change
    add_index :experiences, :level, unique: true
    add_index :experiences, :experience, unique: true
  end
end
