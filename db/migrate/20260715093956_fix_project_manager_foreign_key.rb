class FixProjectManagerForeignKey < ActiveRecord::Migration[8.1]
  def change
    remove_foreign_key :projects, :managers
    add_foreign_key :projects, :users, column: :manager_id
  end
end
