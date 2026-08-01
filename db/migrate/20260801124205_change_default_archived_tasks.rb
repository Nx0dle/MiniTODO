class ChangeDefaultArchivedTasks < ActiveRecord::Migration[7.1]
  def change
    change_column_default :tasks, :archived, from: nil, to: false
  end
end
