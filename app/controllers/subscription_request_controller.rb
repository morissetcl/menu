# frozen_string_literal: true

class SubscriptionRequestController < ApplicationController
  def create
    @subscription_request = SubscriptionRequest.create(subscription_request_params)
    if @subscription_request.save
      redirect_to root_path, notice: 'Merci, nous vous recontactons rapidement'
    else
      redirect_to new_user_session_path, alert: 'oups'
    end
  end

  private

  def subscription_request_params
    params.require(:subscription_request).permit(:last_name, :first_name, :company, :email, :prospecting_area)
  end
end
