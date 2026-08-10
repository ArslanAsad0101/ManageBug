class Bug < ApplicationRecord
  belongs_to :project
  belongs_to :reporter, class_name: "User"
  belongs_to :developer, class_name: "User"
  has_one_attached :screenshot

  enum :bug_type, { feature: 0, bug: 1 }
  enum :status, { pending: 0, started: 1, completed: 2 }

  validates :status, presence: true
  validates :developer, presence: true

  def status_label
    return status.titleize unless completed?
    bug? ? "Resolved" : "Completed"
  end

  # def self.status_options_for_type(bug_type)
  #   options = { "Pending" => "pending", "Started" => "started" }

  #   if bug_type.to_s == "bug"
  #     options["Resolved"] = "completed"
  #   else
  #     options["Completed"] = "completed"
  #   end

    # options
  # end
end
