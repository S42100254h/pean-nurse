class RenameColumnName < ActiveRecord::Migration[6.1]
  def change
    rename_column :users, :experience_point, :exp
  end
end
