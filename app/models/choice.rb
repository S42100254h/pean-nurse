class Choice < ApplicationRecord
  belongs_to :quiz
  validates :choice, presence: true
end
