class Subcategory < ApplicationRecord
  belongs_to :list
  has_many :tasks
end
