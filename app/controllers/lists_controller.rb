# frozen_string_literal: true

class ListsController < ApplicationController
  before_action :set_list_id, only: [:edit, :update, :destroy, :show]

  def show
  end

  def new
    @list = List.new
    @groups = Group.all
  end

  def create
    @list = List.new(list_params)
    @list.user = current_user
    @group = @list.group
      @list.save
    if @list
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
    @list.subcategories.each do |sub|
      sub.tasks.destroy_all
    end
    @list.subcategories.destroy_all
    @list.destroy
    respond_to do |format|
      format.turbo_stream
    end
  end

  private

  def set_list_id
    @list = List.find(params[:id])
  end

  def list_params
    params.require(:list).permit(:group_id, :name)
  end
end
