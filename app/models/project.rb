class Project < ApplicationRecord
  attr_accessor :qa_user_ids, :developer_user_ids

  belongs_to :manager, class_name: "User"
  has_many :project_users, dependent: :destroy
  has_many :assigned_users, through: :project_users, source: :user
  has_many :bugs, dependent: :destroy
  has_one_attached :image

  validates :name, :description, :image, presence: true
  validate :require_at_least_one_user
  validate :image_type

  private

  def require_at_least_one_user
    qa_ids = Array(qa_user_ids).reject(&:blank?)
    developer_ids = Array(developer_user_ids).reject(&:blank?)

    return if qa_ids.any? || developer_ids.any?

    errors.add(:base, "Select at least one QA or Developer")
  end

  def image_type
    return unless image.attached?
    return if image.content_type.in?(%w[image/png image/jpeg])

    errors.add(:image, "must be a PNG or JPEG image")
  end
end
