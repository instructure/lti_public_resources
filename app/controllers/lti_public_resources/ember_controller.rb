require_dependency "lti_public_resources/application_controller"

module LtiPublicResources
  class EmberController < ApplicationController
    def app
      @full_path = request.env['SCRIPT_NAME']
      @env = {
        'CONFIG' => {
          host: @full_path,
          imagePath: '/assets/lti_public_resources'
        },
        'TOOL_ID' => params[:tool_id] || '',
        'LAUNCH_PARAMS' => params.reject!{ |k,v| ['controller','action'].include? k },
        'RETURN_TYPES' => params['ext_content_return_types'].present? ? params['ext_content_return_types'].split(',') : []
      }
      render layout: false
    end

    def launch
      @url = params[:url]
      @remote_id = params[:remote_id]
      @driver = params[:driver]

      render partial: @driver, layout: false
    end

    def health_check
      ok = LtiPublicResources.drivers.length == 5
      head 200 if ok
      head 500 unless ok
    end
  end
end
