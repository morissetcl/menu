Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  devise_for :users
  require 'sidekiq/web'
  Sidekiq::Web.use Rack::Auth::Basic do |username, password|
    ActiveSupport::SecurityUtils.secure_compare(username, 'sidekiq') &
        ActiveSupport::SecurityUtils.secure_compare(password, ENV['SIDEKIQ_PASSWORD'])
  end
  mount Sidekiq::Web, at: "/sidekiq"
end
