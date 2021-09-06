class Inquiry < ApplicationRecord
  validates :email, presence: true, format: { with: /\A[^@\s]+@[^@\s]+\z/ }
  validates :select, presence: true
  validates :text, presence: true
end
