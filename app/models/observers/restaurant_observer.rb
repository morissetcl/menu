class RestaurantObserver < ActiveRecord::Observer
  attr_reader :restaurant, :address

  def before_save(restaurant)
    @restaurant = restaurant
    @address = restaurant.address
    p need_to_be_update?
    return if need_to_be_update?

    fill_address_column_cleanly_justeat
  end

  private

  def fill_address_column_cleanly_justeat
    zip_code = address.last(5)
                      .strip
    city     = address.delete(zip_code)
                      .split(',')[-1]
                      .strip
    street   = address.split(',')[0]
                      .strip
    restaurant.update(zip_code: zip_code, city: city.capitalize, street: street)
  end

  def need_to_be_update?
    restaurant.zip_code_changed? ||
      restaurant.city_changed? ||
        restaurant.street_changed?
  end
end
