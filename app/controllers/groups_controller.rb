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
      redirect_to app_path
    end
  end
  def edit
  end

  def update
    if @group.update(group_params)
      redirect_to app_path
    end
  end

  def destroy
    @group.destroy
    redirect_to app_path
  end

  private

  def set_group_id
    @group = Group.find(params[:id])
  end

  def group_params
    params.require(:group).permit(:name)
  end
end
