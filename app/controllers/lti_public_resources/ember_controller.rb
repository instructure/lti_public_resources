require_dependency "lti_public_resources/application_controller"
require 'net/http'
require 'pry'

module LtiPublicResources
  class EmberController < ApplicationController
    def app
      @full_path = request.env['SCRIPT_NAME']
      @env = { 
        'CONFIG' => { 
          host: @full_path,
          imagePath: '/lti_public_resources/assets/images'
        },
        'TOOL_ID' => params[:tool_id] || '',
        'LAUNCH_PARAMS' => params.reject!{ |k,v| ['controller','action'].include? k }
      }
      render layout: false
    end

    def health_check
      ok = LtiPublicResources.drivers.length == 5
      head 200 if ok
      head 500 unless ok
    end
  end
end
