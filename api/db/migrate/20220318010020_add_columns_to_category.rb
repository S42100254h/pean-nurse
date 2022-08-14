class AddColumnsToCategory < ActiveRecord::Migration[6.1]
  def change
    add_column :categories, :image, :string
    add_column :categories, :caption, :string
    add_column :categories, :uid, :string
  end
end
