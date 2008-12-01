class ArticlesController < ApplicationController
    @protected_actions = [ :edit, :update, :destroy ]
    skip_before_filter :login_required, :only => [ :index, :new]
    ## before_filter :check_auth, :only => @protected_actions

    def index
      ## @articles = site.articles.paginate(article_options(:order => 'contents.published_at DESC', :select => 'contents.*',
      ##                                                 :page => params[:page], :per_page => params[:per_page]))
      @articles = Article.find(:all)
      ## @comments = @site.unapproved_comments.count :all, :group => :article, :order => '1 desc'
      ## @sections = site.sections.find(:all)
    end

    def show
      @article  = Article.find(params[:id])
      ## @comments = @article.comments.collect &:to_liquid
      ## @article  = @article.to_liquid(:mode => :single)

      ## render :text => site.call_render(site.sections.home, :single, 'articles' => [@article], 'article' => @article, 'comments' => @comments, 'site' => site.to_liquid)
    end

    def new
        @article = current_user.articles.build(:filter => current_user.filter, :published_at => Time.now.utc)

      respond_to do |format|
        format.html # new.html.erb
        format.xml  { render :xml => @article }
      end
      
    end

    def edit
        @article = current_user.articles.find(params[:id])
      @version   = params[:version] ? @article.find_version(params[:version]) : @article or raise(ActiveRecord::RecordNotFound)
      @published = @version.published?
      @version.published_at = (@version.published_at || Time.now.utc)
    end

    def create
        @article = current_user.articles.create params[:article]
      respond_to do |format|
        if @article.save
          format.html do
            flash[:notice] = 'Article was successfully created.'
            redirect_to(@article)
          end
          format.xml  { render :xml => @article, :status => :created,
            :location => @article }
        else
          format.html { render :action => "new" }
          format.xml  { render :xml => @article.errors,
            :status => :unprocessable_entity }
        end
      end

    end

    def update
          @article = current_user.articles.find(params[:id])

          respond_to do |format|
            if @article.update_attributes(params[:article])
              flash[:notice] = 'Article was successfully updated.'
              format.html { redirect_to(@article) }
              format.xml  { head :ok }
            else
              format.html { render :action => "edit" }
              format.xml  { render :xml => @article.errors,
                :status => :unprocessable_entity }
            end
          end
        rescue ActiveRecord::RecordNotFound => e
          prevent_access(e)
        ## Mephisto code commented out  
        ## @article.attributes = params[:article].merge(:updater => current_user)
        ## save_with_revision? ? @article.save! : @article.save_without_revision!
        ## flash[:notice] = "Your article was updated"
        ## redirect_to :action => 'edit', :id => params[:id]
    ## rescue ActiveRecord::RecordInvalid
      ## load_sections
      ##render :action => 'edit'
    end

    def destroy
      @article.destroy
      flash[:notice] = "The article: #{@article.title.inspect} was deleted."
      render :update do |page|
        page.redirect_to :action => 'index'
      end
    end
    
    private
      def prevent_access(e)
        logger.info "ArticlesController#prevent_access: #{e}"
        respond_to do |format|
          format.html { redirect_to(articles_url) }
          format.xml  { render :text => "error" }
        end
      end
    
    protected

      # This is implemented on a per-polymorph basis because the asset.attachable may be
      # an object that is *indirectly* tied to the current user.
      def check_auth
        @article.user == current_user or raise AccessDenied
      end


end
