class User < ApplicationRecord
  devise :database_authenticatable,
         :registerable,
         :recoverable,
         :rememberable,
         :validatable

  has_many :projects,
           class_name: "Project",
           foreign_key: :manager_id,
           dependent: :destroy

  has_many :project_users,
           dependent: :destroy

  has_many :assigned_projects,
           through: :project_users,
           source: :project

  has_many :reported_bugs,
           class_name: "Bug",
           foreign_key: :reporter_id,
           dependent: :destroy

  has_many :assigned_bugs,
           class_name: "Bug",
           foreign_key: :developer_id,
           dependent: :destroy

  enum :role, {
    manager: 0,
    qa: 1,
    developer: 2
  }

  validates :name, presence: true
  validates :role, presence: true
  validates :phone_number, presence: true
end