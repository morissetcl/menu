require "selenium-webdriver"

driver = Selenium::WebDriver.for :firefox
driver.navigate.to "https://www.thefork.com/search?cityId=415144"
# Close cookie modal
class_name = driver.find_element(class: "evidon-banner-declinebutton")
class_name.click
# Collect restaurant links
results = driver.find_element(:xpath, "//div[@data-test = 'result-list-restaurants']")
restaurant_links = results.find_elements(tag_name: 'a').map do |result|
  result.attribute("href")
end
# Get max pagination
paginations = driver.find_element(:xpath, "//nav[@data-test = 'pagination-page-list']")
pagintation_li_tags = paginations.find_elements(tag_name: "li")
pagintation_li_tags.map do |li|
 li.text
end.reject(&:empty?).last.to_i
driver.quit
# TODO: iterate over a range [2..167] to get all restaurant links


# Get restaurant menu
driver = Selenium::WebDriver.for :firefox
driver.navigate.to "https://www.thefork.com/restaurant/armonia-r502985/menu"

# Collect restaurant dishes
dish_sections = driver.find_elements(:xpath, "//dl[@role = 'presentation']")
dish_sections.each do |dish_section|
  dish_elements = dish_section.find_elements(:css,"dl > div")
  dish_elements.map do |dish|
    # Dish name
    dish.find_element(tag_name: 'dt').text
    # Dish price
    dish.find_element(tag_name: 'span').text
    # Dish description
    dish.find_elements(:tag_name, "dd").last.text
  end
end
driver.quit
