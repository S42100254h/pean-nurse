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
    choices_with_id = choices.reject {|choice| choice["id"].nil? }
    choices_with_id.each do |choice_item|
      self.choices.find(choice_item["id"]).update(choice_item.permit!)
    end
  end

  def delete_choices(choices)
    prev_choice_ids = self.choices.map {|prev_choice| prev_choice["id"].to_i }
    new_choice_ids = choices.map {|new_choice| new_choice["id"].to_i }
    delete_choice_ids = prev_choice_ids - new_choice_ids

    if delete_choice_ids != []
      delete_choice_ids.each do |delete_choice_id|
        choice = Choice.find(delete_choice_id)
        choice.destroy!
      end
    end
  end

  def add_choices(choices)
    choices_without_id = choices.select {|choice| choice["id"].nil? }
    if choices_without_id != []
      choices_without_id.each do |choice_without_id|
        choice = self.choices.new(choice_without_id.permit!)
        choice.save!
      end
    end
  end
end
