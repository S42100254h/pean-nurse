require_relative "boot"

require "rails"
# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "active_storage/engine"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_mailbox/engine"
require "action_text/engine"
require "action_view/railtie"
require "action_cable/engine"
require "sprockets/railtie"
# require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

Dotenv::Railtie.load

module NurseStep
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.1

    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins ENV["API_DOMAIN"] || ""

        resource "*",
                 headers: :any,
                 methods: [:get, :post, :put, :patch, :delete],
                 expose: ["access-token", "uid", "client"],
                 credentials: true
      end
    end
    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")

    # Don't generate system test files.
    config.generators.system_tests = nil

    config.generators do |g|
      g.template_engine false
      g.javascripts false
      g.stylesheets false
      g.helper false
      g.test_framework :rspec,
                       view_specs: false,
                       routing_specs: false,
                       helper_specs: false,
                       controller_specs: false,
                       request_spec: true
    end

    config.middleware.use ActionDispatch::Flash
    config.api_only = true
    config.time_zone = "Tokyo"
    config.active_record.default_timezone = :local
  end
end
