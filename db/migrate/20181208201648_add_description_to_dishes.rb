class AddDescriptionToDishes < ActiveRecord::Migration[5.2]
  def change
    add_column :dishes, :price, :float
    add_column :dishes, :description, :text
  end
end
