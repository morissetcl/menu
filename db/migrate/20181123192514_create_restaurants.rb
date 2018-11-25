class CreateRestaurants < ActiveRecord::Migration[5.2]
  def change
    create_table :restaurants do |t|
      t.string :name
      t.string :price_range
      t.string :slug
      t.timestamps
    end
  end
end
