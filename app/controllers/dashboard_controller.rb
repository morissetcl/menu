# frozen_string_literal: true

class DashboardController < ApplicationController
  layout 'private'

  def index
    popular_tags = []
    Restaurant.where(department: authorized_departments).all.map do |a|
      popular_tags << a.tags.map{|b| b.strip}
    end
    bon_array = popular_tags.flatten
    array = bon_array.each_with_object(Hash.new(0)) { |tag,counts| counts[tag] += 1 }.sort_by(&:last).last(5)
    ok = []
    array.collect do |a|
      ok << [ a[0], value: a[1]]
    end
    p ok
    @array = ok
  end

  private

  def authorized_departments
    Department.where(id: current_user.department_ids)
              .select(:name)
  end
end
