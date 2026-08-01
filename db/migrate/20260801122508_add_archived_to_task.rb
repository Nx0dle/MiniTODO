class AddArchivedToTask < ActiveRecord::Migration[7.1]
  def change
    add_column :tasks, :archived, :boolean
  end
end
