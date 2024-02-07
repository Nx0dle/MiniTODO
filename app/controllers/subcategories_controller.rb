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
    @list = @subcategory.list
    @subcategory.save
    if @subcategory
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
    if @subcategory.update(sub_params)
      respond_to do |format|
        format.turbo_stream
      end
    else
      redirect_to app_path, status: :unprocessable_entity
    end
  end

  def destroy
    @subcategory.tasks.destroy_all
    @subcategory.destroy
    respond_to do |format|
      format.turbo_stream
    end
  end

  private

  def set_sub_id
    @subcategory = Subcategory.find(params[:id])
  end

  def sub_params
    params.require(:subcategory).permit(:list_id, :name)
  end
end
