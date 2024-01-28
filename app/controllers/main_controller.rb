class MainController < ApplicationController
  skip_before_action :authenticate_user!, only: [:welcome]
  before_action :verify_authenticity_token, except: [:toggle]
  def index
    @groups = Group.all
    @lists = List.all
    @subcategories = Subcategory.all
    @tasks = Task.all
  end

  def welcome
  end

  def toggle
    @task = Task.find(params[:id])
    @task.update(done: !@task.done)
    @task.save
    head :ok
  end
end
