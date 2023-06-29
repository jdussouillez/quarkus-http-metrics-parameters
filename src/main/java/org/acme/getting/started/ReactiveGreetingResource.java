package org.acme.getting.started;

import io.smallrye.mutiny.Uni;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/hello")
public class ReactiveGreetingResource {

    @GET
    @Path("/greeting/{name}")
    @Produces(MediaType.TEXT_PLAIN)
    public Uni<Response> greeting(
        @PathParam("name") final String name,
        @QueryParam("status") final int status) {
        if (status == 200) {
            return Uni.createFrom().item(Response.ok("Hello " + name).build());
        }
        return Uni.createFrom().item(Response.status(status).build());
    }
}
