# frozen_string_literal: true

class GroupsController < ApplicationController
  before_action :set_group_id, only: [:edit, :update, :destroy]
  def new
    @group = Group.new
  end

  def create
    @group = Group.new(group_params)
    @group.user = current_user
    @group.save
    if @group.save
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
    if @group.update(group_params)
      respond_to do |format|
        format.turbo_stream
      end
    else
      redirect_to app_path, status: :unprocessable_entity
    end
  end

  def destroy
    @has_opened_list = @group.lists.exists?(id: current_user.current_opened_list)
    task_id = current_user.current_opened_task
    @has_opened_task = if task_id.present?
      @group.lists.joins(subcategories: :tasks).exists?(tasks: { id: task_id })
    else
      false
    end

    @group.lists.each do |list|
      subcategories = list.subcategories
      subcategories.each do |sub|
        sub.tasks.destroy_all
      end
      list.subcategories.destroy_all
    end

    @group.lists.destroy_all
    @group.destroy

    if @has_opened_list
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

  def set_group_id
    @group = Group.find(params[:id])
  end

  def group_params
    params.require(:group).permit(:name)
  end
end
