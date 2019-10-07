# frozen_string_literal: true

class DashboardController < ApplicationController
  layout 'private'

  def index
    @famous_tags = collect_6_famous_tags
    @restaurant_counter = restaurants.count
    @dish_counter = Dish.where(restaurant_id: restaurants.ids).count
    @last_three_restaurant = restaurants.last(3)
  end

  private

  def collect_6_famous_tags
    bon_array = collect_restaurants_tags.flatten
    array = bon_array.each_with_object(Hash.new(0)) { |tag, counts| counts[tag] += 1 }.sort_by(&:last).last(6)
    array.map do |a|
      [a[0], value: a[1]]
    end
  end

  def collect_restaurants_tags
    popular_tags = []
    restaurants.all.select do |a|
      popular_tags << a.tags.select(&:strip)
    end
    popular_tags
  end

  def restaurants
    Restaurant.where(department: authorized_departments)
  end

  def authorized_departments
    user = User.find params[:user_id]
    p user.department_ids
    Department.where(id: user.department_ids)
              .select(:name)
  end
end
