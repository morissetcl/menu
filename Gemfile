# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.6.0'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 5.2.1'
# Use sqlite3 as the database for Active Record
gem 'pg', '~> 0.18.4'
# Use Puma as the app server
gem 'activeadmin'
gem 'activeadmin_addons'
gem 'arctic_admin'
gem 'cancancan', '~> 2.0'
gem 'devise'
gem 'font-awesome-rails'
gem 'geocoder'
gem 'hpricot'
gem 'izitoast'
gem 'kaminari'
gem 'mini_racer', platforms: :ruby
gem 'puma', '~> 3.11'
gem 'rails-observers'
gem 'ransack', github: 'activerecord-hackery/ransack'
gem 'react-rails', git: 'https://github.com/reactjs/react-rails.git', branch: 'master'
gem 'sass-rails', '~> 5.0'
gem 'sidekiq'
gem 'sidekiq-limit_fetch'
gem 'simple_form'
gem 'uglifier', '>= 1.3.0'
gem 'webpacker'
# See https://github.com/rails/execjs#readme for more supported runtimes
gem 'jquery-rails'
gem 'mechanize'
# Use CoffeeScript for .coffee assets and views
gem 'coffee-rails', '~> 4.2'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.5'

gem 'jquery-ui-rails'
gem 'rails-jquery-autocomplete'
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 4.0'
# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use ActiveStorage variant
# gem 'mini_magick', '~> 4.8'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

# Reduces boot times through caching; required in config/boot.rb

group :development, :test do
  gem 'dotenv-rails'
  gem 'listen'
  gem 'pry-byebug'
  gem 'pry-rails'
  gem 'rails-controller-testing' # If you are using Rails 5.x
  gem 'rspec-rails', '~> 3.7'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

group :development do
  gem 'better_errors'
  gem 'binding_of_caller'
  gem 'guard-rspec', require: false
  gem 'guard-rubocop'
  gem 'rb-readline'
  gem 'rubocop', '~> 0.75.0', require: false
  gem 'web-console', '>= 3.3.0'
end

group :test do
  gem 'capybara'
  gem 'database_cleaner'
  gem 'factory_bot_rails'
  gem 'launchy'
  gem 'mocha'
  gem 'selenium-webdriver'
  gem 'shoulda-matchers', '~> 3.0'
  gem 'webmock'
  # Easy installation and use of chromedriver to run system tests with Chrome
  gem 'chromedriver-helper'
  gem 'rspec-sidekiq'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]
