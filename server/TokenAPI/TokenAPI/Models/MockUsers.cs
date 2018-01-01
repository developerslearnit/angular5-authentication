using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TokenAPI.Models
{
    public class MockUsers
    {
        public List<User> GetUsers()
        {
            var users = new List<User>();

            users.Add(new User
            {
                name= "John Doe",
                username = "admin",
                password = "admin",
                Roles = new List<string>(new string[] { "admin", "superuser" })
            });

            users.Add(new User
            {
                name = "Jane Doe",
                username = "user",
                password = "user",
                Roles = new List<string>(new string[] { "hr", "user" })
            });

            return users;
        }
    }
}