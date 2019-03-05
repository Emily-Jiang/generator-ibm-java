package application;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Application;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.eclipse.microprofile.health.Health;
import org.eclipse.microprofile.health.HealthCheck;

@Health
@ApplicationScoped
public class HealthEndpoint implements HealthCheck{

  @Override
  public HealthCheckResponse call() {    
    return HealthCheckResponse.named("service")
    .withData("healthy", "true")
    .up().build();
  }

}
