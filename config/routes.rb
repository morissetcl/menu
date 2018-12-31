Rails.application.routes.draw do

  # sidekiq monitoring
  require 'sidekiq/web'
  Sidekiq::Web.use Rack::Auth::Basic do |username, password|
    ActiveSupport::SecurityUtils.secure_compare(username, 'sidekiq') &
        ActiveSupport::SecurityUtils.secure_compare(password, ENV['SIDEKIQ_PASSWORD'])
  end
  mount Sidekiq::Web, at: "/sidekiq"

  # back-offices
  ActiveAdmin.routes(self)

  # authentication
  devise_for :admin_users, ActiveAdmin::Devise.config
  devise_for :users

  # public-routes
  root to: 'home#show'
  resources :user, path: 'private', except: [:index] do
    resources :dashboard, only: [:index] do
      collection do
        get '/restaurant/:id', to: "restaurant#show"
      end
      collection do
        get :recherche
      end
    end
  end
end
