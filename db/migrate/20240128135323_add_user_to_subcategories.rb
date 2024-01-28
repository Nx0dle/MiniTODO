class AddUserToSubcategories < ActiveRecord::Migration[7.1]
  def change
    add_reference :subcategories, :user, null: true, foreign_key: true
  end
end
