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
    completed: 2
  }

  validates :title, presence: true
  validates :bug_type, presence: true
  validates :status, presence: true

  validates :title,
            uniqueness: {
              scope: :project_id
            }

  # Helper method to get the correct status label based on bug_type
  def status_label
    case status
    when "pending"
      "Pending"
    when "started"
      "Started"
    when "completed"
      bug? ? "Resolved" : "Completed"
    else
      status.titleize
    end
  end

  # For forms - get status options based on bug_type
  def self.status_options_for_type(bug_type)
    options = {
      "Pending" => "pending",
      "Started" => "started"
    }
    
    if bug_type == "feature" || bug_type == 0
      options["Completed"] = "completed"
    else
      options["Resolved"] = "completed"
    end
    
    options
  end
end