class Slot < Content
  class CommentNotAllowed < StandardError; end
  
  acts_as_taggable_on :tags, :categories
  validates_presence_of :title, :user_id
  searchable_by :title, :body, :excerpt

  def published?
    !new_record? && !published_at.nil?
  end

  def pending?
    !published? || Time.now.utc < published_at
  end
  
  def status
    pending? ? :pending : :published
  end

  def self(search)
    if search
      search("#{search}")
    else
      find(:all)
    end
  end
  
  class << self

    def with_published(&block)
      with_scope({:find => { :conditions => ['contents.published_at <= ? AND contents.published_at IS NOT NULL', Time.now.utc] } }, &block)
    end

    def find_by_date(options = {})
      with_published do
        find :all, {:order => 'contents.published_at desc'}.update(options)
      end
    end
    
    def find_all_in_month(year, month, options = {})
      find(:all, options.merge(:order => 'contents.published_at DESC', :conditions => ["contents.published_at <= ? AND contents.published_at BETWEEN ? AND ?", 
        Time.now.utc, *Time.delta(year.to_i, month.to_i)]))
    end
    
    def find_all_by_tags(tag_names, limit = 15)
      find(:all, :order => 'contents.published_at DESC', :include => [:tags, :user], :limit => limit,
        :conditions => ['(contents.published_at <= ? AND contents.published_at IS NOT NULL) AND tags.name IN (?)', Time.now.utc, tag_names])
    end
    
    def permalink_for(str)
      PermalinkFu.escape(str)
    end
  end
  
  protected
    def convert_to_utc
      self.published_at = published_at.utc if published_at
    end

end