class Project < ApplicationRecord
  belongs_to :manager, class_name: "User", foreign_key: :manager_id
  has_many :project_users, dependent: :destroy

  validates :name, presence: true
  validates :description, presence: true
end