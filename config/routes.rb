Rails.application.routes.draw do
  devise_for :users
  root "main#welcome"
  get 'app', to: 'main#index'
  resources :tasks do
    get 'edit_desc', to: 'tasks#edit_desc', on: :member
    post 'edit_desc', to: 'tasks#update_desc', on: :member
  end
  resources :groups
  resources :lists
  resources :subcategories
  resources :main do
    post 'toggle', on: :member
  end
end
