ActionController::Routing::Routes.draw do |map|
  map.resources :articles
  

  map.resources :discussions


  map.resources :topics
  map.resources :remarks

  map.logout '/logout', :controller => 'sessions', :action => 'destroy'
  map.login '/login', :controller => 'sessions', :action => 'new'
  map.register '/register', :controller => 'users', :action => 'create'
  map.signup '/signup', :controller => 'users', :action => 'new'

  map.resources :sections

  map.resources :slots, :has_many => :remarks
  
  map.resources :slots do |slots|
    slots.resources :remarks
  end
  
  ## map.resources :slots, :member => { :remark => :put }
  map.resources :articles, :has_many => [ :remarks ]

  map.resource :sessions
  map.resources :users do |user|
    # UserAssetsController knows how to deal with the 
    # polymorphic relationship between an Asset and its
    # 'attachable'.  
    # We use the resource_fu :opaque_name option so that the
    # url looks clean independent of url helper and route names.
    ##user.resources :user_assets, :opaque_name => :assets
    user.resources :user_assets, :opaque_name => :assets
  end
  ## map.resources :users,    :has_many   => [:assets]
  map.connect ':controller/service.wsdl', :action => 'wsdl'
  map.connect '', :controller => 'users'

  # Install the default route as the lowest priority.
  ## map.connect ':controller/:action/:id.:format'
  #map.connect ':controller/:action/:id'
end
