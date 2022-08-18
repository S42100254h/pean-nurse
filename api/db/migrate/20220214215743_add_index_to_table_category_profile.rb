class AddIndexToTableCategoryProfile < ActiveRecord::Migration[6.1]
  def change
    add_index :category_profiles, :title, unique: true
    add_index :category_profiles, :uid, unique: true
  end
end
