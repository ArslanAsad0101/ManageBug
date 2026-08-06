class Project < ApplicationRecord
  belongs_to :manager, class_name: "User"
  has_many :project_users, dependent: :destroy
  has_many :assigned_users, through: :project_users, source: :user
  has_many :bugs, dependent: :destroy
  has_one_attached :image

  validates :name, presence: true
  validates :description, presence: true
  validates :image, presence: true
  validate :acceptable_image


  private

  def acceptable_image
    return unless image.attached?

    unless image.content_type.in?(%w[image/png image/jpeg])
      errors.add(:image, "must be a PNG or JPEG image")
    end
  end
end