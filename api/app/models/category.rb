class Category < ApplicationRecord
  has_many :category_quiz_relations, dependent: :destroy
  has_many :quizzes, through: :category_quiz_relations
  has_many :badges, dependent: :destroy
  validates :name, presence: true
  validates :name, uniqueness: true
  validates :image, presence: true
  validates :caption, presence: true
  validates :uid, presence: true
  mount_uploader :image, ImageUploader
end
