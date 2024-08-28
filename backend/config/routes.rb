Rails.application.routes.draw do
  devise_for :users, controllers: { sessions: 'users/sessions' }
  
  # Other routes...
  get "up" => "rails/health#show", as: :rails_health_check
end