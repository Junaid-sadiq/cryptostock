# Stage 1: Build the application
FROM maven:3.9.4-eclipse-temurin-21-alpine AS build

WORKDIR /app

COPY cryptostock/pom.xml cryptostock/pom.xml
COPY cryptostock/src cryptostock/src

RUN mvn -f cryptostock/pom.xml clean package -DskipTests

# Stage 2: Run the application
FROM openjdk:21-jdk

WORKDIR /app

COPY --from=build /app/cryptostock/target/cryptostock-1.0.jar /app/cryptostock-app.jar

EXPOSE 8080

CMD ["java", "-Xms512m", "-Xmx1024m", "-jar", "cryptostock-app.jar"]