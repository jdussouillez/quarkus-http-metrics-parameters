package org.acme.getting.started;

import io.smallrye.mutiny.Uni;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.time.Duration;
import java.util.Random;

@Path("/hello")
public class ReactiveGreetingResource {

    private final Random rand = new Random();

    @GET
    @Path("/greeting/{name}")
    @Produces(MediaType.TEXT_PLAIN)
    public Uni<Response> greeting(
        @PathParam("name") final String name,
        @QueryParam("status") final int status) {
        return Uni.createFrom().item(status)
            .map(s -> s == 200 ? Response.ok("Hello " + name).build() : Response.status(s).build())
            .onItem()
            .delayIt()
            .by(Duration.ofMillis(rand.nextInt(0, 1_000)));
    }
}
