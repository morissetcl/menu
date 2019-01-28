# frozen_string_literal: true

ActiveAdmin.register SubscriptionRequest do
  permit_params :last_name, :first_name, :company, :email, :prospecting_area
end
