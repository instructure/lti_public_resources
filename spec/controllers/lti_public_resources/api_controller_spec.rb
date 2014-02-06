require 'spec_helper'

module LtiPublicResources
  describe ApiController do

    describe "GET config" do
      it "public_resources" do
        get :xml_config, use_route: :lti_public_resources
        expect(response.body).to include('<blti:title>Public Resources</blti:title>')
        expect(response.body).to include('<blti:description>Collection of public resources</blti:description>')
        expect(response.body).to include('<lticm:options name="editor_button">')
        expect(response.body).to include('<lticm:options name="resource_selection">')
        expect(response.body).to include('<lticm:property name="text">Public Resources</lticm:property>')
        expect(response.body).to include('<lticm:property name="tool_id">public_resources</lticm:property>')
      end

      it "khan_academy" do
        get :xml_config, id: "khan_academy", use_route: :lti_public_resources
        expect(response.body).to include('<lticm:property name="text">Khan Academy</lticm:property>')
        expect(response.body).to include('<lticm:property name="tool_id">khan_academy</lticm:property>')
        expect(response.body).to include('<lticm:property name="icon_url">http://test.host/assets/images/khan_academy_icon.png</lticm:property>')
      end

      it "quizlet" do
        get :xml_config, id: "quizlet", use_route: :lti_public_resources
        expect(response.body).to include('<lticm:property name="text">Quizlet</lticm:property>')
        expect(response.body).to include('<lticm:property name="tool_id">quizlet</lticm:property>')
        expect(response.body).to include('<lticm:property name="icon_url">http://test.host/assets/images/quizlet_icon.png</lticm:property>')
      end

      it "youtube" do
        get :xml_config, id: "youtube", use_route: :lti_public_resources
        expect(response.body).to include('<lticm:property name="text">YouTube</lticm:property>')
        expect(response.body).to include('<lticm:property name="tool_id">youtube</lticm:property>')
        expect(response.body).to include('<lticm:property name="icon_url">http://test.host/assets/images/youtube_icon.png</lticm:property>')
      end

      it "schooltube" do
        get :xml_config, id: "schooltube", use_route: :lti_public_resources
        expect(response.body).to include('<lticm:property name="text">SchoolTube</lticm:property>')
        expect(response.body).to include('<lticm:property name="tool_id">schooltube</lticm:property>')
        expect(response.body).to include('<lticm:property name="icon_url">http://test.host/assets/images/schooltube_icon.png</lticm:property>')
      end

      it "vimeo" do
        get :xml_config, id: "vimeo", use_route: :lti_public_resources
        expect(response.body).to include('<lticm:property name="text">Vimeo</lticm:property>')
        expect(response.body).to include('<lticm:property name="tool_id">vimeo</lticm:property>')
        expect(response.body).to include('<lticm:property name="icon_url">http://test.host/assets/images/vimeo_icon.png</lticm:property>')
      end
    end

    describe "GET lti_apps" do
      it "returns apps" do
        get :lti_apps, use_route: :lti_public_resources
        json = JSON.parse(response.body)
        expect(json['lti_apps'].length).to eq(5)
      end
    end

    describe "GET lti_app", pending: true do
    end

    describe "GET search", pending: true do
    end

    describe "GET browse", pending: true do
    end

    describe "GET embed", pending: true do
    end
  end
end
