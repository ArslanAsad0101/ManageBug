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

  # validates :bug_type, presence: true
  validates :status, presence: true
  # validates :title, uniqueness: {scope: :project_id}
  # validates :deadline, presence: true
  # validate :acceptable_screenshot
  validates :developer_id, presence: true

 
  #  Helper method to get the correct status label based on bug_type
 def status_label
  return status.titleize unless completed?
  bug? ? "Resolved" : "Completed"
end

 # For forms - get status options based on bug_type
  def self.status_options_for_type(bug_type)
    options = {
      "Pending" => "pending",
      "Started" => "started"
    }
    
    if bug_type == 0
      options["Completed"] = "completed"
    else
      options["Resolved"] = "completed"
    end
    
    options
  end


 private

  def set_default_status
    self.status ||= "pending"
  end


  def acceptable_screenshot
  return unless screenshot.attached?

  unless screenshot.content_type.in?(%w[image/png image/jpeg])
    errors.add(:screenshot, "must be a PNG or JPEG image")
  end
end
 
end