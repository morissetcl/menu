class ChangeColumnTagsType < ActiveRecord::Migration[5.2]
  def change
    remove_column :restaurants, :tags
    add_column :restaurants, :tags, :text, array: true, default: []
  end
end
