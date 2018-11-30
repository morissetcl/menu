# frozen_string_literal: true

require 'scraps/menu_restaurant_restopolitain'
require 'scraps/restaurant_name_restopolitain'

namespace :scrap do
  desc 'scrap menu'
  task menu_restaurant_restopolitain: :environment do
    Scraps::MenuRestaurantRestopolitain.get_menu
  end

  desc 'scrap restaurant name'
  task restaurant_name_restopolitain: :environment do
    Scraps::RestaurantNameRestopolitain.get_name
  end
end
