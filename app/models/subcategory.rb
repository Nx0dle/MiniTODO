class Subcategory < ApplicationRecord
  belongs_to :list
  belongs_to :user
  has_many :tasks
end
