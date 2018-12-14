class AddTagsToRestaurants < ActiveRecord::Migration[5.2]
  def change
    add_column :restaurants, :tags, :string
  end
end
