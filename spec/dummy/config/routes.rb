Rails.application.routes.draw do
  get "ember/index"
  mount LtiPublicResources::Engine => "/public_resources"
end
