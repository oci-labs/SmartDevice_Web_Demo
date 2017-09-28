# nexmatix-demo

Note:  If you have checked out this project prior to 9/27/2017, you will need to run ./gradlew clean, as the former nexmatix.demo package has been consolidated into the com.nexmatix package (including Application.groovy)

This profile provides a client/server multi-project build structure. The server Grails app is using the rest-api profile with CORS enabled. It can be started using 'grails run-app' or using the Gradle wrapper:
```
  ./gradlew server:bootRun
```
The React client app has been built using the create-react-app CLI. It can be started via 'npm start' (in which case you will need to run 'npm install' to install npm dependencies) or using the Gradle wrapper (which will install npm dependencies automatically if needed):
```
  ./gradlew client:bootRun
```
The client app's build.gradle defines other tasks to test and build the app using react-scripts. Please see create-react-app's documentation for more information: https://github.com/facebookincubator/create-react-app

To run both client & server projects in parallel, use the Gradle wrapper:
```
 ./gradlew bootRun -parallel
```
For support, please use the Groovy Community Slack (https://groovycommunity.slack.com/) or open an issue on Github: https://github.com/grails-profiles/react/issues

