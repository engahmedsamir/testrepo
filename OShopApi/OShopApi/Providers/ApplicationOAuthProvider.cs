using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;
using OShopApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Helpers;

namespace OShopApi.Providers
{
    public class ApplicationOAuthProvider : OAuthAuthorizationServerProvider
    {
        private readonly string _publicClientId;

        public ApplicationOAuthProvider(string publicClientId)
        {
            if (publicClientId == null)
            {
                throw new ArgumentNullException("publicClientId");
            }

            _publicClientId = publicClientId;
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            User entry = null;
            //Replace below user authentication code as per your Entity Framework Model ***
            using (var obj = new OShopEntities())
            {
                try
                {
                    entry = obj.User.Where(record => record.Email == context.UserName).FirstOrDefault();

                    if (entry == null)
                    {
                        context.SetError("Invalid_Credentials", "Wrong Username.");
                        return;
                    }
                    else
                    {
                        var salt = entry.Salt;
                        var verify = Crypto.VerifyHashedPassword(entry.Password, (salt + context.Password));
                        if (!verify)
                        {
                            context.SetError("Invalid_Credentials", "Wrong Password.");
                            return;
                        }
                    }
                }
                catch (Exception ex)
                {

                }
            }


            ClaimsIdentity oAuthIdentity = new ClaimsIdentity(context.Options.AuthenticationType);
            ClaimsIdentity cookiesIdentity = new ClaimsIdentity(context.Options.AuthenticationType);

            AuthenticationProperties properties = CreateProperties(context.UserName, entry.IsAdmin, entry.UserName, entry.Id);
            AuthenticationTicket ticket = new AuthenticationTicket(oAuthIdentity, properties);
            context.Validated(ticket);
            context.Request.Context.Authentication.SignIn(cookiesIdentity);
        }

        public override Task TokenEndpoint(OAuthTokenEndpointContext context)
        {
            foreach (KeyValuePair<string,
            string> property in context.Properties.Dictionary)
            {
                context.AdditionalResponseParameters.Add(property.Key, property.Value);
            }

            return Task.FromResult<object>(null);
        }

        public override Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            // Resource owner password credentials does not provide a client ID.
            if (context.ClientId == null)
            {
                context.Validated();
            }

            return Task.FromResult<object>(null);
        }

        public override Task ValidateClientRedirectUri(OAuthValidateClientRedirectUriContext context)
        {
            if (context.ClientId == _publicClientId)
            {
                Uri expectedRootUri = new Uri(context.Request.Uri, "/");

                if (expectedRootUri.AbsoluteUri == context.RedirectUri)
                {
                    context.Validated();
                }
            }

            return Task.FromResult<object>(null);
        }

        public static AuthenticationProperties CreateProperties(string email, bool isAdmin, string userName, int userid)
        {
            IDictionary<string, string>
            data = new Dictionary<string, string>
            {
                { "Email", email },
                { "isAdmin", isAdmin.ToString() },
                { "userName", userName },
                { "id", userid.ToString() }
            };
            return new AuthenticationProperties(data);
        }
    }
}