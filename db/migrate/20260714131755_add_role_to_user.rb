class AddRoleToUser < ActiveRecord::Migration[8.1]
  def change
        add_column :users, :role, :integer
  end
end
