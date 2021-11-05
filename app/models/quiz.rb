class Quiz < ApplicationRecord
  has_many :category, dependent: :destroy
  has_many :choice, dependent: :destroy
  validates :title, presence: true
end
