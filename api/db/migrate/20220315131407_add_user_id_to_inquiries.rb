class AddUserIdToInquiries < ActiveRecord::Migration[6.1]
  def change
    add_reference :inquiries, :user, foreign_key: true
  end
end
