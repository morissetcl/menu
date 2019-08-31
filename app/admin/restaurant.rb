# frozen_string_literal: true

ActiveAdmin.register Restaurant do
  filter :name
  filter :source, as: :select, collection: proc { Restaurant.pluck(:source).uniq }
  filter :tags
  filter :city
  filter :zip_code
  filter :created_at

  index do
    column :name
    column :street
    column :zip_code
    column :city
    column :department
    column :source
    column :tags
    column :created_at
    actions
  end

  show do
    render partial: 'show', locals: { dishes: resource.dishes, restaurant: restaurant }
  end
end
