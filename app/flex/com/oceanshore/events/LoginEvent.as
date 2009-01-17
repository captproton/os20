package com.oceanshore.events { 
    import flash.events.Event; 
    public class LoginEvent extends Event { 
        public static const LOGIN:String = "login"; 
        public var user:XML; 
        public function LoginEvent(user:XML) { 
            super(LOGIN, true); 
            this.user = user; 
        } 
    } 
}