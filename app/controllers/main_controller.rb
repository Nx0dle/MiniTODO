class MainController < ApplicationController
  skip_before_action :authenticate_user!, only: [:welcome]
  def index
  end

  def welcome
  end
end
