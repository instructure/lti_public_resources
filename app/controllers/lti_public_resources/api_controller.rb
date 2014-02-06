require_dependency "lti_public_resources/application_controller"

module LtiPublicResources
  class ApiController < ApplicationController
    before_action :load_apps

    def lti_apps
      render json: { lti_apps: @apps }
    end

    def lti_app
      tool_id = params[:id].to_sym
      lti_app = @apps[tool_id]
      render json: { lti_app: lti_app }
    end

    def search
      tool_id = params[:tool_id].to_sym
      lti_app = @apps[tool_id]
      driver  = LtiPublicResources.drivers[tool_id]

      case lti_app[:tool_type]
      when 'search'
        q = {
          query: params[:query],
          page: (params[:page] ? params[:page].to_i : 1),
          content_filter: APR::RequestCriteria::CONTENT_FILTER_NONE,
          sort: APR::RequestCriteria::SORT_RELEVANCE
        }
        puts q.inspect
        criteria = APR::RequestCriteria.new(q)
      when 'browse'
        criteria = APR::RequestCriteria.new(folder: params[:folder])
      else
        raise StandardError.new("Unknown tool type!")
      end

      results = driver.perform_request(criteria)
      render json: { driver_response: results }
    end

    def browse
      tool_id  = params[:tool_id].to_sym
      lti_app  = @apps[tool_id]
      driver   = LtiPublicResources.drivers[tool_id]
      folder   = params[:folder]
      criteria = APR::RequestCriteria.new(folder: folder)
      results  = driver.perform_request(criteria)
      render json: { driver_response: results }
    end

    def embed
      tp = tool_provider(params)
      return_type = params[:return_type]
      redirect_url = build_url(tp, return_type)
      ret = return_type.to_json
      if redirect_url.present?
        ret = { redirectUrl: redirect_url }.to_json
      end
      render json: ret
    end

    def config
      host = request.scheme + "://" + request.host_with_port + request.env['SCRIPT_NAME']
      tool_id = 'public_resources'

      if params[:id]
        tool_id  = params[:id]
        lti_app  = @apps[tool_id.to_sym]
        name = lti_app[:name]
        description = lti_app[:description]
        icon = "#{host}/assets/images/#{lti_app[:icon_path]}"
        text = lti_app[:name]
        url = host + "/?tool_id=" + tool_id
      else
        name = "Public Resources"
        description = "Collection of public resources"
        icon = "#{host}/assets/images/public_resources_icon.png"
        text = "Public Resources"
        url = host
      end

      tc = IMS::LTI::ToolConfig.new(:title => name, :launch_url => url)
      tc.description = description
      tc.extend IMS::LTI::Extensions::Canvas::ToolConfig
      tc.canvas_privacy_anonymous!
      tc.canvas_domain! request.host_with_port tc.canvas_text! text
      tc.canvas_icon_url! icon
      tc.canvas_selector_dimensions! 560, 600
      tc.canvas_editor_button!
      tc.canvas_resource_selection!
      tc.set_extension_param 'canvas.instructure.com', 'tool_id', tool_id

      render xml: tc.to_xml(:indent => 2)
    end

    private

    def load_apps
      @apps = LtiPublicResources.apps
    end

    def tool_provider(params)
      tp = IMS::LTI::ToolProvider.new(nil, nil, params[:launch_params] || params)
      tp.extend IMS::LTI::Extensions::Content::ToolProvider
      tp
    end
    
    def build_url(tp, return_type)
      if tp.accepts_content?
        case return_type['return_type']
          when 'iframe'
            redirect_url = tp.iframe_content_return_url(return_type['url'], return_type['width'], return_type['height'], return_type['title'])
          when 'url'
            redirect_url = tp.url_content_return_url(return_type['url'], return_type['title'])
          when 'lti_launch'
            redirect_url = tp.lti_launch_content_return_url(return_type['url'], return_type['title'], return_type['title'])
        end
        return redirect_url
      end
    end

  end
end
