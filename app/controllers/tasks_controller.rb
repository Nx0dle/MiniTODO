# frozen_string_literal: true

class TasksController < ApplicationController
  before_action :set_task_id, only: [:edit, :update, :destroy, :show, :edit_desc, :update_desc, :update_subcategory, :toggle]

  def show
    current_user.update(current_opened_task: @task.id)
  end
  
  def new
    @task = Task.new
    @subcategories = Subcategory.all
  end

  def create
    @task = Task.new(task_params)
    @task.user = current_user
    @subcategory = @task.subcategory
    @task.save
    if @task.save
      respond_to do |format|
        format.turbo_stream
      end
    else
      redirect_to app_path, status: :unprocessable_entity
    end
  end

  def edit
    @subcategories = Subcategory.all
  end

  def update
    if @task.update(task_params)
      respond_to do |format|
        format.turbo_stream
      end
    else
      redirect_to app_path, status: :unprocessable_entity
    end
  end

  def update_subcategory
    if not @task.archived
      if @task.update(archived: true)
        @subcategory = @task.subcategory
        respond_to do |format|
          format.turbo_stream { render partial: "update_subcategory" }
        end
      else
        redirect_to app_path, status: :unprocessable_entity
      end
    else
      if @task.update(archived: false)
        @subcategory = @task.subcategory
        respond_to do |format|
          format.turbo_stream { render partial: "update_subcategory" }
        end
      else
        redirect_to app_path, status: :unprocessable_entity
      end
    end
  end

  def edit_desc
  end

  def update_desc
    if @task.update(task_description_params)
      respond_to do |format|
        format.turbo_stream
      end
    else
      redirect_to app_path, status: :unprocessable_entity
    end
  end

  def destroy
    @was_current_task = (current_user.current_opened_task == @task.id)
    @subcategory = @task.subcategory

    @task.destroy

    if @was_current_task
      current_user.update(current_opened_task: nil)
    end

    respond_to do |format|
      format.turbo_stream
    end
  end

  def toggle
    @task.update(done: !@task.done)
    head :ok
  end

  private

  def set_task_id
    @task = Task.find(params[:id])
  end

  def task_params
    params.require(:task).permit(:name, :subcategory_id, :archived)
  end

  def task_description_params
    params.require(:task).permit(:description)
  end

end
