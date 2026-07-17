class Bug < ApplicationRecord
belongs_to :project
belongs_to :reporter, class_name: "User"
belongs_to :developer, class_name: "User"
has_one_attached :screenshot


  enum :bug_type, {
    feature: 0,
    bug: 1
  }


  enum :status, {
    pending: 0,
    started: 1,
    resolved: 2,
    completed: 3
  }


  validates :title, presence: true
  validates :bug_type, presence: true
  validates :status, presence: true


  validates :title,
            uniqueness: {
              scope: :project_id
            }

end