package com.nexmatix.config

import grails.plugin.springwebsocket.DefaultWebSocketConfig
import groovy.util.logging.Slf4j
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Configuration
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker
import org.springframework.web.socket.config.annotation.StompEndpointRegistry

@Slf4j
@Configuration
@EnableWebSocketMessageBroker
class CustomWebSocketConfig extends DefaultWebSocketConfig {

    @Value('${allowedOrigin}')
    String allowedOrigin //Loads our allowedOrigin config property from application.yml

    @Override
    void registerStompEndpoints(StompEndpointRegistry stompEndpointRegistry) { //Configures the websocket connection to accept requests from our client server
        log.info "registerStompEndpoints with allowedOrigin: ${allowedOrigin}"
        stompEndpointRegistry.addEndpoint("/stomp").setAllowedOrigins(allowedOrigin).withSockJS()
    }
}