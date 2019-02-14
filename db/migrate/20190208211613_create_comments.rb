class CreateComments < ActiveRecord::Migration[5.2]
  def change
    create_table :comments do |t|
      t.string :body
      t.references :user, foreign_key: { on_delete: :cascade }
      t.references :restaurant, foreign_key: { on_delete: :cascade }

      t.timestamps
    end
  end
end
