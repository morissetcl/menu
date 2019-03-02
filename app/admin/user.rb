# frozen_string_literal: true

ActiveAdmin.register User do
  permit_params :email, :password, :password_confirmation, department_ids: [], work_areas_attributes: %i[id department_id user_id _destroy]

  index do
    selectable_column
    id_column
    column :email
    column :current_sign_in_at
    column :sign_in_count
    column :created_at
    actions
  end

  show do
    attributes_table do
      row :email
      row :department do |user|
        departments(user)
      end
      row :created_at
    end
  end

  form partial: 'form'

  controller do
    helper_method :departments

    def departments(user)
      Department.where(id: user.department_ids)
                .pluck(:name)
                .join(', ')
    end

    def update_resource(interlocuteur, attributes)
      if attributes.first[:password].present?
        interlocuteur.update_attributes(*attributes)
      else
        interlocuteur.update_without_password(*attributes)
      end
    end
  end
end
