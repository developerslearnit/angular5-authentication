using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;

namespace TokenAPI.Infrastructure
{
    public class AuthTokenValidatorService : OAuthAuthorizationServerProvider
    {
        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            var identity = new ClaimsIdentity(context.Options.AuthenticationType);

            var mockUsers = new Models.MockUsers();

            var user = mockUsers.GetUsers().Where(x => x.username == context.UserName && x.password == context.Password);

            if (user.Any())
            {
                var loggedInUser = user.First();

                
                identity.AddClaim(new Claim("username", loggedInUser.username));
                identity.AddClaim(new Claim(ClaimTypes.Name, loggedInUser.name));
                if(loggedInUser.Roles.Count > 0)
                {
                    foreach (var item in loggedInUser.Roles)
                    {
                        identity.AddClaim(new Claim(ClaimTypes.Role, item));
                    }
                }
                context.Validated(identity);
            }
            else
            {
                context.SetError("invalid_grant", "Wrong username or password");
                return;
            }
         
        }
    }
}