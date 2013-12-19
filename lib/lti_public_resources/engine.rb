module LtiPublicResources
  class Engine < ::Rails::Engine
    isolate_namespace LtiPublicResources

    initializer "static assets" do |app|
      # Order of middleware is important: http://stackoverflow.com/questions/4266232/rails-3-engine-static-assets
      app.middleware.insert_before ::ActionDispatch::Static, ::ActionDispatch::Static, "#{root}/public"
    end

    initializer "lti_public_resources.load_app_instance_data" do |app|
      LtiPublicResources.setup do |config|
        config.app_root = app.root
      end
    end

    initializer "lti_public_resources.lti_public_resources_config" do |app|
      LtiPublicResources::LtiPublicResourcesConfig.setup!
    end
  end
end
