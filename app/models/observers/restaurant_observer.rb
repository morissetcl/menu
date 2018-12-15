class RestaurantObserver < ActiveRecord::Observer
  attr_reader :restaurant, :address, :source

  def after_create(restaurant)
    @restaurant = restaurant
    @source = restaurant.source
    @address = restaurant.address
    return if need_to_be_update?
    return if restaurant.address.nil?
    fill_address_column_cleanly
  end

  private

  def retrieve_city(zip_code)
    return address.delete(zip_code).split(',')[-1].strip if source == 'justeat'
    return address.delete(zip_code).split(',')[1].strip if source == 'deliveroo'
    return ''
  end

  def fill_address_column_cleanly
    zip_code = address.last(5).strip
    city = retrieve_city(zip_code).capitalize
    street   = address.split(',')[0].strip
    restaurant.update(zip_code: zip_code, city: city, street: street)
  end

  def need_to_be_update?
    restaurant.zip_code_changed? ||
      restaurant.city_changed? ||
        restaurant.street_changed?
  end
end
