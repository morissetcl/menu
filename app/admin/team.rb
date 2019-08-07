# frozen_string_literal: true

ActiveAdmin.register Team do
  permit_params :name, :user_id

  show do
    table_for users_team do
      column :email do |a|
        auto_link(a)
      end
      column :role
      column :department do |user|
        departments(user)
      end
    end
  end

  form do |f|
    f.inputs do
      f.input :name
      f.input :user, as: :select, collection: User.where(role: 'manager').pluck(:email, :id)
    end
    f.actions
  end

  controller do
    helper_method :users_team, :departments

    def users_team
      User.where(team: resource)
    end

    def departments(user)
      Department.where(id: user.department_ids)
                .pluck(:name)
                .join(', ')
    end
  end
end
