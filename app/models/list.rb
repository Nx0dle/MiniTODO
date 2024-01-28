class List < ApplicationRecord
  belongs_to :group
  belongs_to :user
  has_many :subcategories
end
