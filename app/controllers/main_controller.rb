class MainController < ApplicationController
  skip_before_action :authenticate_user!, only: [:welcome]
  def index
    @groups = Group.all
    @lists = List.all
    @subcategories = Subcategory.all
    @tasks = Task.all
  end

  def welcome
  end
end
