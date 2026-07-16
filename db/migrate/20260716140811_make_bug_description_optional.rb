class MakeBugDescriptionOptional < ActiveRecord::Migration[8.1]
  def change
      change_column_null :bugs, :description, true
  end
end
