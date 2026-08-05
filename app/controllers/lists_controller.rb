# frozen_string_literal: true

class ListsController < ApplicationController
  before_action :set_list, only: [:edit, :update, :destroy, :show]

  def show
    current_user.update(current_opened_list: @list.id)
  end

  def new
    @list = List.new
    @groups = Group.all
  end

  def create
    @list = List.new(list_params)
    @list.user = current_user
    @group = @list.group

    if @list.save
      respond_to do |format|
        format.turbo_stream
      end
    else
      redirect_to app_path, status: :unprocessable_entity
    end
  end
  
  def edit
  end

  def update
    if @list.update(list_params)
      respond_to do |format|
        format.turbo_stream
      end
    else
      redirect_to app_path, status: :unprocessable_entity
    end
  end

  def destroy
    @was_current_list = (current_user.current_opened_list == @list.id)
    task_id = current_user.current_opened_task
    @has_opened_task = if task_id.present?
      @list.subcategories.joins(:tasks).exists?(tasks: { id: task_id })
    else
      false
    end

    @list.subcategories.each do |sub|
      sub.tasks.destroy_all
    end

    @list.subcategories.destroy_all
    @list.destroy

    if @was_current_list
      current_user.update(current_opened_list: nil)
    end

    if @has_opened_task
      current_user.update(current_opened_task: nil)
    end

    respond_to do |format|
      format.turbo_stream
    end
  end

  private

  def set_list
    @list = current_user.lists.find(params[:id])
  end

  def list_params
    params.require(:list).permit(:group_id, :name)
  end
end
