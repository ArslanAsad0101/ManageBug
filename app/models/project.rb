class Project < ApplicationRecord
  before_action :authenticate_user!
  belongs_to :user

  validates :name, presence: true
  validates :description, presence: true
end
