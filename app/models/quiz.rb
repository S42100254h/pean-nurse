class Quiz < ApplicationRecord
  has_many :categories, dependent: :destroy
  has_many :choices, dependent: :destroy
  validates :title, presence: true
end
