class List < ApplicationRecord
  belongs_to :group
  has_many :subcategories
end
