# frozen_string_literal: true

class Task < ApplicationRecord
  belongs_to :subcategory
  belongs_to :user
end
