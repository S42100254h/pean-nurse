class Quiz < ApplicationRecord
  has_many :category_quiz_relations, dependent: :destroy
  has_many :categories, through: :category_quiz_relations
  has_many :choices, dependent: :destroy
  validates :title, presence: true
end
