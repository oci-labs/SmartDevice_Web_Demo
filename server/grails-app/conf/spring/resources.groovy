import com.nexmatix.ValveDataJob
import com.nexmatix.config.CustomWebSocketConfig

// Place your Spring DSL code here
beans = {
    valveDataJob(ValveDataJob)
    webSocketConfig(CustomWebSocketConfig)
}