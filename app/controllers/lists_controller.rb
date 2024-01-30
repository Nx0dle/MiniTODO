# frozen_string_literal: true

class ListsController < ApplicationController
  before_action :set_group_id, only: [:edit, :update, :destroy]
  def new
    @list = List.new
    @groups = Group.all
  end

  def create
    @list = List.new(list_params)
    @list.user = current_user
    @list.save
    if @list
      redirect_to app_path
    end
  end
  def edit
  end

  def update
    if @list.update(list_params)
      redirect_to app_path
    end
  end

  def destroy
    @list.destroy
    redirect_to app_path
  end

  private

  def set_group_id
    @list = List.find(params[:id])
  end

  def list_params
    params.require(:list).permit(:group_id, :name)
  end
end
