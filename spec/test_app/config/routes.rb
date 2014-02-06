Rails.application.routes.draw do
  get "ember/index"
  mount LtiPublicResources::Engine => "/lti_public_resources"
end
