# frozen_string_literal: true

class CommentController < ApplicationController
  skip_before_action :verify_authenticity_token
  layout false
  layout 'private'

  def create
    comment = Comment.create!(comment_params)
    render json: comment
  end

  private

  def comment_params
    params.require(:comment).permit(:body, :user_id, :restaurant_id)
  end
end
