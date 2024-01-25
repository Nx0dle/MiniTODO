class MainController < ApplicationController
  skip_before_action :authenticate_user!, only: [:welcome]
  def index
    @tasks = Task.all
  end

  def welcome
  end
end
