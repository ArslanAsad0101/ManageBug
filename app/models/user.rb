class User < ApplicationRecord
  has_many :projects, foreign_key: :manager_id, dependent: :destroy
  # has_many :managed_projects,
  #          class_name: "Project",
  #          foreign_key: :manager_id,
  #          dependent: :destroy

  # has_many :project_user, dependent: :destroy

  devise :database_authenticatable,
         :registerable,
         :recoverable,
         :rememberable,
         :validatable

  enum :role, {
    manager: 0,
    qa: 1,
    developer: 2
  }

  validates :name, presence: true
  validates :role, presence: true
  validates :phone_number, presence: true
end