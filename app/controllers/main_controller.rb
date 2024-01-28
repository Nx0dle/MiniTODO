class MainController < ApplicationController
  skip_before_action :authenticate_user!, only: [:welcome]
  before_action :verify_authenticity_token, except: [:toggle]
  def index
    @groups = current_user.groups
    @lists = current_user.lists
    @subcategories = current_user.subcategories
    @tasks = current_user.tasks
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
