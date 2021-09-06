class CreateInquiries < ActiveRecord::Migration[6.1]
  def change
    create_table :inquiries do |t|
      t.string :email
      t.string :select
      t.string :text
      t.string :image

      t.timestamps
    end
  end
end
