Rails.application.routes.draw do
  devise_for :users

  root "home#index"

  resources :bugs, only: [:index, :new, :show, :edit, :update]

  resources :projects do
    resources :bugs, except: [:index, :new] 
  end
end