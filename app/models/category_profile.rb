class CategoryProfile < ApplicationRecord
  belongs_to :category
  validates :title, presence: true
  validates :image, presence: true
  validates :caption, presence: true
  validates :uid, presence: true
  validates :title, uniqueness: true
  validates :uid, uniqueness: true
  mount_uploader :image, ImageUploader
end
