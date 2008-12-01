# == Schema Information
# Schema version: 2
#
# Table name: users
#
#  id                        :integer       not null, primary key
#  login                     :string(255)   
#  email                     :string(255)   
#  crypted_password          :string(40)    
#  salt                      :string(40)    
#  created_at                :datetime      
#  updated_at                :datetime      
#  last_login_at             :datetime      
#  remember_token            :string(255)   
#  remember_token_expires_at :datetime      
#  visits_count              :integer       default(0)
#  time_zone                 :string(255)   default("Etc/UTC")
#

require 'digest/sha1'
class User < ActiveRecord::Base
  include AuthenticatedBase
  has_many :assets, :as => :attachable
  has_many :articles
  has_many :slots
  

  ## outdated with rails 2.1 composed_of :tz, :class_name => 'TZInfo::Timezone', :mapping => %w( time_zone time_zone )  ## in rails 2.1 this will be updated.
  validates_presence_of     :login, :email
  validates_presence_of     :password,                   :if => :password_required?
  validates_presence_of     :password_confirmation,      :if => :password_required?
  validates_length_of       :password, :within => 4..40, :if => :password_required?
  validates_confirmation_of :password,                   :if => :password_required?
  validates_length_of       :login,    :within => 3..40
  validates_length_of       :email,    :within => 3..100
  validates_uniqueness_of   :login, :email, :case_sensitive => false
  before_save :encrypt_password


  # Protect internal methods from mass-update with update_attributes
  # prevents a user from submitting a crafted form that bypasses activation
  # anything else you want your user to change should be added here.
  attr_accessible :login, :email, :password, :password_confirmation, :first_name, :last_name, :time_zone
  
  def to_param
    login
  end

  def self.find_by_param(*args)
    find_by_login *args
  end

  def to_xml
    super( :only => [ :login, :time_zone, :last_login_at ] )
  end
#############
# Virtual attribute for the unencrypted password
attr_accessor :password



# Authenticates a user by their login name and unencrypted password.  Returns the user or nil.
def self.authenticate(login, password)
  u = find_by_login(login) # need to get the salt
  u && u.authenticated?(password) ? u : nil
end

# Encrypts some data with the salt.
def self.encrypt(password, salt)
  Digest::SHA1.hexdigest("--#{salt}--#{password}--")
end

# Encrypts the password with the user salt
def encrypt(password)
  self.class.encrypt(password, salt)
end

def authenticated?(password)
  crypted_password == encrypt(password)
end

def remember_token?
  remember_token_expires_at && Time.now.utc < remember_token_expires_at 
end

# These create and unset the fields required for remembering users between browser closes
def remember_me
  remember_me_for 2.weeks
end

def remember_me_for(time)
  remember_me_until time.from_now.utc
end

def remember_me_until(time)
  self.remember_token_expires_at = time
  self.remember_token            = encrypt("#{email}--#{remember_token_expires_at}")
  save(false)
end

def forget_me
  self.remember_token_expires_at = nil
  self.remember_token            = nil
  save(false)
end

# Returns true if the user has just been activated.
def recently_activated?
  @activated
end

protected
  # before filter 
  def encrypt_password
    return if password.blank?
    self.salt = Digest::SHA1.hexdigest("--#{Time.now.to_s}--#{login}--") if new_record?
    self.crypted_password = encrypt(password)
  end
    
  def password_required?
    crypted_password.blank? || !password.blank?
  end
  

end
