class Experience < ApplicationRecord
  validates :level, presence: true
  validates :level, uniqueness: true
  validates :experience, presence: true
  validates :experience, uniqueness: true
end
