class User < ApplicationRecord
  has_many :projects, dependent: :destroy
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable



  enum :role, {
    manager: 0,
    qa: 1,
    developer: 2
  }       
end
