module LtiPublicResources
  class ApplicationController < ActionController::Base
    before_action :set_default_headers
    before_filter :cors_preflight_check
    after_filter :cors_set_access_control_headers

    def ga_tracking_code
      LtiPublicResources.ga_tracking_code || ""
    end
    helper_method :ga_tracking_code

    def ga_domain
      LtiPublicResources.ga_domain || ""
    end
    helper_method :ga_domain

    def set_default_headers
      response.headers['X-Frame-Options'] = 'ALLOWALL'
    end

    # For all responses in this controller, return the CORS access control headers.
    def cors_set_access_control_headers
      headers['Access-Control-Allow-Origin'] = '*'
      headers['Access-Control-Allow-Methods'] = 'POST, PUT, DELETE, GET, OPTIONS'
      headers['Access-Control-Request-Method'] = '*'
      headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
      headers['Access-Control-Max-Age'] = "1728000"
    end

    # If this is a preflight OPTIONS request, then short-circuit the
    # request, return only the necessary headers and return an empty
    # text/plain.
    def cors_preflight_check
      if request.method == :options
        headers['Access-Control-Allow-Origin'] = '*'
        headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS'
        headers['Access-Control-Allow-Headers'] = '*'
        headers['Access-Control-Max-Age'] = '1728000'
        render :text => '', :content_type => 'text/plain'
      end
    end
  end
end
