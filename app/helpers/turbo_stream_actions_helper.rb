# frozen_string_literal: true

module TurboStreamActionsHelper
  def action_assign
    turbo_stream_action_tag :action_assign
  end

  def reload_signs
    turbo_stream_action_tag :reload_signs
  end

  def close_task_panel
      turbo_stream_action_tag :close_task_panel
  end

  def close_list_panel
      turbo_stream_action_tag :close_list_panel
  end
end

Turbo::Streams::TagBuilder.prepend(TurboStreamActionsHelper)