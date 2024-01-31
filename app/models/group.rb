class Group < ApplicationRecord
  has_many :lists
  belongs_to :user

  validates :name, length: {minimum: 2}, presence: true
end
