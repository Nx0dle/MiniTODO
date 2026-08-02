class AddColumnUserHasCurrentOpenedList < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :current_opened_list, :int
  end
end
