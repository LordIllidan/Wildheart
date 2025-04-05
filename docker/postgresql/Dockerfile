FROM postgres:16-alpine

# Add any custom configurations if needed
COPY ./init.sql /docker-entrypoint-initdb.d/
COPY ./postgresql.conf /etc/postgresql/postgresql.conf

# Set environment variables
ENV POSTGRES_DB=wildheart
ENV POSTGRES_USER=wildheart
ENV POSTGRES_PASSWORD=wildheart

# Expose the PostgreSQL port
EXPOSE 5432

# Set the custom configuration file
CMD ["postgres", "-c", "config_file=/etc/postgresql/postgresql.conf"] 