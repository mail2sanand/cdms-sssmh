class HomeController < ApplicationController
  before_action :authenticate_user!
  def index

  end

  def signout
    destroy_user_session_path(current_user)
  end
end
