using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TokenAPI.Models
{
    public class User
    {
        public string username { get; set; }
        public string password { get; set; }
        public List<string> Roles { get; set; }
        public string name { get;set; }
    }

   
}