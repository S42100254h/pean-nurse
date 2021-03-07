class Answer < ApplicationRecord
  belongs_to :quiz
  validates :answer1, presence: true
  validates :answer2, presence: true
  validates :answer3, presence: true
  validates :answer4, presence: true
  validates :correct_answer_no, presence: true
  validates :commentary, presence: true
end
