class CreateCategoryProfiles < ActiveRecord::Migration[6.1]
  def change
    create_table :category_profiles do |t|
      t.string :title
      t.string :image
      t.string :caption
      t.string :uid
      t.references :category, null: false, foreign_key: true

      t.timestamps
    end
  end
end
