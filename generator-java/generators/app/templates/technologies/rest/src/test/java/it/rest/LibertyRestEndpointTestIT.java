package it.rest;

import it.EndpointTest;

import org.junit.Test;

public class LibertyRestEndpointTest extends EndpointTest {

    @Test
    public void testDeployment() {
        testEndpoint("/rest", "Hello from the REST endpoint!");
    }
}
