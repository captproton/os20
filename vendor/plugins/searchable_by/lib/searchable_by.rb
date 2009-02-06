module SearchableBy
  def searchable_by(*args)
    # looking for the additional options
    options = (args.size > 1 and args.last.is_a?(Hash)) ? args.pop : { }
    method_name = options[:method_name] || options['method_name']
    options.delete :method_name
    options.delete 'method_name'
    
    # getting the fields definition
    unless args.first.is_a?(Hash)
      fields = { }
      args.each do |field|
        fields[field] = :like
      end
    else
      fields = args.first
    end
    
    # trying to get the name-scope name from the inline options
    method_name = fields[:method_name] || fields['method_name'] || 'like' unless method_name
    fields.delete :method_name
    fields.delete 'method_name'
    
    # compiling the conditions block
    module_eval <<-"end_eval"
      named_scope :#{method_name}, lambda{ |search|
        unless search.blank? 
         {:conditions => [#{
            conditions = []
            values = []

            fields.each do |field, type|
              field = field.to_s
              type = type.to_s.downcase

              field = table_name + "." + field unless field.include?('.')

              conditions << case type
                              when 'exact_i' then "LOWER(#{field}) = LOWER(?)" 
                              when 'exact'   then "#{field} = ?"
                              else                "#{field} LIKE ?"
                            end

              values << case type
                          when 'exact', 'exact_i' then 'search'
                          when 'begin'            then '"#{search}%"'
                          when 'end'              then '"%#{search}"'
                          else                         '"%#{search}%"'
                        end
            end

            '"'+ conditions.join(' OR ') +'", '+ values.join(', ')
          }]
        }
      else {} # in a case of an empty search request
      end.merge(#{options.inspect})}
    end_eval
  end
end
