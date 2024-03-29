# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password') if Rails.env.development?


DEPARTMENTS.each do |department|
  Department.create!(zip_code: department[0], name: department[1])
end
AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password')
