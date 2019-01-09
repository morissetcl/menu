# frozen_string_literal: true

class DishObserver < ActiveRecord::Observer
  def after_save(dish)
    dishes_count = retrieve_dishes_count(dish)
    restaurant(dish).update(dishes_count: dishes_count)
  end

  def after_destroy(dish)
    dishes_count = retrieve_dishes_count(dish)
    restaurant(dish).update(dishes_count: dishes_count)
  end

  private

  def restaurant(dish)
    dish.restaurant_menu.restaurant
  end

  def retrieve_dishes_count(dish)
    restaurant(dish).dishes.count
  end
end
