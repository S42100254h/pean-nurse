class Category < ApplicationRecord
  has_many :category_quiz_relations, dependent: :destroy
  has_many :quizzes, through: :category_quiz_relations
  has_many :badges, dependent: :destroy
  has_one :category_profile, dependent: :destroy
  validates :name, presence: true
  validates :name, uniqueness: true
  validates :image, presence: true
  validates :caption, presence: true
  validates :uid, presence: true

  def create_with_category_profile(title, caption, image, uid)
    profile_items = { title: title, caption: caption, image: image, uid: uid }
    category_profile = self.create_category_profile!(profile_items)
    category_profile.save!
  end
end
