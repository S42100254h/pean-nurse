class DropCategoryProfilesTable < ActiveRecord::Migration[6.1]
  def change
    drop_table :category_profiles
  end
end
