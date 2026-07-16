Rails.application.routes.draw do
  devise_for :users

  root "home#index"

  resources :bugs, only: [:index, :new]

  resources :projects do
    resources :bugs, except: [:index, :new]
  end
end