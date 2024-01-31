# frozen_string_literal: true

class SubcategoriesController < ApplicationController
  before_action :set_sub_id, only: [:edit, :update, :destroy]
  def new
    @subcategory = Subcategory.new
    @lists = List.all
  end

  def create
    @subcategory = Subcategory.new(sub_params)
    @subcategory.user = current_user
    @subcategory.save
    if @subcategory
      redirect_to app_path
    end
  end
  def edit
  end

  def update
    if @subcategory.update(sub_params)
      redirect_to app_path
    end
  end

  def destroy
    @subcategory.tasks.destroy_all
    @subcategory.destroy
    redirect_to app_path
  end

  private

  def set_sub_id
    @subcategory = Subcategory.find(params[:id])
  end

  def sub_params
    params.require(:subcategory).permit(:list_id, :name)
  end
end
