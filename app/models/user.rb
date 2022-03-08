# frozen_string_literal: true

class User < ApplicationRecord
  has_many :badges, dependent: :destroy
  extend Devise::Models
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  validates :name, presence: true, length: { maximum: 50 }
  mount_uploader :image, ImageUploader
  attr_accessor :current_password

  # devise_token_authにより、emailの形式とpasswordの長さは下記のように設定されている。
  # email_regexp = /\A[^@\s]+@[^@\s]+\z/
  # password_length = 6..128
  include DeviseTokenAuth::Concerns::User

  def update_badge_color(badge)
    if badge[:color] == "silver"
      badge.update!({ color: "gold"})
    elsif badge[:color] == "bronze"
      badge.update!({ color: "silver"})
    end
  end
end
