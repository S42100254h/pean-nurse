class Category < ApplicationRecord
  has_many :category_quiz_relations, dependent: :destroy
  has_many :quizzes, through: :category_quiz_relations
  has_one :category_profile, dependent: :destroy
  validates :name, presence: true
  validates :name, uniqueness: true

  def create_with_category_profile(profile)
    category_profile = self.create_category_profile!(profile.permit!)
    category_profile.save!
  end
end
