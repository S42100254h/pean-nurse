class ChangeColumnToUser < ActiveRecord::Migration[6.1]
  def change
    change_column :users, :level, :integer, default: 1
    change_column :users, :experience_point, :integer, default: 0
  end
end
