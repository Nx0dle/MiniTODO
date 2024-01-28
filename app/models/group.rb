class Group < ApplicationRecord
  has_many :lists
  belongs_to :user
end
