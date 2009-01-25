  ## Time formats
  ActiveSupport::CoreExtensions::Time::Conversions::DATE_FORMATS.merge!(
  :chatty => "It's %I:%M %p on %A, %B %d, %Y"
  )
  ActiveSupport::CoreExtensions::Date::Conversions::DATE_FORMATS.merge!(
  :concise => "%d.%b.%y"
  )
  ActiveSupport::CoreExtensions::Date::Conversions::DATE_FORMATS.merge!(
  :medium => "%b %e, %Y"
  )

  ActiveSupport::CoreExtensions::Date::Conversions::DATE_FORMATS.merge!(
  :weekday_and_date => "%A, %B %d, %Y"
  )
