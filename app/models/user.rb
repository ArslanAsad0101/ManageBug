class User < ApplicationRecord
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :validatable
  has_many :projects, foreign_key: :manager_id, dependent: :destroy
  has_many :project_users, dependent: :destroy
  has_many :assigned_projects, through: :project_users, source: :project
  has_one_attached :avatar


  enum :role, {
    manager: 0,
    qa: 1,
    developer: 2
  }

  validates :name, presence: true
  validates :role, presence: true
validates :phone_number,
  presence: true,
  format: { with: /\A\d+\z/, message: "must contain only numbers" }
end