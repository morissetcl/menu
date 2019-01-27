class CreateDishes < ActiveRecord::Migration[5.2]
  def change
    create_table :dishes do |t|
      t.string :title
      t.references :restaurant_menu, index: true, foreign_key: { on_delete: :cascade }

      t.timestamps
    end
  end
end
