class CreateRestaurantMenus < ActiveRecord::Migration[5.2]
  def change
    create_table :restaurant_menus do |t|
      t.references :restaurant, index: true, foreign_key: { on_delete: :cascade }

      t.timestamps
    end
  end
end
