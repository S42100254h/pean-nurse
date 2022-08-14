class AddColumnToUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :level, :integer
    add_column :users, :experience_point, :integer
  end
end
