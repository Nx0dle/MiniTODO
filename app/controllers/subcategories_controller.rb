# frozen_string_literal: true

class SubcategoriesController < ApplicationController
  before_action :set_sub, only: [:edit, :update, :destroy]
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
    @has_opened_task = @subcategory.tasks.exists?(id: current_user.current_opened_task)

    @subcategory.tasks.destroy_all
    @subcategory.destroy

    if @has_opened_task
      current_user.update(current_opened_task: nil)
    end

    respond_to do |format|
      format.turbo_stream
    end
  end

  private

  def set_sub
    @subcategory = current_user.subcategories.find(params[:id])
  end

  def sub_params
    params.require(:subcategory).permit(:list_id, :name)
  end
end
