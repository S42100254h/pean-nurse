class Badge < ApplicationRecord
  belongs_to :user
  belongs_to :category
  validates :color, inclusion: { in: %w[gold silver bronze] }
  validates :color, presence: true
  validates :index, presence: true
end
