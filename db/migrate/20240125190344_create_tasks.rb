class CreateTasks < ActiveRecord::Migration[7.1]
  def change
    create_table :tasks do |t|
      t.references :subcategory, null: false, foreign_key: true
      t.string :name
      t.string :description
      t.boolean :done, default: false
      t.timestamps
    end
  end
end
