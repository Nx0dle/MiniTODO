class Subcategory < ApplicationRecord
  belongs_to :list
  belongs_to :user
  has_many :tasks

  validates :name, length: {minimum: 2}, presence: true
end
