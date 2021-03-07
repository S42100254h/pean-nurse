class Quiz < ApplicationRecord
  has_one :category, dependent: :destroy
  has_one :answer, dependent: :destroy
end
