require 'ostruct'
require 'active_public_resources'
require 'ims/lti'
require 'lti_public_resources/config'
require 'lti_public_resources/lti_public_resources_config'

module LtiPublicResources
  mattr_accessor :app_root, :drivers

  def self.setup
    yield self
  end

  def self.apps
    {
      youtube: {
        name: "YouTube",
        description: "Search publicly available YouTube videos. A new icon will show up in your course rich editor letting you search YouTube and click to embed videos in your course material.",
        tool_id: "youtube",
        tool_type: "search",
        icon_path: "youtube_icon.png",
        image_url: "youtube_banner.png"
      },
      vimeo: {
        name: "Vimeo",
        description: "Vimeo is a video sharing website on which users can upload, share, and view videos. The community of Vimeo includes indie, professional, and novice filmmakers.",
        tool_id: "vimeo",
        tool_type: "search",
        icon_path: "vimeo_icon.png",
        image_url: "vimeo_banner.png"
      },
      schooltube: {
        name: "SchoolTube",
        description: "SchoolTube is a public, searchable collection of videos uploaded from schools. Videos can be inserted as links or embedded in course material.",
        tool_id: "schooltube",
        tool_type: "search",
        icon_path: "schooltube_icon.png",
        image_url: "schooltube_banner.png"
      },
      khan_academy: {
        name: "Khan Academy",
        description: "Search for and embed Khan Academy lessons and exercise into course material. Khan Academy focuses on short lessons on math, science, etc. Uses the embedded player so students earn points for watching videos.",
        tool_id: "khan_academy",
        tool_type: "browse",
        icon_path: "khan_academy_icon.png",
        image_url: "khan_academy_banner.png"
      },
      quizlet: {
        name: "Quizlet",
        description: "Search for and embed publicly available flashcards and question sets from Quizlet. Questions can be embedded directly into content as flash cards, review, or as a study game.",
        tool_id: "quizlet",
        tool_type: "search",
        icon_path: "quizlet_icon.png",
        image_url: "quizlet_banner.png"
      }
    }
  end
end

require 'lti_public_resources/engine'
