require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module CdmsHealthPortal
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.1

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Adding custom Assets folder
    config.assets.enabled = true

    config.public_file_server.enabled = true

    # For Loading all the js and css files for Header
    #config.assets.paths << Rails.root.join("app","assets","header")

    # For Loading all the js and css files for jsGrid Functioality
    config.assets.paths << Rails.root.join("app","assets","jsGrid")
    config.assets.paths << Rails.root.join("app","assets","jquery-ui-1.11.4")

    config.assets.paths << Rails.root.join("patientPhotos")
  end
end
