class Quiz < ApplicationRecord
  has_one :category, dependent: :destroy
  has_one :choice, dependent: :destroy
  validates :title, presence: true
end
