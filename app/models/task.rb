# frozen_string_literal: true

class Task < ApplicationRecord
  belongs_to :subcategory
  belongs_to :user

  validates :name, length: {minimum: 2}, presence: true

  scope :active, -> { where(archived: false) }
  scope :archived, -> { where(archived: true) }
end
