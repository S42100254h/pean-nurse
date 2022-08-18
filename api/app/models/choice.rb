class Choice < ApplicationRecord
  belongs_to :quiz
  validates :choice, presence: true
  validates :is_right, inclusion: { in: [true, false] }
end
