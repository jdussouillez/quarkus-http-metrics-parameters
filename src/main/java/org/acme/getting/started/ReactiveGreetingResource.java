package org.acme.getting.started;

import io.smallrye.mutiny.Uni;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import java.time.Duration;
import java.util.Random;

@Path("/hello")
public class ReactiveGreetingResource {

    private final Random rand = new Random();

    @GET
    @Path("/greeting/{name}")
    @Produces(MediaType.TEXT_PLAIN)
    public Uni<String> greeting(@PathParam("name") final String name) {
        return Uni.createFrom().item("Hello " + name)
            .onItem()
            .delayIt()
            .by(Duration.ofMillis(rand.nextInt(0, 500)));
    }
}
