Rails.application.routes.draw do
  devise_for :users
  root 'groups#index'
  resource :user, only: [:edit, :update] do
    collection do
      get 'search'
    end
  end
  resources :groups, only: [:new, :create, :edit, :update,] do
    resources :messages, only: [:index, :create]
  end
end
