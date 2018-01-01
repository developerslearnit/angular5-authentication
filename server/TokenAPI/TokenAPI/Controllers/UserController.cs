using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;

namespace TokenAPI.Controllers
{
    [RoutePrefix("api")]
    public class UserController : ApiController
    {
        [Authorize]
        [HttpGet]
        [Route("user/roles")]
        public IHttpActionResult GetRoles()
        {
            var identity =(ClaimsIdentity) User.Identity;
            var roles = identity.Claims.Where(x => x.Type == ClaimTypes.Role).Select(x => x.Value).ToList();

            return Ok(new { roles = roles,name = identity.Claims.Where(x => x.Type == ClaimTypes.Name).Select(x => x.Value).First() });
        }
    }
}
