class CreateBugs < ActiveRecord::Migration[7.0]
  def change
    create_table :bugs do |t|
      t.string :title, null: false
      t.text :description, null: false
      t.datetime :deadline, null: false
      t.integer :bug_type, null: false, default: 0
      t.integer :status, null: false, default: 0

      t.references :project, null: false, foreign_key: true
      t.references :reporter, null: false, foreign_key: { to_table: :users }
      t.references :developer, null: false, foreign_key: { to_table: :users }

      t.timestamps
    end
  end
end