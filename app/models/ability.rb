# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(current_user)
    current_user ||= User.new
    can :manage, Dashboard, user_id: current_user.id
  end
end
