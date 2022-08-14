class AddColumnToInquiry < ActiveRecord::Migration[6.1]
  def change
    add_column :inquiries, :name, :string
  end
end
