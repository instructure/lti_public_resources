$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "lti_public_resources/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "lti_public_resources"
  s.version     = LtiPublicResources::VERSION
  s.authors     = ["Eric Berry", "Brad Humphrey"]
  s.email       = ["cavneb@gmail.com", "wbhumphrey@gmail.com"]
  s.homepage    = "https://github.com/instructure/lti_public_resources"
  s.summary     = "Public Resources LTI app"
  s.description = "Public Resources LTI app"

  s.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.rdoc"]
  s.test_files = Dir["spec/**/*"]

  s.add_dependency "rails", "~> 4.0.2"
  s.add_dependency "active_public_resources", "~> 0.1.3"
  s.add_dependency "ims-lti"

  s.add_development_dependency "sqlite3"
  s.add_development_dependency 'rspec-rails'
  s.add_development_dependency 'capybara'
  s.add_development_dependency 'poltergeist'
end
