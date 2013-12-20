module LtiPublicResources
  class Engine < ::Rails::Engine
    isolate_namespace LtiPublicResources

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
