Rails.application.routes.draw do
  devise_for :users
  root "main#welcome"
  get 'app', to: 'main#index'
  resources :tasks
  resources :groups
  resources :lists
  resources :main do
    post 'toggle', on: :member
  end
end
