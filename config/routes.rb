Rails.application.routes.draw do
  devise_for :users

  root "home#index"

  resources :projects do
    resources :bugs, only: [:show, :edit, :update, :destroy]
  end
  resources :bugs, only: [:index, :new, :create]
end