class Commentary < ApplicationRecord
  belongs_to :quiz
  validates :text, presence: true
end
