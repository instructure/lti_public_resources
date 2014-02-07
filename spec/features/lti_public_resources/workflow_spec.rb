require 'spec_helper'

describe 'Workflow', type: :request, js: true do
  it 'app should be accessible via POST' do
    visit '/lti_public_resources/test/backdoor'
    click_button('Submit')
    page.should have_css('li.media')
  end
end
