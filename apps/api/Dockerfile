# ==========================================
# ESTÁGIO 1: Compilação (Build) - AJUSTADO PARA JAVA 21
# ==========================================
FROM maven:3.9.6-eclipse-temurin-21-alpine AS build
WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline -B

COPY src ./src
RUN mvn clean package -DskipTests

# ==========================================
# ESTÁGIO 2: Execução (Runtime) - AJUSTADO PARA JAVA 21
# ==========================================
FROM eclipse-temurin:21-jre-alpine AS runtime
WORKDIR /app

RUN addgroup -S estoquegroup && adduser -S estoqueuser -G estoquegroup

COPY --from=build /app/target/*.jar app.jar

USER estoqueuser
EXPOSE 8080

# Mantém as otimizações de memória essenciais para o plano gratuito de 512MB
ENTRYPOINT ["java", "-XX:+UseSerialGC", "-Xss512k", "-Xmx350m", "-jar", "app.jar"]
