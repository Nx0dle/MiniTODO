# frozen_string_literal: true

class TasksController < ApplicationController
  before_action :set_task_id, only: [:edit, :update, :destroy, :show, :edit_desc, :update_desc]

  def show
  end
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

  def edit
    @subcategories = Subcategory.all
  end

  def update
    if @task.update(task_params)
      redirect_to app_path
    end
  end

  def edit_desc
  end

  def update_desc
    if @task.update(task_params)
      redirect_to app_path
    end
  end

  def destroy
    @task.destroy
    redirect_to app_path
  end

  private

  def set_task_id
    @task = Task.find(params[:id])
  end

  def task_params
    params.require(:task).permit(:name, :description, :subcategory_id)
  end

end
