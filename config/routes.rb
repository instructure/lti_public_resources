LtiPublicResources::Engine.routes.draw do
  root "ember#app"

  get  'api/lti_apps' => 'api#lti_apps'
  get  'api/lti_apps/:id' => 'api#lti_app'
  post 'api/search' => 'api#search'
  post 'api/browse' => 'api#browse'
  post 'api/embed' => 'api#embed'
  get  'config.xml' => 'api#config'
end
