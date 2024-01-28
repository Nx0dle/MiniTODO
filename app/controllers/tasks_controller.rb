# frozen_string_literal: true

class TasksController < ApplicationController
  def new
    @task = Task.new
    @subcategories = Subcategory.all
  end

  def create
    @task = Task.new(task_params)
    @task.user = current_user
    @task.save
    if @task.save
      redirect_to app_path
    end
  end

  private

  def set_task_id
    @task = Task.find(params[:id])
  end

  def task_params
    params.require(:task).permit(:name, :subcategory_id)
  end

end
