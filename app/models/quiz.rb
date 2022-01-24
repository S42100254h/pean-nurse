class Quiz < ApplicationRecord
  has_many :category_quiz_relations, dependent: :destroy
  has_many :categories, through: :category_quiz_relations
  has_many :choices, dependent: :destroy
  validates :title, presence: true
  validates :title, uniqueness: true

  def create_choices(choices)
    choices.each do |choice_item|
      choice = self.choices.new(choice_item.permit!)
      choice.save!
    end
  end

  def update_choices(choices)
    choices.each do |choice_item|
      self.choices.find(choice_item["id"]).update(choice_item.permit!)
    end
  end
end
