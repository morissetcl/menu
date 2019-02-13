# frozen_string_literal: true

class CommentsController < ApplicationController
  skip_before_action :verify_authenticity_token
  layout false
  layout 'private'

  def index
    comments = Comment.order(created_at: :desc)
                      .where(user_id: params[:user_id], restaurant_id: params[:restaurant_id])
    render json: comments
  end

  def create
    comment = Comment.create!(comment_params)
    render json: comment
  end

  private

  def comment_params
    params.require(:comment).permit(:body, :user_id, :restaurant_id)
  end
end
