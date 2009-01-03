#############################################################
#	Settings
#############################################################

default_run_options[:pty] = true
set :use_sudo, false #sudo not needed since everything is in deploy account

#############################################################
#	Application
#############################################################
set :user, "deploy"
set :runner, "deploy"

set :application, "os20"
set :deploy_to, "/home/#{user}/#{application}"

set :repository,  "git@github.com:captproton/#{application}.git"
set :scm_passphrase, "melorbode" #This is your custom github user password
set :branch, "master"
set :scm, :git

#############################################################
#	Servers
#############################################################

set :ssh_options, { :forward_agent => true }
set :domain, "beta.oceanshoreschool.info"
set :rails_env, 'production'
role :app, domain
role :web, domain
role :db,  domain, :primary => true



namespace :deploy do 
  desc "Restarting mod_rails with restart.txt" 
  task :restart, :roles => :app, :except => { :no_release => true } do 
    run "touch #{current_path}/tmp/restart.txt" 
  end 
  after :deploy, "deploy:restart"
  
  [:start, :stop].each do |t| 
    desc "#{t} task is a no-op with mod_rails" 
    task t, :roles => :app do ; end 
  end 
end

namespace :demo do
  desc "Setup Environment"
  task :setup_env do
    update_apt_get
    install_dev_tools
    install_git
    install_sqlite3
    install_rails_stack
    install_apache
    install_passenger
    config_passenger
    config_vhost
  end
  
  desc "Update apt-get sources"
  task :update_apt_get do
    sudo "apt-get update"
  end
  
  desc "Install Development Tools"
  task :install_dev_tools do
    sudo "apt-get install build-essential -y"
  end
  
  desc "Install Git"
  task :install_git do
    sudo "apt-get install git-core git-svn -y"
  end
  
  desc "Install Subversion"
  task :install_subversion do
    sudo "apt-get install subversion -y"
  end
  
  desc "Install MySQL"
  task :install_mysql do
    sudo "apt-get install mysql-server libmysql-ruby -y"
  end
  
  desc "Install PostgreSQL"
  task :install_postgres do
    sudo "apt-get install postgresql libpgsql-ruby -y"
  end
  
  desc "Install SQLite3"
  task :install_sqlite3 do
    sudo "apt-get install sqlite3 libsqlite3-ruby -y"
  end
  
  desc "Install Ruby, Gems, and Rails"
  task :install_rails_stack do
    [
      "sudo apt-get install ruby ruby1.8-dev irb ri rdoc libopenssl-ruby1.8 -y",
      "mkdir -p src",
      "cd src",
      "wget http://rubyforge.org/frs/download.php/29548/rubygems-1.0.1.tgz",
      "tar xvzf rubygems-1.0.1.tgz",
      "cd rubygems-1.0.1/ && sudo ruby setup.rb",
      "sudo ln -s /usr/bin/gem1.8 /usr/bin/gem",
      "sudo gem install rails --no-ri --no-rdoc"
    ].each {|cmd| run cmd}
  end
  
  desc "Install Apache"
  task :install_apache do
    sudo "apt-get install apache2 apache2.2-common apache2-mpm-prefork 
          apache2-utils libexpat1 apache2-prefork-dev libapr1-dev -y"
    sudo "chown :sudo /var/www"
    sudo "chmod g+w /var/www"
  end
  
  desc "Install Passenger"
  task :install_passenger do
    run "sudo gem install passenger --no-ri --no-rdoc"
    input = ''
    run "sudo passenger-install-apache2-module" do |ch,stream,out|
      next if out.chomp == input.chomp || out.chomp == ''
      print out
      ch.send_data(input = $stdin.gets) if out =~ /(Enter|ENTER)/
    end
  end
  
  desc "Configure Passenger"
  task :config_passenger do
    passenger_config =<<-EOF
LoadModule passenger_module /usr/lib/ruby/gems/1.8/gems/passenger-1.0.1/ext/apache2/mod_passenger.so
RailsSpawnServer /usr/lib/ruby/gems/1.8/gems/passenger-1.0.1/bin/passenger-spawn-server
RailsRuby /usr/bin/ruby1.8    
    EOF
    put passenger_config, "src/passenger"
    sudo "mv src/passenger /etc/apache2/conf.d/passenger"
  end
  
  desc "Configure VHost"
  task :config_vhost do
    vhost_config =<<-EOF
<VirtualHost *:80>
  ServerName #{domain}
  DocumentRoot #{deploy_to}/current/public
  
  ErrorLog /var/log/apache2/error.log
  
  CustomLog /var/log/apache2/access.log combined
</VirtualHost>
    EOF
    put vhost_config, "src/vhost_config"
    sudo "mv src/vhost_config /etc/apache2/sites-available/#{application}"
    sudo "a2ensite #{application}"
  end
  
  desc "Reload Apache"
  task :apache_reload do
    ## sudo touch "#{deploy_to}/tmp/restart.txt"
    sudo "/etc/init.d/apache2 reload"
  end
end

# =============================================================================
# RAILS VERSION
# =============================================================================
# Use this to freeze your deployment to a specific rails version.  Uses the rake
# init task run in after_symlink below.

set :rails_version, "rel_2-2-2" # used by the custom deploy_edge rake task


# TODO: test this works and I can remove the restart task and use the cleanup task
# set :use_sudo, false

# =============================================================================
# ROLES
# =============================================================================
# You can define any number of roles, each of which contains any number of
# machines. Roles might include such things as :web, or :app, or :db, defining
# what the purpose of each machine is. You can also specify options that can
# be used to single out a specific subset of boxes in a particular role, like
# :primary => true.

role :app, domain
role :web, domain
role :db,  domain, :primary => true


# =============================================================================
# OPTIONAL VARIABLES
# =============================================================================
# set :gateway, "gate.host.com"  # default to no gateway

# =============================================================================
# SSH OPTIONS
# =============================================================================
# ssh_options[:keys] = %w(/path/to/my/key /path/to/another/key)
# ssh_options[:port] = 25

# =============================================================================
# TASKS
# =============================================================================
# Define tasks that run on all (or only some) of the machines. You can specify
# a role (or set of roles) that each task should be executed on. You can also
# narrow the set of servers to a subset of a role by specifying options, which
# must match the options given for the servers to select (like :primary => true)

# no sudo access on txd :)

# ** Nota Bene:     Because Capistrano 2 can use plugins, most tasks will be run in the plugin
#                   See:  http://peepcode.com/products/capistrano-2

desc "Freezes rails version ##{rails_version}"
task :after_symlink do
  run <<-CMD
    cd #{current_release} &&
    rake rails:freeze:edge TAG=#{rails_version}
    
  CMD
end