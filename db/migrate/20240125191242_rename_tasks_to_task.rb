class RenameTasksToTask < ActiveRecord::Migration[7.1]
  def change
    rename_table :tasks, :task
  end
end
