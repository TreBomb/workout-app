class SessionsController < ApplicationController
  def create
    user = User.find_by(email: params[:email])
    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      render json: user, status: :ok
    else
      render json: { error: 'invalid credentials' }, status: :unauthorized
    end
  end

  def destroy
    session.delete :user_id
    render json: {message: "session deleted!"}, status: :ok
  end
end