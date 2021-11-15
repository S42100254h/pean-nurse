class Category < ApplicationRecord
  has_many :category_quiz_relations, dependent: :destroy
  has_many :quizzes, through: :category_quiz_relations
  validates :name, presence: true
  validates :name, uniqueness: true
end
