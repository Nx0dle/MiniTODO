class List < ApplicationRecord
  belongs_to :group
  belongs_to :user
  has_many :subcategories

  validates :name, length: {minimum: 2}, presence: true
end
