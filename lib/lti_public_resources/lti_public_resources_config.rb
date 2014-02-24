module LtiPublicResources
  module LtiPublicResourcesConfig
    def self.load_config
      YAML::load(File.open(config_file))
    end

    def self.config_file
      LtiPublicResources.app_root.join('config/lti_public_resources_config.yml')
    end

    def self.setup!
      if File.exists?(config_file)
        Rails.logger.info "Initializing using #{config_file}"
        settings = load_config.deep_symbolize_keys
        LtiPublicResources.ga_tracking_code = settings[:analytics][:code] || ""
        LtiPublicResources.ga_domain = settings[:analytics][:domain] || ""
        LtiPublicResources.drivers = {
          youtube:      APR::Drivers::Youtube.new,
          vimeo:        APR::Drivers::Vimeo.new(settings[:vimeo]),
          schooltube:   APR::Drivers::Schooltube.new,
          khan_academy: APR::Drivers::KhanAcademy.new,
          quizlet:      APR::Drivers::Quizlet.new(settings[:quizlet])
        }
      else
        raise "Warning: missing config file #{config_file}."
      end
    end
  end
end
