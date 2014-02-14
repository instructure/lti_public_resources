require 'spec_helper'

module LtiPublicResources
  describe EmberController do

    describe "GET launch" do
      it "should redirect with valid URL" do
        url = "https://twitter.com"
        get :launch, url: url, use_route: :lti_public_resources
        expect(response).to redirect_to(url)
      end

      it "should return a 500 with invalid URL" do
        url = "/some/relative/path"
        get :launch, url: url, use_route: :lti_public_resources
        expect(response.status).to eq(500)
      end

      it "should return a 500 with no url passed" do
        get :launch, use_route: :lti_public_resources
        expect(response.status).to eq(500)
      end
    end

  end
end
