# frozen_string_literal: true

module TurboStreamActionsHelper
  def action_assign
    turbo_stream_action_tag :action_assign
  end
end

Turbo::Streams::TagBuilder.prepend(TurboStreamActionsHelper)