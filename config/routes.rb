Rails.application.routes.draw do
  devise_for :users
  root "main#welcome"
  get 'app', to: 'main#index'
end
