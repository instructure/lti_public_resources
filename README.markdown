# Lti Public Resources

[![Build Status](https://travis-ci.org/instructure/lti_public_resources.png)](https://travis-ci.org/instructure/lti_public_resources)
[![Code Climate](https://codeclimate.com/github/instructure/lti_public_resources.png)](https://codeclimate.com/github/instructure/lti_public_resources)
[![Gem Version](https://badge.fury.io/rb/lti_public_resources.png)](http://badge.fury.io/rb/lti_public_resources)

LTI Public Resources is an LTI App wrapped in a mountable Rails engine.

## Installation

Add this line to your application's Gemfile:

    gem 'lti_public_resources'

And then execute:

    $ bundle

Or install it yourself as:

    $ gem install active_public_resources

To mount the engine into your Rails application, add the following route to your `routes.rb` file:

   mount LtiPublicResources::Engine, at: "/public_resources"

## Testing

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
